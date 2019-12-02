import auth from '../../utils/auth';
import * as Queries from '../../utils/queries'
import db from '../../config/db';
import * as Response from '../../utils/reponse';
import * as Email  from '../../utils/email';

export default class AuthController {
    static async register (req, res, next) {
        try{
            const { email, username, password, group_id, role_id, permissions} = req.body;
            const password_hash = await auth.hash(password);
            const payload = [username, email, password_hash, group_id, role_id, permissions];
            const user  = await db(Queries.creatUser, payload);
            if (user && user.routine === '_bt_check_unique') {
                return Response.notFoundError(res, 'Email/ Username Already Exist.');
            }
            
            const token = await auth.generateToken();
            const confirmation = await db(Queries.setToken, [username, email, false, token]);
            const send_email = await Email.token(confirmation.rows[0]);
            return Response.createdOkResponse(res, user.rows[0]);
        }
        catch(error){
            return Response.serverError(res, 'Error registering user.');
        }

    }

    static async login(req, res){
        try{
            const { email, password } = req.body;
            const user = await db(Queries.login, [email]);
            if(!user){
                return Response.badrequestError(res, 'Incorrect email/password.');
            }
            const compare_password = await auth.comparePassword(password, user.rows[0].password);
            if(!compare_password){
                return Response.badrequestError(res, 'Incorrect email/password.');
            }
            if(user.rows[0].is_confirmed === false){
                return Response.badrequestError(res, 'You have not verified your email.');
            }
            const token = await auth.generateToken(user.rows[0].id);
            delete user.rows[0].password;
            user.rows[0].token = token;
            return Response.successResponse(res, user.rows[0])

        }catch(error){
            return Response.serverError(res, 'An error occured trying to process your request.')
        }
    }

    static async permissions(req, res){
        try{  
        const { email } = req.query;
        const permissions = await db(Queries.getPermissions);
        const user = await db(Queries.getUser, [email]);
        if(!user.rows.length > 0){
            return Response.notFoundError(res, 'User not found.');
        }
        const user_roles = user.rows[0].permissions;
        const user_permissions = [];
        user_roles.forEach((role)=>{
            let user_role = permissions.rows[role-1].permission_name;
            user_permissions.push(user_role);
        })
        user.rows[0].permissions = user_permissions;
        return Response.successResponse(res, user.rows[0]);
        }
        catch(error){
            return Response.serverError(res, 'An error occured trying to process your request.');
        }

    }

    static async confirmToken(req, res){
        try{
        const is_confirmed = await db(Queries.verifyConfirmation, [req.query.token]);
        if(!is_confirmed.rows[0]){
            return Response.badrequestError(res, 'Invalid Token.');
        }
        const token = is_confirmed.rows[0].confirmation_token;
        const user_confirmation = await db(Queries.ConfirmUser, [token]);
        if(!user_confirmation.rows[0]){
            return Response.badrequestError(res, 'Token already confirmed;');
        }
        const update_user = await db(Queries.updateUser, [user_confirmation.rows[0].email]);
        if(update_user.rows[0]){
            Email.welcome(update_user.rows[0]);
        }
         return Response.successResponse(res, update_user.rows[0]);

    }catch(error){
        return Response.serverError(res, 'Error while confirming token.');
    }

    }
}
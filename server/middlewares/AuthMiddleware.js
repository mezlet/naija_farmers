/* eslint-disable consistent-return */
import validate from '../utils/validate';
import * as Schema from '../utils/validate/Schema';
import * as Reply from '../utils/reponse';

export default class AuthMiddleware {
  static async register(req, res, next) {
    try {
      const isValid = await validate(req.body, Schema.userSchema);
      if (!isValid.details) {
        return next();
      }
      const { message } = isValid.details[0];
      return Reply.badrequestError(res, message);
    } catch (error) {
      return error;
    }
  }

  static async permissions(req, res, next) {
    try {
      const isValid = await validate(req.query, Schema.permissionSchema);
      if (!isValid.details) {
        return next();
      }
      const { message } = isValid.details[0];
      return Reply.badrequestError(res, message);
    } catch (error) {
      return error;
    }
  }

  static async confirmationToken(req, res, next) {
    try {
      const isValid = await validate(req.query, Schema.tokenSchema);
      if (!isValid.details) {
        return next();
      }
      const { message } = isValid.details[0];
      return Reply.badrequestError(res, message);
    } catch (error) {
      return error;
    }
  }

  static async login(req, res, next) {
    try {
      const isValid = await validate(req.body, Schema.loginSchema);
      if (!isValid.details) {
        return next();
      }
      const { message } = isValid.details[0];
      return Reply.badrequestError(res, message);
    } catch (error) {
      return error;
    }
  }
}

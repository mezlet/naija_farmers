import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendMail = (dataObject) => {
    const msg = {
        to: dataObject.to, 
        from: process.env.SENDGRID_FROM, 
        subject: dataObject.subject,
         text: dataObject.text
        }
    sgMail
    .send(msg)
    .then(res=>{
        console.log('Email sent')
    })
    .catch(error=>{
        console.error(error.toString());      
    })
}
    export const token = (data) =>{
        const subject = 'Your confirmation token';
        const body = (data) => `Hello ${data.username} please click on this link to confirm your account http://localhost:5000/api/v1/auth/confirmation?token=${data.confirmation_token}`;
              sendMail({ to: data.email, subject, text: body(data) });
            };
    export const welcome = (data) => {
        const subject = 'Welcome to Naija Farmers';
        const body = (data) => `Hello ${data.username}, Your account registration is successful. Please contact your offtaker for more details`;
        sendMail({to: data.email, subject, text: body(data)});
    }


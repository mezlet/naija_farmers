import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';


const secret = process.env.SECRET;

const Helpers = {
  hash(password) {
    return bycrpt.hashSync(password, 10);
  },

  comparePassword(password, hash) {
    return bycrpt.compareSync(password, hash);
  },

  generateToken(id) {
    return jwt.sign({ userId: id }, secret, { expiresIn: '1hr' });
  },

  decodeToken(token) {
    return jwt.verify(token, secret);
  },

  generateConfirmationToken(){
    const random_str = uuidv4();
    const token = Buffer.from(random_str);
    return token.toString('base64');
},
};

export default Helpers;
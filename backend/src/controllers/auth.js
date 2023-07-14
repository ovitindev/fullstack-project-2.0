import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import {getKey} from '../controllers/keys.js';


export const generateToken = async (tokenToCompare, expiresIn = '1h') => {
  const payload = { userId: 123, role: 'admin' };
  const secretKey = await getKey();
  const options = { expiresIn };

  if (tokenToCompare === secretKey) {
    try {
      const token = await jwt.sign(payload, secretKey, options);
      const newToken = new Token({ token });
      await newToken.save();

      return token;
    } catch (error) {
      console.error('Erro ao conectar-se ou salvar o token:', error);
      throw error;
    }
  } else {
    return null; 
  }
};

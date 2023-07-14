import jwt from "jsonwebtoken";
import {getKey} from '../controllers/keys.js';

const authenticateToken = async (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secretKey = await getKey();
    const decoded = jwt.verify(token, secretKey);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(403).json({ message: "Invalid token" });
  }
};

export default authenticateToken;

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import "dotenv/config";

// Middleware to authenticate user using JWT
const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  } else {
    try {
      // Verify the token
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object (excluding password)
      req.user = await User.findById(verifyToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
};

export default authUser;

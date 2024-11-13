import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../../models/admin.model';  // Adjust this path if necessary

// Define interfaces for type safety
interface IAdmin {
  _id: string;
  email: string;
  role: "admin" | "superadmin";
  isActive: boolean; // Ensure isActive is part of your schema in admin.model
}

interface IJWTPayload {
  _id: string;
  email: string;
  role: "admin" | "superadmin";
}

// Extend the Request type to include admin property
declare module 'express-serve-static-core' {
  interface Request {
    admin?: IAdmin;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    // Verify JWT and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as IJWTPayload;

    // Find the admin by ID and email, and verify active status
    const admin = await Admin.findOne({ _id: decoded._id, email: decoded.email }).lean<IAdmin>();

    if (!admin || !admin.isActive) {
      return res.status(403).send({
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Attach the admin info to the request object
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token' });
  }
};

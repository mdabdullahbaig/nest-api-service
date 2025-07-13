import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * AuthMiddleware checks for a valid Bearer token in the Authorization header.
 * If the token is missing or invalid, responds with 401 Unauthorized.
 * Token validation logic (e.g., JWT verification) should be implemented where indicated.
 * Optionally attaches decoded user info to the request object.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  /**
   * Middleware function to validate Authorization header and token.
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express NextFunction callback
   */
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    // TODO: Validate the token (e.g., using JWT)
    // Example: jwt.verify(token, secret)

    // If valid, attach user info to request (optional)
    // req.user = decodedUser;

    next();
  }
}

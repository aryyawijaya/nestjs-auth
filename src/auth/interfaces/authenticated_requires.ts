import { Request } from 'express';
import { TokenPayload } from './token_payload';

export interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}

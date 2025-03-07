import { Request as Req, Response } from 'express';
import { User } from '@prisma/client';

export interface RequestWithUser extends Req {
    user: User;
}
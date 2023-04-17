import { Base } from '../models/Base.js';
import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BaseController extends Controller {
    
}
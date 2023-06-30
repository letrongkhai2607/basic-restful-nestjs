//src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error('Code', exception.code);
    console.error('Message', exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      // Conflict
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      // Not found
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        // Default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}

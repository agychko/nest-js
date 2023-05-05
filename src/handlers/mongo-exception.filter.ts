import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { response } from "express";
import { Error } from "mongoose";

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
      
    }
}
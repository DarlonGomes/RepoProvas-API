import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorMiddleware";
import {testSchemas, userSchemas} from "../schemas";

export const joiValidation = {
    signUp: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = userSchemas.signUpSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    signIn: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = userSchemas.signInSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    testFormat: (req: Request, _res: Response, next: NextFunction) =>{
        const request = req.body;
        const validation = testSchemas.request.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    }
    
}
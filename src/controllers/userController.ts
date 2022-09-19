import { User } from "@prisma/client";
import { Request, Response } from "express";
import { ISignIn, ISignUp } from "../interfaces";
import { userService } from "../services";


export async function signUp(req: Request, res: Response){
    const request : ISignUp = req.body;
    await userService.doesPasswordMatch(request.password, request.confirmPassword!);
    await userService.checkEmail(request.email, "sign-up");
    await userService.archiveAccount(request);
    return res.status(201).json({message: `Succesfull. Your account has been created`});
};

export async function signIn(req: Request, res: Response){
    const request: ISignIn = req.body;
    const account : User | undefined = await userService.checkEmail(request.email, "sign-in");
    await userService.comparePassword(request.password, account!.password)
    const config = await userService.generateToken(account!.id);
    return res.status(200).send({message: `Success. You will be redirected to the home page`, config: config})
};

export async function getFormOptions(_req: Request, res: Response){
    const response = await userService.formOption();
    return res.status(200).send(response)
}

export async function github (_req: Request, res: Response){
    const afterUrl = "https://localhost:5173/loading"
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&&redirect_uri=${afterUrl}`;
    return res.redirect(url)
}

export async function githubToken(req: Request, res: Response){
    const {code} = req.query

    const gitConfig = await userService.getGitAuth(code);
    const userConfig = await userService.getGitDetails(gitConfig)

    return res.status(200).send(userConfig);
    
}
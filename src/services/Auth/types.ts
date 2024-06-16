import { UserModel } from "../../models/user.model."

export interface GeneratedToken {
    token: string,
    cookieOptions:{
        httpOnly: boolean,
        expires: Date
    }
}

export interface LoginResponse {
    generatedToken: GeneratedToken | null,
    user: UserModel | null
}
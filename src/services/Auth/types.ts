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

// Define the interface for the decoded JWT payload
export interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
  }
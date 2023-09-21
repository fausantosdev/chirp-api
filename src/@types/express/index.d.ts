declare namespace Express {
    export interface Request {
        user: {
            id: number
            email: string
            isAdmin: string
            tokenId: number
            exp: number
        }
    }
}
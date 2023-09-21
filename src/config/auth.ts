export type TypeAuthConfig = {
  secret: string
  expiresIn: string
}

export const AuthConfig = {
  secret: process.env.APP_SECRET!,
  expiresIn: '1d',
}

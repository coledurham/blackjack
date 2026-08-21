export interface User {
    name: string,
    email: string,
    password: string
}

export interface SessionUser {
    name: string,
    email: string
}

export interface AuthSession {
    kind: "auth",
    id: string,
    email?: string,
    user?: SessionUser
}
export interface AuthSession {
    kind: "auth",
    id: string,
    email?: string
}
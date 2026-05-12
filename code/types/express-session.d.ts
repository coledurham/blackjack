import "express-session"
import { AuthSession } from "./session.ts"

declare module "express-session" {
    interface SessionData {
        user?: AuthSession
    }
}
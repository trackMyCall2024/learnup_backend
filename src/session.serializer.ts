import { PassportSerializer } from "@nestjs/passport";

export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        done(null, user); // Sauvegarder l'utilisateur dans la session
    }

    deserializeUser(payload: any, done: Function) {
        done(null, payload); // Récupérer l'utilisateur à partir de la session
    }
}

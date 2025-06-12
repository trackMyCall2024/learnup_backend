import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import auth0Config from "../config/auth0.config.json";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Extrait le JWT du header Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            // Valide le token via JWKS d’Auth0
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${auth0Config.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),

            audience: ['http://localhost:3000'],
            issuer: `https://${auth0Config.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        });
    }

    async validate(payload: any) {
        console.log("JWT Payload", payload);
        // Tu peux ici retourner le payload tel quel ou extraire ce que tu veux
        return payload;
    }
}
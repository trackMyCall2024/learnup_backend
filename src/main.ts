import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import session from "express-session";
import passport from "passport";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ["http://localhost:3001"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    });
    app.use(
        session({
            secret: "a long, randomly-generated string stored in env", // Utilise une chaîne secrète sécurisée
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }, // En production, set secure à true si tu utilises HTTPS
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
}
bootstrap();

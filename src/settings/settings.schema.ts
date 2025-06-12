import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type SettingsDocument = HydratedDocument<Settings>;

export enum Theme {
    Light = "light",
    Dark = "dark",
    System = "system",
}

export enum Voice {
    John = "John",
    Vanessa = "Vanessa",
    Nicolas = "Nicolas",
}

@Schema()
export class Languages {
    @Prop({ type: String, required: true })
    application: string;

    @Prop({ type: String, required: true })
    speechToText: string;

    @Prop({ type: String, required: true })
    textToSpeech: string;
}

@Schema()
export class Settings {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Languages, required: true })
    languages: Languages;

    @Prop({ type: String, enum: [Theme.Light, Theme.Dark, Theme.System], required: true })
    theme: "light" | "dark" | "system";

    @Prop({ type: String, enum: [Voice.John, Voice.Vanessa, Voice.Nicolas], required: true })
    voice: "John" | "Vanessa" | "Nicolas";
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
export const LanguagesSchema = SchemaFactory.createForClass(Languages);
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Directory } from "src/directory/directory.schema";

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Directory.name, required: true })
    section: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true, enum: ['ia', 'user'] })
    user: 'ia' | 'user';

    @Prop({ type: String, required: true })
    message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
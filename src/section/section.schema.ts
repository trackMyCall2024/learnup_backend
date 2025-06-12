import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Chapter } from "../chapter/chapter.schema";

export type SectionDocument = HydratedDocument<Section>;

export enum UserSection {
    Ia = 'ia',
    User = 'user'
}

@Schema()
export class Page {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    subtitle: string;

    @Prop({ type: String, required: true })
    data: string;
}

@Schema()
export class Content {
    @Prop({ type: [Page], required: true })
    pages: Page[];

    @Prop({ type: String, required: true })
    resume: string;

    @Prop({ type: String, required: true })
    note: string;
}

@Schema()
export class ChatMessage {
    @Prop({ type: String, enum: [UserSection.Ia, UserSection.User], required: true })
    user: "ia" | "user";

    @Prop({ type: String, required: true })
    message: string;
}

@Schema()
export class Section {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Chapter.name, required: true })
    chapter: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Content, required: true })
    content: Content;

    @Prop({ type: [ChatMessage], required: false })
    chat: ChatMessage[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
export const ContentSchema = SchemaFactory.createForClass(Content);
export const PageSchema = SchemaFactory.createForClass(Page);
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
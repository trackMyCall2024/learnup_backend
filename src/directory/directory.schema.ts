import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type DirectoryDocument = HydratedDocument<Directory>;

export enum DirectoryType {
    Course = "Course",
    Chapter = "Chapter",
    Section = "Section",
}

@Schema()
export class Directory {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    parentID: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    logo: string;

    @Prop({ type: String, required: true, enum: DirectoryType })
    type: DirectoryType;
}

export const DirectorySchema = SchemaFactory.createForClass(Directory);
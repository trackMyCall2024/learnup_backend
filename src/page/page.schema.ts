import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Directory } from "src/directory/directory.schema";

export type PageDocument = HydratedDocument<Page>;

@Schema()
export class Page {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Directory.name, required: true })
    section: mongoose.Schema.Types.ObjectId;
}

export const PageSchema = SchemaFactory.createForClass(Page);
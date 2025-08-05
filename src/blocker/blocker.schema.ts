import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type BlockerDocument = HydratedDocument<Blocker>;

@Schema()
export class Blocker {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, default: [] })
    websites: string;
}

export const BlockerSchema = SchemaFactory.createForClass(Blocker);
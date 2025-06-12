import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum SubscriptionName {
    SALES_STARTER = "salesStarter",
    SALES_COACH = "salesCoach",
    SALES_MASTER = "salesMaster",
}

export interface Subscription {
    type: "yearly" | "monthly";
    name: SubscriptionName;
    expiration: number;
    active: boolean;
}

export enum Role {
    Admin = "admin",
    User = "user",
    Employee = "employee",
}

@Schema()
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id?: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, isRequired: true })
    email: string;

    @Prop({ type: String, isRequired: true })
    firstname: string;

    @Prop({ type: String, isRequired: true })
    lastname: string;

    @Prop({ type: Object, isRequired: false })
    subscription?: Subscription;

    @Prop({ type: Date, isRequired: true })
    registrationDate: Date;

    @Prop({ type: String, enum: Role, isRequired: true })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

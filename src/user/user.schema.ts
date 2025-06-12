import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum Role {
    Admin = "admin",
    User = "user"
}

@Schema()
export class Subscription {
    @Prop({ type: String, enum: ["freemium", "smart+", "smart_premium"], required: true })
    name: "freemium" | "smart+" | "smart_premium";

    @Prop({ type: Boolean, required: true })
    isActivate: boolean;
}

@Schema()
export class University {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    educationName: string;

    @Prop({ type: String, required: true })
    educationLevel: string;
}

@Schema()
export class Location {
    @Prop({ type: String, required: true })
    country: string;

    @Prop({ type: String, required: true })
    city: string;
}

@Schema()
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    firstname: string;

    @Prop({ type: String, required: true })
    lastname: string;

    @Prop({ type: Number, required: false })
    age: number;

    @Prop({ type: String, enum: [Role.User, Role.Admin], required: true })
    role: "user" | "admin";

    @Prop({ type: Subscription, required: true })
    sub: Subscription;

    @Prop({ type: University, required: false })
    university: University;

    @Prop({ type: Location, required: false })
    location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
export const UniversitySchema = SchemaFactory.createForClass(University);
export const LocationSchema = SchemaFactory.createForClass(Location);
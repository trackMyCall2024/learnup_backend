import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
export declare enum Role {
    Admin = "admin",
    User = "user"
}
export declare class Subscription {
    name: "freemium" | "smart+" | "smart_premium";
    isActivate: boolean;
}
export declare class University {
    name: string;
    educationName: string;
    educationLevel: number;
}
export declare class Location {
    country: string;
    city: string;
}
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    role: "user" | "admin";
    sub: Subscription;
    university: University;
    location: Location;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const SubscriptionSchema: mongoose.Schema<Subscription, mongoose.Model<Subscription, any, any, any, mongoose.Document<unknown, any, Subscription> & Subscription & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Subscription, mongoose.Document<unknown, {}, mongoose.FlatRecord<Subscription>> & mongoose.FlatRecord<Subscription> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UniversitySchema: mongoose.Schema<University, mongoose.Model<University, any, any, any, mongoose.Document<unknown, any, University> & University & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, University, mongoose.Document<unknown, {}, mongoose.FlatRecord<University>> & mongoose.FlatRecord<University> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const LocationSchema: mongoose.Schema<Location, mongoose.Model<Location, any, any, any, mongoose.Document<unknown, any, Location> & Location & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Location, mongoose.Document<unknown, {}, mongoose.FlatRecord<Location>> & mongoose.FlatRecord<Location> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;

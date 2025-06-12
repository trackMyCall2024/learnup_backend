import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
export declare enum SubscriptionName {
    SALES_STARTER = "salesStarter",
    SALES_COACH = "salesCoach",
    SALES_MASTER = "salesMaster"
}
export interface Subscription {
    type: "yearly" | "monthly";
    name: SubscriptionName;
    expiration: number;
    active: boolean;
}
export declare enum Role {
    Admin = "admin",
    User = "user",
    Employee = "employee"
}
export declare class User {
    _id?: mongoose.Schema.Types.ObjectId;
    email: string;
    firstname: string;
    lastname: string;
    subscription?: Subscription;
    registrationDate: Date;
    role: Role;
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

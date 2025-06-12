import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Friend, FriendSchema } from "./friend.schema";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
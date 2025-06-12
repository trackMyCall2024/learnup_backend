import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Blocker, BlockerSchema } from "./blocker.schema";
import { BlockerService } from "./blocker.service";
import { BlockerController } from "./blocker.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Blocker.name, schema: BlockerSchema }])],
  controllers: [BlockerController],
  providers: [BlockerService],
})
export class BlockerModule {}

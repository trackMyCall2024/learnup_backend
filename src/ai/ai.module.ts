import { Module, forwardRef } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { FileModule } from '../file/file.module';

@Module({
    imports: [forwardRef(() => FileModule)],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})
export class AiModule {}

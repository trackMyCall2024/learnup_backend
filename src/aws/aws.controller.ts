import { Body, Controller, Get, Post } from '@nestjs/common';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
    constructor(private readonly awsService: AwsService) {}

    @Post('upload')
    async uploadFile(@Body() file: Express.Multer.File) {
        return this.awsService.uploadFile(file);
    }

    @Get('test')
    async getTest() {
        return this.awsService.getS3Client();
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    GetObjectCommand,
    GetObjectCommandOutput,
    PutObjectCommand,
    S3Client,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class AwsService implements OnModuleInit {
    private s3Client: S3Client;

    async onModuleInit() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    getS3Client(): S3Client {
        return this.s3Client;
    }

    async uploadFile(file: Express.Multer.File) {
        const uploadResult = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
            }),
        );

        return uploadResult;
    }

    async getFile(key: string): Promise<GetObjectCommandOutput> {
        const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });

        const getObjectResult = await this.s3Client.send(getObjectCommand);

        return getObjectResult;
    }

    async deleteFile(key: string) {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });

        const deleteObjectResult = await this.s3Client.send(deleteObjectCommand);

        return deleteObjectResult;
    }
}

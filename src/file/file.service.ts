import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    GetObjectCommand,
    GetObjectCommandOutput,
    PutObjectCommand,
    S3Client,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { FileDocument, File, FileSchema } from './file.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FileService implements OnModuleInit {
    private s3Client: S3Client;

    constructor(@InjectModel(File.name) private tempFileModel: Model<FileDocument>) {}

    async onModuleInit() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async createTempFileMetadata(file: FileDocument): Promise<FileDocument> {
        const createdFile = new this.tempFileModel(file);
        return createdFile.save();
    }

    async updateTempFileByFileId(
        fileId: string,
        file: Partial<FileDocument>,
    ): Promise<FileDocument> {
        return this.tempFileModel.findByIdAndUpdate({ _id: fileId }, file, { new: true });
    }

    async updateTempFileBySection(
        sectionId: string,
        file: Partial<FileDocument>,
    ): Promise<FileDocument> {
        return this.tempFileModel.findOneAndUpdate({ section: sectionId }, file, { new: true });
    }

    getS3Client(): S3Client {
        return this.s3Client;
    }

    async uploadFile(audioFile: Express.Multer.File, sectionId: string) {
        const uploadResult = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${sectionId}/${audioFile.originalname}`,
                Body: audioFile.buffer,
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

    async downloadFileAsBuffer(key: string): Promise<Buffer | null> {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
            });

            const response = await this.s3Client.send(command);

            if (!response.Body) {
                console.error('❌ No body in response');
                return null;
            }

            // Convert stream to buffer
            const chunks: Uint8Array[] = [];
            for await (const chunk of response.Body as any) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('❌ Error downloading from S3:', error);
            return null;
        }
    }

    async getAudioBufferFromPath(filePath: string): Promise<Buffer | null> {
        // Alias pour downloadFileAsBuffer
        return this.downloadFileAsBuffer(filePath);
    }

    async getPreviousFile(index: number, sectionId: string): Promise<FileDocument | null> {
        return this.tempFileModel.findOne({ index: index - 1, section: sectionId });
    }

    async getTempFileBySection(sectionId: string): Promise<FileDocument | null> {
        return this.tempFileModel.findOne({ section: sectionId });
    }

    async getTempFileByFileId(fileId: string): Promise<FileDocument | null> {
        return this.tempFileModel.findOne({ _id: fileId });
    }
}

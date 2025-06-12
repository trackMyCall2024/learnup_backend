import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument } from "./course.schema";

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>
    ) {}

    async createCourse(courseData: Partial<Course>): Promise<CourseDocument> {
        const newCourse = new this.courseModel(courseData);
        return newCourse.save();
    }

    async getCoursesPaginated(page = 1, limit = 20): Promise<{ courses: CourseDocument[]; hasMore: boolean }> {
        const skip = (page - 1) * limit;
        const courses = await this.courseModel.find().skip(skip).limit(limit).exec();
        const countNext = await this.courseModel.countDocuments().exec();
        const hasMore = skip + courses.length < countNext;
        
        return { courses, hasMore };
    }

    async updateCourse(id: string, updateData: Partial<Course>): Promise<CourseDocument> {
        const updated = await this.courseModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            throw new NotFoundException("Course not found");
        }

        return updated;
    }

    async deleteCourse(id: string): Promise<boolean> {
        const result = await this.courseModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
}

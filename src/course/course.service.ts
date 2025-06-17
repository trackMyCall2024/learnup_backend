import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument } from "./course.schema";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>
  ) {}

  async createCourse(courseData: Partial<Course>): Promise<CourseDocument> {
    const newCourse = new this.courseModel(courseData);
    return newCourse.save();
  }

  async getCoursesPaginated(
    userId: string,
    courseName?: string,
    page = 1,
    limit = 20
  ): Promise<{ rows: CourseDocument[]; hasMore: boolean }> {
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = { user: userId };

    if (courseName) {
      filter.name = { $regex: courseName, $options: "i" };
    }

    const courses = await this.courseModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalMatching = await this.courseModel.countDocuments(filter).exec();
    const hasMore = skip + courses.length < totalMatching;

    return { rows: courses, hasMore };
  }

  async updateCourse(
    id: string,
    updateData: Partial<Course>
  ): Promise<CourseDocument> {
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

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Settings, SettingsDocument } from "./settings.schema";

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(Settings.name) private readonly settingsModel: Model<SettingsDocument>,
    ) {}

    async createSettings(data: Partial<Settings>): Promise<SettingsDocument> {
        const newSettings = new this.settingsModel(data);
        return newSettings.save();
    }

    async getSettings(userId: string): Promise<SettingsDocument> {
        const settings = await this.settingsModel.findOne({ user: userId }).exec();

        if (!settings) {
            throw new NotFoundException("Settings not found")
        };
        
        return settings;
    }

    async updateSettings(userId: string, update: Partial<Settings>): Promise<SettingsDocument> {
        const updated = await this.settingsModel.findOneAndUpdate(
            { user: userId },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException("Settings not found")
        };

        return updated;
    }

    async deleteSettings(userId: string): Promise<boolean> {
        const result = await this.settingsModel.deleteOne({ user: userId }).exec();
        return result.deletedCount > 0;
    }
}
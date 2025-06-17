"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async createUser(userData) {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async updateUserByEmail(email, updateData) {
        const updatedUser = await this.userModel.findOneAndUpdate({ email }, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with email ${email} not found.`);
        }
        return updatedUser;
    }
    async deleteUserByEmail(email) {
        const result = await this.userModel.deleteOne({ email }).exec();
        return result.deletedCount > 0;
    }
    async doesUserAlreadyExist(email) {
        const userId = await this.userModel.exists({ email });
        return !!userId;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
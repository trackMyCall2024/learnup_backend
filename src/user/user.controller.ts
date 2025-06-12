import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get("status")
    getStatus() {
        return "user";
    }
}

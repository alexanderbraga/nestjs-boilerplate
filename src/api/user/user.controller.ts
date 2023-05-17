import { ClassSerializerInterceptor, Controller, Request, UseGuards, UseInterceptors, Put, Body, Inject } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Request() req: FastifyRequest): Promise<User> {
    return this.service.updateName(body, req);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeedService } from './role-seed.service';
import { UserRole } from 'src/modules/users/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule {}

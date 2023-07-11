import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/modules/users/entities/user-role.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/modules/users/enums/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(UserRole)
    private repository: Repository<UserRole>,
  ) { }

  async run() {
    const countUser = await this.repository.count({
      where: {
        id: UserRoleEnum.user,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: UserRoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: UserRoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: UserRoleEnum.admin,
          name: 'Admin',
        }),
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/modules/user/entities/user-status.entity';
import { UserStatusEnum } from 'src/modules/user/enums/status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(UserStatus)
    private repository: Repository<UserStatus>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: UserStatusEnum.active,
          name: 'Active',
        }),
        this.repository.create({
          id: UserStatusEnum.inactive,
          name: 'Inactive',
        }),
      ]);
    }
  }
}

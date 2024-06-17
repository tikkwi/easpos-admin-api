import { GrpcHandler } from '@common/decorator';
import { FindByIdDto } from '@common/dto';
import { GetUserDto } from './user.dto';
import { UserService } from './user.service';

@GrpcHandler()
export class UserController {
  constructor(private readonly service: UserService) {}

  async getUser(dto: GetUserDto) {
    return this.service.getUser(dto);
  }

  async userWithAuth(dto: FindByIdDto) {
    return this.service.userWithAuth(dto);
  }
}

import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { GetUserDto, UserWihAuthDto } from '@common/dto/user.dto';
import { UserService } from './user.service';

@GrpcHandler()
export class UserGrpcController {
  protected readonly service: UserService;

  async getUser(dto: GetUserDto) {
    return this.service.getUser(dto);
  }

  async userWithAuth(dto: UserWihAuthDto) {
    return this.service.userWithAuth(dto);
  }
}

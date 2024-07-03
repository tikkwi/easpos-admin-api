import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { CreateUserDto, GetUserDto } from '@common/dto/user.dto';
import { UserService } from './user.service';

@GrpcHandler()
export class UserGrpcController {
  protected readonly service: UserService;

  async getUser(dto: GetUserDto) {
    return this.service.getUser(dto);
  }

  async createUser(dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}

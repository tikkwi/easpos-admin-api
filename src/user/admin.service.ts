import AppService from '@common/decorator/app_service.decorator';
import BaseService from '@common/core/base/base.service';

@AppService()
export default class AdminService extends BaseService {}

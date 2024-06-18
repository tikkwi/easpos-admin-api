import { Module } from '@nestjs/common';
import { AppController } from './admin_app.controller';
import { AppService } from './admin_app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

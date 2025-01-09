import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [UsersModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

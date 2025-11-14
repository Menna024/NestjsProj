import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.env',
    }),
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-sun', {
      onConnectionCreate: (connection) => {
        connection.on('connected', () => console.log('Connected to MongoDB'));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

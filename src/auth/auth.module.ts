import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    StudentsModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key', // use a secure secret in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}

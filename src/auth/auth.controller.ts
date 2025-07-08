import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly studentService: StudentsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: { studentId: string; password: string }) {
    const student = await this.studentService.findOne(body.studentId);

    if (!student || student.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: student.id,
      studentId: student.studentId,
      role: 'student',
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      student,
    };
  }
}

import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string, password: string }) {
    // const token = await this.authService.login(credentials.username, credentials.password);
    // return { token };
  }

  @Post('register')
  async register(@Body() credentials: { username: string, password: string }) {
    // const token = await this.authService.register(credentials.username, credentials.password);
    // return { token };
  }
}

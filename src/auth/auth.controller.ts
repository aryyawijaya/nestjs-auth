import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign_in.dto';
import { Roles } from './roles/roles.decorator';
import { Role } from '@prisma/client';
import { SignUpDto } from './dto/sign_up.dto';
import { AuthenticatedRequest } from './interfaces/authenticated_requires';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Req() req: AuthenticatedRequest) {
    return this.authService.signUp(signUpDto, req.user);
  }
}

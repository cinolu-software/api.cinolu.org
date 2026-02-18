import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthPasswordService } from './services/auth-password.service';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './decorators/public.decorator';
import { ContactSupportDto } from './dto/contact-support.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authPasswordService: AuthPasswordService
  ) {}

  @Post('support/contact')
  @Public()
  async contactSupport(@Body() dto: ContactSupportDto): Promise<void> {
    await this.authService.contactUs(dto);
  }

  @Post('signup')
  @Public()
  signUp(@Body() dto: SignUpDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request): Promise<User> {
    return this.authService.signIn(req);
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleAuth(): void {}

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(res);
  }

  @Post('signout')
  signOut(@Req() req: Request) {
    return this.authService.signOut(req);
  }

  @Get('me')
  findMe(@CurrentUser() user: User): Promise<User> {
    return this.authService.profile(user);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: User, @Body() dto: UpdateProfileDto): Promise<User> {
    return this.authService.updateProfile(user, dto);
  }

  @Patch('me/password')
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<User> {
    return this.authPasswordService.updatePassword(user, dto);
  }

  @Post('password/forgot')
  @Public()
  forgotPassword(@Body() dto: ForgotPasswordDto): Promise<void> {
    return this.authPasswordService.forgotPassword(dto);
  }

  @Post('password/reset')
  @Public()
  resetPassword(@Body() dto: ResetPasswordDto): Promise<User> {
    return this.authPasswordService.resetPassword(dto);
  }
}

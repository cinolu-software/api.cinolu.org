import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { SignupDto } from './dto/sign-up.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Rights } from '../../shared/decorators/rights.decorators';
import { RightsEnum } from '../../shared/enums/rights.enum';
import CreateUserDto from '../users/users/dto/create-user.dto';
import { User } from '../users/users/entities/user.entity';

@Controller('auth')
@Rights(RightsEnum.User)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Rights(RightsEnum.Guest)
  @UseGuards(LocalAuthGuard)
  singIn(@Req() req: Request): Promise<{ data: Express.User }> {
    return this.authService.signIn(req);
  }

  @Get('sign-in')
  @Rights(RightsEnum.Guest)
  @UseGuards(GoogleAuthGuard)
  signInWithGoogle(): void {}

  @Get('google/redirect')
  @Rights(RightsEnum.Guest)
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Res() res: Response): Promise<void> {
    return this.authService.signInWithGoogle(res);
  }

  @Post('sign-up')
  @Rights(RightsEnum.Guest)
  signUp(@Body() dto: SignupDto): Promise<{ data: User }> {
    return this.authService.signUp(dto);
  }

  @Post('add-user')
  @Rights(RightsEnum.Staff)
  addUser(@Body() dto: CreateUserDto): Promise<{ data: User }> {
    return this.authService.addUser(dto);
  }

  @Post('sign-out')
  signOut(@Req() req: Request) {
    return this.authService.signOut(req);
  }

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<{ data: User }> {
    return this.authService.profile(user);
  }

  @Patch('profile')
  @Rights(RightsEnum.User)
  updateProfile(@CurrentUser() currentUser: User, @Body() data: UpdateProfileDto): Promise<{ data: User }> {
    return this.authService.updateProfile(currentUser, data);
  }

  @Patch('update-password')
  @Rights(RightsEnum.User)
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<{ data: User }> {
    return this.authService.updatePassword(user, dto);
  }

  @Post('forgot-password')
  @Rights(RightsEnum.Guest)
  forgotPassword(@Body() dto: forgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-email/resend-token')
  @Rights(RightsEnum.Guest)
  resendSignupToken(@Body() dto: { email: string }): Promise<void> {
    return this.authService.resendToken(dto.email);
  }

  @Post('verify-email')
  @Rights(RightsEnum.Guest)
  verifyUserEmail(@Body() dto: { token: string }): Promise<{ data: User }> {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('reset-password')
  @Rights(RightsEnum.Guest)
  resetPassword(@Body() dto: ResetPasswordDto): Promise<{ data: User }> {
    return this.authService.resetPassword(dto);
  }
}

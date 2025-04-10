import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { RoleEnum } from 'src/shared/enums/roles.enum';
import { Auth } from 'src/shared/decorators/auth.decorators';

@Controller('members')
@Auth(RoleEnum.Staff)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() dto: CreateMemberDto): Promise<Member> {
    return this.membersService.create(dto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get('category/:category')
  @Auth(RoleEnum.Guest)
  findByCategory(@Param('category') category: string): Promise<Member[]> {
    return this.membersService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Member> {
    return this.membersService.findOne(id);
  }

  @Post('add-logo/:id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/members',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Member> {
    return this.membersService.addLogo(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto): Promise<Member> {
    return this.membersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.membersService.remove(id);
  }
}

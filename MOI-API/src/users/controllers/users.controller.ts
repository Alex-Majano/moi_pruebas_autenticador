import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { paginationUsersDTO } from '@users/dtos/users-pagination.dto';
import { createUserDTO, updateUserDTO } from '@users/dtos/users.dto';
import { createPermissionsDTO } from '@users/dtos/user-permissions.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all users' })
  @Get()
  async findAll(@Param() paramsUsers: paginationUsersDTO) {
    return await this.usersService.findAll(paramsUsers);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a user' })
  @Post()
  async create(@Body() data: createUserDTO) {
    return await this.usersService.create(data);
  }

  @Get('/permisos-modulos/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Este endpoint lista los permisos de un usuario.',
  })
  permisosById(@Param('id') id: string) {
    return this.usersService.findPermissionsById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List a user' })
  @Put('/:id')
  async update(@Param() id: string, @Body() data: updateUserDTO) {
    return await this.usersService.update(id, data);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List a user' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Post('/permisos-modulos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Este endpoint actualiza los permisos de un tipo de usuario.',
  })
  permisos(@Body() payload: createPermissionsDTO) {
    return this.usersService.permisos(payload.id, payload.array);
  }
}

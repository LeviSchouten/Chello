import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  GetUsers(
    @Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto,
  ): Promise<User[]> {
    return this.userService.getUsers(getUsersFilterDto);
  }

  @Delete('/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}

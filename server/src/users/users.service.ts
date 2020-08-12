import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID: "${id}" not found`);
    }

    return user;
  }

  async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(getUsersFilterDto);
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.delete(id);

    if (user.affected !== 1) {
      throw new NotFoundException(`User with ID: "${id}" not found`);
    }
  }
}

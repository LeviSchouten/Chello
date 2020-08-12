import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = new User();
    user.name = name;
    user.password = password;
    await user.save();

    return user;
  }

  async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    const { name } = getUsersFilterDto;
    const query = this.createQueryBuilder('user');

    if (name) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    const users = await query.getMany();

    return users;
  }
}

import { IsOptional } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  name: string;
}

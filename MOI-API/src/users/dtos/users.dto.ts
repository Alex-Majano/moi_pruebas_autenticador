import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class createUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly idRol: string;
}

export class updateUserDTO extends OmitType(PartialType(createUserDTO), [
  'password',
]) {}

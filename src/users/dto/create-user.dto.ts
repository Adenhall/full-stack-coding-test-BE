export class CreateUserDto {
  id: string;
  email: string;
  name: string;
  role?: string;
  dateOfBirth: Date;
}

import { Email } from '../value-objects/email.value-object';

export class UserEntity {
  id: number;
  username: string;
  email: Email;
  password: string;
}

import { Email } from '../../domain/value-objects/email.value-object';

export class UpdateUserCommand {
  id: number;
  username: string;
  email: Email;
  password: string;
}

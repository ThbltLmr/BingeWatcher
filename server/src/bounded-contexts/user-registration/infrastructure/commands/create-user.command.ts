import { Email } from '../../domain/value-objects/email.value-object';

export class CreateUserCommand {
  username: string;
  email: Email;
  password: string;
}

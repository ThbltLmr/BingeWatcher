import { Email } from '../../domain/value-objects/email.value-object';

export class UpdateUserCommand {
  username: string;
  email: Email;
  password: string;
}

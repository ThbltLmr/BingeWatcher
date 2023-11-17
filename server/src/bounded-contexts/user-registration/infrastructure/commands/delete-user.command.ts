import { Email } from '../../domain/value-objects/email.value-object';

export class DeleteUserCommand {
  username: string;
  email: Email;
  password: string;
}

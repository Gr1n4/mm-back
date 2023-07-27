import { UserEntity } from 'src/user';
import { SessionEntity } from 'src/session';
import { SessionDocument } from 'src/session/session.schema';

interface AuthFields {
  session: SessionDocument;
}

export class AuthEntity {
  session: SessionEntity;
  user: UserEntity;

  constructor({ session }: AuthFields) {
    this.session = new SessionEntity(session);
    this.user = this.session.user;
  }
}

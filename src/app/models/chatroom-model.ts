import { User } from './user-model';

export interface Chatroom {
  id: string;
  name: string;
  createAt: Date;
  users: User[];
  moderator: User[];
}

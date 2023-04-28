import { Document, Model, PopulatedDoc, Types } from 'mongoose';
import { IUser } from './user.type';
import { IMessage } from './message.type';

export interface IChat {
  id: string;
  name: string;
  users: PopulatedDoc<IUser>[] | Types.ObjectId[];
  lastMessage?: Types.ObjectId | PopulatedDoc<IMessage>;
  isGroup: boolean;
  groupAdmin?: Types.ObjectId | PopulatedDoc<IUser>;
  createNotification(userId: string): void;
}

export type ChatDoc = IChat & Document;

export type ChatModel = Model<IChat, {}, any>;

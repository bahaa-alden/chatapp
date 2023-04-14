import { Document, Model, Schema } from 'mongoose';

export interface IChat {
  name: string;
  users: Schema.Types.ObjectId[];
  lastMessage?: Schema.Types.ObjectId | string;
  isGroup: boolean;
  groupAdmin?: Schema.Types.ObjectId | string;
}

export type ChatDoc = IChat & Document;

export type ChatModel = Model<IChat, {}, any>;
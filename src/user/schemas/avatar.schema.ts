import * as mongoose from 'mongoose';

export const UserAvatarSchema = new mongoose.Schema({
  id: String,
  hash: String,
  filename: String
});

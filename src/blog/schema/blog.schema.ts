import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ default: [] })
  comments: Comment[];
}

@Schema()
export class Comment {
  @Prop({ required: true })
  commenter: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  commentedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
export const CommentSchema = SchemaFactory.createForClass(Comment);

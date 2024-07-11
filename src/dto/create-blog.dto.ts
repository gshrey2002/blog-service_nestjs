import { Comment } from 'src/blog/schema/blog.schema';

export class createBlogDto {
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly comments: Comment[];
}

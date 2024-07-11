import { Comment } from 'src/blog/schema/blog.schema';

export class UpdateBlogDto {
  readonly title?: string;
  readonly content?: string;
  readonly author?: string;
  readonly roleId?: string;
}

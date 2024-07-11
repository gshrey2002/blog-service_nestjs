import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './schema/blog.schema';
import { createBlogDto } from 'src/dto/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/feeds')
  @UseGuards(AuthGuard('jwt'))
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getBlogById(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.findById(id);
  }

  @Post('/createfeed')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Body()
    Blog: createBlogDto,
  ): Promise<Blog> {
    return this.blogService.createPost(Blog);
  }

  @Put('/updatefeed/:id')
  @UseGuards(AuthGuard('jwt'))
  async updatePost(
    @Param('id')
    id: string,

    @Body()
    blog: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.updatePost(id, blog);
  }

  @Delete('deletepost/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.deleteById(id);
  }
}

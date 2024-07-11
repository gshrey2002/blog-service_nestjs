import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './schema/blog.schema';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { createBlogDto } from 'src/dto/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    const blog = await this.blogModel.find();
    return blog;
  }

  async createPost(
    @Body()
    Blog: createBlogDto,
  ): Promise<Blog> {
    const res = await this.blogModel.create(Blog);
    return res;
  }

  async findById(id: string): Promise<Blog> {
    const res = await this.blogModel.findById(id);
    if (!res) {
      throw new NotFoundException('No Blog Found');
    }
    return res;
  }

  async updatePost(id: string, blog: UpdateBlogDto): Promise<Blog> {
    return await this.blogModel.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }
}

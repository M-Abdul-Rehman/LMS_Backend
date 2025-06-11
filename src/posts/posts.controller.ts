// src/posts/posts.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Post()
  async create(
    @Body() postData: { title: string; content: string },
  ): Promise<PostEntity> {
    return this.postService.createPost(postData.title, postData.content);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateData: { title: string; content: string },
  ): Promise<PostEntity> {
    return this.postService.updatePost(
      id,
      updateData.title,
      updateData.content,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }
}

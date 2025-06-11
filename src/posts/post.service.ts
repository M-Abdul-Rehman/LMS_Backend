// src/posts/post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async createPost(title: string, content: string): Promise<Post> {
    const post = this.postRepository.create({ title, content });
    return this.postRepository.save(post);
  }

  async updatePost(id: number, title: string, content: string): Promise<Post> {
    await this.postRepository.update(id, { title, content });
    const updatedPost = await this.postRepository.findOneBy({ id });
    if (!updatedPost) {
      throw new Error(`Post with id ${id} not found`);
    }
    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}

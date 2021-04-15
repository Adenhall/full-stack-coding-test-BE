import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blogs } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs)
    private blogsRepository: Repository<Blogs>,
    private firebaseFirestore: FirebaseFirestoreService,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const doc = await this.firebaseFirestore
      .collection('blogs')
      .add(createBlogDto);

    return this.blogsRepository.save({
      id: doc.id,
      ...createBlogDto,
    });
  }

  findAll() {
    return this.blogsRepository.find();
  }

  findOne(id: string) {
    return this.blogsRepository.findOne(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.firebaseFirestore
      .collection('blogs')
      .doc(id)
      .update(updateBlogDto);

    return this.blogsRepository.save({
      id,
      ...updateBlogDto,
    });
  }

  async remove(id: string) {
    await this.firebaseFirestore.collection('blogs').doc(id).delete();
    return this.blogsRepository.delete({ id });
  }
}

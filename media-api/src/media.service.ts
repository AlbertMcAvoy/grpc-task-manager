import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Media } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Media[]> {
    return this.prisma.media.findMany({});
  }

  async find(
    mediaWhereUniqueInput: Prisma.MediaWhereUniqueInput,
  ): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: mediaWhereUniqueInput,
    });
  }

  async createMedia(data: Prisma.MediaCreateInput): Promise<Media> {
    return this.prisma.media.create({
      data
    });
  }

  async updateMedia(params: {
    where: Prisma.MediaWhereUniqueInput
    data: Prisma.MediaUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.media.update({
      data,
      where,
    });
  }

  async deleteMedia(where: Prisma.MediaWhereUniqueInput): Promise<Media> {
    return this.prisma.media.delete({
      where,
    });
  }
}

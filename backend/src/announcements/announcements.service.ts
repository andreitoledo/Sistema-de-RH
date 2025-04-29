import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

const prisma = new PrismaClient();

@Injectable()
export class AnnouncementsService {
  async create(data: CreateAnnouncementDto) {
    return prisma.announcement.create({ data });
  }

  async findAll() {
    return prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return prisma.announcement.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAnnouncementDto) {
    return prisma.announcement.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.announcement.delete({
      where: { id },
    });
  }
}

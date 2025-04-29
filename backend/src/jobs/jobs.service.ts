import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

const prisma = new PrismaClient();

@Injectable()
export class JobsService {
  async create(data: CreateJobDto) {
    return prisma.job.create({
      data,
    });
  }

  async findAll() {
    return prisma.job.findMany();
  }

  async findOne(id: number) {
    return prisma.job.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateJobDto) {
    return prisma.job.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.job.delete({
      where: { id },
    });
  }
}

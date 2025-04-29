import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

const prisma = new PrismaClient();

@Injectable()
export class ApplicationsService {
  async create(data: CreateApplicationDto) {
    return prisma.application.create({
      data,
    });
  }

  async findAll() {
    return prisma.application.findMany({
      include: { job: true }, // trazer dados da vaga na listagem de candidaturas
    });
  }

  async findOne(id: number) {
    return prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });
  }

  async update(id: number, data: UpdateApplicationDto) {
    return prisma.application.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.application.delete({
      where: { id },
    });
  }
}

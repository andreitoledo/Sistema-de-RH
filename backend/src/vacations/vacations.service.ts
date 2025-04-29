import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

const prisma = new PrismaClient();

@Injectable()
export class VacationsService {
  async create(data: CreateVacationDto) {
    return prisma.vacation.create({
      data,
    });
  }

  async findAll() {
    return prisma.vacation.findMany({
      include: { employee: true }, // trazer dados do funcionário junto
    });
  }

  async findOne(id: number) {
    return prisma.vacation.findUnique({
      where: { id },
      include: { employee: true },
    });
  }

  async update(id: number, data: UpdateVacationDto) {
    return prisma.vacation.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.vacation.delete({
      where: { id },
    });
  }
}

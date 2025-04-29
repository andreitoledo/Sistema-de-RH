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
      include: { employee: true }, // importante trazer o nome do funcionário
    });
  }

  async update(id: number, data: UpdateVacationDto) {
    const cleanData = { ...data } as any;
  
    // Apaga manualmente os campos indesejados
    delete cleanData.id;
    delete cleanData.createdAt;
    delete cleanData.employee;
  
    return prisma.vacation.update({
      where: { id },
      data: cleanData,
    });
  }
  
  

  async remove(id: number) {
    return prisma.vacation.delete({
      where: { id },
    });
  }
}

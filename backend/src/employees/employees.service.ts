import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const prisma = new PrismaClient();

@Injectable()
export class EmployeesService {
  async create(data: CreateEmployeeDto) {
    return prisma.employee.create({
      data,
    });
  }

  async findAll() {
    return prisma.employee.findMany();
  }

  async findOne(id: number) {
    return prisma.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    return prisma.employee.update({
      where: { id },
      data: dto,
    });
  }
  
  async remove(id: number) {
    return prisma.employee.delete({
      where: { id },
    });
  }
}

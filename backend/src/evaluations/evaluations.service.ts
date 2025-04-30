import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

const prisma = new PrismaClient();

@Injectable()
export class EvaluationsService {
  async create(data: CreateEvaluationDto) {
    return prisma.evaluation.create({
      data,
    });
  }

  async findAll() {
    return prisma.evaluation.findMany({
      include: { employee: true },
    });
  }

  async findOne(id: number) {
    return prisma.evaluation.findUnique({
      where: { id },
      include: { employee: true },
    });
  }

  async update(id: number, data: UpdateEvaluationDto) {
    // Remover campos que não devem ser enviados ao Prisma
    const { id: _, employee, ...cleanData } = data as any;
    console.log('Atualizando avaliação:', cleanData);
    return prisma.evaluation.update({
      where: { id },
      data: cleanData,
    });
  }
  

  async remove(id: number) {
    return prisma.evaluation.delete({
      where: { id },
    });
  }
}

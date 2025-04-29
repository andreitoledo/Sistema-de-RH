import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { startOfMonth, endOfMonth } from 'date-fns';

const prisma = new PrismaClient();

@Injectable()
export class ReportsService {
  async getBirthdays() {
    const currentMonth = new Date().getMonth() + 1;
  
    return prisma.$queryRawUnsafe(`
      SELECT * FROM "Employee"
      WHERE EXTRACT(MONTH FROM "birthday") = ${currentMonth}
    `);
  }
  

  async getUpcomingVacations() {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    return prisma.vacation.findMany({
      where: {
        startDate: {
          gte: today,
          lte: next30Days,
        },
        status: 'approved',
      },
      include: {
        employee: true,
      },
    });
  }

  async getPerformanceEvaluations() {
    return prisma.evaluation.findMany({
      include: {
        employee: true,
      },
      orderBy: {
        evaluationDate: 'desc',
      },
    });
  }

  async getJobsSummary() {
    const [open, closed] = await Promise.all([
      prisma.job.count({ where: { status: 'open' } }),
      prisma.job.count({ where: { status: 'closed' } }),
    ]);

    return {
      total: open + closed,
      abertas: open,
      fechadas: closed,
    };
  }
}

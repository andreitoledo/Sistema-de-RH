import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ReportsService {
  async getBirthdays() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    return prisma.$queryRawUnsafe(`
      SELECT * FROM "Employee"
      WHERE EXTRACT(MONTH FROM "birthday") = ${currentMonth}
    `);
  }

  async getUpcomingVacations() {
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + 30);

    return prisma.vacation.findMany({
      where: {
        startDate: {
          gte: today,
          lte: limit,
        },
      },
      include: { employee: true },
    });
  }

  async getJobsSummary() {
    const [openCount, closedCount] = await Promise.all([
      prisma.job.count({ where: { status: 'open' } }),
      prisma.job.count({ where: { status: 'closed' } }),
    ]);
  
    return {
      open: openCount,
      closed: closedCount,
    };
  }
  
  

  async getPerformanceEvaluations() {
    const averages = await prisma.evaluation.groupBy({
      by: ['employeeId'],
      _avg: { score: true },
    });

    const latest = await prisma.evaluation.findMany({
      orderBy: { evaluationDate: 'desc' },
      distinct: ['employeeId'],
      include: { employee: true },
    });

    const employeeMap = latest.reduce((acc, e) => {
      acc[e.employeeId] = {
        lastComment: e.comments,
        employee: e.employee,
      };
      return acc;
    }, {} as Record<number, { lastComment: string; employee: any }>);

    return averages.map((item) => ({
      employeeId: item.employeeId,
      avgScore: item._avg.score,
      lastComment: employeeMap[item.employeeId]?.lastComment || '-',
      employee: employeeMap[item.employeeId]?.employee || null,
    }));
  }
}

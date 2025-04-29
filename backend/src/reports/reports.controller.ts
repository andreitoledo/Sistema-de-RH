import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Relatórios RH')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('birthdays')
  getBirthdays() {
    return this.reportsService.getBirthdays();
  }

  @Get('upcoming-vacations')
  getUpcomingVacations() {
    return this.reportsService.getUpcomingVacations();
  }

  @Get('performance')
  getPerformanceEvaluations() {
    return this.reportsService.getPerformanceEvaluations();
  }

  @Get('jobs-summary')
  getJobsSummary() {
    return this.reportsService.getJobsSummary();
  }
}

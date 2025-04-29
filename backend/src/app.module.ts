import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // <-- importa o AuthModule!
import { EmployeesModule } from './employees/employees.module';
import { VacationsModule } from './vacations/vacations.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [AuthModule, EmployeesModule, VacationsModule, EvaluationsModule, JobsModule, ApplicationsModule], // <-- adiciona aqui
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Controle de Férias')
@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @Post()
  create(@Body() createVacationDto: CreateVacationDto) {
    return this.vacationsService.create(createVacationDto);
  }

  @Get()
  findAll() {
    return this.vacationsService.findAll();
  }

  @Patch(':id') // <= Aqui: PATCH no lugar de PUT para aderir a REST correto
  update(@Param('id') id: string, @Body() updateVacationDto: UpdateVacationDto) {
    return this.vacationsService.update(+id, updateVacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacationsService.remove(+id);
  }
}

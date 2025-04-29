import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vacations')
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vacationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVacationDto: UpdateVacationDto) {
    return this.vacationsService.update(id, updateVacationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vacationsService.remove(id);
  }
}

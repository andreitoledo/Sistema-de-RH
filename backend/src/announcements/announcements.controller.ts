import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comunicados Internos')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.remove(id);
  }
}

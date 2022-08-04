import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({ status: 200, type: String })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiResponse({ status: 200, type: String })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiResponse({ status: 200, type: String })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id);
  }

  @ApiResponse({ status: 200, type: String })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto, UpdateTodoDto } from './todo.model';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async fetchAllTodos(): Promise<Todo[]> {
    return this.todoService.fetchAllTodos();
  }

  @Get('/:id')
  async fetchTodoById(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.fetchTodoById(Number(id));
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Post()
  async createTodo(
    @Body(new ValidationPipe()) todo: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body(new ValidationPipe()) todo: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(Number(id), todo);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTodo(Number(id));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto, UpdateTodoDto } from './todo.model';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  fetchAllTodos(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  fetchTodoById(id: number): Promise<Todo | null> {
    if (!id) {
      throw new NotFoundException('Not found todo');
    }
    return this.prismaService.todo.findUnique({ where: { id } });
  }

  createTodo(createTodoData: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({ data: createTodoData });
  }

  async updateTodo(id: number, updateTodoData: UpdateTodoDto): Promise<Todo> {
    const todo = await this.fetchTodoById(id);
    return this.prismaService.todo.update({
      where: { id },
      data: {
        ...todo,
        ...updateTodoData,
      },
    });
  }

  deleteTodo(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({ where: { id } });
  }
}

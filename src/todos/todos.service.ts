import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  // constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);

    const todo = await new this.todoModel(createTodoDto);
    return todo.save();
  }

  async findAll() {
    return await this.todoModel.find().exec();
  }

  async findOne(id: string) {
    return await this.todoModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel.findByIdAndUpdate(
      { _id: id },
      updateTodoDto,
      {
        upsert: true,
      },
    );
    console.log(id, updateTodoDto, todo);

    if (!todo) throw new NotFoundException();

    return todo;
  }

  async remove(id: string) {
    const todo = await this.todoModel.findByIdAndRemove({ _id: id });
    if (!todo) throw new NotFoundException();
    return todo;
  }
}

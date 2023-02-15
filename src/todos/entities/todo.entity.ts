// // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { type } from 'os';
// export type TodoDocument = Todo & Document;
// @Schema({ toJSON: { virtuals: true, getters: true } })
// export class Todo {
//   @Prop({ required: true })
//   title: string;

//   @Prop({ required: true })
//   description: string;

//   @Prop({ required: true })
//   isCompleted: boolean;
// }

// const TodoSchema = SchemaFactory.createForClass(Todo);
// TodoSchema.virtual('id').get(function (this: TodoDocument) {
//   return this._id.toString();
// });
// export { TodoSchema };
import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: 'string', default: 'lol' },
  completed: { type: 'boolean', default: false },
});
export interface Todo extends Document {
  readonly name: string;
  readonly completed: boolean;
}

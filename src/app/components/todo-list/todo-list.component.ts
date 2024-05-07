import { Component, Input, OnInit } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { TodoItem } from '../../models/todo-item';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertTodoModalComponent } from '../upsert-todo-modal/upsert-todo-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  
  todoList: TodoItem[] = [];
  currentPageTodoList: readonly TodoItem[] = []

  constructor(private todoService: TodoListService,
    private modal: NzModalService
  ){}

  ngOnInit(): void {
    this.todoService.getTodoListSubject().subscribe({
      next: (todoList: TodoItem[]) => {
        this.todoList = todoList;
        console.log(this.todoList)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onCurrentPageDataChange(currentPageTodoList: readonly TodoItem[]) {
    console.log(currentPageTodoList);
    this.currentPageTodoList = currentPageTodoList;
  }

  onItemChecked(id: number,isChecked: boolean) {
    this.todoService.setCompletedStatus(id, isChecked);
  }

  editTodo(todo: TodoItem) {
    this.modal.create({
      nzTitle: 'Edit Todo',
      nzContent: UpsertTodoModalComponent,
      nzData: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        isCompleted: todo.isCompleted
      },
      nzFooter: null
    })
  }

  deleteTodo(id: number){
    this.todoService.deleteTodo(id);
  }
}

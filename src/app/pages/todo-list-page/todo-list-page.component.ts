import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertTodoModalComponent } from '../../components/upsert-todo-modal/upsert-todo-modal.component';
import { TodoItem } from '../../models/todo-item';


@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.css'
})
export class TodoListPageComponent {
  
  constructor(private modalService: NzModalService,
    private todoService: TodoListService
  ){}

  addTodo() {
    const modal = this.modalService.create({
      nzTitle: 'Add Todo',
      nzContent: UpsertTodoModalComponent,
      nzFooter: null,
    });
  }

  clearMarkedTodo(){
    this.todoService.clearCompleted()
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { TodoItem } from '../../models/todo-item';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertTodoModalComponent } from '../upsert-todo-modal/upsert-todo-modal.component';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

interface ColumnItem{
  name: string;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<TodoItem> | null;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  listOfColumns: ColumnItem[] = [
    {
      name: 'Completed',
      listOfFilter: [
        {text: 'Active Todos', value: false},
        {text: 'Completed Todos', value: true}
      ],
      filterFn: (list: boolean[], item: TodoItem) => list.some(isCompleted => item.isCompleted === isCompleted)
    },
    {
      name: 'Id',
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Title',
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Action',
      listOfFilter: [],
      filterFn: null
    },
  ]

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

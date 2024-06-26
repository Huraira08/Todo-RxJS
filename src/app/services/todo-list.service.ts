import { Injectable, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private TODO_KEY = 'todo-list'
  private todoList: TodoItem[] = [
    {
      id: 1,
      title: 'Learn Angular',
      description: 'To learn all basic concepts of Angular',
      isCompleted: true
    },
    {
      id: 2,
      title: 'Learn RxJS',
      description: 'To learn all basic concepts of RxJS',
      isCompleted: true
    },
    {
      id: 3,
      title: 'have Green Tea',
      description: 'Make a Green tea and drink it',
      isCompleted: false
    }
  ]
  private todoListSubject = new BehaviorSubject<TodoItem[]>(this.todoList);
  private listCounter;

  constructor() {
    const todoList: TodoItem[] = JSON.parse(localStorage.getItem(this.TODO_KEY)!)
    if(todoList && todoList.length > 0) {
      this.todoList = todoList;
      this.todoListSubject.next(this.todoList);
    } else if(this.todoList.length > 0){
      localStorage.setItem(this.TODO_KEY, JSON.stringify(this.todoList));
    }
    
    this.listCounter = this.todoList.length + 1;
  }
  

  getTodoListSubject(){
    return this.todoListSubject;
  }
  
  updateLocalStorage(){
    localStorage.setItem(this.TODO_KEY, JSON.stringify(this.todoList))
  }

  emitNextEvent(){
    this.todoListSubject.next(this.todoList);
  }

  setCompletedStatus(id: number, isCompleted: boolean){
    const index = this.todoList.findIndex(item => item.id === id)
    this.todoList[index].isCompleted = isCompleted
    this.updateLocalStorage()
    this.emitNextEvent()
  }

  addTodo(item: TodoItem){
    item.id = this.listCounter++;
    this.todoList.push(item);
    this.updateLocalStorage()
    this.emitNextEvent()
  }
  
  updateTodo(id: number, item: TodoItem){
    const index = this.todoList.findIndex(item => item.id === id)
    this.todoList[index] = item;
    this.todoList[index].id = id
    this.updateLocalStorage()
    this.emitNextEvent()
  }

  deleteTodo(id: number){
    const index = this.todoList.findIndex(item => item.id === id)
    this.todoList.splice(index, 1);
    this.updateLocalStorage()
    this.emitNextEvent()
  }

  clearCompleted(){
    this.todoList = this.todoList.filter(item =>!item.isCompleted)
    this.updateLocalStorage()
    this.emitNextEvent()
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../../services/todo-list.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

interface ITodoModalData {
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
}


@Component({
  selector: 'app-upsert-todo-modal',
  styleUrl: './upsert-todo-modal.component.css',
  template:`
    <form nz-form [formGroup]="todoForm" class="login-form" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input todo title!">
          <nz-input-group nzPrefixIcon="user">
            <input type="text" nz-input formControlName="title" placeholder="Title" />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input description!">
          <nz-input-group nzPrefixIcon="lock">
            <input type="text" nz-input formControlName="description" placeholder="Description" />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <label nz-checkbox formControlName="isCompleted">
            <span>Is Completed</span>
      </label>
      <div nz-flex nzJustify="end">
        <button nz-button [nzType]="'primary'">
        @if(!modalData?.id){
          <span nz-icon nzType="plus-circle" nzTheme="outline"></span>
          Add item
        }
        @else{
          <span nz-icon nzType="edit" nzTheme="outline"></span>
          Edit Item
        }
      </button>
      </div>
    </form>
  `
})
export class UpsertTodoModalComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(
    private modal: NzModalRef,
    private formbuilder: FormBuilder,
    private todoService: TodoListService,
    @Inject(NZ_MODAL_DATA) public modalData: ITodoModalData
  ){
    this.todoForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      isCompleted: [false]
    })
  }
  ngOnInit(): void {
    console.log(this.modalData)
    if(this.modalData?.id){
      this.todoForm.patchValue({
        title: this.modalData.title,
        description: this.modalData.description,
        isCompleted: this.modalData.isCompleted
      })
    }
  }

  submitForm() {
    console.log(this.modalData?.id)
    if(this.todoForm.valid){
      
      if(!this.modalData?.id){
        this.todoService.addTodo(this.todoForm.value)
      }else{
        this.todoService.updateTodo(this.modalData.id, this.todoForm.value)
      }
      this.modal.close()
    }
    else{
      Object.values(this.todoForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }
}

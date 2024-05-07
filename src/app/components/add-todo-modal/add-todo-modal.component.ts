import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ITodoModalData {
  title: string;
  description: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-add-todo-modal',
  // templateUrl: './add-todo-modal.component.html',
  styleUrl: './add-todo-modal.component.css',
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
        <button nz-button [nzType]="'primary'">Add item</button>
      </div>
    </form>
  `
})
export class AddTodoModalComponent {
  todoForm!: FormGroup;

  constructor(private formbuilder: FormBuilder){
    this.todoForm = formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      isCompleted: [false]
    })
  }

  submitForm() {
    if(this.todoForm.valid){
      console.log(this.todoForm.value);
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

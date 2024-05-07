import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpsertTodoModalComponent } from './components/upsert-todo-modal/upsert-todo-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list-rxjs';

  constructor(private modalService: NzModalService){}

  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

// Ng Zorro modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

// Custom components
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoModalComponent } from './components/add-todo-modal/add-todo-modal.component';
import { UpsertTodoModalComponent } from './components/upsert-todo-modal/upsert-todo-modal.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoListComponent,
    AddTodoModalComponent,
    UpsertTodoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzFlexModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzIconModule,
    NzDividerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

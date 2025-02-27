import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo, TodoCategory } from './todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule]
})


export class AddTodoComponent {

  addTodoForm = new FormGroup({
  owner: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ])),


  // body is required and must be between 5 and 200 characters
  // might be whats causing the error
  body: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ])),


  status: new FormControl(false, Validators.compose([
  Validators.required,
  ])),


  category: new FormControl<TodoCategory>('groceries', Validators.compose([
    Validators.required,
    Validators.pattern('^(software design|video games|homework|groceries)$'),
  ])),





  });

  readonly addTodoValidationMessages = {
  owner: [
    {type: 'required', message: 'Owner is required'},
    {type: 'minlength', message: 'Owner must be at least 2 characters long'},
    {type: 'maxLength', message: 'Owner cannot be more than 50 characters long'},
  ],
  category: [
    {type: 'required', message: 'Category is required'},
    {type: 'pattern', message: 'Category must be either software design, video games, homework, or groceries'},
  ]
  // body: [
  //   {type: 'required', message: 'Body is required'},
  //   {type: 'minlength', message: 'Body must be at least 5 characters long'},
  //   {type: 'maxLength', message: 'Body cannot be more than 200 characters long'},
  // ],
  // status: [
  //   {type: 'required', message: 'Status is required'},
  // ]
  };

  constructor(
  private todoService: TodoService,
  private snackBar: MatSnackBar,
  private router: Router) {
  }

  formControlHasError(controlName: string): boolean {
  return this.addTodoForm.get(controlName).invalid &&
    (this.addTodoForm.get(controlName).dirty || this.addTodoForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.addTodoValidationMessages): string {
  for(const {type, message} of this.addTodoValidationMessages[name]) {
    if (this.addTodoForm.get(name).hasError(type)) {
    return message;
    }
  }
  return 'Unknown error';
  }




  submitForm() {
    const newTodo: Partial<Todo> = {owner: this.addTodoForm.value.owner, body: this.addTodoForm.value.body, status: this.addTodoForm.value.status === true, category: this.addTodoForm.value.category};


  this.todoService.addTodo(newTodo).subscribe({
    next: (newId) => {
      this.snackBar.open(
        `Added todo ${this.addTodoForm.value.owner}`,
      null,
      { duration: 2000 }
    );
    this.router.navigate(['/todos/', newId]);
  },



    error: err => {
    if (err.status === 400) {
      this.snackBar.open(
      `Tried to add an illegal new todo – Error Code: ${err.status}\nMessage: ${err.message}`,
      'OK',
      { duration: 5000 }
      );

    } else if (err.status === 500) {
      this.snackBar.open(
      `The server failed to process your request to add a new todo. Is the server up? – Error Code: ${err.status}\nMessage: ${err.message}`,
      'OK',
      { duration: 5000 }
      );

    } else {
      this.snackBar.open(
      `An unexpected error occurred – Error Code: ${err.status}\nMessage: ${err.message}`,
      'OK',
      { duration: 5000 }
      );
    }
    },
  });
  }

}

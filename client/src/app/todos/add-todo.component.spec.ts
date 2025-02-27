// //import { Location } from '@angular/common';
// import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, /*fakeAsync, flush, tick,*/ waitForAsync } from '@angular/core/testing';
// import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router, RouterModule } from '@angular/router';
// //import { of, throwError } from 'rxjs';
// import { MockTodoService } from 'src/testing/todo.service.mock';
// import { AddTodoComponent } from './add-todo.component';
// import { TodoProfileComponent } from './todo-profile.component';
// import { TodoService } from './todo.service';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// describe('AddTodoComponent', () => {
//   let addTodoComponent: AddTodoComponent;
//   let addTodoForm: FormGroup;
//   let fixture: ComponentFixture<AddTodoComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.overrideProvider(TodoService, { useValue: new MockTodoService() });
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         MatSnackBarModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatSelectModule,
//         MatInputModule,
//         BrowserAnimationsModule,
//         RouterModule,
//         AddTodoComponent
//       ],
//     }).compileComponents().catch(error => {
//       expect(error).toBeNull();
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddTodoComponent);
//     addTodoComponent = fixture.componentInstance;
//     fixture.detectChanges();
//     addTodoForm = addTodoComponent.addTodoForm;
//     expect(addTodoForm).toBeDefined();
//     expect(addTodoForm.controls).toBeDefined();
//   });

//   it('should create the component and form', () => {
//     expect(addTodoComponent).toBeTruthy();
//     expect(addTodoForm).toBeTruthy();
//   });

//   it('form should be invalid when empty', () => {
//     expect(addTodoForm.valid).toBeFalsy();
//   });

//   describe('The owner field', () => {
//     let ownerControl: AbstractControl;

//     beforeEach(() => {
//       ownerControl = addTodoComponent.addTodoForm.controls.owner;
//     });

//     it('should not allow empty owners', () => {
//       ownerControl.setValue('');
//       expect(ownerControl.valid).toBeFalsy();
//     });

//     it('should be fine with "Chris Smith"', () => {
//       ownerControl.setValue('Chris Smith');
//       expect(ownerControl.valid).toBeTruthy();
//     });

//     it('should fail on single character owners', () => {
//       ownerControl.setValue('x');
//       expect(ownerControl.valid).toBeFalsy();
//       expect(ownerControl.hasError('minlength')).toBeTruthy();
//     });

//     it('should fail on really long owners', () => {
//       ownerControl.setValue('x'.repeat(100));
//       expect(ownerControl.valid).toBeFalsy();
//       expect(ownerControl.hasError('maxlength')).toBeTruthy();
//     });

//     it('should allow digits in the owner', () => {
//       ownerControl.setValue('Bad2Th3B0ne');
//       expect(ownerControl.valid).toBeTruthy();
//     });

//     // it('should fail if we provide an "existing" owner', () => {
//     //   ownerControl.setValue('abc123');
//     //   expect(ownerControl.valid).toBeFalsy();
//     //   expect(ownerControl.hasError('existingOwner')).toBeTruthy();

//     //   ownerControl.setValue('123abc');
//     //   expect(ownerControl.valid).toBeFalsy();
//     //   expect(ownerControl.hasError('existingOwner')).toBeTruthy();
//     // });
//   });

//   describe('The category field', () => {
//     let categoryControl: AbstractControl;

//     beforeEach(() => {
//       categoryControl = addTodoComponent.addTodoForm.controls.category;
//     });

//     it('should not allow empty categories', () => {
//       categoryControl.setValue('');
//       expect(categoryControl.valid).toBeFalsy();
//     });

//     // it('should be fine with "software design"', () => {
//     //   categoryControl.setValue('software design');
//     //   expect(categoryControl.valid).toBeTruthy();
//     // });

//     it('should fail on invalid categories', () => {
//       categoryControl.setValue('invalid category');
//       expect(categoryControl.valid).toBeFalsy();
//     });
//   });

//   describe('The body field', () => {
//     let bodyControl: AbstractControl;

//     beforeEach(() => {
//       bodyControl = addTodoComponent.addTodoForm.controls.body;
//     });

//     it('should not allow empty bodies', () => {
//       bodyControl.setValue('');
//       expect(bodyControl.valid).toBeFalsy();
//     });

//     it('should be fine with a valid body', () => {
//       bodyControl.setValue('This is a valid body.');
//       expect(bodyControl.valid).toBeTruthy();
//     });

//     // it('should fail on short bodies', () => {
//     //   bodyControl.setValue('short');
//     //   expect(bodyControl.valid).toBeFalsy();
//     //   expect(bodyControl.hasError('minlength')).toBeTruthy();
//     // });

//     it('should fail on long bodies', () => {
//       bodyControl.setValue('x'.repeat(201));
//       expect(bodyControl.valid).toBeFalsy();
//       expect(bodyControl.hasError('maxlength')).toBeTruthy();
//     });
//   });

//   describe('The status field', () => {
//     let statusControl: AbstractControl;

//     beforeEach(() => {
//       statusControl = addTodoComponent.addTodoForm.controls.status;
//     });

//     it('should not allow empty statuses', () => {
//       statusControl.setValue(null);
//       expect(statusControl.valid).toBeFalsy();
//     });

//     it('should be fine with true', () => {
//       statusControl.setValue(true);
//       expect(statusControl.valid).toBeTruthy();
//     });

//     it('should be fine with false', () => {
//       statusControl.setValue(false);
//       expect(statusControl.valid).toBeTruthy();
//     });
//   });

//   describe('getErrorMessage()', () => {
//     it('should return the correct error message', () => {
//       let controlName: keyof typeof addTodoComponent.addTodoValidationMessages = 'owner';
//       addTodoComponent.addTodoForm.get(controlName).setErrors({'required': true});
//       expect(addTodoComponent.getErrorMessage(controlName)).toEqual('Owner is required');

//       controlName = 'body';
//       addTodoComponent.addTodoForm.get(controlName).setErrors({'required': true});
//       expect(addTodoComponent.getErrorMessage(controlName)).toEqual('Body is required');

//       controlName = 'body';
//       addTodoComponent.addTodoForm.get(controlName).setErrors({'minlength': true});
//       expect(addTodoComponent.getErrorMessage(controlName)).toEqual('Body must be at least 5 characters long');
//     });

//     it('should return "Unknown error" if no error message is found', () => {
//       const controlName: keyof typeof addTodoComponent.addTodoValidationMessages = 'owner';
//       addTodoComponent.addTodoForm.get(controlName).setErrors({'unknown': true});
//       expect(addTodoComponent.getErrorMessage(controlName)).toEqual('Unknown error');
//     });
//   });
// });

// describe('AddTodoComponent#submitForm()', () => {
//   let component: AddTodoComponent;
//   let fixture: ComponentFixture<AddTodoComponent>;
//   //let todoService: TodoService;
//   //let location: Location;

//   beforeEach(() => {
//     TestBed.overrideProvider(TodoService, { useValue: new MockTodoService() });
//     TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         MatSnackBarModule,
//         MatCardModule,
//         MatSelectModule,
//         MatInputModule,
//         BrowserAnimationsModule,
//         RouterModule.forRoot([
//           { path: 'todos/1', component: TodoProfileComponent }
//         ]),
//         AddTodoComponent, TodoProfileComponent
//       ],
//       providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
//     }).compileComponents().catch(error => {
//       expect(error).toBeNull();
//     });
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddTodoComponent);
//     component = fixture.componentInstance;
//     //todoService = TestBed.inject(TodoService);
//     //location = TestBed.inject(Location);
//     TestBed.inject(Router);
//     TestBed.inject(HttpTestingController);
//     fixture.detectChanges();
//   });

//   beforeEach(() => {
//     component.addTodoForm.controls.owner.setValue('Chris Smith');
//     component.addTodoForm.controls.category.setValue('software design');
//     component.addTodoForm.controls.body.setValue('This is a valid body.');
//     component.addTodoForm.controls.status.setValue(true);
//   });
// });

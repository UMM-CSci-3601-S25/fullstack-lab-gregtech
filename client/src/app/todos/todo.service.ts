import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo, TodoCategory } from './todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todoUrl: string = `${environment.apiUrl}todos`;

  constructor(private httpClient: HttpClient) {
  }

  // implement getTodos
  getTodos(filters: { limit?: number; status?: boolean; body?: string;}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {

      // filter by body
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }

      // filter by status
      if (filters.status !== undefined) {
        httpParams = httpParams.set('status', filters.status);
      }

      // limits and sorting goes here


      // way to set the limit the number of todos returned on the website


      if (filters.limit) {
        httpParams = httpParams.set('limit', filters.limit);
      }


    }


    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,

    });
}



  getTodoById(id: string): Observable<Todo> {

    return this.httpClient.get<Todo>(`${this.todoUrl}/${id}`);
  }
    filterTodos(todos: Todo[], filters: {status?: boolean; owner?: string; category?: TodoCategory; body?: string; }): Todo[] {
      let filteredTodos = todos;

      // filter by owner
      if (filters.owner) {
        filters.owner = filters.owner.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
      }

      // filter by category
      if (filters.category) {
        filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
      }

      // filter by body
      if (filters.body) {
        filters.body = filters.body.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
      }

      return filteredTodos;
    }

  addTodo(newTodo: Partial<Todo>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    // `res.id` should be the MongoDB ID of the newly added `Todo`.
    return this.httpClient.post<{id: string}>(this.todoUrl, newTodo).pipe(map(response => response.id));
  }



}

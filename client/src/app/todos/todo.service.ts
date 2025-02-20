import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map } from 'rxjs/operators';
import { Todo, TodoCategory } from './todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todoUrl: string = '${environment.apiUrl}todos';

  constructor(private httpClient: HttpClient) {
  }

  // implement getTodos
  getTodos(filters: { category?: TodoCategory; status?: boolean; body?: string;}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {

      // filter by category
    if (filters.category !== undefined) {
      httpParams = httpParams.set('category', filters.category);


    }
  }


    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,

    });
}


    filterTodos(todos: Todo[], filters: { status?: boolean; owner?: string; category?: TodoCategory; body?: string; }): Todo[] {
      let filteredTodos = todos;


      
      // filter by status
      if (filters.status !== undefined) {
        filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
      }
      // filter by status might need to be moved to getTodos since it requieres a boolean value



      // filter by owner
      if (filters.owner) {
        filters.owner = filters.owner.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
      }


      // filter by body
      if (filters.body) {
        filters.body = filters.body.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
      }


      return filteredTodos;
    }






}

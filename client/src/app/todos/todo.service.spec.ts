import { HttpClient,HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed} from '@angular/core/testing';
import { of } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  // A small collection of test todos

  const testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: true,
      body: 'Deserunt in tempor est id consectetur cupidatat. Deserunt officia id Lorem nostrud amet.',
      category: 'homework'
    }
  ];



    let todoService: TodoService;
    // These are used to mock the HTTP requests so that we (a) don't have to
    // have the server running and (b) we can check exactly which HTTP
    // requests were made to ensure that we're making the correct requests.
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      // Set up the mock handling of the HTTP requests
      TestBed.configureTestingModule({
        imports: [],
        providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
      });


      // Construct an instance of the service with the mock HTTP client.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      todoService = new TodoService(httpClient);

    });


    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });


    describe(' about filter Todos', () => {



        it(`filters by status`, () => {

          const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

          todoService.getTodos({ status: true }).subscribe(() => {

            expect(mockedMethod)
              .withContext('one call')
              .toHaveBeenCalledTimes(1);

            expect(mockedMethod)
              .withContext('talks to the correct endpoint')
              .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('status', true) });
          });
        });



        it('filters by body', () => {

          const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

          todoService.getTodos({ body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.' }).subscribe(() => {

            expect(mockedMethod)
              .withContext('one call')
              .toHaveBeenCalledTimes(1);

            expect(mockedMethod)
              .withContext('talks to the correct endpoint')
              .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('body', 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.') });
          });
        });



        it('filters by owner', () => {

          const owner = 'Chris';
          const filteredTodos = todoService.filterTodos(testTodos, { owner });

          expect(filteredTodos.length).toBe(1);
          expect(filteredTodos[0].owner).toBe(owner);
        });




        it('filters by category', () => {
          const todoCategory = 'video games';

          const filterTodos = todoService.filterTodos(testTodos, { category: todoCategory });

          expect(filterTodos.length).toBe(1);


          filterTodos.forEach(todo => {
            expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
          });
        });




        it('filters by limit' , () => {
          const limit = 1;
          const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

          todoService.getTodos({ limit }).subscribe(() => {

            expect(mockedMethod)
              .withContext('one call')
              .toHaveBeenCalledTimes(1);

            expect(mockedMethod)
              .withContext('talks to the correct endpoint')
              .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('limit', limit.toString()) });
          });
        }
        );



  })
});

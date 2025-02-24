// import { TodoListPage } from '../support/todo-list.po';

// const page = new TodoListPage();

// describe('Todo list', () => {

//   before(() => {
//     cy.task('seed:database');
//   });

//   beforeEach(() => {
//     page.navigateTo();
//   });

//   it('Should have the correct title', () => {
//     page.getTodoTitle().should('have.text', 'Todos');
//   });

//   it('Should show 300 todos in list view', () => {
//     page.changeView('list');
//     page.getVisibleTodos().should('have.length', 300);
//   });

//   it('Should type something in the owner filter and check that it returned correct elements', () => {
//     page.filterByOwner('Fry');
//     page.getVisibleTodos().should('have.length', 61);
//     page.getTodoOwners().each(($el) => {
//       cy.wrap($el).should('contain.text', 'Fry');
//     });
//   });

//   it('Should type something in the category filter and check that it returned correct elements', () => {
//     page.filterByCategory('homework');
//     page.getVisibleTodos().should('have.length', 79);
//     page.getTodoCategories().each(($el) => {
//       cy.wrap($el).should('contain.text', 'homework');
//     });
//   });

//   it('Should type something in the body filter and check that it returned correct elements', () => {
//     page.filterByBody('quis');
//     page.getVisibleTodos().should('have.length', 89);
//     page.getTodoBodies().each(($el) => {
//       cy.wrap($el).should('contain.text', 'quis');
//     });
//   });

//   it('Should type complete in the status filter and check that it returned complete elements', () => {
//     page.filterByStatus('complete');
//     page.getVisibleTodos().should('have.length', 143);
//     page.getTodoStatuses().each(($el) => {
//       cy.wrap($el).should('contain.text', 'Complete');
//     });
//   });

//   it('Should type incomplete in the status filter and check that it returned incomplete elements', () => {
//     page.filterByStatus('incomplete');
//     page.getVisibleTodos().should('have.length', 1);
//     page.getTodoStatuses().each(($el) => {
//       cy.wrap($el).should('contain.text', 'Incomplete');
//     });
//   });
// });

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactTODOApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactTODOApp
{
    [Route("api/[action]")]
    public class ValuesController : Controller
    {
        public TodoItemsContext todoItemsContext;
        public ValuesController(TodoItemsContext _todoItemsContext)
        {
            this.todoItemsContext = _todoItemsContext;
        }
        [HttpGet]
        public async Task<List<Category>> GetCategories()
        {
            return await todoItemsContext.Category.ToListAsync();
        }
        [HttpGet]
        public async Task<List<TodoItem>> GetTodoItems()
        {
            return await todoItemsContext.TodoItem.ToListAsync();
        }
        [HttpPost]
        public async Task PostTODOItem([FromBody] TodoItem todoItem)
        {
            await todoItemsContext.TodoItem.AddAsync(todoItem);
            todoItemsContext.SaveChanges();
        }
        [HttpPost]
        public void PostCategory([FromBody] Category category)
        {
            todoItemsContext.Category.Add(category);
            todoItemsContext.SaveChanges();
        }
        [HttpGet]
        public void UpdateIsDoneFlag([FromQuery] int todoItemId, [FromQuery] bool isDone)
        {
            var entity = todoItemsContext.TodoItem.FirstOrDefault(x => x.Id == todoItemId);
            entity.IsDone = isDone;
            todoItemsContext.TodoItem.Update(entity);
            todoItemsContext.SaveChanges();
        }
    }
}

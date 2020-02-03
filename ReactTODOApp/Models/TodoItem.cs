using System;
using System.Collections.Generic;

namespace ReactTODOApp.Models
{
    public partial class TodoItem
    {
        public int Id { get; set; }
        public string TodoTxt { get; set; }
        public string CategoryName { get; set; }
        public bool IsDone { get; set; }
    }
}

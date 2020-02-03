import React from 'react';
import axios from 'axios';

class TODO extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTxt: "",
            categoryName: "",
            selectedCategoryName: "",
            todoList: [],
            categoryList: []
        }

        this.updateState = this.updateState.bind(this);
        this.handleTODOSubmit = this.handleTODOSubmit.bind(this);
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getTodoItems = this.getTodoItems.bind(this);
        this.handleIsDone = this.handleIsDone.bind(this);
    };

    componentDidMount() {
        this.getTodoItems();
        this.getCategories();
    }

    getTodoItems() {
        axios.get("api/getTodoItems")
            .then(response => {
                this.setState({
                    todoList: response.data
                });
            })
            .catch(function () { /*log error*/ });
    }

    getCategories() {
        axios.get("api/getCategories")
            .then(response => {
                this.setState({
                    categoryList: response.data
                });
            })
            .catch(function () { /*log error*/ });
    }

    updateState(e) {
        this.setState({ [e.target.getAttribute('name')]: e.target.value });
    }

    handleTODOSubmit(e) {
        e.preventDefault();
        axios
            .post("api/postTODOItem", {
                todoTxt: this.state.todoTxt, categoryName: this.state.selectedCategoryName,
                id: 0, isDone: false
            }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            .then((_) => {
                alert("Saved Successfully!");
                this.setState({ todoTxt: "", selectedCategoryName: "" }, function () {
                    this.getTodoItems();
                });
            })
            .catch(function () { /*log error*/ });
    }

    handleCategorySubmit(e) {
        e.preventDefault();
        const category = { id: 0, name: this.state.categoryName }
        axios
            .post("api/postCategory", category, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((_) => {
                alert("Saved Successfully!");
                this.setState({ categoryName: "" }, function () {
                    this.getCategories();
                });
            })
            .catch(function () { /*log error*/ });
    }

    handleIsDone(e, item, isDone) {
        axios.get("api/updateIsDoneFlag?todoItemId=" + item.id + "&isDone=" + isDone)
            .then((_) => {
                alert("Saved Successfully!");
                var array = [...this.state.todoList];
                array[array.indexOf(item)].isDone = isDone;
                this.setState({
                    todoList: array
                });
            })
            .catch(function () { /*log error*/ });
    }

    render() {
        return (
            <div className='container-fluid' style={{ margin: '20px 20px 20px 20px' }}>
                <div className='col-md-8 col-md-offset-2'>
                    <div className="col-md-6" style={{ borderRight: '1px solid #ccc' }}>
                        <h3>Create TODO</h3>
                        <form onSubmit={this.handleTODOSubmit}>
                            <div className="input-group">
                                <input type="text" placeholder="Enter TODO Item" value={this.state.todoTxt}
                                    onChange={this.updateState} className="form-control" name="todoTxt" />
                                <span className="input-group-addon" style={{
                                    width: '0px', paddingLeft: '0px', paddingRight: '0px',
                                    border: 'none'
                                }}></span>
                                <select className="form-control" value={this.state.selectedCategoryName} onChange={this.updateState} name="selectedCategoryName">
                                    <option></option>
                                    {this.state.categoryList.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                                <span className="input-group-btn">
                                    <input type="submit" value="Create" className="btn btn-success" />
                                </span>
                            </div>
                        </form>
                        <div>
                            <hr/>
                            <h3>Create Category</h3>
                            <form onSubmit={this.handleCategorySubmit}>
                                <div className="input-group">
                                    <input type="text" placeholder="Enter Category Name" value={this.state.categoryName}
                                        onChange={this.updateState} className="form-control" name="categoryName" />
                                    <span className="input-group-btn">
                                        <input type="submit" value="Create" className="btn btn-success" />
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>TODO List</h3>
                        <div className="container-fluid">
                            <hr />
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.todoList.length == 0 ?
                                            <tr>
                                                <td colSpan="3">
                                                    No Data Found
                                                </td>
                                            </tr>
                                            :
                                            this.state.todoList.map((todoItm) =>
                                                <tr key={todoItm.id}>
                                                    <td className="col-md-5">{todoItm.todoTxt}</td>
                                                    <td className="col-md-5">{todoItm.categoryName}</td>
                                                    {
                                                        todoItm.isDone == false ?
                                                            <td className="col-md-2" style={{ textAlign: "center" }}>
                                                                <button className="btn btn-success btn-xs" title="Done"
                                                                    onClick={() => { this.handleIsDone(this, todoItm, true) }}>
                                                                    <span className="glyphicon glyphicon-ok"></span>
                                                                </button>
                                                            </td>
                                                            : <td className="col-md-2" style={{ textAlign: "center" }}>
                                                                <button className="btn btn-success btn-xs" title="Undo"
                                                                    onClick={() => { this.handleIsDone(this, todoItm, false) }}>
                                                                    <span className="glyphicon glyphicon-remove"></span>
                                                                </button>
                                                            </td>
                                                    }

                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default TODO;
import Nerv from 'nervjs';
import './todoBox.css';
import TodoForm from '../todoForm/todoForm';
import TodoList from '../todoList/todoList';

class TodoBox extends Nerv.Component {
  constructor() {
    super(...arguments);
    this.state = {
      data: [{ id: 1, task: 'new todo', complete: false }]
    };
  }

  handleTaskDelete = taskId => {
    let data = this.state.data;
    data = data.filter(function(task) {
      return task.id !== taskId;
    });
    this.setState({ data });
  };

  handleToggleComplete = taksId => {
    const data = this.state.data;
    for (const i in data) {
      if (data[i].id === taksId) {
        data[i].complete = data[i].complete !== true;
        break;
      }
    }
    this.setState({ data });
  };

  generateId() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  handleSubmit = task => {
    let data = this.state.data;
    const id = this.generateId();
    data = data.concat([
      {
        id,
        task,
        complete: false
      }
    ]);
    this.setState({ data });
  };

  render() {
    const statistics = {
      todoCount: this.state.data.length || 0,
      todoCompleteCount: this.state.data.filter(function(item) {
        return item.complete === true;
      }).length
    };

    return (
      <div className="todobox">
        <h1 className="todobox_tit">Nerv Todo</h1>
        <TodoList
          data={this.state.data}
          deleteTask={this.handleTaskDelete}
          toggleComplete={this.handleToggleComplete}
          todoCount={statistics.todoCount}
          todoCompleteCount={statistics.todoCompleteCount}
        />
        <TodoForm submitTask={this.handleSubmit} />
      </div>
    );
  }
}

export default TodoBox;

import Nerv from 'nervjs';
import './todoList.css';
import TodoItem from '../todoItem/todoItem';

class TodoList extends Nerv.Component {
  render() {
    const taskList = this.props.data.map(function(listItem) {
      return (
        <TodoItem
          taskId={listItem.id}
          key={listItem.id}
          task={listItem.task}
          complete={listItem.complete}
          deleteTask={this.props.deleteTask}
          toggleComplete={this.props.toggleComplete}
        />
      );
    }, this);

    return (
      <ul className="todolist">
        {taskList}
        <li className="todolist_item todolist_item_footer">
          {this.props.todoCompleteCount} Done / {this.props.todoCount} Total
        </li>
      </ul>
    );
  }
}

export default TodoList;

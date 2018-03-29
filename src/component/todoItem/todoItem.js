import Nerv from 'nervjs';
import './todoItem.css';

class TodoItem extends Nerv.Component {
  toggleComplete = () => {
    this.props.toggleComplete(this.props.taskId);
  };

  deleteTask = () => {
    this.props.deleteTask(this.props.taskId);
  };

  render() {
    let task = this.props.task;
    let classes = 'todoitem';
    let itemChecked;
    if (this.props.complete) {
      task = <s>{task}</s>;
      itemChecked = true;
      classes += ' todoitem_success';
    } else {
      itemChecked = false;
    }

    return (
      <li className={classes}>
        <input
          className="todoitem_checkbox"
          type="checkbox"
          checked={itemChecked}
          onClick={this.toggleComplete}
        />
        <div className="todoitem_task">{task}</div>
        <div
          className="todoitem_btn"
          type="button"
          onClick={this.deleteTask}
          ref={domNode => (this.delBtn = domNode)}>
          Delete Task
        </div>
      </li>
    );
  }
}

export default TodoItem;

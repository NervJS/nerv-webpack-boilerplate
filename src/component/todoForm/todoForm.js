import Nerv from 'nervjs';
import './todoForm.css';

class TodoForm extends Nerv.Component {
  submitTask = e => {
    e.preventDefault();
    const task = this.task.value.trim();
    if (!task) {
      return;
    }
    this.props.submitTask(task);
    this.task.value = '';
  };

  render() {
    return (
      <div>
        <hr />
        <div className="todoform">
          <label for="task" className="todoform_label">
            Task
          </label>
          <input
            type="text"
            id="task"
            ref={domNode => (this.task = domNode)}
            className="todoform_input"
            placeholder="what do you plan to do?"
          />
          <div className="todoform_btn" onClick={this.submitTask}>
            Save Task
          </div>
        </div>
      </div>
    );
  }
}

export default TodoForm;

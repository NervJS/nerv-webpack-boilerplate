import Nerv from 'nervjs';
import './index.css';
import TodoBox from '../component/todoBox/todoBox';

class App extends Nerv.Component {
  render() {
    return <TodoBox />;
  }
}

Nerv.render(<App />, document.querySelector('#app'));

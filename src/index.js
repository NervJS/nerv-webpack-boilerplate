import * as Nerv from 'nervjs'
import './index.css'

class App extends Nerv.Component {
  render() {
    return (
      <h1>Helloworld</h1>
    )
  }
}

Nerv.render(<App />, document.querySelector('#app'))

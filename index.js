const redux = require('redux');
const { HashRouter, Link, Route } = ReactRouterDOM;
const { createStore, combineReducers } = redux;

const eventsReducer = (state = [], action) => {
  if (action.type === 'SET_EVENTS') {
    state = action.events;
  }

  if (action.type === 'ADD_EVENT') {
    state = [...state, action.event];
  }

  if (action.type === 'DELETE_EVENT') {
    state = state.filter((event) => event.name !== action.event.name);
  }

  return state;
};

const reducer = combineReducers({
  events: eventsReducer
});

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({
  type: 'SET_EVENTS',
  events: [{ name: 'joe', date: new Date() }]
});

store.dispatch({
  type: 'ADD_EVENT',
  event: { name: 'jane', date: new Date() }
});

store.dispatch({
  type: 'DELETE_EVENT',
  event: { name: 'jane' }
});

const connect = (Component) => {
  class Connected extends React.Component {
    constructor() {
      super();
      this.state = store.getState();
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    componentDidMount() {
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    render() {
      return <Component {...this.state} {...this.props} />;
    }
  }
  return Connected;
};
const fetchEvents

class App extends React.Component {
  componentDidMount() {
    fetchEvents();
  }

  render() {
    return (
      <HashRouter>
        <h1>Acme Event Planner With Redux</h1>
        <Route component={Nav} />
        <Route path="/" component={Home} exact />
        <Route path="/events" component={Events} />
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

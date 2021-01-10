# React Hook Quiz Boilerplate
This is a boilerplate created with 'create-react-app' to use React Hooks and Context API for State Management.

## Purpose
Due to the new features of ReactJS, it is possible to create an architecture and state management without Redux, and without adding any extra libraries (Native Solutions). This can be accomplished using the Context API and React Hooks.

## My Resources

1. [Boilerplate React Hooks](https://github.com/JoseZunigaDyehs/boilerplate-react-hooks)
2. [Functional demo](https://josezunigadyehs.github.io/boilerplate-react-hooks/)<br/>
3. [State Management with React Hooks and Context API in 10 lines of code!](https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c)
4. [Replace Redux state with React Hooks and Context](https://itnext.io/replace-redux-state-with-react-hooks-and-context-7906e0fd5521)

## Quick start

1. Clone this repo using `git clone https://github.com/isotope2011/ReactHooksQuiz.git`
2. Run `yarn` or `npm install` to install dependencies.<br />
3. Run `npm start` to see the example app at `http://localhost:3000`.

## Documentation

### Structure

    ├── public                     
    ├── src                          
    ├──── __tests__
    ├────── __snapshots__
    ├──── apis    
    ├──── components   
    ├────── index.js 
    ├──── context    
    ├────── actions
    ├──────── generalActions.js
    ├──────── index.js
    ├────── middleware
    ├──────── index.js
    ├────── states
    ├──────── initialStates.js
    ├────── reducers
    ├──────── generalReducer.js
    ├──────── reducer.js
    ├────── store
    ├──────── storeContext.js
    ├──── hooks
    ├──── mock
    ├────── data
    ├──── utils
    ├──── views                
    ├──── index.js
    ├──── App.js
    ├──── serviceWorker.js
    ├── babel.config.json   
    ├── jest.config.json   
    ├── jsconfig.json       
    ├── package.json   
    ├── .gitignore
    ├── .env
    └── README.md

### index.js
Render StoreProvider App Principal with a child function.

`````
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./context/store/storeContext";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

`````

### views/Main.js
Principal function, it can use `{ state, actions }` as parameter using useContext method and passing the StoreContext Hook.
It Have handle functions that dispatch functions to actions functions.

`````

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store/storeContext";
import Error from "./Error";
import useRequest from "../hooks/use-request";

const DEFAULT_VIEW = 'Welcome';
const GET = "GET";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const [errors, setError] = useState(null);
  const PageView = state.viewStates.pageView;
  const doRequest = useRequest({
    url: "/api/quiz",
    method:  GET,
  });
  
  useEffect(() => {
    doRequest().then(({ data, error }) => {
      if (data) {
        actions.globalActions.updateData(data);
        actions.viewActions.updateView(DEFAULT_VIEW);   
      } else {
        setError(error.message);
      }
    })
  }, []);
  
  return (
    <div>
      <h2>{`Current View: - ${JSON.stringify(state.viewStates.view)}`}</h2>
      {PageView && <PageView data-testid="pageview" />}
      {errors && <Error {...{ errors }} />}
    </div>
  );
};

`````

## Context API Architecture

### ACTIONS

### actions/index.js
 Export object with functions for each separate action, that receives an object `{state,dispatch}`
 Return every actions.

`````
import { counterActions } from './counterActions';
import { globalActions } from './globalActions';
import { viewActions } from './viewActions'

export const useActions = (state, dispatch) => {
  return {
    counterActions: counterActions({ state, dispatch }),
    globalActions: globalActions({ state, dispatch }),
    viewActions: viewActions({ state, dispatch })
  }
};

`````

### actions/globalActions.js
Export actions receiving an object `{ state, dispatch }` to access to state or dispatch the actions.

You can externalize the functions for complex logic.

`````
import axios from "axios";

const postQuiz = (data) => axios.post("/api/quiz", data).then((res) => res.data);

export const globalActions = ({ dispatch, state: { globalStates: state } }) => {
  return {
    throwError: error => dispatch({ type: "THROW_ERROR", error }),
    updateData: data => dispatch({ type: "UPDATE_DATA", data }),
    updateDebugData: debugData => dispatch({ type: "UPDATE_DEBUG_DATA", debugData }),
    updateCurrentIndex: index => dispatch({ type: "UPDATE_CURRENT_INDEX", index }),
    asyncPostQuizData: async data => {
      await postQuiz(data).then(({ status, ansType }) => {
        const score = { [ansType]: state.score[ansType] + 1 };
        dispatch({
          type: 'UPDATE_SCORE',
          score: { ...state.score, ...score }
        });
        dispatch({ type: 'UPDATE_STATUS', status });
      });
    },
    updateStatus: status => dispatch({ type: 'UPDATE_STATUS', status }),
  }; 
};

`````

### REDUCERS

### reducers/reducer.js
Export initialState and reducer reducer function, 

reducer function returns separate states, which is a separate reducer, who receives state and action.

`````
import { initialState } from "../state/initialStates";
import { counterReducer } from "./counterReducer";
import { globalReducer } from "./globalReducer";
import { viewReducer } from "./viewReducer";

const reducer = (state = initialState, action) => {
  return {
    counterStates: counterReducer(state.counterStates, action),
    globalStates: globalReducer(state.globalStates, action),
    viewStates: viewReducer(state.viewStates, action),
  };
};

export { initialState, reducer };

`````

### reducers/globalReducer.js
Define and export states and reducer
`````
export const globalStates = {
  data: null,
  index: 0,
  debugData: null,
  error: null,
  score: {
    correct: 0,
    wrong: 0,
  },
  status: null,
};

export const globalReducer = (
  state,
  { type, data, error, debugData, index, status, score }
) => {
  switch (type) {
    case "THROW_ERROR":
      return {
        ...state,
        error,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data,
      };
    case "UPDATE_DEBUG_DATA":
      return {
        ...state,
        debugData,
      };
    case "UPDATE_CURRENT_INDEX":
      return {
        ...state,
        index,
      };
    case "UPDATE_SCORE":
      console.log("reducer", score);
      return {
        ...state,
        score,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status,
      };
    default:
      return state;
  }
};


`````

### STATES

### states/initialStates.js
Exports an object with all separate state from reducers

`````
import { counterStates } from '../reducers/counterReducer';
import { globalStates } from '../reducers/globalReducer';
import { viewStates } from '../reducers/viewReducer';

export const initialState = {
  counterStates,
  globalStates,
  viewStates
};


`````

### STORE

### store/storeContext.js
Exports StoreContext and StoreProvider.


It get the state and dispatch from new API useReducer `[ state, dispatch ]`.

It get the actions from useActions and pass it to Context `actions`.

You can use all Hooks here like `useEffect`, in this case, to show the new state.

It's return a Provider that receive a value with `{ state, dispatch, actios }`, it's encapsulate a children function to render.
 
`````
import React, { createContext, useReducer, useCallback } from "react";
import { initialState, reducer } from "../reducers/reducers";
import { useActions } from "../actions";
import { applyMiddlewares, logger, reactThunk } from "../middleware";

// TODO: preload state here from storage or fetch request

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatchBase] = useReducer(reducer, initialState);
  const dispatcher = applyMiddlewares([logger, reactThunk]);
  const dispatch = useCallback(dispatcher({ dispatch: dispatchBase, state }), []);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ actions, dispatch, state }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };


`````

### React Middleware - Redux-like middleware solution

Created redux like solution to apply middlewares to context api's dispatch method.

Using "ramda" npm package to compose middleware functions to trigger each middleware added in the chain.
Passing to each an api of state and dispatch.

```
const applyMiddlewares = (middlewares = []) => ({ state, dispatch }) => {
  const api = { state, dispatch };
  const chain = middlewares.map((middleware) => middleware(api));

  return compose(...chain)(dispatch);
};
```

**React middlewares**

- add on used to customize the dispatch function
- between dispatching an action and prior to  meeting a reducer

**Middleware Examples**

logger middleware - wrap dispatch with console logs beforea and after
```
const logger = ({ state }) => {
  return (next) => (action) => {
    console.group('logger');
    console.log('before dispatch', action);
    const nextDispatch = next(action);
    console.log('after dispatch', state);
    console.groupEnd();
    return nextDispatch;
  };
};
```

reactThunk - allows for both async and sync actions to dispatch function

- returns a method that takes action as a param
- dispatches an action, should return state
```
const reactThunk = ({ dispatch, state }) => {
  return (next) => (action) => {
    console.log("thunk", typeof action, action);
    return typeof action === "function"
      ? action(dispatch, state)
      : next(action);
  };
};
```


### MOCK / TESTING

## Using Mirage JS for Mocking APIs

**Resources**
https://miragejs.com/tutorial/intro/

## React Testing Library for Testing

React Testing Library helps to write maintainable tests for React components. React Testing Library is supported out of the box when using 'create-react-app' for projects.
### \_\_tests\_\_

Tests are configured to be ran from the **\_\_tests\_\_** directory.

```
describe('HelloWorld View Component', () => {
    test('Show Hello World text', () => {
        const { getByText } = render(<HelloWorld />);
        expect(getByText('Hello World!!')).toMatchSnapshot();
    })
})
```

### \_\_snapshots\_\_

Snapshots can be matched when using jest '.toMatchSnapshot'. Snapshots are added to the **\_\_snapshots\_\_** directory upon creation.

This will snapshot only the difference between the first render, and the state of the DOM after the click event.

[Checkout 'snapshot-diff' solution](https://github.com/jest-community/snapshot-diff)

```
// using snapshotDiff
test('Test using asFragment for first render check', () => {
    const { asFragment } = render(<Error {...{ errors: 'Error Message' }} />);
    const firstRender = asFragment();
    expect(snapshotDiff(firstRender, asFragment())).toMatchSnapshot();
})
```

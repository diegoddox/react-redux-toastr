##`redux-toastr` [demo](http://diegoddox.github.io/redux-toastr/)

`redux-toastr` is a React toastr message implemented with [Redux](https://github.com/rackt/redux), primary consists of three things: a reducer, toastr emitter and a React component.

The reducer listens to dispatched actions from the component to maintain your state in Redux.

## Implementation Guide

##### 1. Installation

`npm install --save redux-toastr`

##### 2. Add the `redux-toastr` css link to your app
##### NOTE: This can be change at anytime
```
<link href="http://diegoddox.github.io/redux-toastr/0.5.0/redux-toastr.min.css" rel="stylesheet" type="text/css">
```
##### 3. The third thing you need to do is to add the `redux-toastr` `reducer` to Redux.

```
import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'redux-toastr'
const reducers = {
  // ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

##### NOTE: The default mount point for `redux-toastr` is `toastr`.

##### 4. Add the `redux-toastr` React component to the root of your app
```
import {Provider}  from 'react-redux'
import ReduxToastr from 'redux-toastr'
<Provider store={store}>
  <div>
    ... other things like router ...
    // props are not required
    <ReduxToastr
      timeOut={3000}
      newestOnTop={false}
      position="top-left"/>
  </div>
</Provider>
```
default props: In case you don't pass the props
```
timeOut: 5000
newestOnTop: true
position: 'top-right'
```
positions: `top-left` `top-right`  `bottom-left` and `bottom-right`

##### 5. Add the `redux-toastr`  `toastr` emitter
The `toastr` methods use [eventemitter3](https://github.com/primus/eventemitter3) to dispatch the actions

```
import React, {Component}  from 'react'
import {toastr} from 'redux-toastr'

export class YourComponent extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => toastr.success('The title', 'The message')}
          type="button">Toastr Success</button>
      </div>
    )
  }
}
```
Or you can bind the `actions` to your component if you prefer.
```
import {bindActionCreators} from 'redux'
import {actions as toastrActions} from 'redux-toastr'
// In your React component
constructor(props) {
  super(props);
  // Bind the redux-toastr actions to the component
  this.toastr = bindActionCreators(toastrActions, this.props.dispatch)
}
```
# Toastr methods
`success` `info` `warning` `error` and `message`
Each of this method can take up to three arguments.

```
import {toastr} from 'redux-toastr'

const toastrOptions = {
  timeOut: number, // Override the default timeOut
  onShowComplete: func, // <-- When the animation-show is complete
  onHideComplete: func, // <-- When the animation-hide is complete
  icon: string // Override the default icon
}

toastr.success('Title', 'Message', toastrOptions)
toastr.info('The message', toastrOptions)
toastr.warning('The title', 'The message')
toastr.error('The message')
```

##### NOTE: Toastr `message`
This one is in case you wanna show a large amount of information, unlike the other method this one will not close automatically and doesn't have icon.

This method uses `React` [dangerouslySetInnerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html) to display the message.

##### Toastr `confirm` 
The confirm method takes two arguments the first is the message the second is a object where you can specify what will happen when the user clicks on `ok` or `cancel` button

```
toastr.confirm('The message', {
  onOk: func, // <-- When ok is clicked
  onCancel: func, // <-- When cancel is clicked
})
```

# Run a local demo
```
git clone https://github.com/diegoddox/redux-toastr.git
cd redux-toastr/demo/
npm install
npm start
```
open your browser at `http://localhost:3000`

# TODO
create test.
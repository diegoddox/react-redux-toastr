##`react-redux-toastr` [demo](http://diegoddox.github.io/react-redux-toastr/)

`react-redux-toastr` is a React toastr message implemented with [Redux](https://github.com/rackt/redux), primary consists of three things: a reducer, toastr emitter and a React component.

The reducer listens to dispatched actions from the component to maintain the `toastr` state in Redux.

## Implementation Guide

##### 1. Installation

`npm install --save react-redux-toastr`

##### 2. Add the `react-redux-toastr` css link to your app
##### NOTE: This can be change at anytime
```
<link href="http://diegoddox.github.io/react-redux-toastr/3.0.1/react-redux-toastr.min.css" rel="stylesheet" type="text/css">
```

Or import the less file into to your project.
`import 'react-redux-toastr/src/less/index.less'`

##### 3. The third thing you need to do is to add the `react-redux-toastr` `reducer` to Redux.

```javascript
import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
const reducers = {
  // ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

##### NOTE: The default mount point for `react-redux-toastr` is `toastr`.

##### 4. Add the `react-redux-toastr` React component to the root of your app

```javascript
import {Provider}  from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

<Provider store={store}>
  <div>
    ... other things like router ...
    // props are not required
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      position="top-left"/>
  </div>
</Provider>
```

default props: In case you don't pass the props

```
timeOut: 5000,
newestOnTop: true,
position: 'top-right'
```

positions: `top-left` `top-center` `top-right`  `bottom-left` `bottom-center` and `bottom-right`

##### 5. Add the `react-redux-toastr`  `toastr` emitter
The `toastr` method use [eventemitter3](https://github.com/primus/eventemitter3) to dispatch the actions


```javascript
import React, {Component}  from 'react'
import {toastr} from 'react-redux-toastr'

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

```javascript
import {bindActionCreators} from 'redux'
import {actions as toastrActions} from 'react-redux-toastr'
// In your React component
constructor(props) {
  super(props);
  // Bind the react-redux-toastr actions to the component
  this.toastr = bindActionCreators(toastrActions, this.props.dispatch)
}
```

# Toastr methods
##### Toastr: `success` `info` `warning` and `error`
Each of these methods can take up to three arguments the `title` a `message` and `options`.
In `options` you can specify the `timeOut` `icon` `onShowComplete` `onHideComplete` `className` and `component`.

`icon` can be one of the following:
- `'icon-close-round'`
- `'icon-information-circle'`
- `'icon-check-1'`
- `'icon-exclamation-triangle'`
- `'icon-exclamation-alert'`


``` javascript
import {toastr} from 'react-redux-toastr'

const toastrOptions = {
  timeOut: 3000, // by setting to 0 it will prevent the auto close
  icon: 'my-icon-name',
  onShowComplete: () => console.log('SHOW: animation is done'),
  onHideComplete: () => console.log('HIDE: animation is done'),
  component: ( // this option will give you a func 'remove' as props
    <MyCustomComponent myProp="myValue">
      <span>Hello, World!</span>
    </MyCustomComponent>
  )
}

toastr.success('Title', 'Message', toastrOptions)
toastr.info('The message', toastrOptions)
toastr.warning('The title', 'The message')
toastr.error('The message')
```

##### Toastr: `message`
This one is in case you wanna show a large amount of information, unlike the other methods above this will not close automatically unless you provide a `timeout` in the `message` options.

```javascript
const toastrMessageOptions = {
  timeOut: 1000,
  onShowComplete: () => console.log('SHOW: animation is done'),
  onHideComplete: () => console.log('HIDE: animation is done'),
  component: React.Component
};
toastr.message('Title', toastrMessageOptions)
```

##### Toastr: `confirm`
The confirm method takes two arguments, the first is the message the second is a object where you can specify what will happen when the user clicks on `ok` or `cancel` button

NOTE: You can only have one at a time, right now if you have one `confirm` and you fire another it will be ignored.

```javascript
const toastrConfirmOptions = {
  onOk: () => console.log('OK: clicked'),
  onCancel: () => console.log('CANCEL: clicked')
};
toastr.confirm('Are you sure about that!', toastrConfirmOptions)
```

You can change the `ok` and `cancel` text by passing the `confirm` props to the `ReduxToastr` component

```javascript
const options = {
  okText: 'confirm text',
  cancelText: 'cancel text'
};
<ReduxToastr confirmOptions={options}/>
```

# Run a local demo
```
git clone https://github.com/diegoddox/react-redux-toastr.git
cd react-redux-toastr
npm install
npm start
```
open your browser at `http://localhost:3000`

# TODO
create test.

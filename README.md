##`react-redux-toastr` [demo](http://diegoddox.github.io/react-redux-toastr/)

![react-redux-toastr](https://raw.githubusercontent.com/diegoddox/react-redux-toastr/svg-component/development/assets/toastr.png?style=centerme)


`react-redux-toastr` is a React toastr message implemented with [Redux](https://github.com/rackt/redux), primary consists of three things: a reducer, toastr emitter and a React component.

The reducer listens to dispatched actions from the component to maintain the `toastr` state in Redux.

## Implementation Guide

##### 1. Installation

`npm install --save react-redux-toastr`

##### 2. Add the `react-redux-toastr` css link to your app
##### NOTE: This can be change at anytime
```
<link href="http://diegoddox.github.io/react-redux-toastr/4.4/react-redux-toastr.min.css" rel="stylesheet" type="text/css">
```

Or import the scss file into to your project.
`import 'react-redux-toastr/src/styles/index.scss'`

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
      preventDuplicates={true}
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar/>
  </div>
</Provider>
```

default props: In case you don't pass the props

```
timeOut: 5000,
newestOnTop: true,
position: 'top-right',
transitionIn: 'bounceIn',
transitionOut: 'bounceOut',
progressBar: false,
```

positions: `top-left` `top-center` `top-right`  `bottom-left` `bottom-center` and `bottom-right`
transitionIn: `bounceIn` `bounceInDown` and `fadeIn`
transitionOut: `bounceOut` `bounceOutUp` and `fadeOut`

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

  this.toastr.add({
   type: 'success',
   title: 'your title',
   message: 'message',
   options: {}
  });

  this.toastr.remove('toastrId');
}
```

# Toastr methods
Toastr accepts the following methods: `success`  `info`  `warning`  `light`  `error` `confirm` `message` and `removeByType`

##### Toastr: `success`  `info`  `warning`  `light`  `error` and `removeByType`
Each of these methods can take up to three arguments the `title` a `message` and `options`.
In `options` you can specify `timeOut` `icon` `onShowComplete` `onHideComplete` `className` `component` `removeOnHover`, `showCloseButton`, `onCloseButtonClick`, `progressBar`, `transitionIn` and `transitionOut`.

``` javascript
import {toastr} from 'react-redux-toastr'

const toastrOptions = {
  timeOut: 3000, // by setting to 0 it will prevent the auto close
  icon: (<myCustomIconOrAvatar />), // You can add any component you want but note the the with and height are 70px ;)
  onShowComplete: () => console.log('SHOW: animation is done'),
  onHideComplete: () => console.log('HIDE: animation is done'),
  onCloseButtonClick: () => console.log('Close button was clicked'),
  showCloseButton: false, // true by default
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
toastr.removeByType('error') // Remove all toastrs with the type error.
```

##### Toastr methods light

The `light` method is like the other `toastr` except that the `background-color` is `white` and you can add a top
border on top of the `toastr` by passing the `status` option

`icon` can be one of the following:
- `'success'`
- `'info'`
- `'warning'`
- `'error'`

``` javascript
import {toastr} from 'react-redux-toastr'

const toastrType = 'warning';
const toastrOptions = {
  icon: toastrType,
  status: toastrType
}

toastr.light('The title', 'The message', toastrOptions)
```

##### Toastr: `message`
This one is in case you wanna show a large amount of information, unlike the other methods above this will not close automatically unless you provide a `timeout` in the `message` options.

```javascript
const toastrMessageOptions = {
  timeOut: 3000, // Default value is 0
  onShowComplete: () => console.log('SHOW: animation is done'),
  onHideComplete: () => console.log('HIDE: animation is done'),
  removeOnHover: false // Default value is false
  component: React.Component
};
toastr.message('Title', toastrMessageOptions)
```

##### Toastr: `confirm`
The confirm method takes two arguments, the first is the message the second is a object where you can specify what will happen when the user clicks on `ok` and `cancel` button or by `keypress` `enter/esc`

NOTE: You can only have one at a time, right now if you have one `confirm` and you fire another it will be ignored.

```javascript
const toastrConfirmOptions = {
  onOk: () => console.log('OK: clicked'),
  onCancel: () => console.log('CANCEL: clicked')
};
toastr.confirm('Are you sure about that!', toastrConfirmOptions);
```

You can change the `ok` and `cancel` text by:

- Passing the `confirm` props to the `ReduxToastr` component

```javascript
const options = {
  okText: 'confirm text',
  cancelText: 'cancel text'
};
<ReduxToastr confirmOptions={options}/>
```

- Passing the `okText` and `cancelText` props to the `toasterConfirmOptions` object:

```javascript
const toastrConfirmOptions = {
  ...
  okText: 'confirm text',
  cancelText: 'cancel text'
};

toastr.confirm('Are you sure about that!', toastrConfirmOptions);
```

You can make it so `ok` is the only button by:

- Passing the `disableCancel` prop to the `toasterConfirmOptions` object:

```javascript
const toastrConfirmOptions = {
  ...
  disableCancel: true;
};

toastr.confirm('You have timed out! Please log back in.', toastrConfirmOptions);
```

### Avatar: in case you wanna use the same avatar as the example
[Avatar](https://github.com/diegoddox/react-redux-toastr/blob/master/development/Avatar.js)

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

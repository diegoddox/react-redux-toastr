## Implementation Guide

#### 1. Install redux-toastr

`npm install --save redux-toastr` or `npm i --save redux-toastr`

##### 2. Link `redux-toastr` styles to your app
comming soon. 

##### 3. The third thing you need to do is to add the `redux-toastr` `reducer to Redux.

```
import {createStore, combineReducers} from 'redux';
import {reducer as toastrReducer}     from 'redux-toastr';
const reducers = {
  // ... other reducers ...
  toastr: toastrReducer     // <---- Mounted at toastr.
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);
```

##### NOTE: The default mount point for `redux-toastr` is `toastr`.

##### 4. Add the `redux-toastr` component to the root of your app

```
import ReduxToastr from 'redux-toastr'
<Provider store={store}>
  <div>
    ... other things like router ...
    <ReduxToastr/>
  </div>
</Provider>
```

##### 5. Add the `toastr` 
The toastr method use [eventemitter3](https://github.com/primus/eventemitter3) to dispatch the actions

```
import React, {Component, PropTypes}  from 'react';
import {toastr}                       from 'redux-toastr';

export class YouComponent extends Component {
  static displayName = 'YouComponent'

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => toastr.success('Lorem ipsum dolor sit amet')}
          type="button">Toastr Success</button>
      </div>
    );
  }
}
```

but you can also bind the `actions` to your component if you prefer.

```
import React, {Component, PropTypes}  from 'react';
import {bindActionCreators}           from 'redux';
import {actions as toastrActions}     from 'redux-toastr';

export class YouComponent extends Component {
  static displayName = 'YouComponent'

  constructor(props) {
    super(props);
    this.toastr = bindActionCreators(toastrActions, this.props.dispatch); //<-- bind the actions to your component
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.toastr.success('Lorem ipsum dolor sit amet.');
  }

  render() {
    return (
      <div>
        <button
          onClick={this.handleOnClick}
          type="button">Toastr Success</button>
      </div>
    );
  }
}
```

##### Toastr method
`success` `info` `warning` `error`
Each method can take up to three arguments.

1. Passing three arguments the first is the `title` the second `message` and the third is the `options`
2. Passing two `string` arguments the first will be the `title` and the second the `message`
3. You can pass the `message and the second argument can be the `options`
4. If you pass only one argument it will become the message 

| Title     |message     | options   |
| ----------|:----------:| ---------:|
| `string`  | `string`   | `object`  |

```
import {toastr} from 'redux-toastr';
toastr.success('Title', 'Message', {timeOut: 7000, icon: 'icons'});
toastr.info('The message', {timeOut: 7000, icon: 'icons'});
toastr.warning('The message'});
toastr.error('The message'});
```

##### Toastr icons
By default `redux-toastr` provides a icon for `success`, `info`, `warning` and `error`
but you can override by passing a object `{icon: 'icon-name'}` to the `toastr` method.

# TODO
create test.
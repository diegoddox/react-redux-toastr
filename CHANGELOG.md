# v7.6.4
Fixes: [#238]

`disableCloseButtonFocus` can be passed as a options in the toast methods in
order to prevent the auto focus.

# v7.6.1
Fix `getState` is not a function

# v7.6.0
Now you can define the toastr state path via a function
```
<ReduxToastr
    {...anotherProps}
    getState={(state) => state.toastr} // This is the default
/>
```

# v7.5.2
[#245] Fix W3C validation errors

# v7.4.10
Allow latest react-redux as peer dependency
[#230]

# v7.4.9
Fixies [#220]

# 7.0.0

# Breaking Changes 
add css prefix.

# Features
Confirm can take a custom component.

## New features
- Toastr `position`, now you can have toastr in different location by specifying the `position` option.
- Toastr `attention`, this will add a shadow in the background of the toastr

### Remove `transitionIn` and `transitionOut` from confirm options.
Add the `position` on `toastr`,  

# 5.0.0
Custom `id` for the `toastr` and `confirm`

# 4.4.6
Fix animation side effect.
(issue)[https://github.com/diegoddox/react-redux-toastr/issues/102]

# 4.2.1
Add method `removeByType`.

# 4.1.0
Migrate frm less to scss

# 4.0.0
Add light style.
toastr option icon can be a react component.
change to inline svg.

# 3.11.0
Add option `preventDuplicates`

# 3.8.0
add `showCloseButton` in the `confirm` `props`
clsoe confirm on `esc` and `enter`

# 3.6.3
Fix time-travel issue #43

# 3.6.0
add extra options to the `toastr`, now u can prevent the `toastr` closing on mouseLeave and on Click.

```js
{
    removeOnHover: false,
    removeOnClick: false
}
```

# 3.1.4
Add the font-icons to the lib folder.
 
# 3.0.0
Remove `dangerouslysetinnerhtml` and implment `component` `option`.

instead of using the `dangerouslysetinnerhtml` now you can pass a react component in the `toastr` `options` so is up to you what and how you wanna display your `toastr`

# 2.1.0
change ReduxToastr props name from `confirm` to `confirmOptions`
the `message` method can close automaticly you you provide a `timeout` in the `message` options

# 1.1.0
Improve the code end fix [issue](https://github.com/diegoddox/redux-toastr/issues/3)

# 1.0.2
fix [issue](https://github.com/diegoddox/redux-toastr/issues/1)

# 1.0.1
##### Fix icons

# 1.0.0
##### add confirm method
##### add css prefix

# 0.4.0
#### add method message
#### add option newestOnTop
#### add mobile style

# 0.3.1
Nothing new just some problems with npm readme.md file

# 0.3.0
You don't need to add the google font link to the head of you project

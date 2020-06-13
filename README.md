# visual focus

Help you keep everyone's focus where you want to explain on browser
![gif](https://github.com/iamplex/visual-focus/blob/master/assets/visual-focus.gif?raw=true)

## Check it out

The easiest way to try it is along devtools

![gif](https://github.com/iamplex/visual-focus/blob/master/assets/getting-start.gif?raw=true)

```js
var script = document.createElement('script')
script.src =
  'https://cdn.jsdelivr.net/npm/visual-focus@0.0.14/dist/v-focus.umd.js'
document.documentElement.append(script)
```

and then

```js
var v = new vfocus()
```

and now you can try to press the control button

## Install

```sh
npm install visual-focus
```

## Usage

```js
import vfocus from 'visual-focus'

const v = new vfocus(options)
```

## Options

#### Size: Number (default: 85)

> radius of focus

#### FocusColor: String (default: 'rgba(0, 0, 0, 0)')

> color of focus

#### BackgroundColor: String (default: 'rgba(0, 0, 0, 0.85)')

> color of background

#### ContinuousMode: Boolean (default: true)

> if true, toggle focus-mode when press the control button each time,
> and if false, only trigger focus-mode on keep the control button pressed down

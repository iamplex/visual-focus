# visual focus

Help you keep everyone's focus where you want to explain on browser
![gif](https://iamplex.github.io/visual-focus/assets/visual-focus.gif)

## Check it out

The easiest way to try it is along devtools

![gif](https://iamplex.github.io/visual-focus/assets/getting-start.gif)

```js
var script = document.createElement('script')
script.src =
  'https://cdn.jsdelivr.net/npm/visual-focus@0.0.10/dist/v-focus.umd.js'
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

#### container: HTMLElement (default: document.body)

> canvas of container

#### size: Number (default: 85)

> radius of focus

#### focusColor: String (default: 'rgba(0, 0, 0, 0)')

> color of focus

#### backgroundColor: String (default: 'rgba(0, 0, 0, 0.85)')

> color of background

#### continuousMode: Boolean (default: true)

> if true, toggle focus-mode when press the control button each time,
> and if false, only trigger focus-mode on keep the control button pressed down

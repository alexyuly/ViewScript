# ViewScript

_Power Tools For Web Apps_

⚠️ **ViewScript is in its early stages of development.** It's not ready to use for building apps, but a pre-release demo is available now. Please continue to check here for updated documentation, releases, and future plans.

## 🧨 Start

You'll need [Node.js](https://nodejs.org/) 18 to run ViewScript.

```
npm install viewscript-toolkit --global

viewscript create YourProjectName

cd YourProjectName

npm install

npm start
```

## 🧭 Overview

Every ViewScript app is represented by a JSON object of type [App](https://github.com/alexyuly/ViewScript-Runtime/blob/main/lib/abstract.ts#L90) from the [ViewScript Abstract Syntax Tree](https://github.com/alexyuly/ViewScript-Runtime/blob/main/lib/abstract.ts).

Today, JavaScript and TypeScript developers can use the [ViewScript Bridge](https://github.com/alexyuly/ViewScript-Bridge) to build App objects, using ergonomic helper functions. The Bridge hands off App objects to the [ViewScript Runtime](https://github.com/alexyuly/ViewScript-Runtime), which executes them.

In future, developers will be able to write apps using the ViewScript language, and the Compiler will build App objects, to be bundled with the Runtime as standalone executables.

### Latest Release:

- [**ViewScript v0.3.4**](https://github.com/alexyuly/ViewScript/releases/tag/v0.3.4) _(Pre-release)_

### Expected Releases:

- ☕️ **ViewScript v0.5** _Espresso_ _(Pre-release)_
  - Build a simple client-side todo list app
- 🧪 **ViewScript v1** _Absinthe_
  - Compile ViewScript source code into abstract app objects
  - Bundle app objects with the Runtime as standalone executables

## 🧑‍💻 Code Examples

[View Source...](https://github.com/alexyuly/ViewScript-Toolkit/tree/main/examples/bridge/src)

### HelloWorld

```ts
import { element, render } from "viewscript-bridge";

const App = element("p", {
  font: "18px cursive",
  margin: "24px",
  content: "Hello, world!",
});

render(App);
```

_Proposed ViewScript v1.0 syntax:_

```
render <p>
  font = "18px cursive"
  margin = "24px"
  content = "Hello, world!"
```

### Log when button clicked

```ts
import { browser, element, render } from "viewscript-bridge";

const App = element("button", {
  onClick: browser.console.log("You clicked the button."),
  background: "whitesmoke",
  "border-radius": "4px",
  cursor: "pointer",
  display: "block",
  "font-size": "18px",
  margin: "24px",
  padding: "12px",
  content: "Click me!",
});

render(App);
```

_Proposed ViewScript v1.0 syntax:_

```
render <button>
  onClick = browser.console.log "You clicked the button."
  background = "whitesmoke"
  border-radius = "4px"
  cursor = "pointer"
  display = "block"
  font-size = "18px"
  margin = "24px"
  padding = "12px"
  content = "Click me!"
```

### Update section while hovered

```ts
import { boolean, element, render, view, when } from "viewscript-bridge";

const App = view({ hovered: boolean(false) }, ({ hovered }) =>
  element("section", {
    onPointerLeave: hovered.disable,
    onPointerOver: hovered.enable,
    background: when(hovered(), "black", "white"),
    border: "1px solid black",
    color: when(hovered(), "white", "black"),
    font: "bold 24px serif",
    margin: "24px",
    padding: "24px",
    content: when(hovered(), "I am hovered.", "Hover me!"),
  })
);

render(App());
```

_Proposed ViewScript v1.0 syntax:_

```
render view
  define hovered = false

  render <section>
    onPointerLeave = hovered.disable
    onPointerOver = hovered.enable
    background = when hovered then "black" else "white"
    border = "1px solid black"
    color = if hovered then "white" else "black"
    font = "bold 24px serif"
    margin = "24px"
    padding = "24px"
    content = when hovered then "I am hovered." else "Hover me!"
```

### Counter with increment and reset

```ts
import {
  boolean,
  element,
  number,
  render,
  stream,
  string,
  view,
  when,
} from "viewscript-bridge";

const FancyButton = view(
  { click: stream(), content: string(), disabled: boolean() },
  ({ click, content, disabled }) =>
    element("button", {
      "align-items": "center",
      background: "lightgreen",
      click: click(),
      color: "crimson",
      content: content(),
      cursor: when(disabled(), "not-allowed", "pointer"),
      disabled: disabled(),
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      width: "100px",
    })
);

const App = view({ clicks: number(0) }, ({ clicks }) =>
  element("section", {
    "align-items": "center",
    border: "2px dashed red",
    display: "flex",
    "flex-direction": "column",
    gap: "16px",
    height: "200px",
    "justify-content": "center",
    margin: "24px",
    padding: "12px",
    width: "200px",
    content: [
      FancyButton({
        click: clicks.add(1),
        content: "Increment",
        disabled: clicks.isAtLeast(10),
      }),
      FancyButton({
        click: clicks.reset,
        content: "Reset",
        disabled: false,
      }),
      element("span", {
        content: clicks(),
      }),
    ],
  })
);

render(App());
```

_Proposed ViewScript v1.0 syntax:_

```
define FancyButton = view
  define click as stream
  define content as string

  render <button>
    onClick = click
    align-items = "center"
    background = "lightgreen"
    color = "crimson"
    cursor = "pointer"
    display = "flex"
    font-weight = "bold"
    height = "100px"
    justify-content = "center"
    width = "100px"
    content = content

render view
  define clicks = 0

  render <section>
    align-items = "center"
    border = "2px dashed red"
    display = "flex"
    flex-direction = "column"
    gap = "16px"
    height = "200px"
    justify-content = "center"
    margin = "24px"
    padding = "12px"
    width = "200px"
    content =
    - FancyButton
        onClick = clicks.add 1
        content = "Increment"
    - FancyButton
        onClick = clicks.reset
        content = "Reset"
    - <span>
        content = clicks
```

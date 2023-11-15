# ViewScript

_Power Tools For Web Apps_

⚠️ **ViewScript is in its early stages of development.** It's not ready to use for building apps, but a pre-release demo is available now. Please continue to check here for updated documentation, releases, and future plans.

## Start

You'll need [Node.js](https://nodejs.org/) 18 to run ViewScript.

```
npm install viewscript-toolkit --global

viewscript create YourProjectName

cd YourProjectName

npm install

npm start
```

## Overview

Every ViewScript app is represented by a JSON object of type [App](https://github.com/alexyuly/ViewScript-Runtime/blob/main/lib/abstract.ts#L90) from the [ViewScript Abstract Syntax Tree](https://github.com/alexyuly/ViewScript-Runtime/blob/main/lib/abstract.ts).

Today, JavaScript and TypeScript developers can use the [ViewScript Bridge](https://github.com/alexyuly/ViewScript-Bridge) to build App objects, using ergonomic helper functions. The Bridge hands off App objects to the [ViewScript Runtime](https://github.com/alexyuly/ViewScript-Runtime), which executes them.

In future, developers will be able to write apps using the ViewScript language, and the Compiler will build App objects, to be bundled with the Runtime as standalone executables.

### Latest Release:

- [**ViewScript v0.3.4**](https://github.com/alexyuly/ViewScript/releases/tag/v0.3.4) _(Pre-release)_

### Expected Releases:

- **ViewScript v0.5** _Espresso_ _(Pre-release)_
  - Build a simple client-side todo list app
- **ViewScript v1** _Absinthe_
  - Compile ViewScript source code into abstract app objects
  - Bundle app objects with the Runtime as standalone executables

## Code Examples

[View Source...](https://github.com/alexyuly/ViewScript-Toolkit/tree/main/examples/bridge/src)

### HelloWorld

_JavaScript and TypeScript_

```ts
import { render, tag } from "viewscript-bridge";

render(
  tag("p", {
    font: "18px cursive",
    margin: "24px",
    content: "Hello, world!",
  })
);
```

_ViewScript_

```
render <p> {
  font = "18px cursive"
  margin = "24px"
  content = "Hello, world!"
}
```

### Log when button clicked

```ts
import { call, render, tag } from "viewscript-bridge";

render(
  tag("button", {
    onClick: call(console.log, "You clicked the button."),
    background: "whitesmoke",
    "border-radius": "4px",
    cursor: "pointer",
    display: "block",
    "font-size": "18px",
    margin: "24px",
    padding: "12px",
    content: "Click me!",
  })
);
```

```
render <button> {
  onClick = console.log "You clicked the button."
  background = "whitesmoke"
  border-radius = "4px"
  cursor = "pointer"
  display = "block"
  font-size = "18px"
  margin = "24px"
  padding = "12px"
  content = "Click me!"
}
```

### Update section while hovered

```ts
import { render, tag, view, when } from "viewscript-bridge";

render(
  view(
    {
      hovered: false,
    },
    ({ hovered }) =>
      tag("section", {
        onPointerLeave: hovered.off,
        onPointerOver: hovered.on,
        background: when(hovered, "black", "white"),
        border: "1px solid black",
        color: when(hovered, "white", "black"),
        font: "bold 24px serif",
        margin: "24px",
        padding: "24px",
        content: when(hovered, "I am hovered.", "Hover me!"),
      })
  )
);
```

```
render view {
  hovered = false

  <section> {
    onPointerLeave = hovered.off
    onPointerOver = hovered.on
    background = if hovered then "black" else "white"
    border = "1px solid black"
    color = if hovered then "white" else "black"
    font = "bold 24px serif"
    margin = "24px"
    padding = "24px"
    content = if hovered then "I am hovered." else "Hover me!"
  }
}
```

### Counter with increment and reset

```ts
import {
  boolean,
  field,
  render,
  stream,
  string,
  tag,
  view,
  when,
} from "viewscript-bridge";

const FancyButton = view(
  {
    onClick: stream(),
    content: field(string),
    disabled: field(boolean),
    hovered: false,
  },
  ({ onClick, content, disabled, hovered }) =>
    tag("button", {
      onClick,
      onPointerLeave: hovered.off,
      onPointerOver: hovered.on,
      "align-items": "center",
      background: when(disabled.not.and(hovered), "lightgray", "lightgreen"),
      color: "crimson",
      cursor: "pointer",
      disabled,
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      width: "100px",
      content,
    })
);

render(
  view(
    {
      clicks: 0,
    },
    ({ clicks }) =>
      tag("section", {
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
            onClick: clicks.add(1),
            disabled: clicks.isAtLeast(10),
            content: "Increment",
          }),
          FancyButton({
            onClick: clicks.setTo(0),
            disabled: clicks.is(0),
            content: "Reset",
          }),
          tag("span", {
            content: clicks,
          }),
        ],
      })
  )
);
```

```
FancyButton = view {
  onClick = stream
  content = string field
  disabled = boolean field
  hovered = false

  <button> {
    onClick
    onPointerLeave = hovered.off
    onPointerOver = hovered.on
    align-items = "center"
    background = if disabled (
      .not
      .and hovered
    ) then "lightgray" else "lightgreen"
    color = "crimson"
    cursor = "pointer"
    disabled
    display = "flex"
    font-weight = "bold"
    height = "100px"
    justify-content = "center"
    width = "100px"
    content
  }
}

render view {
  clicks = 0

  <section> {
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
    content = [
      FancyButton {
        onClick = clicks.add 1
        disabled = clicks.isAtLeast 10
        content = "Increment"
      }
      FancyButton {
        onClick = clicks.setTo 0
        disabled = clicks.is 0
        content = "Reset"
      }
      <span> {
        content = clicks
      }
    ]
  }
}
```

### Todo List App

_ViewScript 1.0 proposed syntax_

```
TodoItem = model {
  content = string field
  completed = false
}

TodoItemView = view {
  data = TodoItem field

  <li> {
    content = <label> {
      display = "flex"
      gap = "8px"
      align-items = "center"
      content = [
        <input> {
          type = "checkbox"
          checked = data.completed
          onChange = data.completed.toggle
        }
        data.content
      ]
    }
  }
}

render view {
  data = TodoItem field list

  onFormData = action {
    argument = FormDataEvent field
    data.push TodoItem {
      content = argument.formData.get "content"
    }
  }

  todoItemToView = TodoItemView method {
    argument = TodoItem field
    TodoItemView {
      data = argument
    }
  }

  <section> {
    content = [
      <h1> {
        content = "Todo List"
      }
      <form> {
        display = "flex"
        gap = "8px"
        align-items = "center"
        content = [
          <input> {
            type = "text"
            name = "content"
            placeholder = "Add a todo..."
          }
          <button> {
            type = "submit"
            content = "Add Todo"
          }
        ]
      }
      <ul> {
        content = data.map todoItemToView
      }
    ]
  }
}
```

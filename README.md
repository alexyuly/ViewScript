# ViewScript

_Power Tools For Web Apps_

> ⚠️ **ViewScript is in its early stages of development.** It's not ready to use for building apps, but a pre-release demo is available now. Please continue to check here for updated documentation, releases, and future plans.

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

- [**ViewScript 0.3.4**](https://github.com/alexyuly/ViewScript/releases/tag/v0.3.4) _(Pre-release)_

### Expected Releases:

- **ViewScript 0.5** _Espresso_ _(Pre-release)_
  - Build a simple client-side todo list app
- **ViewScript 1.0** _Absinthe_
  - Compile ViewScript source code into abstract app objects
  - Bundle app objects with the Runtime as standalone executables

## Code Examples _(under construction)_

[View TypeScript Source...](https://github.com/alexyuly/ViewScript-Toolkit/tree/main/examples/bridge/src)

### HelloWorld

_ViewScript 1.0 proposed syntax_

```
render <p> {
  font = "18px cursive"
  margin = "24px"
  content = "Hello, world!"
}
```

### Log when button clicked

_ViewScript 1.0 proposed syntax_

```
render <button> {
  click = window.console.(log "You clicked the button.")
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

_ViewScript 1.0 proposed syntax_

```
render view {
  hovered = false

  <section> {
    pointerLeave = hovered.(setTo false)
    pointerOver = hovered.(setTo true)
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

_ViewScript 1.0 proposed syntax_

```
FancyButton = view {
  click: output
  disabled: boolean
  content: string

  hovered = false

  <button> {
    click
    pointerLeave = hovered.(setTo false)
    pointerOver = hovered.(setTo true)
    disabled
    align-items = "center"
    background = if disabled.not.(and hovered) then "lightgray" else "lightgreen"
    color = "crimson"
    cursor = "pointer"
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
        click = clicks.(add 1)
        disabled = clicks.(isAtLeast 10)
        content = "Increment"
      }
      FancyButton {
        click = clicks.(setTo 0)
        disabled = clicks.(is 0)
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
  content: string
  completed = false
}

TodoItemView = view {
  data: TodoItem

  <li> {
    click = data.completed.toggle
    content = <label> {
      align-items = "center"
      display = "flex"
      gap = "8px"
      content = [
        <input> {
          checked = data.completed
          type = "checkbox"
        }
        data.content
      ]
    }
  }
}

render view {
  todoList = TodoItem list

  <section> {
    content = [
      <h1> {
        content = "Todo List"
      }
      <form> {
        submit = event -> event.preventDefault
        formData = event -> todoList.(push TodoItem {
          content = event.formData.(get "content")
        })
        align-items = "center"
        display = "flex"
        gap = "8px"
        content = [
          <input> {
            name = "content"
            placeholder = "Add a todo..."
            type = "text"
          }
          <button> {
            type = "submit"
            content = "Add Todo"
          }
        ]
      }
      <ul> {
        content = todoList.(map item => TodoItemView {
          data = item
        })
      }
    ]
  }
}
```

## ViewScript 1.0 Language Specification _(under construction)_

### Fields

Declare a field by specifying a value.

### Methods

```
# Declare a method of no parameter to the given result:
return result

# Declare a method of an implicitly typed parameter to the given result:
parameter => result

# Declare a method of an explicitly typed parameter to the given result:
parameter: type => result
```

### Actions

```
# Declare an action of no parameter to the given steps:
do {
  step_1
  step_2
  # etc...
}

# Declare an action of an implicitly typed parameter to the given single step:
parameter -> step

# Declare an action of an implicitly typed parameter to the given steps:
parameter -> {
  step_1
  step_2
  # etc...
}

# Declare an action of an explicitly typed parameter to the given single step:
parameter: type -> step

# Declare an action of an explicitly typed parameter to the given steps:
parameter: type -> {
  step_1
  step_2
  # etc...
}
```

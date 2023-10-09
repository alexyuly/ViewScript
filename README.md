# ViewScript

🧑‍🏭 _Power Tools For Web Apps_

## Attention

- 👋 ViewScript is in very early stages of development.
- 💁 It's not yet a fully fledged framework for building apps.
- 🙏 Please continue to check in for regular updates.

## Start

You'll need [Node.js](https://nodejs.org/) 18 to run ViewScript.

```
npm install viewscript-toolkit --global

viewscript create YourProjectName

cd YourProjectName

npm install

npm start
```

## Packages

- [**ViewScript-Bridge**](https://github.com/alexyuly/ViewScript-Bridge)
  - TypeScript API that you can use to build ViewScript apps
- [**ViewScript-Runtime**](https://github.com/alexyuly/ViewScript-Runtime)
  - JavaScript code that runs your ViewScript apps inside browsers

## Examples

[View Source...](https://github.com/alexyuly/ViewScript-Toolkit/tree/main/examples/bridge/src)

### HelloWorld

```ts
import { element, render } from "viewscript-bridge";

render(
  element("p", {
    content: "Hello, world!",
    font: "18px cursive",
    margin: "24px",
  })
);
```

_Proposed ViewScript v1.0 syntax:_

```
render <p>
   content = "Hello, world!"
   font = "18px cursive"
   margin = "24px"
```

### Log when button clicked

```ts
import { browser, element, render } from "viewscript-bridge";

render(
  element("button", {
    background: "whitesmoke",
    "border-radius": "4px",
    click: browser.console.log("You clicked the button."),
    content: "Click me!",
    cursor: "pointer",
    display: "block",
    "font-size": "18px",
    margin: "24px",
    padding: "12px",
  })
);
```

_Proposed ViewScript v1.0 syntax:_

```
render <button>
   background = "whitesmoke"
   border-radius = "4px"
   click = browser.console.log "You clicked the button."
   content = "Click me!"
   cursor = "pointer"
   display = "block"
   font-size = "18px"
   margin = "24px"
   padding = "12px"
```

### Update section while hovered

```ts
import { condition, element, render, view, when } from "viewscript-bridge";

render(
  view({ hovered: condition(false) }, ({ hovered }) =>
    element("section", {
      background: when(hovered, "black", "white"),
      border: "1px solid black",
      color: when(hovered, "white", "black"),
      content: when(hovered, "I am hovered.", "Hover me!"),
      font: "bold 24px serif",
      margin: "24px",
      padding: "24px",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
    })
  )
);
```

_Proposed ViewScript v1.0 syntax:_

```
render view
   define hovered as condition = false

   render <section>
      background = when hovered then "black" else "white"
      border = "1px solid black"
      color = when hovered then "white" else "black"
      content = when hovered then "I am hovered." else "Hover me!"
      font = "bold 24px serif"
      margin = "24px"
      padding = "24px"
      pointerleave = hovered.disable
      pointerover = hovered.enable
```

### Counter with increment and reset

```ts
import { count, element, render, stream, text, view } from "viewscript-bridge";

const FancyButton = view(
  { click: stream(), content: text() },
  ({ click, content }) =>
    element("button", {
      "align-items": "center",
      background: "lightgreen",
      click,
      color: "crimson",
      content,
      cursor: "pointer",
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      width: "100px",
    })
);

render(
  { FancyButton },
  view({ clicks: count(0) }, ({ clicks }) =>
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
        element(FancyButton, {
          click: clicks.add(1),
          content: "Increment",
        }),
        element(FancyButton, {
          click: clicks.reset,
          content: "Reset",
        }),
        element("span", {
          content: clicks,
        }),
      ],
    })
  )
);
```

_Proposed ViewScript v1.0 syntax:_

```
define FancyButton as view
   define click as stream
   define content as text

   render <button>
      align-items = "center"
      background = "lightgreen"
      click
      color = "crimson"
      content
      cursor = "pointer"
      display = "flex"
      font-weight = "bold"
      height = "100px"
      justify-content = "center"
      width = "100px"


render view
   define clicks as count = 0

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
      -- FancyButton
            click = clicks.add 1
            content = "Increment"

      -- FancyButton
            click = clicks.reset
            content = "Reset"

      -- <span>
            content = clicks
```

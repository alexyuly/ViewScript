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
import { app, element, view } from "viewscript-bridge";

function HelloWorld() {
  return view(
    element("p", {
      content: "Hello, world!",
      font: "18px cursive",
      margin: "24px",
    })
  );
}

app(HelloWorld());
```

_Proposed ViewScript v1.0 syntax:_

```
render view HelloWorld

   render <p>
      content = "Hello, world!"
      font = "18px cursive"
      margin = "24px"
```

### Log when button clicked

```ts
import { app, browser, element, view } from "viewscript-bridge";

function LogWhenButtonClicked() {
  return view(
    element("button", {
      background: "whitesmoke",
      "border-radius": "4px",
      click: browser.console.log("You clicked the button."),
      content: "Click me!",
      cursor: "pointer",
      "font-size": "18px",
      margin: "24px",
      padding: "12px",
    })
  );
}

app(LogWhenButtonClicked());
```

_Proposed ViewScript v1.0 syntax:_

```
render view LogWhenButtonClicked

   render <button>
      background = "whitesmoke"
      border-radius = "4px"
      click = browser.console.log "You clicked the button."
      content = "Click me!"
      cursor = "pointer"
      font-size = "18px"
      margin = "24px"
      padding = "12px"
```

### Update section while hovered

```ts
import { app, condition, conditional, element, view } from "viewscript-bridge";

function UpdateSectionWhileHovered() {
  const hovered = condition(false);

  return view(
    element("section", {
      background: conditional(hovered, "black", "white"),
      border: "1px solid black",
      color: conditional(hovered, "white", "black"),
      content: conditional(hovered, "I am hovered.", "Hover me!"),
      font: "bold 24px serif",
      margin: "24px",
      padding: "24px",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
    }),
    { hovered }
  );
}

app(UpdateSectionWhileHovered());
```

_Proposed ViewScript v1.0 syntax:_

```
render view UpdateSectionWhileHovered

   define hovered as Condition = false

   render <section>
      background = if hovered then "black" else "white"
      border = "1px solid black"
      color = if hovered then "white" else "black"
      content = if hovered then "I am hovered." else "Hover me!"
      font = "bold 24px serif"
      margin = "24px"
      padding = "24px"
      pointerleave = hovered.disable
      pointerover = hovered.enable
```

### Counter with increment and reset

```ts
import { app, count, element, view } from "viewscript-bridge";

function CounterWithIncrementAndReset() {
  const clicks = count(0);

  return view(
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
        element("button", {
          "align-items": "center",
          background: "lightgreen",
          click: clicks.add(1),
          color: "crimson",
          content: "Increment",
          cursor: "pointer",
          display: "flex",
          "font-weight": "bold",
          height: "100px",
          "justify-content": "center",
          width: "100px",
        }),
        element("button", {
          "align-items": "center",
          background: "lightgreen",
          click: clicks.reset,
          color: "crimson",
          content: "Reset",
          cursor: "pointer",
          display: "flex",
          height: "100px",
          "justify-content": "center",
          width: "100px",
        }),
        element("span", {
          content: clicks,
        }),
      ],
    }),
    { clicks }
  );
}

app(CounterWithIncrementAndReset());
```

### Render nested views

```ts
import {
  app,
  condition,
  conditional,
  element,
  text,
  view,
} from "viewscript-bridge";

function PrettyText() {
  const content = text();
  const hovered = condition(false);

  return view(
    element("p", {
      color: conditional(hovered, "red", "revert"),
      content,
      cursor: "pointer",
      font: "18px cursive",
      margin: "24px",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
    }),
    { content, hovered }
  );
}

const prettyText = PrettyText();

function RenderNestedViews() {
  return view(
    element("section", {
      background: "lavender",
      border: "1px dashed green",
      margin: "24px",
      content: [
        element(prettyText, {
          content: "PrettyText 1 checking in.",
        }),
        element(prettyText, {
          content: "PrettyText 2 checking in.",
        }),
      ],
    })
  );
}

app(RenderNestedViews(), { prettyText });
```

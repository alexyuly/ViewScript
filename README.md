# ViewScript

⚡️ _Power Tools For Web Apps_

## Start

```
npm install viewscript-toolkit --global

viewscript create YourProjectName

cd YourProjectName

npm start
```

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

### Update section while hovered

```ts
import { app, condition, conditional, element, view } from "viewscript-bridge";

function UpdateSectionWhileHovered() {
  const hovered = condition(false);

  return view(
    hovered,
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
    })
  );
}

app(UpdateSectionWhileHovered());
```

### Update nested element on click

```ts
import { app, count, element, view } from "viewscript-bridge";

function UpdateNestedElementOnClick() {
  const clicks = count(0);

  return view(
    clicks,
    element("section", {
      "align-items": "center",
      border: "2px dashed red",
      display: "flex",
      height: "200px",
      "justify-content": "center",
      margin: "24px",
      width: "200px",
      content: element("button", {
        "align-items": "center",
        background: "lightgreen",
        click: clicks.add(1),
        color: "crimson",
        content: clicks,
        cursor: "pointer",
        display: "flex",
        height: "100px",
        "justify-content": "center",
        width: "100px",
      }),
    })
  );
}

app(UpdateNestedElementOnClick());
```

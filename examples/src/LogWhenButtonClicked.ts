import { render, view, element, browser } from "viewscript-bridge";

render(
  view(
    element("button", {
      click: browser.console.log("You clicked the button."),
      content: "Click me!",
      cursor: "pointer",
    })
  )
);

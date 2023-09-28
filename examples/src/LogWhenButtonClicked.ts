import { render, view, element, browser } from "viewscript-bridge";

render(
  view(
    element("button", {
      content: "Click me!",
      click: browser.console.log("You clicked the button."),
    })
  )
);

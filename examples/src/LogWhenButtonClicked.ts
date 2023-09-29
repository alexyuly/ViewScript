import { render, view, element, browser } from "viewscript-bridge";

render(
  view(
    element("button", {
      click: browser.console.log("You clicked the button."), // TODO Fix issue where clicking logs the event object, not the given argument.
      content: "Click me!",
      cursor: "pointer",
      margin: "0 0 24px",
    })
  )
);

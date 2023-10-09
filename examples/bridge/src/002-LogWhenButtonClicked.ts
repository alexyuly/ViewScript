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

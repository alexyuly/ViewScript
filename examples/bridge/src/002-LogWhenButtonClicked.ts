import { app, view, element, browser } from "viewscript-bridge";

function LogWhenButtonClicked() {
  app(
    view(
      element("button", {
        background: "whitesmoke",
        border: "1px solid gainsboro",
        "border-radius": "4px",
        click: browser.console.log("You clicked the button."),
        content: "Click me!",
        cursor: "pointer",
        "font-size": "18px",
        margin: "24px",
        padding: "12px",
      })
    )
  );
}

LogWhenButtonClicked();

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

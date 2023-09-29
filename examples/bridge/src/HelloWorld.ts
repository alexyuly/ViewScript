import { app, view, element } from "viewscript-bridge";

app(
  view(
    element("p", {
      content: "Hello, world!",
      font: "18px cursive",
      margin: "24px",
    })
  )
);

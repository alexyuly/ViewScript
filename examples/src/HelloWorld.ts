import { render, view, element } from "viewscript-bridge";

render(
  view(
    element("p", {
      content: "Hello, world!",
      font: "18px cursive",
      margin: "0 0 24px",
    })
  )
);

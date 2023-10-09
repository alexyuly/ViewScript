import { element, render } from "viewscript-bridge";

render(
  element("p", {
    content: "Hello, world!",
    font: "18px cursive",
    margin: "24px",
  })
);

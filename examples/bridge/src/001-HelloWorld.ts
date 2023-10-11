import { element, render } from "viewscript-bridge";

const App = element("p", {
  content: "Hello, world!",
  font: "18px cursive",
  margin: "24px",
});

render(App);

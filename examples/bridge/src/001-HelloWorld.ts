import { render } from "viewscript-bridge";

// render <p> {
//   font = "18px cursive"
//   margin = "24px"
//   content = "Hello, world!"
// }

render("<p>", {
  font: "18px cursive",
  margin: "24px",
  content: "Hello, world!",
});

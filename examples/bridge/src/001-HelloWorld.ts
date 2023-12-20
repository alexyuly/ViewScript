import { render, tag } from "viewscript-bridge";

render(
  tag("p", {
    content: "Hello, world!",
  })
);

// <p> {
//   content: "Hello, world!"
// }

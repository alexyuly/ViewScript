import { imply, render, tag, value } from "viewscript-bridge";

render(() => {
  const hovered = value(false);

  return tag("p", {
    content: imply(hovered).then("I'm hovered.").else("Hover me!"),
    border: "1px solid blue",
    padding: "1rem",
    cursor: "pointer",
    pointerOver: hovered.set(true),
    pointerLeave: hovered.set(false),
  });
});

// hovered = false

// <p> {
//   content: if hovered then "I'm hovered." else "Hover me!"
//   border: "1px solid blue"
//   padding: "1rem"
//   cursor: "pointer"
//   pointerOver: hovered:set true
//   pointerLeave: hovered:set false
// }

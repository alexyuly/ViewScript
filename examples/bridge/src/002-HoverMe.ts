import { render, boolean, tag, _if } from "viewscript-bridge";

render(() => {
  const hovered = boolean("hovered", false);

  return tag("p", {
    content: _if(hovered).then("I'm hovered.").else("Hover me!"),
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

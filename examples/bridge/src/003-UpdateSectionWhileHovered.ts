import { _if, field, render, tag } from "viewscript-bridge";

// render view {
//   hovered = false

//   <section> {
//     pointerLeave: hovered.(setTo false)
//     pointerOver: hovered.(setTo true)
//     content: if hovered then "I am hovered." else "Hover me!"
//     color: if hovered then "white" else "black"
//     background: if hovered then "black" else "white"
//     border: "1px solid black"
//     font: "bold 24px serif"
//     margin: "24px"
//     padding: "24px"
//   }
// }

render(() => {
  const hovered = field(false);

  return tag("section", {
    pointerLeave: hovered.setTo(false),
    pointerOver: hovered.setTo(true),
    content: _if(hovered).then("I am hovered.").else("Hover me!"),
    color: _if(hovered).then("white").else("black"),
    background: _if(hovered).then("black").else("white"),
    border: "1px solid black",
    font: "bold 24px serif",
    margin: "24px",
    padding: "24px",
  });
});

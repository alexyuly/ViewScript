import { render, store, tag, when } from "viewscript-bridge";

// render view {
//   hovered = false

//   render <section> {
//     pointerLeave = hovered.(setTo false)
//     pointerOver = hovered.(setTo true)
//     background = if hovered then "black" else "white"
//     border = "1px solid black"
//     color = if hovered then "white" else "black"
//     font = "bold 24px serif"
//     margin = "24px"
//     padding = "24px"
//     content = if hovered then "I am hovered." else "Hover me!"
//   }
// }

render(() => {
  const hovered = store(false);

  return tag("<section>", {
    pointerLeave: hovered.setTo(false),
    pointerOver: hovered.setTo(true),
    background: when(hovered).then("black").else("white"),
    border: "1px solid black",
    color: when(hovered).then("white").else("black"),
    font: "bold 24px serif",
    margin: "24px",
    padding: "24px",
    content: when(hovered).then("I am hovered.").else("Hover me!"),
  });
});

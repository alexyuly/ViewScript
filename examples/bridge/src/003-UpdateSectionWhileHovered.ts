import { condition, element, render, view, when } from "viewscript-bridge";

render(
  view({ hovered: condition(false) }, ({ hovered }) =>
    element("section", {
      background: when(hovered, "black", "white"),
      border: "1px solid black",
      color: when(hovered, "white", "black"),
      content: when(hovered, "I am hovered.", "Hover me!"),
      font: "bold 24px serif",
      margin: "24px",
      padding: "24px",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
    })
  )
);

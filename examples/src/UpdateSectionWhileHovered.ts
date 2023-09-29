import {
  render,
  view,
  condition,
  element,
  conditional,
} from "viewscript-bridge";

function UpdateSectionWhileHovered() {
  const hovered = condition(false);

  return view(
    hovered,
    element("section", {
      background: conditional(hovered, "black", "white"),
      border: "1px solid black",
      color: conditional(hovered, "white", "black"),
      content: conditional(hovered, "I am hovered.", "Hover me!"), // TODO Fix issue where text is absent before hovering.
      cursor: "pointer",
      font: "24px serif bold", // TODO Fix issue where font doesn't get applied. Think I need to eliminate the setTimeout calls.
      margin: "0 0 24px",
      padding: "24px",
      pointerleave: hovered.disable(),
      pointerover: hovered.enable(),
    })
  );
}

render(UpdateSectionWhileHovered());

import { app, view, condition, element, conditional } from "viewscript-bridge";

function UpdateSectionWhileHovered() {
  const hovered = condition(false);

  app(
    view(
      hovered,
      element("section", {
        background: conditional(hovered, "black", "white"),
        border: "1px solid black",
        color: conditional(hovered, "white", "black"),
        content: conditional(hovered, "I am hovered.", "Hover me!"),
        font: "bold 24px serif",
        margin: "24px",
        padding: "24px",
        pointerleave: hovered.disable,
        pointerover: hovered.enable,
      })
    )
  );
}

UpdateSectionWhileHovered();

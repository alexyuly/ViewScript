import {
  app,
  condition,
  conditional,
  element,
  text,
  view,
} from "viewscript-bridge";

function PrettyText() {
  const content = text();
  const hovered = condition(false);

  return view(
    element("p", {
      color: conditional(hovered, "red", "revert"),
      content,
      cursor: "pointer",
      font: "18px cursive",
      margin: "24px",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
    }),
    { content, hovered }
  );
}

const prettyText = PrettyText();

function RenderNestedViews() {
  return view(
    element("section", {
      background: "lavender",
      border: "1px dashed green",
      margin: "24px",
      content: [
        element(prettyText, {
          content: "PrettyText 1 checking in.",
        }),
        element(prettyText, {
          content: "PrettyText 2 checking in.",
        }),
      ],
    })
  );
}

app(RenderNestedViews(), { prettyText });

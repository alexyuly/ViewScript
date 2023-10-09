import { count, element, render, stream, text, view } from "viewscript-bridge";

const FancyButton = view(
  { click: stream(), content: text() },
  ({ click, content }) =>
    element("button", {
      "align-items": "center",
      background: "lightgreen",
      click,
      color: "crimson",
      content,
      cursor: "pointer",
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      width: "100px",
    })
);

render(
  view({ clicks: count(0) }, ({ clicks }) =>
    element("section", {
      "align-items": "center",
      border: "2px dashed red",
      display: "flex",
      "flex-direction": "column",
      gap: "16px",
      height: "200px",
      "justify-content": "center",
      margin: "24px",
      padding: "12px",
      width: "200px",
      content: [
        element(FancyButton, {
          click: clicks.add(1),
          content: "Increment",
        }),
        element(FancyButton, {
          click: clicks.reset,
          content: "Reset",
        }),
        element("span", {
          content: clicks,
        }),
      ],
    })
  )
);

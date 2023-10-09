import { app, count, element, stream, text, view } from "viewscript-bridge";

function Button() {
  const click = stream();
  const content = text();

  return view(
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
    }),
    { click, content }
  );
}

const button = Button();

function CounterWithIncrementAndReset() {
  const clicks = count(0);

  return view(
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
        element(button, {
          click: clicks.add(1),
          content: "Increment",
        }),
        element(button, {
          click: clicks.reset,
          content: "Reset",
        }),
        element("span", {
          content: clicks,
        }),
      ],
    }),
    { clicks }
  );
}

app(CounterWithIncrementAndReset(), { button });

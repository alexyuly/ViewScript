import { app, count, element, view } from "viewscript-bridge";

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
        element("button", {
          "align-items": "center",
          background: "lightgreen",
          click: clicks.add(1),
          color: "crimson",
          content: "Increment",
          cursor: "pointer",
          display: "flex",
          "font-weight": "bold",
          height: "100px",
          "justify-content": "center",
          width: "100px",
        }),
        element("button", {
          "align-items": "center",
          background: "lightgreen",
          click: clicks.reset,
          color: "crimson",
          content: "Reset",
          cursor: "pointer",
          display: "flex",
          height: "100px",
          "justify-content": "center",
          width: "100px",
        }),
        element("span", {
          content: clicks,
        }),
      ],
    }),
    { clicks }
  );
}

app(CounterWithIncrementAndReset());

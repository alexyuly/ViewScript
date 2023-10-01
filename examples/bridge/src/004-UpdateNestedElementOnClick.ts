import { app, count, element, view } from "viewscript-bridge";

function UpdateNestedElementOnClick() {
  const clicks = count(0);

  return view(
    clicks,
    element("section", {
      "align-items": "center",
      border: "2px dashed red",
      display: "flex",
      height: "200px",
      "justify-content": "center",
      margin: "24px",
      width: "200px",
      content: element("button", {
        "align-items": "center",
        background: "lightgreen",
        click: clicks.add(1),
        color: "crimson",
        content: clicks,
        cursor: "pointer",
        display: "flex",
        height: "100px",
        "justify-content": "center",
        width: "100px",
      }),
    })
  );
}

app(UpdateNestedElementOnClick());

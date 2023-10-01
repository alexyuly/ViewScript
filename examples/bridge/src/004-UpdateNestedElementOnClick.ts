import { app, view, element } from "viewscript-bridge";

function UpdateNestedElementOnClick() {
  // TODO Add numeric state
  // TODO Update the state when a button is clicked
  // TODO Show the state inside a nested element

  return view(
    element("section", {
      "align-items": "center",
      border: "2px dashed red",
      display: "flex",
      height: "200px",
      "justify-content": "center",
      margin: "24px",
      width: "200px",

      content: element("section", {
        "align-items": "center",
        background: "lightgreen",
        color: "crimson",
        content: "Hi, there!",
        display: "flex",
        height: "100px",
        "justify-content": "center",
        width: "100px",
      }),
    })
  );
}

app(UpdateNestedElementOnClick());

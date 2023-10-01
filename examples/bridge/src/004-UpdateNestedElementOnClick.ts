import { app, view, element } from "viewscript-bridge";

function UpdateNestedElementOnClick() {
  // TODO Add numeric state
  // TODO Update the state when a button is clicked
  // TODO Show the state inside a nested element

  return view(
    element("section", {
      width: "200px",
      height: "200px",
      border: "2px dashed red",
      margin: "24px",
      content: element("section", {
        background: "green",
        width: "100px",
        height: "100px",
      }),
    })
  );
}

app(UpdateNestedElementOnClick());

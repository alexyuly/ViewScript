import { app, element, view } from "viewscript-bridge";

function HelloWorld() {
  return view(
    element("p", {
      content: "Hello, world!",
      font: "18px cursive",
      margin: "24px",
    })
  );
}

app(HelloWorld());

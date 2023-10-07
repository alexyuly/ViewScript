import { app, element, view } from "viewscript-bridge";

function SubView() {
  return view(
    element("p", {
      content: "Hello, world!",
      font: "18px cursive",
      margin: "24px",
    })
  );
}

const subView = SubView();

function MainView() {
  return view(element(subView));
}

app(MainView(), { subView });

// TODO Pass properties to elements constructed from views...

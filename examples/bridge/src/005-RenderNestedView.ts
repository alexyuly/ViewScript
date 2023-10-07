import { app, element, view } from "viewscript-bridge";

function SubView() {
  return view(
    element("p", {
      content: "Hi, I'm an instance of SubView",
      font: "18px cursive",
      margin: "24px",
    })
  );
}

const subView = SubView();

function MainView() {
  return view(
    element("section", {
      background: "lavender",
      border: "1px dashed green",
      content: [element(subView), element(subView)],
      margin: "24px",
    })
  );
}

app(MainView(), { subView });

// TODO Pass properties to elements constructed from views...

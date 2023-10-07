import { app, element, text, view } from "viewscript-bridge";

function SubView() {
  const content = text();

  return view(
    element("p", {
      content,
      font: "18px cursive",
      margin: "24px",
    }),
    { content }
  );
}

const subView = SubView();

function RenderNestedViews() {
  return view(
    element("section", {
      background: "lavender",
      border: "1px dashed green",
      margin: "24px",
      content: [
        element(subView, {
          content: "SubView 1 checking in.",
        }),
        element(subView, {
          content: "SubView 2 checking in.",
        }),
      ],
    })
  );
}

app(RenderNestedViews(), { subView });

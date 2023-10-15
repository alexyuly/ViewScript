import {
  boolean,
  element,
  number,
  render,
  stream,
  string,
  view,
  when,
} from "viewscript-bridge";

const FancyButton = view(
  { click: stream(), content: string(), disabled: boolean() },
  ({ click, content, disabled }) =>
    element("button", {
      "align-items": "center",
      background: "lightgreen",
      click: click(),
      color: "crimson",
      content: content(),
      cursor: when(disabled(), "not-allowed", "pointer"),
      disabled: disabled(),
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      width: "100px",
    })
);

const App = view({ clicks: number(0) }, ({ clicks }) =>
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
      FancyButton({
        click: clicks.add(1),
        content: "Increment",
        disabled: clicks.isAtLeast(10),
      }),
      FancyButton({
        click: clicks.reset,
        content: "Reset",
        disabled: false,
      }),
      element("span", {
        content: clicks(),
      }),
    ],
  })
);

render(App());

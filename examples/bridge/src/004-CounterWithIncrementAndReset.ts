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
  {
    click: stream(),
    content: string(),
    disabled: boolean(),
    hovered: boolean(false),
  },
  ({ click, content, disabled, hovered }) =>
    element("button", {
      "align-items": "center",
      background: when(hovered.and(disabled.not), "lightgreen", "lightgray"),
      click: click(),
      color: when(disabled(), "gray", "crimson"),
      content: content(),
      cursor: when(disabled(), "not-allowed", "pointer"),
      disabled: disabled(),
      display: "flex",
      "font-weight": "bold",
      height: "100px",
      "justify-content": "center",
      pointerleave: hovered.disable,
      pointerover: hovered.enable,
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
        disabled: clicks.isAtLeast(5),
      }),
      FancyButton({
        click: clicks.reset,
        content: "Reset",
        disabled: clicks.isExactly(0),
      }),
      element("span", {
        content: clicks(),
      }),
    ],
  })
);

render(App());

import { _if, field, render, tag, view, Output } from "viewscript-bridge";

// FancyButton = view {
//   content: string
//   click: output
//   disabled: boolean
//   hovered = false

//   <button> {
//     content
//     click
//     disabled
//     pointerLeave: hovered.(setTo false)
//     pointerOver: hovered.(setTo true)
//     background: if disabled.not.(and hovered) then "lightgray" else "lightgreen"
//     align-items: "center"
//     color: "crimson"
//     cursor: "pointer"
//     display: "flex"
//     font-weight: "bold"
//     height: "100px"
//     justify-content: "center"
//     width: "100px"
//   }
// }

const FancyButton = view<{
  content: string;
  click: Output;
  disabled: boolean;
}>(({ content, click, disabled }) => {
  const hovered = field(false);

  return tag("button", {
    content,
    click,
    disabled,
    pointerLeave: hovered.setTo(false),
    pointerOver: hovered.setTo(true),
    background: _if(disabled.not().and(hovered)).then("lightgray").else("lightgreen"),
    "align-items": "center",
    color: "crimson",
    cursor: "pointer",
    display: "flex",
    "font-weight": "bold",
    height: "100px",
    "justify-content": "center",
    width: "100px",
  });
});

// render view {
//   clicks = 0

//   <section> {
//     align-items: "center"
//     border: "2px dashed red"
//     display: "flex"
//     flex-direction: "column"
//     gap: "16px"
//     height: "200px"
//     justify-content: "center"
//     margin: "24px"
//     padding: "12px"
//     width: "200px"
//     content: [
//       FancyButton {
//         content: "Increment"
//         click: clicks.(add 1)
//         disabled: clicks.(isAtLeast 10)
//       }
//       FancyButton {
//         content: "Reset"
//         click: clicks.(setTo 0)
//         disabled: clicks.(is 0)
//       }
//       <span> {
//         content: clicks
//       }
//     ]
//   }
// }

render(() => {
  const clicks = field(0);

  return tag("section", {
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
        content: "Increment",
        click: clicks.add(1),
        disabled: clicks.isAtLeast(10),
      }),
      FancyButton({
        content: "Reset",
        click: clicks.setTo(0),
        disabled: clicks.is(0),
      }),
      tag("span", {
        content: clicks,
      }),
    ],
  });
});

import { render, store, tag, view, when, Output } from "viewscript-bridge";

// FancyButton = view {
//   click: output
//   disabled: boolean
//   content: string

//   hovered = false

//   render <button> {
//     click
//     pointerLeave = hovered.(setTo false)
//     pointerOver = hovered.(setTo true)
//     disabled
//     align-items = "center"
//     background = if disabled.not.(and hovered) then "lightgray" else "lightgreen"
//     color = "crimson"
//     cursor = "pointer"
//     display = "flex"
//     font-weight = "bold"
//     height = "100px"
//     justify-content = "center"
//     width = "100px"
//     content
//   }
// }

const FancyButton = view<{
  click: Output;
  disabled: boolean;
  content: string;
}>(({ click, disabled, content }) => {
  const hovered = store(false);

  return tag("<button>", {
    click,
    pointerLeave: hovered.setTo(false),
    pointerOver: hovered.setTo(true),
    disabled,
    "align-items": "center",
    background: when(disabled.not.and(hovered)).then("lightgray").else("lightgreen"),
    color: "crimson",
    cursor: "pointer",
    display: "flex",
    "font-weight": "bold",
    height: "100px",
    "justify-content": "center",
    width: "100px",
    content,
  });
});

// render view {
//   clicks = 0

//   render <section> {
//     align-items = "center"
//     border = "2px dashed red"
//     display = "flex"
//     flex-direction = "column"
//     gap = "16px"
//     height = "200px"
//     justify-content = "center"
//     margin = "24px"
//     padding = "12px"
//     width = "200px"
//     content = [
//       FancyButton {
//         click = clicks.(add 1)
//         disabled = clicks.(isAtLeast 10)
//         content = "Increment"
//       }
//       FancyButton {
//         click = clicks.(setTo 0)
//         disabled = clicks.(is 0)
//         content = "Reset"
//       }
//       <span> {
//         content = clicks
//       }
//     ]
//   }
// }

render(() => {
  const clicks = store(0);

  return tag("<section>", {
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
        disabled: clicks.isAtLeast(10),
        content: "Increment",
      }),
      FancyButton({
        click: clicks.setTo(0),
        disabled: clicks.is(0),
        content: "Reset",
      }),
      tag("<span>", {
        content: clicks,
      }),
    ],
  });
});

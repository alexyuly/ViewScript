import { render, window } from "viewscript-bridge";

render("<button>", {
  click: window.console.log("You clicked the button."),
  background: "whitesmoke",
  "border-radius": "4px",
  cursor: "pointer",
  display: "block",
  "font-size": "18px",
  margin: "24px",
  padding: "12px",
  content: "Click me!",
});

// render <button> {
//   click = window.console.log "You clicked the button."
//   background = "whitesmoke"
//   border-radius = "4px"
//   cursor = "pointer"
//   display = "block"
//   font-size = "18px"
//   margin = "24px"
//   padding = "12px"
//   content = "Click me!"
// }

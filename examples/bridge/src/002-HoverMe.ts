import {
  App,
  Field,
  Atom,
  RawValue,
  Reference,
  Implication,
  Action,
  Call,
} from "viewscript-bridge";

App(
  {
    hovered: Field(RawValue(false)),
  },
  Atom("p", {
    content: Field(
      Implication(
        Field(Reference(null, "hovered")),
        Field(RawValue("I'm hovered.")),
        Field(RawValue("Hover me!"))
      )
    ),
    border: Field(RawValue("1px solid blue")),
    padding: Field(RawValue("1rem")),
    cursor: Field(RawValue("pointer")),
    pointerOver: Action(Call(Field(Reference(null, "hovered")), "set", Field(RawValue(true)))),
    pointerLeave: Action(Call(Field(Reference(null, "hovered")), "set", Field(RawValue(false)))),
  })
);

// hovered = false

// <p> {
//   content: if hovered then "I'm hovered." else "Hover me!"
//   border: "1px solid blue"
//   padding: "1rem"
//   cursor: "pointer"
//   pointerOver: hovered:set true
//   pointerLeave: hovered:set false
// }

import { App, Field, Atom, RawValue } from "viewscript-bridge";

App(
  {},
  Atom("p", {
    content: Field(RawValue("Hello, world!")),
  })
);

// <p> {
//   content: "Hello, world!"
// }

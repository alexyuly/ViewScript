import {
  App,
  View,
  Field,
  Atom,
  RawValue,
  Reference,
  Expression,
  Implication,
  Action,
  Call,
  Procedure,
  ViewInstance,
} from "viewscript-bridge";

App(
  {
    TodoItem: View(
      {
        completed: Field(RawValue(false)),
      },
      Atom("li", {
        content: Field(
          Atom("label", {
            display: Field(RawValue("flex")),
            "align-items": Field(RawValue("center")),
            cursor: Field(RawValue("pointer")),
            content: Field(
              RawValue([
                Field(
                  Atom("input", {
                    type: Field(RawValue("checkbox")),
                    checked: Field(Reference(null, "completed")),
                    change: Action(Call(Field(Reference(null, "completed")), "toggle")),
                    cursor: Field(RawValue("inherit")),
                  })
                ),
                Field(
                  Atom("span", {
                    content: Field(Reference(null, "content")),
                    "text-decoration": Field(
                      Implication(
                        Field(Reference(null, "completed")),
                        Field(RawValue("line-through")),
                        Field(RawValue("none"))
                      )
                    ),
                  })
                ),
              ])
            ),
          })
        ),
      })
    ),
    todoItems: Field(RawValue([])),
  },
  Atom("main", {
    content: Field(
      RawValue([
        Field(
          Atom("form", {
            submit: Action(
              Procedure(
                "event",
                Action(Call(Field(Reference(null, "event")), "preventDefault")),
                Action(
                  Call(
                    Field(Reference(null, "todoItems")),
                    "push",
                    Field(
                      ViewInstance("TodoItem", {
                        content: Field(
                          Expression(
                            Field(
                              Expression(
                                null,
                                "FormData",
                                Field(Reference(Field(Reference(null, "event")), "target"))
                              )
                            ),
                            "get",
                            Field(RawValue("content"))
                          )
                        ),
                      })
                    )
                  )
                ),
                Action(Call(Field(Reference(Field(Reference(null, "event")), "target")), "reset"))
              )
            ),
            display: Field(RawValue("flex")),
            "align-items": Field(RawValue("center")),
            gap: Field(RawValue("1rem")),
            margin: Field(RawValue("1rem")),
            content: Field(
              RawValue([
                Field(
                  Atom("input", {
                    type: Field(RawValue("text")),
                    name: Field(RawValue("content")),
                    required: Field(RawValue(true)),
                    placeholder: Field(RawValue("What do you want to do?")),
                    padding: Field(RawValue("8px")),
                    width: Field(RawValue("200px")),
                  })
                ),
                Field(
                  Atom("button", {
                    type: Field(RawValue("submit")),
                    content: Field(RawValue("Add todo")),
                    cursor: Field(RawValue("pointer")),
                    "font-weight": Field(RawValue("bold")),
                    padding: Field(RawValue("8px")),
                  })
                ),
              ])
            ),
          })
        ),
        Field(
          Atom("ul", {
            margin: Field(RawValue("1rem")),
            content: Field(Reference(null, "todoItems")),
          })
        ),
      ])
    ),
  })
);

// TodoItem = view {
//   require content: string

//   completed = false

//   <li> {
//     content: <label> {
//       display: "flex"
//       align-items: "center"
//       cursor: "pointer"
//       content: [
//         <input> {
//           type: "checkbox"
//           checked: completed
//           change: completed:toggle
//           cursor: "inherit"
//         }
//         <span> {
//           content
//           text-decoration: if completed then "line-through" else "none"
//         }
//       ]
//     }
//   }
// }

// todoItems = TodoItem list

// <main> {
//   content: [
//     <form> {
//       submit: event -> {
//         event:preventDefault
//         todoItems:push TodoItem {
//           content: (FormData event.target)(get "content")
//         }
//         event.target:reset
//       }
//       display: "flex"
//       align-items: "center"
//       gap: "1rem"
//       margin: "1rem"
//       content: [
//         <input> {
//           type: "text"
//           name: "content"
//           required: true
//           placeholder: "What do you want to do?"
//           padding: "8px"
//           width: "200px"
//         }
//         <button> {
//           type: "submit"
//           content: "Add todo"
//           cursor: "pointer"
//           font-weight: "bold"
//           padding: "8px"
//         }
//       ]
//     }
//     <ul> {
//       margin: "1rem"
//       content: todoItems
//     }
//   ]
// }

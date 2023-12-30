import {
  App,
  View,
  Field,
  Atom,
  ViewInstance,
  RawValue,
  Reference,
  Expression,
  Implication,
  Action,
  Call,
  Procedure,
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
                      Implication(Field(Reference(null, "completed")), Field(RawValue("line-through")), Field(RawValue("none")))
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
                            Field(Expression(null, "FormData", Field(Reference(Field(Reference(null, "event")), "target")))),
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

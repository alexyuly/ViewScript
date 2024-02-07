import {
  App,
  ViewTemplate,
  ModelTemplate,
  Method,
  Field,
  Atom,
  View,
  Model,
  RawValue,
  Reference,
  Implication,
  Expression,
  Expectation,
  Action,
  Procedure,
  Call,
  Decision,
  Declaration,
} from "viewscript-bridge";

// TODO Read this value from an environment variable:
const API_HOST = "https://p485xnhgpd.execute-api.us-west-2.amazonaws.com";

App(
  {
    apiHost: Field(RawValue(API_HOST)),
    showConnectionError: Action([], Procedure([Call(null, "alert", Field(RawValue("Sorry, we could not connect to the server.")))])),
    showParseError: Action([], Procedure([Call(null, "alert", Field(RawValue("Sorry, we could not parse the server's response.")))])),
    showResponseError: Action(
      ["message"],
      Procedure([
        Call(
          null,
          "alert",
          Field(Expression(Field(RawValue("Sorry, the server responded with an error: ")), "concat", Field(Reference(null, "message"))))
        ),
      ])
    ),
    TodoItem: ModelTemplate({}),
    TodoItemView: ViewTemplate(
      {
        loading: Field(RawValue(false)),
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
                    cursor: Field(RawValue("inherit")),
                    checked: Field(Reference(null, "completed")),
                    disabled: Field(Reference(null, "loading")),
                    change: Action(
                      [],
                      Procedure([
                        Call(Field(Reference(null, "loading")), "set", Field(RawValue(true))),
                        Procedure([
                          Call(Field(Reference(null, "completed")), "toggle"),
                          Declaration(
                            "response",
                            Field(
                              Expectation(
                                Expression(
                                  null,
                                  "fetch",
                                  Field(
                                    Expression(
                                      Field(Expression(Field(Reference(null, "apiHost")), "concat", Field(RawValue("/todo-item/")))),
                                      "concat",
                                      Field(Reference(null, "id"))
                                    )
                                  ),
                                  Field(
                                    Model(
                                      ModelTemplate({
                                        method: Field(RawValue("PATCH")),
                                        headers: Field(
                                          RawValue({
                                            "Content-Type": "application/json",
                                          })
                                        ),
                                        body: Field(
                                          Expression(
                                            Field(Reference(null, "JSON")),
                                            "stringify",
                                            Field(
                                              Model(
                                                ModelTemplate({
                                                  completed: Field(Reference(null, "completed")),
                                                })
                                              )
                                            )
                                          )
                                        ),
                                      })
                                    )
                                  )
                                )
                              ),
                              Action([], Procedure([Call(null, "showConnectionError")]))
                            )
                          ),
                          Decision(
                            Field(Expression(Field(Reference(Field(Reference(null, "response")), "ok")), "not")),
                            Procedure([
                              Call(null, "showResponseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text")))),
                              Call(Field(Reference(null, "completed")), "toggle"),
                            ])
                          ),
                        ]),
                        Call(Field(Reference(null, "loading")), "set", Field(RawValue(false))),
                      ])
                    ),
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
    todoItems: Field(
      Procedure([
        Declaration(
          "response",
          Field(
            Expectation(
              Expression(null, "fetch", Field(Expression(Field(Reference(null, "apiHost")), "concat", Field(RawValue("/todo-items")))))
            )
          )
        ),
        Decision(
          Field(Reference(Field(Reference(null, "response")), "ok")),
          Procedure([
            Field(
              Expression(
                Field(Expectation(Expression(Field(Reference(null, "response")), "json"))),
                "map",
                Field(
                  RawValue(
                    Method(
                      ["it"],
                      Field(
                        Model("TodoItem", {
                          id: Field(Reference(Field(Reference(null, "it")), "id")),
                          content: Field(Reference(Field(Reference(null, "it")), "content")),
                          completed: Field(Reference(Field(Reference(null, "it")), "completed")),
                        })
                      )
                    )
                  )
                )
              ),
              Action([], Procedure([Call(null, "showParseError")]))
            ),
          ]),
          Procedure([Call(null, "showResponseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text"))))])
        ),
      ])
    ),
  },
  Atom("main", {
    padding: Field(RawValue("1rem")),
    background: Field(Implication(Field(Expression(Field(Reference(null, "todoItems")), "isVoid")), Field(RawValue("lightgray")))),
    content: Field(
      Implication(
        Field(Expression(Field(Reference(null, "todoItems")), "isVoid")),
        Field(Atom("p", { "text-align": Field(RawValue("center")), content: Field(RawValue("Loading...")) })),
        Field(
          RawValue([
            Field(
              Atom("form", {
                submit: Action(
                  ["event"],
                  Procedure([
                    Call(Field(Reference(null, "event")), "preventDefault"),
                    Declaration(
                      "response",
                      Field(
                        Expectation(
                          Expression(
                            null,
                            "fetch",
                            Field(Expression(Field(Reference(null, "apiHost")), "concat", Field(RawValue("/todo-item")))),
                            Field(
                              Model(
                                ModelTemplate({
                                  method: Field(RawValue("POST")),
                                  headers: Field(
                                    RawValue({
                                      "Content-Type": "application/json",
                                    })
                                  ),
                                  body: Field(
                                    Expression(
                                      Field(Reference(null, "JSON")),
                                      "stringify",
                                      Field(
                                        Model(
                                          ModelTemplate({
                                            content: Field(
                                              Expression(
                                                Field(
                                                  Expression(null, "FormData", Field(Reference(Field(Reference(null, "event")), "target")))
                                                ),
                                                "get",
                                                Field(RawValue("content"))
                                              )
                                            ),
                                          })
                                        )
                                      )
                                    )
                                  ),
                                })
                              )
                            )
                          )
                        ),
                        Action([], Procedure([Call(null, "showConnectionError")]))
                      )
                    ),
                    Decision(
                      Field(Reference(Field(Reference(null, "response")), "ok")),
                      Procedure([
                        Call(
                          Field(Reference(null, "todoItems")),
                          "push",
                          Field(
                            Expression(
                              Field(Expectation(Expression(Field(Reference(null, "response")), "json"))),
                              "into",
                              Field(
                                RawValue(
                                  Method(
                                    ["it"],
                                    Field(
                                      Model("TodoItem", {
                                        id: Field(Reference(Field(Reference(null, "it")), "id")),
                                        content: Field(Reference(Field(Reference(null, "it")), "content")),
                                        completed: Field(Reference(Field(Reference(null, "it")), "completed")),
                                      })
                                    )
                                  )
                                )
                              )
                            )
                          )
                        ),
                        Call(Field(Reference(Field(Reference(null, "event")), "target")), "reset"),
                      ]),
                      Procedure([
                        Call(null, "showResponseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text")))),
                      ])
                    ),
                  ])
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
        )
      )
    ),
  })
);

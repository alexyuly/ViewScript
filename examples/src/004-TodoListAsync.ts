import {
  App,
  View,
  Model,
  Method,
  Field,
  Atom,
  ViewInstance,
  ModelInstance,
  RawValue,
  Reference,
  Implication,
  Expression,
  Expectation,
  Action,
  Procedure,
  Call,
  Fork,
  Invocation,
} from "viewscript-bridge";

const API_HOST = "https://p485xnhgpd.execute-api.us-west-2.amazonaws.com";

App(
  {
    apiHost: Field(RawValue(API_HOST)),
    connectionError: Action(Call(null, "alert", Field(RawValue("Sorry, we could not connect to the server.")))),
    responseError: Action(
      Procedure(
        ["message"],
        Action(
          Call(
            null,
            "alert",
            Field(Expression(Field(RawValue("Sorry, the server responded with an error: ")), "plus", Field(Reference(null, "message"))))
          )
        )
      )
    ),
    parseError: Action(Call(null, "alert", Field(RawValue("Sorry, we could not parse the server's response.")))),
    TodoItem: View(
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
                      Procedure(
                        [],
                        Action(Call(Field(Reference(null, "loading")), "set", Field(RawValue(true)))),
                        Action(
                          Procedure(
                            [],
                            Action(Call(Field(Reference(null, "completed")), "toggle")),
                            Action(
                              Invocation(
                                Field(
                                  Expectation(
                                    Expression(
                                      null,
                                      "fetch",
                                      Field(
                                        Expression(
                                          Field(Expression(Field(Reference(null, "apiHost")), "plus", Field(RawValue("/todo-item/")))),
                                          "plus",
                                          Field(Reference(null, "id"))
                                        )
                                      ),
                                      Field(
                                        ModelInstance(
                                          Model({
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
                                                  ModelInstance(
                                                    Model({
                                                      completed: Field(Reference(null, "completed")),
                                                    })
                                                  )
                                                )
                                              )
                                            ),
                                          })
                                        )
                                      )
                                    ),
                                    Action(Call(null, "connectionError"))
                                  )
                                ),
                                Procedure(
                                  ["response"],
                                  Action(
                                    Fork(
                                      Field(Expression(Field(Reference(Field(Reference(null, "response")), "ok")), "not")),
                                      Action(
                                        Procedure(
                                          [],
                                          Action(
                                            Call(
                                              null,
                                              "responseError",
                                              Field(Expectation(Expression(Field(Reference(null, "response")), "text")))
                                            )
                                          ),
                                          Action(Call(Field(Reference(null, "completed")), "toggle"))
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        ),
                        Action(Call(Field(Reference(null, "loading")), "set", Field(RawValue(false))))
                      )
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
    response: Field(
      Expectation(
        Expression(null, "fetch", Field(Expression(Field(Reference(null, "apiHost")), "plus", Field(RawValue("/todo-items"))))),
        Action(Call(null, "connectionError"))
      )
    ),
    loading: Field(Expression(Field(Reference(null, "response")), "isVoid")),
    todoItems: Field(
      Implication(
        Field(Reference(Field(Reference(null, "response")), "ok")),
        Field(
          Expression(
            Field(Expectation(Expression(Field(Reference(null, "response")), "json"), Action(Call(null, "parseError")))),
            "map",
            Field(
              RawValue(
                Method(
                  ["each"],
                  Field(
                    ViewInstance("TodoItem", {
                      id: Field(Reference(Field(Reference(null, "each")), "id")),
                      content: Field(Reference(Field(Reference(null, "each")), "content")),
                      completed: Field(Reference(Field(Reference(null, "each")), "completed")), // TODO Allow the value of `completed` to be undefined and not crash ("optional fields" -- using try FIELD)
                    })
                  )
                )
              )
            )
          )
        ),
        Action(Call(null, "responseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text")))))
      )
    ),
  },
  Atom("main", {
    position: Field(RawValue("fixed")),
    top: Field(RawValue(0)),
    left: Field(RawValue(0)),
    right: Field(RawValue(0)),
    bottom: Field(RawValue(0)),
    padding: Field(RawValue("1rem")),
    background: Field(Implication(Field(Reference(null, "loading")), Field(RawValue("lightgray")))),
    content: Field(
      Implication(
        Field(Reference(null, "loading")),
        Field(Atom("p", { "text-align": Field(RawValue("center")), content: Field(RawValue("Loading...")) })),
        Field(
          RawValue([
            Field(
              Atom("form", {
                submit: Action(
                  Procedure(
                    ["event"],
                    Action(Call(Field(Reference(null, "event")), "preventDefault")),
                    Action(
                      Invocation(
                        Field(
                          Expectation(
                            Expression(
                              null,
                              "fetch",
                              Field(Expression(Field(Reference(null, "apiHost")), "plus", Field(RawValue("/todo-item")))),
                              Field(
                                ModelInstance(
                                  Model({
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
                                          ModelInstance(
                                            Model({
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
                                      )
                                    ),
                                  })
                                )
                              )
                            ),
                            Action(Call(null, "connectionError"))
                          )
                        ),
                        Procedure(
                          ["response"],
                          Action(
                            Fork(
                              Field(Reference(Field(Reference(null, "response")), "ok")),
                              Action(
                                Invocation(
                                  Field(
                                    Expectation(Expression(Field(Reference(null, "response")), "json"), Action(Call(null, "parseError")))
                                  ),
                                  Procedure(
                                    ["json"],
                                    Action(
                                      Call(
                                        Field(Reference(null, "todoItems")),
                                        "push",
                                        Field(
                                          ViewInstance("TodoItem", {
                                            id: Field(Reference(Field(Reference(null, "json")), "id")),
                                            content: Field(Reference(Field(Reference(null, "json")), "content")),
                                            completed: Field(RawValue(false)),
                                          })
                                        )
                                      )
                                    ),
                                    Action(Call(Field(Reference(Field(Reference(null, "event")), "target")), "reset"))
                                  )
                                )
                              ),
                              Action(
                                Call(null, "responseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text"))))
                              )
                            )
                          )
                        )
                      )
                    )
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
        )
      )
    ),
  })
);

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
  Expression,
  Expectation,
  Implication,
  Action,
  Procedure,
  Call,
  Invocation,
  Gate,
} from "viewscript-bridge";

const API_HOST = "https://p485xnhgpd.execute-api.us-west-2.amazonaws.com";

App(
  {
    apiHost: Field(RawValue(API_HOST)),
    connectionError: Action(Call(null, "alert", Field(RawValue("Sorry, we could not connect to the server.")))),
    responseError: Action(
      Procedure(
        "message",
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
        completed: Field(RawValue(false)),
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
                        null,
                        Action(Call(Field(Reference(null, "completed")), "toggle")),
                        Action(Call(Field(Reference(null, "loading")), "set", Field(RawValue(true)))),
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
                                            Field(
                                              Expression(
                                                null,
                                                "JSON",
                                                Field(
                                                  ModelInstance(
                                                    Model({
                                                      completed: Field(Reference(null, "completed")),
                                                    })
                                                  )
                                                )
                                              )
                                            ),
                                            "stringify"
                                          )
                                        ),
                                      })
                                    )
                                  )
                                )
                              ),
                              Action(Call(null, "connectionError"))
                            ),
                            Procedure(
                              "response",
                              Action(
                                Gate(
                                  Field(Expression(Field(Reference(Field(Reference(null, "response")), "ok")), "not")),
                                  Action(
                                    Procedure(
                                      null,
                                      Action(
                                        Call(
                                          null,
                                          "responseError",
                                          Field(Expectation(Expression(Field(Reference(null, "response")), "text"))) // TODO Wrap this and other expectations used in actions in invocations
                                        )
                                      ),
                                      Action(Call(Field(Reference(null, "completed")), "toggle")),
                                      Action(Call(Field(Reference(null, "loading")), "set", Field(RawValue(false))))
                                    )
                                  )
                                )
                              ),
                              Action(Call(Field(Reference(null, "loading")), "set", Field(RawValue(false))))
                            )
                          )
                        )
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
      Expectation(Expression(null, "fetch", Field(Expression(Field(Reference(null, "apiHost")), "plus", Field(RawValue("/todo-items")))))),
      Action(Call(null, "connectionError"))
    ),
    todoItems: Field(
      Implication(
        Field(Reference(Field(Reference(null, "response")), "ok")),
        Field(
          Expression(
            Field(Expectation(Expression(Field(Reference(null, "response")), "json")), Action(Call(null, "parseError"))),
            "map",
            Field(
              RawValue(
                Method(
                  "each",
                  Field(
                    ViewInstance("TodoItem", {
                      id: Field(Reference(Field(Reference(null, "each")), "id")),
                      content: Field(Reference(Field(Reference(null, "each")), "content")),
                      completed: Field(Reference(Field(Reference(null, "each")), "completed")),
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
    content: Field(
      RawValue([
        Field(
          Atom("form", {
            submit: Action(
              Procedure(
                "event",
                Action(Call(Field(Reference(null, "event")), "preventDefault")),
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
                                method: Field(RawValue("POST")),
                                headers: Field(
                                  RawValue({
                                    "Content-Type": "application/json",
                                  })
                                ),
                                body: Field(
                                  Expression(
                                    Field(
                                      Expression(
                                        null,
                                        "JSON",
                                        Field(
                                          ModelInstance(
                                            Model({
                                              completed: Field(Reference(null, "completed")),
                                            })
                                          )
                                        )
                                      )
                                    ),
                                    "stringify"
                                  )
                                ),
                              })
                            )
                          )
                        )
                      ),
                      Action(Call(null, "connectionError"))
                    ),
                    Procedure(
                      "response",
                      Action(
                        Gate(
                          Field(Expression(Field(Reference(Field(Reference(null, "response")), "ok")), "not")),
                          Action(Call(null, "responseError", Field(Expectation(Expression(Field(Reference(null, "response")), "text")))))
                        )
                      ),
                      Action(
                        Invocation(
                          Field(Expectation(Expression(Field(Reference(null, "response")), "json")), Action(Call(null, "parseError"))),
                          Procedure(
                            "post",
                            Action(
                              Call(
                                Field(Reference(null, "todoItems")),
                                "push",
                                Field(
                                  ViewInstance("TodoItem", {
                                    id: Field(Reference(Field(Reference(null, "post")), "id")),
                                    content: Field(Reference(Field(Reference(null, "post")), "content")),
                                  })
                                )
                              )
                            ),
                            Action(Call(Field(Reference(Field(Reference(null, "event")), "target")), "reset"))
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
    ),
  })
);

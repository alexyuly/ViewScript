// TODO
// This is a work in progress...

import {
  browser,
  condition,
  element,
  render,
  stream,
  text,
  view,
} from "viewscript-bridge";

// TODO Support models, and define the TodoItem model.

const TodoListItem = view(
  {
    content: text(),
    done: condition(),
    markAsDone: stream(),
  },
  ({ content, done, markAsDone }) =>
    element("li", {
      click: markAsDone,
      cursor: "pointer",
      margin: "8px 0",
      display: "flex",
      "flex-direction": "row",
      "align-items": "center",
      gap: "4px",
      content: [
        element("input", {
          type: "checkbox",
          cursor: "inherit",
          checked: done,
        }),
        element("span", {
          content,
        }),
        // TODO Make this work:
        // content,
      ],
    })
);

render(
  element("section", {
    margin: "24px",
    display: "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
    gap: "8px",
    font: "medium sans-serif",
    content: [
      element("h1", {
        content: "TodoMVC",
        margin: 0,
      }),
      element("hr", {
        width: "100%",
      }),
      element("form", {
        // TODO Handle form submit events.
        display: "flex",
        "flex-direction": "column",
        "align-items": "flex-start",
        gap: "8px",
        content: [
          element("label", {
            display: "flex",
            "flex-direction": "column",
            "align-items": "flex-start",
            gap: "8px",
            content: [
              element("span", {
                content: "Create a new todo:",
              }),
              element("input", {
                type: "text",
                font: "inherit",
                placeholder: "Enter todo text here...",
              }),
            ],
          }),
          element("button", {
            type: "submit",
            font: "inherit",
            "font-weight": "bold",
            content: "Add todo",
          }),
        ],
      }),
      element("hr", {
        width: "100%",
      }),
      element("ul", {
        margin: 0,
        "padding-inline": "16px 0",
        // TODO Iterate over a collection, instead of hardcoding elements:
        content: [
          element(TodoListItem, {
            content: "Todo List Item 1",
            done: true,
            markAsDone: browser.console.log("You clicked a todo checkbox!"),
          }),
          element(TodoListItem, {
            content: "Todo List Item 2",
            done: false,
            markAsDone: browser.console.log("You clicked a todo checkbox!"),
          }),
        ],
      }),
    ],
  })
);

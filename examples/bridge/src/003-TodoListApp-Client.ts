import { Event, Window, boolean, imply, render, tag, view } from "viewscript-bridge";

const TodoItem = view<{
  content: string;
}>(({ content }) => {
  const completed = boolean(false);

  return tag("li", {
    content: tag("label", {
      display: "flex",
      "align-items": "center",
      cursor: "pointer",
      content: [
        tag("input", {
          type: "checkbox",
          checked: completed,
          change: completed.toggle,
          cursor: "inherit",
        }),
        tag("span", {
          content,
          "text-decoration": imply(completed).then("line-through").else("none"),
        }),
      ],
    }),
  });
});

render(() => {
  const todoItems = TodoItem.list();

  return tag("main", {
    content: [
      tag("form", {
        submit: () => [
          Event.preventDefault,
          todoItems.push(
            TodoItem({
              content: Window.FormData(Event.target).get("content"),
            })
          ),
          // TODO Reset the form
        ],
        display: "flex",
        "align-items": "center",
        gap: "1rem",
        margin: "1rem",
        content: [
          tag("input", {
            type: "text",
            name: "content",
            placeholder: "What do you want to do?",
            padding: "8px",
            width: "200px",
          }),
          tag("button", {
            type: "submit",
            content: "Add todo",
            cursor: "pointer",
            "font-weight": "bold",
            padding: "8px",
          }),
        ],
      }),
      tag("ul", {
        margin: "1rem",
        content: todoItems,
      }),
    ],
  });
});

// TodoItem = view {
//   require content: string

//   completed = false

//   <li> {
//     click: completed:toggle
//     content: <label> {
//       cursor: "pointer"
//       display: "flex"
//       align-items: "center"
//       content: [
//         <input> {
//           cursor: "inherit"
//           type: "checkbox"
//           checked: completed
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
//           content: window(FormData event.target)(get "content")
//         }
//       }
//       display: "flex"
//       align-items: "center"
//       gap: "1rem"
//       margin: "1rem"
//       content: [
//         <input> {
//           type: "text"
//           name: "content"
//           placeholder: "What do you want to do?"
//         }
//         <button> {
//           type: "submit"
//         }
//       ]
//     }
//     <ul> {
//       margin: "1rem"
//       content: todoItems
//     }
//   ]
// }

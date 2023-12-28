import { FormData, SubmitEvent, boolean, render, tag, view, when } from "viewscript-bridge";

render(() => {
  const TodoItem = view(({ content }) => {
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
            "text-decoration": when(completed).then("line-through").else("none"),
          }),
        ],
      }),
    });
  });

  const todoItems = TodoItem.list();

  return tag("main", {
    content: [
      tag("form", {
        submit: () => [
          SubmitEvent.preventDefault,
          todoItems.push(
            TodoItem({
              content: FormData(SubmitEvent.target).get("content"),
            })
          ),
          SubmitEvent.target.reset,
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
            required: true,
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

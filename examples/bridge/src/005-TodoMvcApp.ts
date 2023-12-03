import { model, render, store, tag, view } from "viewscript-bridge";

// TodoItem = model {
//   content: string
//   completed = false
// }

const TodoItem = model<{
  content: string;
}>((scope) => ({
  ...scope,
  completed: store(false),
}));

// TodoItemView = view {
//   data: TodoItem

//   render <li> {
//     click = data.completed.toggle
//     content = <label> {
//       align-items = "center"
//       display = "flex"
//       gap = "8px"
//       content = [
//         <input> {
//           checked = data.completed
//           type = "checkbox"
//         }
//         data.content
//       ]
//     }
//   }
// }

const TodoItemView = view<{
  data: typeof TodoItem;
}>(({ data }) => {
  return tag("<li>", {
    click: data.completed.toggle,
    content: tag("<label>", {
      "align-items": "center",
      display: "flex",
      gap: "8px",
      content: [
        tag("<input>", {
          checked: data.completed,
          type: "checkbox",
        }),
        data.content,
      ],
    }),
  });
});

// render view {
//   todoList = TodoItem list

//   render <section> {
//     content = [
//       <h1> {
//         content = "Todo List"
//       }
//       <form> {
//         submit = event -> event.preventDefault
//         formData = event -> todoList.(push TodoItem {
//           content = event.formData.(get "content")
//         })
//         align-items = "center"
//         display = "flex"
//         gap = "8px"
//         content = [
//           <input> {
//             name = "content"
//             placeholder = "Add a todo..."
//             type = "text"
//           }
//           <button> {
//             type = "submit"
//             content = "Add Todo"
//           }
//         ]
//       }
//       <ul> {
//         content = data.(map item => TodoItemView {
//           data = item
//         })
//       }
//     ]
//   }
// }

render(() => {
  const todoList = TodoItem.list();

  return tag("<section>", {
    content: [
      tag("<h1>", {
        content: "Todo List",
      }),
      tag("<form>", {
        // TODO fix:
        submit: (event) => event.preventDefault(),
        formData: (event) =>
          todoList.push(
            TodoItem({
              content: event.formData.get("content"),
            })
          ),
        "align-items": "center",
        display: "flex",
        gap: "8px",
        content: [
          tag("<input>", {
            name: "content",
            placeholder: "Add a todo...",
            type: "text",
          }),
          tag("<button>", {
            type: "submit",
            content: "Add Todo",
          }),
        ],
      }),
      tag("<ul>", {
        // TODO fix:
        content: todoList.map((item) =>
          TodoItemView({
            data: item,
          })
        ),
      }),
    ],
  });
});

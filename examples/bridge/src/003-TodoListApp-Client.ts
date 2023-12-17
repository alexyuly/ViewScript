// import { FormDataEvent, SubmitEvent, imply, render, tag, value, view } from "viewscript-bridge";

// const TodoItem = view<{
//   content: string;
// }>(({ content }) => {
//   const completed = value(false);

//   return tag("li", {
//     click: completed.toggle,
//     content: tag("label", {
//       display: "flex",
//       "align-items": "center",
//       content: [
//         tag("input", {
//           type: "checkbox",
//           checked: completed,
//         }),
//         tag("span", {
//           content,
//           "text-decoration": imply(completed).then("line-through").else("none"),
//         }),
//       ],
//     }),
//   });
// });

// const todoItems = TodoItem.list();

// render(
//   tag("main", {
//     content: [
//       tag("form", {
//         submit: (event: SubmitEvent) => event.preventDefault,
//         formData: (event: FormDataEvent) =>
//           todoItems.push(
//             TodoItem({
//               content: event.formData.get("content"),
//             })
//           ),
//         display: "flex",
//         "align-items": "center",
//         gap: "1rem",
//         margin: "1rem",
//         content: [
//           tag("input", {
//             type: "text",
//             name: "content",
//             placeholder: "What do you want to do?",
//           }),
//           tag("button", {
//             type: "submit",
//           }),
//         ],
//       }),
//       tag("ul", {
//         margin: "1rem",
//         content: todoItems,
//       }),
//     ],
//   })
// );

// // TodoItem = view {
// //   require content: string

// //   completed = false

// //   <li> {
// //     click: completed:toggle
// //     content: <label> {
// //       display: "flex"
// //       align-items: "center"
// //       content: [
// //         <input> {
// //           type: "checkbox"
// //           checked: completed
// //         }
// //         <span> {
// //           content
// //           text-decoration: if completed then "line-through" else "none"
// //         }
// //       ]
// //     }
// //   }
// // }

// // todoItems = TodoItem list

// // <main> {
// //   content: [
// //     <form> {
// //       submit: event -> event:preventDefault
// //       formData: event -> todoItems:push TodoItem {
// //         content: event.formData(get "content")
// //       }
// //       display: "flex"
// //       align-items: "center"
// //       gap: "1rem"
// //       margin: "1rem"
// //       content: [
// //         <input> {
// //           type: "text"
// //           name: "content"
// //           placeholder: "What do you want to do?"
// //         }
// //         <button> {
// //           type: "submit"
// //         }
// //       ]
// //     }
// //     <ul> {
// //       margin: "1rem"
// //       content: todoItems
// //     }
// //   ]
// // }

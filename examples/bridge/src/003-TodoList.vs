TodoItem = view {
  require content: string

  completed = false

  <li> {
    content: <label> {
      display: "flex"
      align-items: "center"
      cursor: "pointer"
      content: [
        <input> {
          type: "checkbox"
          checked: completed
          change: completed:toggle
          cursor: "inherit"
        }
        <span> {
          content
          text-decoration: if completed then "line-through" else "none"
        }
      ]
    }
  }
}

todoItems = TodoItem list

<main> {
  content: [
    <form> {
      submit: event -> {
        event:preventDefault
        todoItems:push TodoItem {
          content: (FormData event.target)(get "content")
        }
        event.target:reset
      }
      display: "flex"
      align-items: "center"
      gap: "1rem"
      margin: "1rem"
      content: [
        <input> {
          type: "text"
          name: "content"
          required: true
          placeholder: "What do you want to do?"
          padding: "8px"
          width: "200px"
        }
        <button> {
          type: "submit"
          content: "Add todo"
          cursor: "pointer"
          font-weight: "bold"
          padding: "8px"
        }
      ]
    }
    <ul> {
      margin: "1rem"
      content: todoItems
    }
  ]
}

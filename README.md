# ViewScript

_Power Tools For Web Apps_

> ⚠️ **ViewScript is in its early stages of development.** It's not ready to use for building apps, but a pre-release demo is available now. Please continue to check here for updated documentation, releases, and future plans.

## Start

You'll need [Node.js](https://nodejs.org/) 20 to run ViewScript.

```
npm install viewscript-toolkit --global

viewscript create YourProjectName

cd YourProjectName

npm install

npm start
```

## Overview

Every ViewScript app is represented by a JSON object of type App from the [ViewScript Abstract Syntax Tree](https://github.com/alexyuly/ViewScript-Runtime/blob/main/lib/abstract.ts).

Today, JavaScript and TypeScript developers can use the [ViewScript Bridge](https://github.com/alexyuly/ViewScript-Bridge) to build App objects, using ergonomic helper functions. The Bridge hands off App objects to the [ViewScript Runtime](https://github.com/alexyuly/ViewScript-Runtime), which executes them.

In future, developers will be able to write apps using the ViewScript language, and the Compiler will build App objects, to be bundled with the Runtime as standalone executables.

### Latest Release:

- [**ViewScript 0.4.0**](https://github.com/alexyuly/ViewScript/releases/tag/v0.4.0) _(Pre-release)_
  - Build a client-side todo list app using ViewScript Bridge

### Expected Releases:

- **ViewScript 0.5** _Espresso (Pre-release)_
  - Add network requests to the todo list app using ViewScript Bridge
  - Implement tasks, models, and methods
- **ViewScript 1.0** _Absinthe_
  - Introduce the ViewScript programming language
  - Compile ViewScript source code into app trees
  - Bundle app trees with ViewScript Runtime as standalone HTML and JS

## ViewScript-Bridge Code Examples

https://github.com/alexyuly/ViewScript/tree/main/examples/bridge/src

## ⚠️ _Under Construction:_ Documentation, Diagrams, & Examples

- _(Please contact me to request access to this book:)_ [Introducing ViewScript](https://www.notion.so/Introducing-ViewScript-2095ed387eef4a0bb1c3b3e65ce9bd49?pvs=4)
- [ViewScript 1.0: Runtime Component Architecture](https://docs.google.com/drawings/d/1LRafgAPSCHSI-0Jk1Wtl2VgzIShv9PL5g_7FgzXjw0s/edit)
- [ViewScript: "fast" pattern overview diagram](https://docs.google.com/drawings/d/1Z5MlcPyXpO_ABCGuZKSg4KjQxWoTkmwedCKvHPJ92SA/edit)

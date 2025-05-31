---
title: How to enable Remix Server-side and Client-side Debugger in Vscode
date: 2023-05-26 18:37:35
categories: Config
---

1. Open the command palette by pressing `cmd + shift + p` (or `ctrl + shift + p` on Windows and Linux).
2. Type `debug npm script` in the search bar, then select the `dev` script or any other script you prefer from your `package.json`.
3. Terminate any running Node.js servers in the terminal for this project, then navigate to the Run and Debug section by pressing `shift + cmd + d` in the left sidebar of VSCode.
4. After completing the previous steps, the **server-side** debugger should be attached. The bottom of the VSCode editor will display an orange indicator, and breakpoints in loader and action functions will activate debugger actions.
5. If this is your first time running the debugger, create a new configuration from the dropdown menu. This will generate a `Launch.json` file in the `.vscode` folder. Add the following configuration to the file and save it.
``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/public/build"
    }
  ]
}
```
6. Select `Launch Chrome` from the dropdown menu. This will open a Chrome browser, with the initial landing port set to 3000.
7. You should now have the **client-side** debugger attached as well.
8. Feel free to add more breakpoints and enjoy coding!
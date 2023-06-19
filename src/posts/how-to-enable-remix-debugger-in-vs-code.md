---
title: How to enable Remix Server-side and Client-side Debugger in Vscode
date: 2023-05-26 18:37:35
---

1. Open editor commands, `cmd + shift + p`, (or `ctrl + shift + p` from Windows and Linux machine).

2. Search `debug npm script`, and select the `dev` script or what ever scripts you like in `package.json`.

3. Close all node running server in terminal for this project, and open Run and Debug (`shift + cmd + d`) from left side panel from vscode.

4. After above step you should have **server-side** debugger attached, and bottom of the vscode editor will show orange, break points in loader and action functions will trigger debugger actions.

5. For first time to run the debugger, add a new configuration from the dropdown input, and it will create `Launch.json` under `.vscode` folder. Add below configuration into the file and save it.

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

6. Choose `Launch Chrome` from previous dropdown input, a chrome browser will be opened and 3000 is initial landing port.

7. You should now have **client-side** debugger also attached.

8. Add more breakpoints and happy coding.
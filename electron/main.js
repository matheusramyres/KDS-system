import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const window = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      autoplayPolicy: "no-user-gesture-required",
      contextIsolation: true,
    },
  });

  window.loadURL("http://localhost:5173");
  window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

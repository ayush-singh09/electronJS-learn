import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { polling } from "./resourceUsage.js";
import { getPreloadPath } from "./pathResolver.js";

const createWindow = () => {// 1. Get the primary display's available work area (excludes taskbars/menus)
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    // 2. Define your window size
    const winWidth = 250;
    const winHeight = 400;

    // 3. Calculate position (e.g., 20% from left, 10% from top)
    const xPos = Math.floor(width * 0.82);
    const yPos = Math.floor(height * 0.00);

    const win = new BrowserWindow({
        title: "System Monitor",
        width: winWidth,
        height: winHeight,
        maxHeight: winHeight,
        maxWidth: winWidth,
        minHeight: winHeight,
        minWidth: winWidth,
        frame: false,
        // kiosk: true,
        // movable: false,
        alwaysOnTop: true,
        fullscreenable: false,
        x: xPos,
        y: yPos,
        webPreferences: {
            preload: getPreloadPath()
        }
    })

    if (isDev()) {
        win.loadURL("http://localhost:5173")
    }
    else win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"))
}

app.whenReady().then(() => {
    createWindow()

    polling()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
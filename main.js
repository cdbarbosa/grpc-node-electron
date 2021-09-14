const { BrowserWindow, app, Tray, Menu, screen } = require('electron')
const path = require('path')

let window
let trayWindow
let tray = null

function createWindow () {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    window.loadFile('index.html')
}

function createTrayWindow () {
    trayWindow = new BrowserWindow({
        width: 300,
        height: 500,
        show: false,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    trayWindow.loadFile('tray/tray.html')
    trayWindow.setPosition(screen.getPrimaryDisplay().bounds.width - 400, 550)
}

app.whenReady().then(() => {
    // createWindow()
    createTrayWindow()
    const icon = path.join(__dirname, 'tray', 'image.png')
    tray = new Tray(icon)
    tray.on('click', () => {
        trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
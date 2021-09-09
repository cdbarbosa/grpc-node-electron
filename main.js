const { BrowserWindow, app } = require('electron')

let window

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

app.whenReady().then(() => createWindow())

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
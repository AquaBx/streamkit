const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('src/index.html')
  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


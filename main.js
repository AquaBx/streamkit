const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    frame: true,
    width: 1000,
    height: 620,
    
  })
  win.setMenu(null)
  win.loadFile('src/index.html')
}


app.on('window-all-closed', () => {
  app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

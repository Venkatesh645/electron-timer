const path = require('path');
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    alwaysOnTop: true,
    autoHideMenuBar: true,
    height: 100,
    width: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('time-up', (event, title) => {
    const notificationInstance = new Notification({
      title: "Times Up!",
      timeoutType: 'never',
      icon: "images.png"
    });
    notificationInstance.on('click', () =>{} )
    notificationInstance.show()
  })

  const pathValue = `${path.join(__dirname, 'build', 'index.html')}`;
  console.log('isDev: ', isDev)
  console.log('pathValue:', pathValue)

  // and load the index.html of the app.
  if (isDev) {
    win.loadURL("http://localhost:30100")
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(pathValue);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

if (isDev) {
  require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
  });
}


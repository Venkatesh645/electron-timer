const path = require('path');
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');
const sound = require('sound-play');
const constants = require('./src/utils/constants');

const pathValue = `${path.join(__dirname, 'build', 'index.html')}`;
const options = {
  query: { windowType: null }
}

function loadRendererWindow(winInstance, opt) {
  if (isDev) {
    const url = new URL("http://localhost:30100");
    for (let [key, value] of Object.entries(options.query)) {
      url.searchParams.append(key, value);
    }
    winInstance.loadURL(url.href, opt)
    winInstance.webContents.openDevTools({ mode: 'detach' });
  } else {
    winInstance.loadFile(pathValue, opt);
  }
}

function createWindow() {
  // Create the browser window.
  const { width, height } = getScreenDimensions()
  const winWidth = 120;
  const winHeight = 60;
  const win = new BrowserWindow({
    alwaysOnTop: true,
    autoHideMenuBar: true,
    width: winWidth,
    height: winHeight,
    frame: false,
    minimizable: false,
    maximizable: false,
    transparent: true,
    x: width - winWidth,
    y: height - winHeight + 10,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('time-up', (event, title) => {
    let soundIntervalHandler = null;
    const { width, height } = getScreenDimensions()
    const childWidth = winWidth;
    const childHeight = winHeight + 50;
    const child = new BrowserWindow({
      parent: win,
      modal: true,
      show: false,
      frame: false,
      minimizable: false,
      maximizable: false,
      height: childHeight,
      width: winWidth,
      transparent: true,
      x: width - childWidth,
      y: height - childHeight - winHeight,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    options.query.windowType = constants.NOTIFICATION_TYPE
    loadRendererWindow(child, options);

    ipcMain.on('clear-notification', (event, title) => {
      if (soundIntervalHandler) clearInterval(soundIntervalHandler)
      child.hide();
    });

    child.once('ready-to-show', () => {
      child.show();
      soundIntervalHandler = setInterval(() => {
        sound.play(path.resolve(__dirname, 'yes.mp3'));
      }, 3000);
    })
  });



  // and load the index.html of the app.
  options.query.windowType = constants.TIMER_TYPE
  loadRendererWindow(win, options);
}


function getScreenDimensions() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay()
  return primaryDisplay.workAreaSize
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


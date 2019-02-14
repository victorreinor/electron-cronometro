/* eslint-disable no-use-before-define */
const electron = require('electron');
const ChronoTray = require('./app/chronotray');

const {
  app,
  BrowserWindow,
  ipcMain,
} = electron;

let mainwWindow;
let tray;

app.on('ready', () => {
  mainwWindow = new BrowserWindow({
    height: 160,
    width: 350,
    frame: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
  });

  tray = new ChronoTray(`${__dirname}/images/robot.png`, mainwWindow);
  mainwWindow.loadURL(`file://${__dirname}/index.html`);
  mainwWindow.on('blur', () => {
    setTimeout(() => {
      mainwWindow.hide();
    }, 200);
  });
});

ipcMain.on('timeUpdate', (event, timeUpdate) => {
  if (process.platform === 'darwin') {
    tray.setTitle(timeUpdate);
  } else {
    tray.setToolTip(timeUpdate);
  }
});

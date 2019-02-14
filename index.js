/* eslint-disable no-use-before-define */
const electron = require('electron');
const ChronoTray = require('./app/chronotray');

const {
  app,
  Menu,
  BrowserWindow,
} = electron;

let mainwWindow;

app.on('ready', () => {
  mainwWindow = new BrowserWindow({
    height: 150,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });

  const tray = new ChronoTray(`${__dirname}/images/robot.png`, mainwWindow);
  mainwWindow.loadURL(`file://${__dirname}/index.html`);
});

/* eslint-disable no-use-before-define */
const electron = require('electron');

const {
  app,
  Tray,
  Menu,
  BrowserWindow,
} = electron;

let mainwWindow;

app.on('ready', () => {
  const tray = new Tray(`${__dirname}/images/robot.png`);
  tray.setToolTip('Está é uma aplicação Electron');

  mainwWindow = new BrowserWindow({
    height: 150,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });

  mainwWindow.loadURL(`file://${__dirname}/index.html`);

  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { width, height } = mainwWindow.getBounds();

    if (mainwWindow.isVisible()) {
      mainwWindow.hide();
    } else {
      mainwWindow.setBounds({
        x: parseInt(x >= 400 ? x - width / 2 : x, 10),
        y: parseInt(y >= 300 ? y - height : y, 10),
        width,
        height,
      });

      mainwWindow.show();
    }
  });


  const contextMenu = Menu.buildFromTemplate(menuTemplateTray);
  tray.setContextMenu(contextMenu);
});

const menuTemplateTray = [{
  label: 'Electron Cronometro',
  click: () => console.log('Você clicou na opção electron-cronometro'),
}, {
  label: 'Configuração',
}, {
  label: 'Ajuda',
}, {
  label: 'Sair',
  click: () => app.exit(),
}];

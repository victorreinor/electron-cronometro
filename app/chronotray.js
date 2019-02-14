const electron = require('electron');

const { Tray, app, Menu } = electron;

const contextMenu = Menu.buildFromTemplate([{
  label: 'Sair',
  click: () => app.exit(),
}]);


class ChronoTray extends Tray {
  constructor(iconPath, mainwWindow) {
    super(iconPath);
    this.mainwWindow = mainwWindow;
    this.on('click', this.onClick.bind(this));
    this.setToolTip('Está é uma aplicação Electron');
    this.setContextMenu(contextMenu);
  }

  onClick(events, bounds) {
    const { x, y } = bounds;
    const { width, height } = this.mainwWindow.getBounds();

    if (this.mainwWindow.isVisible()) {
      this.mainwWindow.hide();
    } else {
      this.mainwWindow.setBounds({
        x: parseInt(x >= 400 ? x - width / 2 : x, 10),
        y: parseInt(y >= 300 ? y - height : y, 10),
        width,
        height,
      });

      this.mainwWindow.show();
    }
  }
}

module.exports = ChronoTray;

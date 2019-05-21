import {
  app, protocol, BrowserWindow, Menu, Tray, net, dialog, ipcMain,
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Getting port
app.st_server_port = process.argv[1] !== 'dist_electron' ? process.argv[1] : 10664;

app.setAppUserModelId(process.execPath);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray;
let isQuitting = false;
let prepareDownloadInfo = {};

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

// Disable menu
if (!isDevelopment) {
  Menu.setApplicationMenu(null);
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 960,
    height: 640,
    icon: path.join(__static, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
    backgroundColor: '#f0f2f5',
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win.minimize();
    }

    event.returnValue = false;
  });

  win.on('closed', () => {
    win = null;
  });

  win.on('minimize', (event) => {
    event.preventDefault();
    win.hide();
  });

  win.webContents.session.on('will-download', (event, item, webContents) => {
    if (item.getURL() === prepareDownloadInfo.url) {
      if (path.extname(prepareDownloadInfo.name) === '') {
        const urlFileName = (new URL(prepareDownloadInfo.url)).pathname;
        prepareDownloadInfo.name = `${prepareDownloadInfo.name}${path.extname(urlFileName)}`;
      }
      prepareDownloadInfo.ext = path.extname(prepareDownloadInfo.name);
      item.setSaveDialogOptions({
        title: '下载附件',
        defaultPath: path.join(app.getPath('downloads'), prepareDownloadInfo.name),
        filters: [{
          name: `${prepareDownloadInfo.ext} 文件`,
          extensions: [prepareDownloadInfo.ext.substring(1)],
        }],
      });
    }
  });
}

app.on('before-quit', () => {
  isQuitting = true;
  if (!isDevelopment) {
    net.request({
      method: 'POST',
      protocol: 'http:',
      hostname: 'localhost',
      port: app.st_server_port,
      path: '/quit',
    })
      .end();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  ipcMain.on('prepareDownload', (event, download) => {
    prepareDownloadInfo = download;
    event.returnValue = true;
  });

  createWindow();
  tray = new Tray(path.join(__static, 'icon.ico'));
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: '显示主界面',
      click: () => win.show(),
    },
    {
      label: '退出应用',
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]));
  tray.on('double-click', () => {
    win.show();
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

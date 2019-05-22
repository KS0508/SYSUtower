import {
  app, protocol, BrowserWindow, Menu, Tray, dialog, ipcMain,
} from 'electron';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

import path from 'path';
// eslint-disable-next-line camelcase
import child_process from 'child_process';

const isDevelopment = process.env.NODE_ENV !== 'production';

app.setAppUserModelId(process.execPath);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray;
let backendPs;
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
    const userChoice = dialog.showMessageBox({
      type: 'none',
      message: '请问是要关闭程序还是最小化到托盘呢？',
      detail: '（最小化到托盘可以继续接收新消息提醒）',
      title: 'SYSU Tower',
      icon: path.join(__static, 'icon.ico'),
      buttons: ['最小化到托盘', '关闭程序', 'Cancel'],
      cancelId: 2,
    });
    if (userChoice === 0) {
      event.preventDefault();
      win.hide();
    } else if (userChoice === 2) {
      event.preventDefault();
    }
  });

  win.on('closed', () => {
    win = null;
  });

  win.webContents.session.on('will-download', (event, item) => {
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
  if (tray && !tray.isDestroyed()) {
    tray.destroy();
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

  ipcMain.once('startBackendServer', async (event) => {
    let backendStdOut = '';

    backendPs = child_process.spawn(isDevelopment
      ? path.join(__static, '../../dist/SYSU_Tower/SYSU_Tower_Server.exe')
      : path.join(process.execPath, '../SYSU_Tower_Server.exe'), {
      cwd: isDevelopment
        ? path.join(__static, '../../dist/SYSU_Tower/')
        : path.join(process.execPath, '../'),
    });

    function monitorStdOut(data) {
      backendStdOut += data;
      const stdOutMatch = backendStdOut.match(/Running on http:\/\/127.0.0.1:(\d+?)\//);
      if (stdOutMatch && stdOutMatch[1]) {
        event.reply('startedBackendServer', stdOutMatch[1]);
        backendPs.stderr.off('data', monitorStdOut);
        backendPs.stderr.on('data', str => console.log(str.toString()));
      }
    }

    backendPs.stderr.on('data', monitorStdOut);
    app.on('before-quit', () => {
      backendPs.kill();
    });
  });

  ipcMain.on('prepareDownload', (event, download) => {
    prepareDownloadInfo = download;
    // eslint-disable-next-line no-param-reassign
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

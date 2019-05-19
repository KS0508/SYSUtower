import {
  app, protocol, BrowserWindow, Menu, Tray,
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray;
let isQuitting = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

// Disable menu
// Menu.setApplicationMenu(null);

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
  })

  win.on('minimize', (event) => {
    event.preventDefault();
    win.hide();
  });
}

app.on('before-quit', () => {
  isQuitting = true;
})

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
    }
  ]));
  tray.on('double-click', () => {
    win.show();
  })
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

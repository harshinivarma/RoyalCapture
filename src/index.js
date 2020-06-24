const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const updater = require('./updater')


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow, secondaryWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: "hiddenInset",
    x: 150,
    y: 30,
    width: 1200,
    height: 700,
    maxWidth: 1200,
    maxHeight: 700,
    minWidth: 1200,
    minHeight: 700,
    darkTheme: true,
    frame: false,
    fullscreen: false,
    maximizable: false,
   //transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
    
    
  });

  
 
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
 

  

  mainWindow.webContents.openDevTools();
}
  // Open the DevTools.
  
function popupwindow() {
  secondaryWindow = new BrowserWindow({
    width: 600,
    height: 480,
    maxHeight: 480,
    maxWidth: 600,
    minHeight: 480,
    minWidth: 600,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
    parent: mainWindow,
    modal: true,
    
  });
  secondaryWindow.loadFile(path.join(__dirname, 'popup.html'));
  
  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      secondaryWindow.close();
      secondaryWindow = null;
    }, 15000);
  });
}
//Application Menu
let menu = Menu.buildFromTemplate([
  {
    label: "File",
    submenu: [
      // { label: "About",
      //   accelerator: "CmdOrCtrl+A",
      //   click: () => {
      //     popupwindow();
      //   }},
      
      {
        label: "Exit",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        }
      }
    ]
  },

  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "F5",
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) win.close();
              });
            }
            focusedWindow.reload();
          }
        }
      },
      
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        accelerator: "CmdOrCtrl+R",
        click: () => {
          popupwindow();
        }
      },
      {
        label: "Contact Me!",
        click() {
          shell.openExternal("https://google.com");
        }
      },
      { type: "separator" },
     
    ]
  },
  
]);

Menu.setApplicationMenu(menu);


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', popupwindow)

  setTimeout( updater.check, 2000)
  setTimeout(() => {
    createWindow();
  }, 15001);

  

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


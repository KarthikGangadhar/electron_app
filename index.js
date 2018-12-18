const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, Menu, dialog } = electron;

let mainWindow;

// Listen for the app to ready
app.on("ready", function () {
  //create a new window
  mainWindow = new BrowserWindow({});
  //Loaad html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [{
  label: 'File',
  submenu: [
    {
      label: 'Open',
      click() {
        dialog.showOpenDialog((filename) => {
          if (filename === undefined) {
            alert('No file selected');
          } else {
            readFile(filename[0]);
          }
        });
      }
    },
    {
      label: 'Create',
      click() {

      }
    },
    {
      label: 'Quit',
      click() {
        app.quit();
      }
    }
  ]
}];



const readFile = (filepath) => {
  console.log(filepath);
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      alert(err);
      return;
    } else {
      console.log(data);
      alert(data);
    }
  })
}
// npm install xmlhttprequest
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//importing file system library
var fs = require('fs');

function ajaxReturn(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url,false);
    req.send(null);

    if (req.status === 200) {
      return req.responseText;
    }
}

function getDate(){
  var d = new Date();
  return d.getDay()+"-"+d.getMonth()+"-"+d.getFullYear();
}

function getOS(asset){
  var os = {};
  os.name = asset.name;
  os.download_count = asset.download_count;
  os.history = [];
  os.history.push({date: getDate(), dl: asset.download_count});
  return os;
}

function getTag(version) {
  var tag = {};
  tag.name = version.name;
  tag.allOS = [];

  var totalNb = 0;
  version.assets.forEach(function(asset){
    var os = getOS(asset);
    tag.allOS.push(os);

    totalNb = totalNb + os.download_count;
  });
  tag.download_count = totalNb;
  return tag;
}

function initJSON(url,name) {
  var json = ajaxReturn(url);
  var dls = JSON.parse(json);

  var allTags = {};
  allTags.name = name;
  allTags.versions = [];

  dls.forEach(function(version){
      var aVersion = getTag(version);
      allTags.versions.push(aVersion);
  });

  return allTags;
}

function updateJSON(previousData,newData) {
  previousData.versions.forEach( (version) => {
    var versionName = version.name;
    version.allOS.forEach( (os) => {
      var osName = os.name;
      var hist = os.history;
      // add new data to the history

      newData.versions.forEach( (newVersion) => {
        if(newVersion.name == versionName) {
          newVersion.allOS.forEach( (newOS) => {
            if(osName == newOS.name) {
              hist.push(newOS.history[0]);
            }
          });
        }
      });
    });
  });

  return previousData;
}

// Read the APIGitHub
function resetDataGAMA(){
  var init = initJSON("https://api.github.com/repos/gama-platform/gama/releases","GAMA platform");
  var strJSON = JSON.stringify(init);
  fs.writeFile('./data/gama.json', strJSON, 'utf8', function(ret){;});
}

// resetDataGAMA();

// Read the APIGitHub
function updateDataGAMA(){
  var data = fs.readFileSync("./data/gama.json", "utf8");
  //parsing data read to json format
  var dataJSON = JSON.parse(data);
  console.log(dataJSON);

//  var update = updateJSON(dataJSON,"https://api.github.com/repos/gama-platform/gama/releases");
//  var strJSON = JSON.stringify(init);
//  fs.writeFile('./data/gama.json', strJSON, 'utf8', function(ret){;});
}

// Read the APIGitHub
function resetData(urlData,urlAPI,name){
  console.log("-----------------RESET------");
  var init = initJSON(urlAPI,name);
  var strJSON = JSON.stringify(init);
  fs.writeFileSync(urlData, strJSON, 'utf8', function(ret){console.log(ret);});
}

// Read the APIGitHub
function updateData(urlData,urlAPI,name){
  console.log("-----------------UPDATE------");
  var previousData = fs.readFileSync(urlData, "utf8");
  var previousDataJSON = JSON.parse(previousData);
  var newData = initJSON(urlAPI,name);
  var updatedData = updateJSON(previousDataJSON,newData);
  var strJSON = JSON.stringify(updatedData);
  fs.writeFileSync('./data/comokit2.json', strJSON, 'utf8', function(ret){console.log(ret);});
}

resetData('./data/comokit.json',"https://api.github.com/repos/COMOKIT/COMOKIT-Model/releases","COMOKIT4");
updateData('./data/comokit.json',"https://api.github.com/repos/COMOKIT/COMOKIT-Model/releases","COMOKIT4");

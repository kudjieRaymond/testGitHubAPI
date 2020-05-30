// npm install xmlhttprequest
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//importing file system library
var fs = require('fs');

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

function ajaxReturn(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url,false);
    req.send(null);

    if (req.status === 200) {
      return req.responseText;
    }
}

function displayDL(url,elt) {
  ajaxGet(url, function (rep) {
      // Transforme la réponse en tableau d'objets JavaScript
      var dls = JSON.parse(rep);
      console.log(dls);
      // Affiche le titre de chaque film
      dls.forEach(function (dl) {
          console.log(dl);

          var sublist = "";
          var totalNb = 0;
          dl.assets.forEach(function(asset){
            sublist = sublist + "<li>" + asset.name + " - " + asset.download_count + "</li>";
            totalNb = totalNb + asset.download_count;
          });

          //eltGAMA
          elt.innerHTML = elt.innerHTML + "<li> <b>"+dl.tag_name+ "</b> - "+ totalNb +"</li>";
          elt.innerHTML = elt.innerHTML + "<ul>" + sublist + "</ul>";
      });
  });
}


// Read the APIGitHub
var gamaRelease = ajaxReturn("https://api.github.com/repos/gama-platform/gama/releases");
console.log(gamaRelease);

//reading file "quotes.json" using readFileSync function
var data = fs.readFileSync("./data/gama.json", "utf8");

//parsing data read to json format
var data1 = JSON.parse(data);

//printing complete data1
console.log(data1);


//var eltGAMA = document.getElementById("gama");
//displayDL("https://api.github.com/repos/gama-platform/gama/releases",eltGAMA);
//
//var eltCOMOKIT = document.getElementById("comokit");
//displayDL("https://api.github.com/repos/COMOKIT/COMOKIT-Model/releases",eltCOMOKIT);

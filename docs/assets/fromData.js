
function displayData(url,elt) {
  var req = new XMLHttpRequest();
  req.open("GET", url,false);
  req.send(null);
  var dataJSON = JSON.parse(req.responseText);

  dataJSON.versions.forEach(function (version) {
    var sublist = "";
    version.allOS.forEach(function(os){
      sublist = sublist + "<li>" + os.name + " - " + os.download_count + "</li>";
      histolist = "";
      // for each
      os.history.forEach(function(histo) {
        histolist = histolist + "<li>" + histo.date + " - " + histo.dl + "</li>";
      })
      sublist = sublist + "<ul>" + histolist + "</ul>";
    });

    //eltGAMA
    elt.innerHTML = elt.innerHTML + "<li> <b>" + version.name+ "</b> - "+ version.download_count +"</li>";
    elt.innerHTML = elt.innerHTML + "<ul>" + sublist + "</ul>";
  });
}


var eltGAMAhisto = document.getElementById("histo-gama");
displayData("./assets/data/gama.json",eltGAMAhisto);

var eltCOMOKIThisto = document.getElementById("histo-comokit");
displayData("./assets/data/comokit.json",eltCOMOKIThisto);

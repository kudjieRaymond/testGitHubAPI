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
          elt.innerHTML = elt.innerHTML + "<li> <b>"+dl.name+ "</b> - "+ totalNb +"</li>";
          elt.innerHTML = elt.innerHTML + "<ul>" + sublist + "</ul>";
      });
  });
}


var eltGAMA = document.getElementById("gama");
displayDL("https://api.github.com/repos/gama-platform/gama/releases",eltGAMA);

var eltCOMOKIT = document.getElementById("comokit");
displayDL("https://api.github.com/repos/COMOKIT/COMOKIT-Model/releases",eltCOMOKIT);

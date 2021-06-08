function displayData(url, elt) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	var dataJSON = JSON.parse(req.responseText);
	var i= 0;

	dataJSON.versions.forEach(function (version) {
		var labels = [];
		var data = [];
		var canvaId = elt.getAttribute("id") + "-version-" + ++i;
		console.log(elt)

		var sublist = "";
		version.allOS.forEach(function (os) {
			sublist =
				sublist + "<li>" + os.name + " - " + os.download_count + "</li>";
			histolist = "";
			// for each
			os.history.forEach(function (histo) {
				histolist =
					histolist + "<li>" + histo.date + " - " + histo.dl + "</li>";
				labels.push(histo.date);
				data.push(histo.dl);
			});
			sublist = sublist + "<ul>" + histolist + "</ul>";
		});

		//eltGAMA
		elt.innerHTML =
			elt.innerHTML +
			'<canvas id="' +
			canvaId +
			'" width="400" height="300"></canvas>' +
			"<li> <b>" +
			version.name +
			"</b> - " +
			version.download_count +
			"</li>";
		elt.innerHTML =
			elt.innerHTML +
			'<ul><details><summary style="display: list-item;">Details</summary>' +
			sublist +
			"</details></ul>";

		var ctx = document.getElementById(canvaId).getContext("2d");
		var myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: "# of Downloads",
						data: data,
						borderWidth: 1,
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						tension: 0.1,
					},
				],
			},
		});
	});
}

var eltGAMAhisto = document.getElementById("histo-gama");
displayData("./assets/data/gama.json", eltGAMAhisto);

var eltCOMOKIThisto = document.getElementById("histo-comokit");
displayData("./assets/data/comokit.json", eltCOMOKIThisto);

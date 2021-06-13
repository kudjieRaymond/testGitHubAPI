function displayData(url, elt) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	var dataJSON = JSON.parse(req.responseText);
	var i = 0;

	var counterArray = [];
	var canvaData = [];

	dataJSON.versions.forEach(function (version) {
		var sublist = "";

		version.allOS.forEach(function (os) {
			var labels = [];
			var data = [];

			var canvaId = elt.getAttribute("id") + "-os-" + ++i;

			counterArray.push(i);

			sublist +=
				'<canvas id="' +
				canvaId +
				'" width="400" height="300"></canvas>' +
				"<li>" +
				os.name +
				" - " +
				os.download_count +
				"</li>";
			histolist = "";
			// for each
			os.history.forEach(function (histo) {
				histolist =
					histolist + "<li>" + histo.date + " - " + histo.dl + "</li>";
				labels.push(histo.date);
				data.push(histo.dl);
			});
			sublist = sublist + "<ul>" + histolist + "</ul>";
			canvaData.push([data, labels]);
			
		});

		//eltGAMA
		elt.innerHTML +=
			"<li> <b>" + version.name + "</b> - " + version.download_count + "</li>";
		elt.innerHTML =
			elt.innerHTML +
			'<ul><details><summary style="display: list-item;">Details</summary>' +
			sublist +
			"</details></ul>";

		for (var j = 0; j < canvaData.length; j++) {
			var canvaId = elt.getAttribute("id") + "-os-" + counterArray[j];
			var ctx = document.getElementById(canvaId).getContext("2d");
			new Chart(ctx, {
				type: "line",
				data: {
					labels: canvaData[j][1],
					datasets: [
						{
							label: "# of Downloads",
							data: canvaData[j][0],
							borderWidth: 1,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
					],
				},
			});
		}
	});
}

var eltGAMAhisto = document.getElementById("histo-gama");
displayData("./assets/data/gama.json", eltGAMAhisto);

var eltCOMOKIThisto = document.getElementById("histo-comokit");
displayData("./assets/data/comokit.json", eltCOMOKIThisto);

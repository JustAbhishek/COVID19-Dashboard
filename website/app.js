$(document).ready( function () {
	const url="https://api.covid19india.org/data.json";
	$.get(url,function(data){
		const confirmedCases = data.statewise[0].confirmed;
		const activeCases = data.statewise[0].active;
		const recoveredCases = data.statewise[0].recovered;
		const deceasedCases = data.statewise[0].deaths;
		const deltaConfirmed = data.statewise[0].deltaconfirmed;
		const deltaDeceased = data.statewise[0].deltadeaths;
		const deltaRecovered = data.statewise[0].deltarecovered;
		const d = data.statewise[0].lastupdatedtime;

		// Time Calculation
		hh = d[11]+d[12];
		mm = d[14]+d[15];
		date = d[0]+d[1];
		month = d[3]+d[4];
		var date1 = new Date(2020, month-1, date,  hh, mm);
		const d2 = new Date();
		var date2 = new Date(2020, d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes());
		if (date2 < date1) {
	    date2.setDate(date2.getDate() + 1);
		}
		var msec = date2 - date1;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		if(hh===0){
			var lastUpdatedTime = "Updated "+mm+" minutes ago. "+date+", July '20";
		}
		else{
			var lastUpdatedTime = "Updated "+hh+" hour, "+mm+" minutes ago. "+date+", July '20";
		}

		$(".confirmed").text(confirmedCases);
		$(".deltaConfirmed").append(deltaConfirmed);
		$(".active").text(activeCases);
		$(".recovered").text(recoveredCases);
		$(".deltaRecovered").append(deltaRecovered);
		$(".deceased").text(deceasedCases);
		$(".deltaDeceased").append(deltaDeceased);
		$('.timestamp').text(lastUpdatedTime);
		for(var i=1;i<data.statewise.length;i++){
			$("tbody").append(`<tr>
				<td class="">${data.statewise[i].state}</td>
				<td class="text-danger tableData">${data.statewise[i].confirmed}</td>
				<td class="text-info tableData">${data.statewise[i].active}</td>
				<td class="text-success tableData">${data.statewise[i].recovered}</td>
				<td class="text-muted tableData">${data.statewise[i].deaths}</td>
				</tr>`);
		}
		var newTableObject = document.getElementById('table')
		sorttable.makeSortable(newTableObject);
	});

} );

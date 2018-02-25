var map;
var traces = [];
var tracesCount = 0;

var markersCoord = [];
var markers = []
var points = 0;
var realPoints = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: 0, lng: 0},
        mapTypeId: 'terrain'
    });
}

function readData(url,color,enableMarkers,text) {
    var coord = [];
    var last = -1;
    Papa.parse(url, {
        download: true,
        step: function (row) {
            //wrong data
            if (isNaN(row.data[0][4]) || isNaN(row.data[0][5])) {
                //console.log("not a number" + row.data[0][4] + " " + row.data[0][5]);
                return;
            }
            //missing data
            if (row.data[0][4] === '*' || row.data[0][5] === '*' ||
                row.data[0][4] == 0 || row.data[0][5] == 0 ||
                row.data[0][4] == '' || row.data[0][5] == '') {
                //console.log("wrong number " + row.data[0][4] + " " + row.data[0][5]);
                return;
            }
            //same data
            if (last >= 0){
                if (row.data[0][4] == coord[last].lat || row.data[0][5] == coord[last].lng) {
                    //console.log("duplicity value");
                    points++;
                    return;
                }
            }
            var point = {lat: Number(row.data[0][4]), lng: Number(row.data[0][5])};
            //console.log("good number" + row.data[0][4] + " " + row.data[0][5]);
            coord.push(point);
            last++;
            realPoints++;
            points++;
        },
        complete: function () {
            console.log("trace finished: "+ last+1);
            //console.log(coord);
            var traceRoutePath = new google.maps.Polyline({
                path: coord,
                geodesic: true,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            //push trace to array and try to draw it
            traces.push(traceRoutePath);
            drawTraces();

            //compare markers
            if (enableMarkers) {
                if (markersCoord.length === 0) {
                    //add starting point
                    markersCoord.push(coord[0]);
                    var marker = new google.maps.Marker({
                        position: coord[0],
                        title: text
                    });
                    markers.push(marker);
                    return;
                }
                var sizeArray = markersCoord.length;
                for (var i = 0; i < sizeArray; i++) {
                    if (markersCoord[i].lng === coord[0].lng && markersCoord[i].lat === coord[0].lat) {
                        return;
                    }
                }
                //add starting point
                markersCoord.push(coord[0]);
                var marker = new google.maps.Marker({
                    position: coord[0],
                    title: text
                });
                markers.push(marker);
                //add end point
                //markers.push(coord[last-1])
            }
        }
    });
}


function drawTraces() {
    //check if all traces are in
    if (traces.length === tracesCount) {
        for (var i = 0; i < traces.length; i++){
            traces[i].setMap(map);
        }
        //draw the markers
        for (var i = 0; i < markers.length; i++){
            markers[i].setMap(map);
        }
    }
}


function loadData() {
    //todo FIX the ugly hardcorded numbers
    var color;
    var markerEnable;
    var countryEnable;
    //Argentina
    color = document.getElementById('ArgentinaColor').value;
    markerEnable = document.getElementById('ArgentinaMarker').checked;
    countryEnable = document.getElementById('Argentina').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Argentina/Argentina" + i + ".csv",color,markerEnable,"Argentina");
        }
    }
    //Arizona
    color = document.getElementById('ArizonaColor').value;
    markerEnable = document.getElementById('ArizonaMarker').checked;
    countryEnable = document.getElementById('Arizona').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/ArizonaC/Arizona" + i + ".csv",color,markerEnable,"Arizona");
        }
    }
    //Australia
    color = document.getElementById('AustraliaColor').value;
    markerEnable = document.getElementById('AustraliaMarker').checked;
    countryEnable = document.getElementById('Australia').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Australia/Australia" + i + ".csv",color,markerEnable,"Australia");
        }
    }
    //Belgium
    color = document.getElementById('BelgiumColor').value;
    markerEnable = document.getElementById('BelgiumMarker').checked;
    countryEnable = document.getElementById('Belgium').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Belgium/Belgium" + i + ".csv",color,markerEnable,"Belgium");
        }
    }
    //Brazil
    color = document.getElementById('BrazilColor').value;
    markerEnable = document.getElementById('BrazilMarker').checked;
    countryEnable = document.getElementById('Brazil').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Brazil/Brazil_fix" + i + ".csv",color,markerEnable,"Brazil");
        }
    }
    //California
    color = document.getElementById('CaliforniaColor').value;
    markerEnable = document.getElementById('CaliforniaMarker').checked;
    countryEnable = document.getElementById('California').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/CaliforniaC/California" + i + ".csv",color,markerEnable,"California");
        }
    }
    //Canada
    color = document.getElementById('CanadaColor').value;
    markerEnable = document.getElementById('CanadaMarker').checked;
    countryEnable = document.getElementById('Canada').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/CanadaE/CanadaE" + i + ".csv",color,markerEnable,"Canada");
        }
    }
    //Chile
    color = document.getElementById('ChileColor').value;
    markerEnable = document.getElementById('ChileMarker').checked;
    countryEnable = document.getElementById('Chile').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Chile/Chile" + i + ".csv",color,markerEnable,"Chile");
        }
    }
    //Germany
    color = document.getElementById('GermanyColor').value;
    markerEnable = document.getElementById('GermanyMarker').checked;
    countryEnable = document.getElementById('Germany').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Germany/Germany" + i + ".csv",color,markerEnable,"Germany");
        }
    }
    //India
    color = document.getElementById('IndiaColor').value;
    markerEnable = document.getElementById('IndiaMarker').checked;
    countryEnable = document.getElementById('India').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/India/India" + i + ".csv",color,markerEnable,"India");
        }
    }
    //Indonesia
    color = document.getElementById('IndonesiaColor').value;
    markerEnable = document.getElementById('IndonesiaMarker').checked;
    countryEnable = document.getElementById('Indonesia').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Indonesia/Indonesia" + i + ".csv",color,markerEnable,"Indonesia");
        }
    }
    //Italy
    color = document.getElementById('ItalyColor').value;
    markerEnable = document.getElementById('ItalyMarker').checked;
    countryEnable = document.getElementById('Italy').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Italy/Italy" + i + ".csv",color,markerEnable,"Italy");
        }
    }
    //Netherlands
    color = document.getElementById('NetherlandsColor').value;
    markerEnable = document.getElementById('NetherlandsMarker').checked;
    countryEnable = document.getElementById('Netherlands').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Netherlands/Netherlands" + i + ".csv",color,markerEnable,"Netherlands");
        }
    }
    //NewYork
    color = document.getElementById('NewYorkColor').value;
    markerEnable = document.getElementById('NewYorkMarker').checked;
    countryEnable = document.getElementById('NewYork').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/NewYorkC/NewYork" + i + ".csv",color,markerEnable,"NewYork");
        }
    }
    //Pakistan
    color = document.getElementById('PakistanColor').value;
    markerEnable = document.getElementById('PakistanMarker').checked;
    countryEnable = document.getElementById('Pakistan').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Pakistan/Pakistan" + i + ".csv",color,markerEnable,"Pakistan");
        }
    }
    //Poland
    color = document.getElementById('PolandColor').value;
    markerEnable = document.getElementById('PolandMarker').checked;
    countryEnable = document.getElementById('Poland').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Poland/Poland" + i + ".csv",color,markerEnable,"Poland");
        }
    }
    //SouthAfrica
    color = document.getElementById('SouthAfricaColor').value;
    markerEnable = document.getElementById('SouthAfricaMarker').checked;
    countryEnable = document.getElementById('SouthAfrica').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/SouthAfrica/SouthAfrica" + i + ".csv",color,markerEnable,"South Africa");
        }
    }
    //Sweden
    color = document.getElementById('SwedenColor').value;
    markerEnable = document.getElementById('SwedenMarker').checked;
    countryEnable = document.getElementById('Sweden').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Sweden/Sweden" + i + ".csv",color,markerEnable,"Sweden");
        }
    }
    //Thailand
    color = document.getElementById('ThailandColor').value;
    markerEnable = document.getElementById('ThailandMarker').checked;
    countryEnable = document.getElementById('Thailand').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/Thailand/Thailand" + i + ".csv",color,markerEnable,"Thailand");
        }
    }
    //UnitedKingdom
    color = document.getElementById('UnitedKingdomColor').value;
    markerEnable = document.getElementById('UnitedKingdomMarker').checked;
    countryEnable = document.getElementById('UnitedKingdom').checked;
    if (countryEnable) {
        tracesCount = tracesCount+20;
        for (var i =1; i<=20;i++) {
            readData("../data/UnitedKingdom/UnitedKingdom" + i + ".csv",color,markerEnable,"United Kingdom");
        }
    }
}
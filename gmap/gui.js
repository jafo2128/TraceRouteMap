function allMarkerClicked() {
    console.log("Set all mark checkboxes to clicked");
    var setValue = document.getElementById('AllMarker').checked;
    var allFromClass = document.getElementsByClassName('markerCheckBox');
    for (var i = 0; i < allFromClass.length; i++) {
        allFromClass[i].checked = setValue;
    }
}

function allMapClicked() {
    console.log("Set all checkboxes to clicked");
    var setValue = document.getElementById('AllMap').checked;
    var allFromClass = document.getElementsByClassName('mapCheckBox');
    for (var i = 0; i < allFromClass.length; i++) {
        allFromClass[i].checked = setValue;
    }
}

function allColorClicked() {
    console.log("Set all colors to same color");
    var setValue = document.getElementById('AllColor').value;
    var allFromClass = document.getElementsByClassName('colorInput');
    for (var i = 0; i < allFromClass.length; i++) {
        allFromClass[i].value = setValue;
    }
}
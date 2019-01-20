var addid = 0;
let isFirst = true;
var optionConnector = "<p style='color: white; text-align:center; font-family: Boogaloo, bold;'>TO</p>";
var selectBuildingsString = "<div class='buildingEntry'>" +
                  "<select name='buildings'>" +
                  "<option value='burnsRec'>Burns Rec Center</option>" +
                  "<option value='doolan'>Doolan</option>" +
                  "<option value='foley'>Foley</option>" +
                  "<option value='foleyAnnex'>Foley Annex</option>" +
                  "<option value='gersten'>Gersten Pavilion</option>" +
                  "<option value='lsb'>Life Sciences Building</option>" +
                  "<option value='malone'>Malone</option>" +
                  "<option value='pereira'>Pereira</option>" +
                  "<option value='seaver'>Seaver</option></select>";
                  "<option value='seaver'>Seaver</option></select>" +
                  "</div>" +
                  "<br></br>";

function addForm(id) {

    var addForm = document.getElementById('addform');
    var docstyle = addForm.style.display;
    if (docstyle == 'none') addForm.style.display = '';

    addid++;

    var text = document.createElement('div');
    text.id = 'additem_' + addid;

    if (isFirst) {
      text.innerHTML = selectBuildingsString;
      isFirst = false;
    } else {
       text.innerHTML = optionConnector + selectBuildingsString;
    }


    addForm.appendChild(text);
}

addForm(1);
addForm(1);
addForm(1);

var addid = 0;
var selectBuildingsString = "<div class='testClass'>" +
                  "<select name='buildings'>" +
                  "<option value='burnsRec'>Burns Rec Center</option>" +
                  "<option value='doolan'>Doolan</option>" +
                  "<option value='foley'>Foley</option>" +
                  "<option value='foleyAnnex'>Foley Annex</option>" +
                  "<option value='gersten'>Gersten Pavilion</option>" +
                  "<option value='lsb'>Life Sciences Building</option>" +
                  "<option value='malone'>Malone</option>" +
                  "<option value='pereira'>Pereira</option>" +
                  "<option value='seaver'>Seaver</option></select>" +
                  "</div>" +
                  "<br></br>";
                  //"<a href='javascript:void(0);' onclick='addForm(" + addid + ")' id='addlink_" + addid + "'>add more</a>"
function addForm(id) {

    var addForm = document.getElementById('addform');
    var docstyle = addForm.style.display;
    if (docstyle == 'none') addForm.style.display = '';

    addid++;

    var text = document.createElement('div');
    text.id = 'addItem' + addid;
    text.innerHTML = selectBuildingsString;


    addForm.appendChild(text);
}

addForm(1);
addForm(1);
addForm(1);

var addid = 0;
<<<<<<< HEAD
let isFirst = true;
var optionConnector = "<p style='color: white; text-align:center; font-family: Boogaloo, bold;'>TO</p>";
var selectBuildingsString = "<select name='buildings'>" +
=======
var selectBuildingsString = "<div class='testClass'>" +
                  "<select name='buildings'>" +
>>>>>>> b9183075bc1bc4f32d014675c97d96ded86cab5f
                  "<option value='burnsRec'>Burns Rec Center</option>" +
                  "<option value='doolan'>Doolan</option>" +
                  "<option value='foley'>Foley</option>" +
                  "<option value='foleyAnnex'>Foley Annex</option>" +
                  "<option value='gersten'>Gersten Pavilion</option>" +
                  "<option value='lsb'>Life Sciences Building</option>" +
                  "<option value='malone'>Malone</option>" +
                  "<option value='pereira'>Pereira</option>" +
<<<<<<< HEAD
                  "<option value='seaver'>Seaver</option></select>";

=======
                  "<option value='seaver'>Seaver</option></select>" +
                  "</div>" +
                  "<br></br>";
                  //"<a href='javascript:void(0);' onclick='addForm(" + addid + ")' id='addlink_" + addid + "'>add more</a>"
>>>>>>> b9183075bc1bc4f32d014675c97d96ded86cab5f
function addForm(id) {

    var addForm = document.getElementById('addform');
    var docstyle = addForm.style.display;
    if (docstyle == 'none') addForm.style.display = '';

    addid++;

    var text = document.createElement('div');
<<<<<<< HEAD
    text.id = 'additem_' + addid;

    if (isFirst) {
      text.innerHTML = selectBuildingsString;
      isFirst = false;
    } else {
      text.innerHTML = optionConnector + selectBuildingsString;
    }
=======
    text.id = 'addItem' + addid;
    text.innerHTML = selectBuildingsString;
>>>>>>> b9183075bc1bc4f32d014675c97d96ded86cab5f


    addForm.appendChild(text);
}

addForm(1);
addForm(1);
addForm(1);

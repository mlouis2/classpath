const MAX_FORMS = 5;
let sidebarCollapsed = false;
var addid = 0;
let isFirst = true;
var optionConnector = "<p style='color: white; text-align:center; font-family: Boogaloo, bold;'>TO</p>";
var selectBuildingsString = "<div class='buildingEntry'>" +
                  "<select name='buildings'>" +
                  "<option value='' selected disabled hidden>Pick a Location</option>" +
                  "<option value='burnsArt'>Burns Fine Art Center</option>" +
                  "<option value='burnsRec'>Burns Rec Center</option>" +
                  "<option value='commArts'>Communication Arts (SFTV)</option>" +
                  "<option value='delreynorth'>Del Rey North</option>" +
                  "<option value='delreysouth'>Del Rey South</option>" +
                  "<option value='desmond'>Desmond Hall</option>" +
                  "<option value='doheny'>Doheny Hall</option>" +
                  "<option value='doolan'>Doolan</option>" +
                  "<option value='drollinger'>Drollinger Field</option>" +
                  "<option value='facilitiesMgmt'>Facilities Management</option>" +
                  "<option value='foley'>Foley</option>" +
                  "<option value='foleyAnnex'>Foley Annex</option>" +
                  "<option value='gersten'>Gersten Pavilion</option>" +
                  "<option value='hannonApt'>Hannon Apartments</option>" +
                  "<option value='hannonField'>Hannon Field</option>" +
                  "<option value='hannonLib'>Hannon Library</option>" +
                  "<option value='hilton'>Hilton</option>" +
                  "<option value='huesman'>Huesman Hall</option>" +
                  "<option value='jesuit'>Jesuit Community</option>" +
                  "<option value='leavey4'>Leavey 4 Apartments</option>" +
                  "<option value='leavey5'>Leavey 5 Apartments</option>" +
                  "<option value='leavey6'>Leavey 6 Apartments</option>" +
                  "<option value='leaveyHall'>Leavey Hall</option>" +
                  "<option value='lsb'>Life Sciences Building</option>" +
                  "<option value='malone'>Malone</option>" +
                  "<option value='mccarthy'>McCarthy Hall</option>" +
                  "<option value='mckay'>McKay Hall</option>" +
                  "<option value='omalley'>O'Malley Apartments</option>" +
                  "<option value='pereira'>Pereira</option>" +
                  "<option value='rains'>Rains Hall</option>" +
                  "<option value='rosecrans'>Rosecrans Hall</option>" +
                  "<option value='sacredHeart'>Sacred Heart Chapel</option>" +
                  "<option value='seaver'>Seaver</option>" +
                  "<option value='sullivan'>Sullivan Hall</option>" +
                  "<option value='stRobs'>St. Robert's</option>" +
                  "<option value='tenderich'>Tenderich Apartments</option>" +
                  "<option value='uhall'>University Hall</option>" +
                  "<option value='vonDerAhe'>Von der Ahe</option>" +
                  "<option value='whelan'>Whelan Hall</option>" +
                  "<option value='xavier'>Xavier Hall</option></select>" +
                  "</div>";

function addForm(id) {

    var addForm = document.getElementById('addform');

    addid++;

    var text = document.createElement('div');
    text.id = 'additem_' + addid;

    if (isFirst) {
      text.innerHTML = selectBuildingsString;
      isFirst = false;
    } else {
       text.innerHTML = optionConnector + selectBuildingsString;
    }

    if (addid <= MAX_FORMS) {
        addForm.appendChild(text);
        updateFormColors();
    }
    if (addid == MAX_FORMS) {
        document.getElementById("addformbutton").remove();
    }
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

//Starts with two forms by default
addForm(1);
addForm(1);

function collapseSidebar() {
  if (sidebarCollapsed) { //open the sidebar!
    document.getElementById("sidebar").style.width = "30%";
    document.getElementById("sidebarButtonContainer").style.marginLeft = "30%";
    setImageWidthAndHeight(CANVAS_WIDTH_PERCENTAGE);
  } else { //collapse the sidebar!
    document.getElementById("sidebar").style.width = "0";
    setImageWidthAndHeight(1);
    document.getElementById("sidebarButtonContainer").style.marginLeft = "0%";
  }
  sidebarCollapsed = !sidebarCollapsed;
  populateGraph();
  refreshBackground();
  drawEntries();
}

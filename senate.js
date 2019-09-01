var justDemocrat = [];
var justRepublic = [];
var justIndependent = [];
var members = [];
var dselected = false;
var rselected = false;
var iselected = false;

fetch(url, {
   headers: {
      "X-API-Key": "Tr0223Du2MQC0zZPyIpBXlPauf2inxnDQSMhXat8"
   }
}).then(function (data) {
   return data.json();
}).then(function (data) {
   members = data.results[0].members;
   tablefill(members)
   init();
})




function tablefill(tabledata) {

   // clear in the table.Because there are all members name.tablonun icini bosaltir
   var Parent = document.getElementById("senate-data");
   while (Parent.hasChildNodes()) {
      Parent.removeChild(Parent.firstChild);
   }

   //add header
   var orderArrayHeader = ["Name", "Party", "State", "Years in Office", "% Votes w/ Party"];
   var thead = document.createElement('thead');
   document.getElementById("senate-data").appendChild(thead);
   for (var i = 0; i < orderArrayHeader.length; i++) {
      thead.appendChild(document.createElement("th")).
         appendChild(document.createTextNode(orderArrayHeader[i]));
   }
   // fill with array in the table.tabloyu gelen array ile doldurur
   for (var i = 0; i < tabledata.length; i++) {

      var row = document.createElement("tr");
      for (var j = 0; j < 5; j++) {
         var col = document.createElement("td");

         // name
         if (j == 0) {
            col.innerHTML = tabledata[i].first_name + " " + members[i].last_name;
         }

         //party
         if (j == 1) {
            col.innerHTML = tabledata[i].party;
         }

         // state
         if (j == 2) {
            col.innerHTML = tabledata[i].state;
         }

         // seniority
         if (j == 3) {
            col.innerHTML = tabledata[i].seniority;
         }

         // votes
         if (j == 4) {
            col.innerHTML = "%" + tabledata[i].votes_with_party_pct;
         }

         row.appendChild(col);

      }
      document.getElementById("senate-data").appendChild(row);

   }
}

document.getElementById("dCheckBox").addEventListener("click", filterdemocrat);

function filterdemocrat() {

   if (dselected == false) {
      dselected = true;
   } else if (dselected == true) {
      dselected = false;
   }
   filter();
}

document.getElementById("rCheckBox").addEventListener("click", filterrepublic);

function filterrepublic() {
   if (rselected == false) {
      rselected = true;
   } else if (rselected == true) {
      rselected = false;
   }
   filter();
}

document.getElementById("iCheckBox").addEventListener("click", filterindependent);

function filterindependent() {
   if (iselected == false) {
      iselected = true;
   } else if (iselected == true) {
      iselected = false;
   }
   filter();
}

function init() {

   var states = [];
   stateSelect = document.getElementById('stateSelect');

   for (var i = 0; i < members.length; i++) {
      if (members[i].party == 'D') {
         justDemocrat.push(members[i]);
      }
      if (members[i].party == 'R') {
         justRepublic.push(members[i]);
      }
      if (members[i].party == 'I') {
         justIndependent.push(members[i]);
      }

      // states
      if (!states.includes(members[i].state)) {
         states.push(members[i].state);
      }
   }
   console.log(states)
   states.sort();
   for(var i=0;i<states.length;i++){
    stateSelect.options[stateSelect.options.length] = new Option(states[i], states[i]);
   }
}


function filter() {


   if (dselected == true && rselected == false && iselected == false) {
      tablefill(justDemocrat);
   }
   if (dselected == false && rselected == true && iselected == false) {
      tablefill(justRepublic);
   }
   if (dselected == false && rselected == false && iselected == true) {
      tablefill(justIndependent);
   }
   if (dselected == true && rselected == true && iselected == false) {
      tablefill(justRepublic.concat(justDemocrat));
   }
   if (dselected == true && rselected == false && iselected == true) {
      tablefill(justIndependent.concat(justDemocrat));
   }
   if (dselected == false && rselected == true && iselected == true) {
      tablefill(justIndependent.concat(justRepublic));
   }
   if (dselected == true && rselected == true && iselected == true) {
      var newarray = justIndependent.concat(justRepublic);
      tablefill(newarray.concat(justDemocrat));
   }
   if (dselected == false && rselected == false && iselected == false) {
      tablefill(members);
   }

}


//  dropdown filter
function getSelectValue() {
   var selectvalue = document.getElementById("stateSelect").value;
   filterByState(selectvalue);

}

function filterByState(text) {
   var members2 = [];
   if (text == "all") {
      tablefill(members);
      return;
   }
   for (var i = 0; i < members.length; i++) {
      if (members[i].state == text) {
         members2.push(members[i])
         tablefill(members2)
      }
   }
   tablefill(members2)

   members2 = [];

}




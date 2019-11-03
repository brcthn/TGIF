
var totalDemocratVotes = 0
var totalRepublicVotes = 0
var totalIndependentVotes = 0

var democratparty = [];
var republicparty = [];
var independentpary = [];

var avaragedemocrats = 0;
var avaragerepublic = 0;
var avarageindependent = 0;
var avaregetotal = 0;

var missedVotespct10 = [];
var votesPartypct10 = [];
var data;
fetch(url, {
   headers: {
      "X-API-Key": "Tr0223Du2MQC0zZPyIpBXlPauf2inxnDQSMhXat8"
   }
}).then(function (data) {
   return data.json();
}).then(function (apiData) {
   data = apiData;
   // members = data.results[0].members;
   glance();
   if (document.getElementById("mostEngaged") != null) {
      engage(lowToHighMissed, "most");
      engage(highToLowMissed, "least");
   }
      if (document.getElementById("mostLoyal") != null) {
         loyal(lowToHighVotes, "mostLoyal")
         loyal(highToLowVotes, "leastLoyal")
      }
   


})



// glance();

//attandence sayfasinda sadece engage calismasi lazim. 
//Bu yuzden sayfanin attandance oldugunu kanitlamamiz lazum.
//sayfada mostEngaged tablosu varsa bu kesin attandance dir. dolayisiyla varsa sadece engage calisir.
// if(document.getElementById("mostEngaged") != null){
//Javascript'te methoda funtion gecirmeyi ogrendik
//    engage(lowToHighMissed, "most");
//    engage(highToLowMissed, "least");
// }
// if(document.getElementById("mostLoyal") != null){
//Javascript'te methoda funtion gecirmeyi ogrendik
//    loyal(lowToHighVotes, "mostLoyal")
//    loyal(highToLowVotes, "leastLoyal")
// }


function glance() {
   for (var i = 0; i < data.results[0].members.length; i++) {
      if (data.results[0].members[i].party == 'D') {
         democratparty.push(data.results[0].members[i].party);
         totalDemocratVotes = totalDemocratVotes + (data.results[0].members[i].votes_with_party_pct);
      }
      if (data.results[0].members[i].party == 'R') {
         republicparty.push(data.results[0].members[i].party);
         totalRepublicVotes = totalRepublicVotes + (data.results[0].members[i].votes_with_party_pct);
      }
      if (data.results[0].members[i].party == 'I') {
         independentpary.push(data.results[0].members[i].party);
         totalIndependentVotes = totalIndependentVotes + (data.results[0].members[i].votes_with_party_pct);
      }

      avaregetotal = avaregetotal + data.results[0].members[i].votes_with_party_pct;

   }


   statistic.numberofdemocrats = democratparty.length
   statistic.numberofrepublic = republicparty.length
   statistic.numberofindependent = independentpary.length
   statistic.sum = data.results[0].members.length;

   statistic.avaragedemocrats = totalDemocratVotes / democratparty.length
   statistic.avarageindependent = totalIndependentVotes / independentpary.length
   statistic.avaragerepublic = totalRepublicVotes / republicparty.length

   if (democratparty.length == 0) {
      statistic.avaragedemocrats = 0
   }
   if (independentpary.length == 0) {
      statistic.avarageindependent = 0
   }
   if (republicparty.length == 0) {
      statistic.avaragerepublic = 0
   }

   statistic.avaregetotal = avaregetotal / data.results[0].members.length;

   document.getElementById("col1").innerHTML = statistic.numberofdemocrats;
   document.getElementById("col2").innerHTML = statistic.numberofrepublic;
   document.getElementById("col3").innerHTML = statistic.numberofindependent;
   document.getElementById("col4").innerHTML = statistic.sum;
   document.getElementById("col5").innerHTML = statistic.avaragedemocrats;
   document.getElementById("col6").innerHTML = statistic.avaragerepublic;
   document.getElementById("col7").innerHTML = statistic.avarageindependent;
   document.getElementById("col8").innerHTML = statistic.avaregetotal;

}

function engage(comparator, tableName) {
   //   missed oylari kucukten buyuge siraladim
   data.results[0].members.sort(comparator);

   //    percent 10.yuzde 10 unu alacagim
   var missedNumber = data.results[0].members.length / 10;
   for (var n = 0; n < missedNumber; n++) {
      missedVotespct10.push(data.results[0].members[n])
   }
   for (var i = missedNumber + 1; i < data.results[0].members; i++) {
      if (data.results[0].members[i].missed_votes_pct == missedVotespct10[i - 2].missed_votes_pct) {
         missedVotespct10.push(data.results[0].members[i])
      }
      else {
         break;
      }
   }

   if (tableName == "most") {
      for (var i = 0; i < missedVotespct10.length; i++) {
         var row = document.createElement("tr");
         for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            if (j == 0) {
               col.innerHTML = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name;
            }
            if (j == 1) {
               col.innerHTML = data.results[0].members[i].missed_votes;
            }
            if (j == 2) {
               col.innerHTML = missedVotespct10[i].missed_votes_pct;
            }
            row.appendChild(col);
         }
         document.getElementById("mostEngaged").appendChild(row);
      }
   } else if (tableName == "least") {
      for (var i = 0; i < missedVotespct10.length; i++) {
         var row = document.createElement("tr");
         for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            if (j == 0) {
               col.innerHTML = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name;
            }
            if (j == 1) {
               col.innerHTML = data.results[0].members[i].missed_votes;
            }
            if (j == 2) {
               col.innerHTML = missedVotespct10[i].missed_votes_pct;
            }
            row.appendChild(col);
         }
         document.getElementById("leastEngaged").appendChild(row);
      }
   }
   missedVotespct10 = [];
}

// low to high function.siralama fonksiyonu kucukten buyuge
function lowToHighMissed(x, y) {
   return x.missed_votes_pct - y.missed_votes_pct;
}

//  high to low function.siralama fonksiyonu buyukten kucuge
function highToLowMissed(x, y) {
   return y.missed_votes_pct - x.missed_votes_pct;
}

function lowToHighVotes(x, y) {
   return x.votes_with_party_pct - y.votes_with_party_pct;
}
function highToLowVotes(x, y) {
   return y.votes_with_party_pct - x.votes_with_party_pct;
}

function loyal(comparator, tableName) {
   data.results[0].members.sort(comparator);
   var votesNumber = data.results[0].members.length / 10;
   for (var k = 0; k < votesNumber; k++) {
      votesPartypct10.push(data.results[0].members[k])
   }


   for (var i = votesNumber.length + 1; i < (data.results[0].members).length; i++) {
      if (data.results[0].members[i].votes_with_party_pct == votesPartypct10[i - 2].votes_with_party_pct) {
         votesPartypct10.push(data.results[0].members[i]);
      }
      else {
         break;
      }
   }

   if (tableName == "mostLoyal") {
      for (var i = 0; i < votesPartypct10.length; i++) {
         var row = document.createElement("tr");
         for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            if (j == 0) {
               col.innerHTML = votesPartypct10[i].first_name + " " + votesPartypct10[i].last_name;
            }
            if (j == 1) {
               col.innerHTML = votesPartypct10[i].missed_votes;
            }
            if (j == 2) {
               col.innerHTML = votesPartypct10[i].votes_with_party_pct;
            }
            row.appendChild(col);
         }
         document.getElementById("mostLoyal").appendChild(row);
      }
   } else if (tableName == "leastLoyal") {
      for (var i = 0; i < votesPartypct10.length; i++) {
         var row = document.createElement("tr");
         for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            if (j == 0) {
               col.innerHTML = votesPartypct10[i].first_name + " " + votesPartypct10[i].last_name;
            }
            if (j == 1) {
               col.innerHTML = votesPartypct10[i].missed_votes;
            }
            if (j == 2) {
               col.innerHTML = votesPartypct10[i].votes_with_party_pct;
            }
            row.appendChild(col);
         }
         document.getElementById("leastLoyal").appendChild(row);

      }
   }

   votesPartypct10 = [];

}






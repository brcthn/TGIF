

var firstTable = new Vue({
  el: '#app',
  data: {
    rows: [],
    party: [],
    state: "",
    isLoading: true

  },
  methods: {
    fetchData: function () {
      fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
        headers: {
          "X-API-Key": "Tr0223Du2MQC0zZPyIpBXlPauf2inxnDQSMhXat8"
        }
      }).then(function (data) {
        return data.json();
      }).then(data => {
        this.rows = data.results[0].members;
        console.log(this.rows)
        this.isLoading = false;
      })
    }
  },
  created() {
    this.fetchData();
    
  },
  computed: {
    filter: function () {
      
        let filteredMembers = this.rows.filter(member => {
          return (this.party.includes(member.party) || this.party.length == 0 && this.state == member.state)
          })
          return filteredMembers;    
    
    },

    // filter: function () {
     
    //   let filteredMembers = this.rows.filter(member => this.state == member.state)
    // //   // console.log(filteredMembers);
    //   return filteredMembers;
    // }
  }
});



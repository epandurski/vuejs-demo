import {baseUrl, seasonYear} from "./settings.js";

let data = {
  matches: [],
  searchTerm: "",
};

export let AllMatches = Vue.component('all-matches', {
  data: () => data,
  template: `
    <div>
      <form class="form-horizontal">
        <div class="form-group">
          <input v-model="searchTerm" type="text" placeholder="Search team" class="form-control">
        </div>
      </form>
      <table class="table">
  	<tr>
  	  <th>Time</th>
  	  <th>Team1</th>
  	  <th>Team2</th>
          </tr>
  	<tr v-for="(match, index) in filteredMatches">
  	  <td>{{match.MatchDateTimeUTC}}</td>
  	  <td>{{match.Team1.TeamName}}</td>
  	  <td>{{match.Team2.TeamName}}</td>
  	</tr>
      </table>
    </div>
  `,
  created() {
    fetch(baseUrl + 'getmatchdata/bl1/' + seasonYear)
      .then(response => response.json())
      .then(j => {
	this.matches = j;
      });
  },
  computed: {
    filteredMatches: function () {
      return this.matches.filter(m => {
	let searchTerm = this.searchTerm.toLowerCase().trim();
	let name1 = m.Team1.TeamName.toLowerCase();
	let name2 = m.Team2.TeamName.toLowerCase();
	return name1.includes(searchTerm) || name2.includes(searchTerm);
      });
    }
  }  
});

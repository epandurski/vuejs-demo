import {baseUrl} from "./settings.js";

let data = {
  matches: [],
};

export let WeekendMatches = Vue.component('weekend-matches', {
  data: () => data,
  template: `
    <table class="table">
	<tr>
	  <th>Time</th>
	  <th>Team1</th>
	  <th>Team2</th>
        </tr>
	<tr v-for="(match, index) in matches">
	  <td>{{match.MatchDateTimeUTC}}</td>
	  <td>{{match.Team1.TeamName}}</td>
	  <td>{{match.Team2.TeamName}}</td>
	</tr>
    </table>
  `,
  created() {
    fetch(baseUrl + 'getmatchdata/bl1')
      .then(response => response.json())
      .then(j => {
	this.matches = j;
      });
  },
});

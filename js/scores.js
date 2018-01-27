import {baseUrl, seasonYear} from "./settings.js";

let data = {
  scores: [],
};

export let Scores = Vue.component('all-matches', {
  data: () => data,
  template: `
    <table class="table">
	<tr>
	  <th></th>
	  <th>Team</th>
	  <th>Loses</th>
	  <th>Draws</th>
	  <th>Wins</th>
	  <th>Points</th>
        </tr>
	<tr v-for="([name, stats], index) in scores">
	  <td>{{index + 1}}</td>
	  <td>{{name}}</td>
	  <td>{{stats.losses}}</td>
	  <td>{{stats.draws}}</td>
	  <td>{{stats.wins}}</td>
	  <td><b>{{stats.points}}</b></td>
	</tr>
    </table>
  `,
  created() {
    fetch(baseUrl + 'getmatchdata/bl1/' + seasonYear)
      .then(response => response.json())
      .then(j => {
	this.scores = generateScores(j);
      });
  },
});

function generateScores(matches) {
  let scores = new Map();
  
  for (let m of matches) {
    if (!m.MatchIsFinished) continue;
    let team1 = m.Team1.TeamName;
    let team2 = m.Team2.TeamName;
    
    // -1 -- team1 loses; 0 -- draw; 1 -- team1 wins
    let outcome = Math.sign(m.MatchResults[1].PointsTeam1 - m.MatchResults[1].PointsTeam2);
    
    // teamScores = [losses, draws, wins]
    let team1Scores = scores.get(team1) || [0, 0, 0];
    let team2Scores = scores.get(team2) || [0, 0, 0];
    team1Scores[outcome + 1] += 1;
    team2Scores[1 - outcome] += 1;
    scores.set(team1, team1Scores);
    scores.set(team2, team2Scores);
  }
  
  let statsList = Array.from(scores.entries()).map(([name, s]) => [name, {
    'losses': s[0],
    'draws': s[1],
    'wins': s[2],
    'points': s[1] + 3 * s[2],
  }]);
  return statsList.sort((a, b) => b[1].points - a[1].points);
}

// start slingin' some d3 here.
// Setup the game board
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 100,
  bestScore: 1000
};

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
}

var gameBoard = d3.select('.container').append('svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height);

var updateScore = d3.select('#currentScore')
          .text(gameStats.score.toString());

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  return d3.select('#bestScore').text(gameStats.bestScore.toString());
};

updateBestScore();

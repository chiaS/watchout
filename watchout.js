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

var updateScore = d3.select('#current-score')
          .text(gameStats.score.toString());

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  return d3.select('#best-score').text(gameStats.bestScore.toString());
};

updateBestScore();


function createEnemies (nEnemies) {
  var enemiesData = [];

  for (var i = 0; i < nEnemies; i++) {
    enemiesData[i] = Math.random() * 20 + 5;
  }
  var enemies = gameBoard.selectAll('circle')
      .data(enemiesData)
      .enter().append('circle')
  //    .attr('cx', function() { return Math.random() * gameOptions.width; })
   //   .attr('cy', function() { return Math.random() * gameOptions.height; })
      .attr('r', function(d) { return d; });
  var colors = ['#F22233', '#F2F2F2', '#C0B5FD', '#9CBF1B', '#F26241']
  setInterval(function() {

    enemies.attr('cy', function() {
      return Math.random() * gameOptions.height;
    });
    enemies.transition().duration(2000)
                        .attr('cx', function() {
                          return Math.random() * gameOptions.width + 30;
                        })
                        .attr('cy', function() {
                          return Math.random() * gameOptions.height + 30;
                        })
                        .style('fill', function(d) {
                          return colors[Math.floor(Math.random() * 5)];
                        })
                        .transition().duration(2000);

  }, 1000);
};

createEnemies(30);


// start slingin' some d3 here.
// Setup the game board
var margin = 8;
var gameOptions = {
  height: $(document).height() - 2 * margin,
  width: $(document).width() - 2 * margin,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisionCount: 0
};

var axes = {
  x: d3.scale.linear().domain([0, 1000]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 1000]).range([0, gameOptions.height])
}

var gameBoard = d3.select('.container').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var updateScore = function() {
  d3.select('#current-score').text(gameStats.score.toString());
  d3.select('#collision-count').text(gameStats.collisionCount.toString());
}

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  return d3.select('#best-score').text(gameStats.bestScore.toString());
};

var checkCollision = function(enemies, collidedCallback){
  enemies.forEach(function(enemy, index){
    var radiusSum = +enemy.getAttribute('r') + player.r ;
    var xDiff = +enemy.getAttribute('cx') - player.x;
    var yDiff = +enemy.getAttribute('cy') - player.y;
    var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    if (distance < radiusSum) {
      collidedCallback();
    }

  });
};

var onCollision = function() {
  updateBestScore();
  gameStats.score = 0;
  gameStats.collisionCount++;
  return updateScore();
};

var play = function() {
  var increaseScore = function() {
    gameStats.score += 1;
    return updateScore();
  };

  return setInterval(increaseScore, 50);
}

var player = new Player().render(gameBoard);
var enemies = new Enemies(gameBoard, 20);

play();

d3.timer(function(){checkCollision(enemies.el[0], onCollision);});



































// start slingin' some d3 here.
// Setup the game board
var gameOptions = {
  height: $(window).height(),
  width: $(window).width(),
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

var gameBoard = d3.select('.container').append('svg:svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height);

var updateScore = function() {
  return d3.select('#current-score').text(gameStats.score.toString());
}

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  return d3.select('#best-score').text(gameStats.bestScore.toString());
};


function Enemies (nEnemies) {
  var enemiesData = [];

  for (var i = 0; i < nEnemies; i++) {
    enemiesData[i] = Math.random() * 30 + 5;
  }
  var enemies = gameBoard.selectAll('circle')
      .data(enemiesData)
      .enter().append('circle')
      .attr('r', function(d) { return d; });
  var colors = ['#F22233', '#F2F2F2', '#C0B5FD', '#9CBF1B', '#F26241']
  setInterval(function() {

    enemies.attr('cy', function() {
      return Math.random() * gameOptions.height;
    });
    enemies.transition().duration(2500)
                        .attr('cx', function() {
                          return Math.random() * gameOptions.width - 100;
                        })
                        .attr('cy', function() {
                          return Math.random() * gameOptions.height - 100;
                        })
                        .style('fill', function(d) {
                          return colors[Math.floor(Math.random() * 5)];
                        })
                        .transition().duration(2500);

  }, 2000);
};

var enemies = new Enemies(50);

var Player = function() {
  this.path = 'M15,8c0,0.552-0.447,1-1,1s-1-0.448-1-1s0.447-1,1-1S15,7.448,15,8z M11,8c0-0.552-0.448-1-1-1S9,7.448,9,8s0.448,1,1,1\
  S11,8.552,11,8z M10,10.093C10.592,11.639,12,12,12,12s1.408-0.361,2-1.907c-1.148-0.332-2-0.953-2-0.953S11.149,9.761,10,10.093z\
   M18.051,21.039H19c0.529,0,0.961,0.432,0.961,0.961S19.529,22.961,19,22.961h-0.008C18.992,22.975,19,22.986,19,23\
  c0,0.553-0.447,1-1,1c-2.598,0-4.471-0.186-5.566-0.552c-0.163-0.054-0.305-0.113-0.434-0.175c-0.128,0.062-0.271,0.121-0.434,0.175\
  C10.469,23.814,8.596,24,6,24c-0.552,0-1-0.447-1-1c0-0.014,0.007-0.025,0.008-0.039H5c-0.531,0-0.961-0.432-0.961-0.961\
  S4.469,21.039,5,21.039h0.949c-1.363-1.172-2.258-2.828-2.744-4.857c-0.302,0.186-1.899,1.076-3.203,0.135\
  c-0.073-0.955,1.895-2.414,2.86-4.979c0,0.003,0.001,0.005,0.001,0.008c0.254-0.979,0.863-2.612,0.922-3.094\
  C3.785,2.567,8.299,0,12,0s8.215,2.567,8.215,8.252c0.059,0.482,0.668,2.116,0.922,3.096c0.002-0.003,0.002-0.006,0.002-0.01\
  c0.965,2.564,2.932,4.023,2.859,4.979c-1.305,0.941-2.902,0.05-3.203-0.135C20.311,18.211,19.414,19.867,18.051,21.039z\
   M18.477,13.751c0-2.454-0.926-3.631-0.926-3.631s1.774-6.657-3.238-6.657c-1.068,0-1.894,1.186-2.312,1.186\
  s-1.066-1.186-2.313-1.186c-5.012,0-3.238,6.657-3.238,6.657s-0.925,1.177-0.925,3.631c0,5.106,3.559,6.489,6.476,6.489\
  S18.477,18.857,18.477,13.751z';
  this.fill = 'green';
  this.x = gameOptions.width * 0.5;
  this.y = gameOptions.height * 0.5;
  this.angle = 0;
  this.r = 5;

};

Player.prototype.render = function(to) {
 /* this.el = to.append('svg:path').attr('d', this.path).attr('fill', this.fill);
  this.transform({
    x: gameOptions.width * 0.5,
    y: gameOptions.height * 0.5
  });*/
  this.el = to.append('svg:path')
           .attr('d', this.path)
           .attr('transform', 'translate(' + this.x + ',' + this.y + ')')
           .attr('fill', this.fill);
  this.setupDragging();
  return this;
}

Player.prototype.getX = function() {
  return this.x;
};

Player.prototype.setX = function(x) {
  var maxX;
  var minX;
  minX = gameOptions.padding;
  maxX = gameOptions.width - gameOptions.padding;
  if (x <= minX) {
    x = minX;
  }
  if (x >= maxX) {
    x = maxX;
  }
  return this.x = x;
};

Player.prototype.getY = function() {
  return this.y;
};

Player.prototype.setY = function(y) {
  var maxY;
  var minY;
  minY = gameOptions.padding;
  maxY = gameOptions.height - gameOptions.padding;
  if (y <= minY) {
    y = minY;
  }
  if (y >= maxY) {
    y = maxY;
  }
  return this.y = y;
};

Player.prototype.transform = function(opts) {
  this.angle = opts.angle || this.angle;
  this.setX(opts.x || this.x);
  this.setY(opts.y || this.y);
  return this.el.attr('transform', ('rotate(' + this.angle + ',' +
                                    (this.getX()) + ',' + (this.getY()) + ') ') +
                                   ('translate(' + (this.getX()) + ',' + (this.getY()) + ')'));
};

Player.prototype.moveAbsolute = function(x, y) {
  return this.transform({
    x: x,
    y: y
  });
};

Player.prototype.moveRelative = function(dx, dy) {
  return this.transform({
    x: this.getX() + dx,
    y: this.getY() + dy,
    angle: 360 * (Math.atan2(dy, dx) / (Math.PI * 2))
  });
};

Player.prototype.setupDragging = function() {
  var _this = this;
  var drag;
  var dragMove = function() {
    return _this.moveRelative(d3.event.dx, d3.event.dy);
  };
  drag = d3.behavior.drag().on('drag', dragMove);
  return this.el.call(drag);
}

var player = new Player();
player.render(gameBoard);


  // function dragstarted() {
  //   alert('start');
  //   d3.event.sourceEvent.stopPropagation();
  //   d3.select(this).classed('dragging', true);
  // }

  // function dragged() {
  //   alert('dragged');
  //   d3.select(this).attr('cx', x = d3.event.x).attr('cy', y = d3.event.y);
  // }

  // function dragended() {
  //   d3.select(this).classed('dragging', false);
  // }




































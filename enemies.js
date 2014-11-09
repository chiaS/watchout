var Enemies = function(gameBoard, numberOfEnemies) {

  this.colors = ['#F22233', '#F2F2F2', '#C0B5FD', '#9CBF1B', '#F26241', '#F53240', '#1F8A70', '#FD7400', '#730046'];
  this.render(gameBoard, numberOfEnemies);
  this.intervalHandler();
  setInterval(this.intervalHandler.bind(this), 2000);
};

Enemies.prototype.intervalHandler = function () {
  this.el.attr('cy', function() {
    return Math.random() * gameOptions.height;
  });

  this.el.transition().duration(2500)
    .attr('cx', function() {
      return Math.random() * gameOptions.width;
    })
    .attr('cy', function() {
      return Math.random() * gameOptions.height;
    })
    .style('fill', function(d) {
      return this.colors[Math.floor(Math.random() * 9)];
    }.bind(this));
};

Enemies.prototype.render = function(gameBoard, numberOfEnemies){
  this.enemiesData = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    this.enemiesData[i] = Math.random() * numberOfEnemies + 5;
  }

  this.el = gameBoard.selectAll('circle')
    .data(this.enemiesData)
    .enter().append ('circle')
    .attr('r', function(d) { return d; })
    .style('fill', function(d) {
      return this.colors[Math.floor(Math.random() * 5)];
    }.bind(this));
  return this;
};

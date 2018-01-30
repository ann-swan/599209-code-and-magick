'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var OFFSET = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_OFFSET = 50;
var BOTTOM_OFFSET_COLUMN = 30;
var TEXT_X = 130;
var TEXT_HEIGHT = 20;

var drawCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var drawColumn = function (ctx, name, ms, index, maxTime) {
  var heightColumn = (COLUMN_HEIGHT * ms) / maxTime;
  var columnX = CLOUD_X + COLUMN_WIDTH * (index + 1) + COLUMN_OFFSET * index;
  var columnY = CLOUD_HEIGHT - BOTTOM_OFFSET_COLUMN - heightColumn;
  var nameY = CLOUD_HEIGHT - OFFSET;
  var scoreY = columnY - OFFSET;
  var score = Math.round(ms);
  var opacity = +Math.random().toFixed(2);
  
  ctx.fillStyle = '#000';
  ctx.fillText(name, columnX, nameY);
  ctx.fillText(score, columnX, scoreY);
  ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity +')';
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fillRect(columnX, columnY, COLUMN_WIDTH, heightColumn);
};

window.renderStatistics = function(ctx, names, times) {
  var maxTime = getMaxElement(times);
  
  drawCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', TEXT_X, CLOUD_Y + OFFSET + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', TEXT_X, CLOUD_Y + OFFSET + TEXT_HEIGHT * 2);

  for (var i = 0; i < names.length; i++) {
    drawColumn(ctx, names[i], times[i], i, maxTime);
  }
};
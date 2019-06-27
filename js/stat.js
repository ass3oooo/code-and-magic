"use strict;"

var CLOUD_LEFTCORNER_X = 100;
var CLOUD_LEFTCORNER_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_SHADOW_OFFSET_X = 10;
var CLOUD_SHADOW_OFFSET_Y = 10;

function renderCloud(ctx, color, shadowOffsetX = 0, shadowOffsetY = 0) {
  let left = CLOUD_LEFTCORNER_X + shadowOffsetX;
  let top = CLOUD_LEFTCORNER_Y + shadowOffsetY;
  let right = CLOUD_WIDTH + CLOUD_LEFTCORNER_X + shadowOffsetX;
  let bottom = CLOUD_HEIGHT + CLOUD_LEFTCORNER_Y + shadowOffsetY;
  let centerX = (left + right) / 2;
  let centerY = (top + bottom) / 2;

  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(centerX, bottom * 0.07);
  ctx.lineTo(right, top);
  ctx.lineTo(right - 0.1 * centerX, centerY);
  ctx.lineTo(right, bottom);
  ctx.lineTo(centerX, bottom * 0.95);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left + 0.1 * centerX, centerY);
  ctx.fillStyle = color;
  ctx.fill();
}

window.renderStatistics = function(ctx, names, times) {

  //return column color
  function getGistPlayerColor() {
    return "rgba(0, 0, 255, " + Math.random() + ")";
  }

  function renderStatisticsColumns(ctx, names, times) {
    ctx.style = "black";
    let offset = gistColumnWidth + gistColumnMargin;
    let timesMax = Math.ceil(times.reduce((max, elem) => {
      return elem > max ? elem : max;
    }, -Infinity));
    let columnHeightMultiplier = gistHeight / timesMax;

    for (let i = 0; i < names.length; i++) {
      let columnColor;
      let columnHeight = times[i] * columnHeightMultiplier;
      let itemPositionX = gistX + offset * i;

      //rounding statistics result to integer
      times[i] = Math.ceil(times[i]);

      if (names[i] == "Вы") {
        columnColor = gistUserColor;
      } else {
        columnColor = getGistPlayerColor();
      }

      ctx.fillStyle = columnColor;
      ctx.fillRect(itemPositionX, gistY, gistColumnWidth, - columnHeight);

      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.fillText(times[i], itemPositionX, gistY - columnHeight - 5);
      ctx.fillText(names[i], itemPositionX, gistY + 20);
    }
  }

  let CLOUD_CENTER_X = CLOUD_LEFTCORNER_X + CLOUD_WIDTH / 2;
  let CLOUD_CENTER_Y = CLOUD_LEFTCORNER_Y + CLOUD_HEIGHT / 2;
  let gistHeight = 150;
  let gistX = CLOUD_LEFTCORNER_X + 55;
  let gistY = CLOUD_LEFTCORNER_Y + CLOUD_HEIGHT - 45;
  let gistColumnWidth = 40;
  let gistColumnMargin = 50;
  let gistUserColor = "rgba(255, 0, 0, 1)";

  //rendering cloud shadow
  renderCloud(ctx, "rgba(0, 0, 0, 0.7)", CLOUD_SHADOW_OFFSET_X, CLOUD_SHADOW_OFFSET_Y);

  //rendering cloud
  renderCloud(ctx, "white");

  //rendering congratulations text
  ctx.fillStyle = "black";
  ctx.font = "16px PT Mono";
  ctx.textAlign = "center";
  ctx.fillText("Ура, вы победили!", CLOUD_CENTER_X, CLOUD_LEFTCORNER_Y + 30);
  ctx.fillText("Список результатов:", CLOUD_CENTER_X, CLOUD_LEFTCORNER_Y + 50);

  //rendering stats
  renderStatisticsColumns(ctx, names, times);
}

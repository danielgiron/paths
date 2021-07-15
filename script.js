let cellsContainer = document.querySelector(".cells__container");

for (let y = 0; y < 80; y++) {
  for (let x = 0; x < 80; x++) {
    let newBlock = document.createElement("div");
    newBlock.classList.add("cell");
    cellId = "x" + x + "y" + y;
    newBlock.id = cellId;
    cellsContainer.appendChild(newBlock);
  }
  const br = document.createElement("br");
  cellsContainer.appendChild(br);
}

cellsContainer.addEventListener("mouseover", hoverOn);
//cellsContainer.addEventListener("mouseout", hoverOff);

// for (let i = 0; i < 10; i++) {
//   let style = getComputedStyle(cell);
//   //let newColor = adjust(style.backgroundColor, 50);
//   //console.log(style.backgroundColor, newColor);
//   intermediaryTimeout(i);

//   // setTimeout((i) => {
//   //   //cell.style.backgroundColor = newColor;
//   //   console.log(i);
//   // }, 2000);
// }

let highlightColor = "#2d314e";
let colorStops = 2;
let colorArray = generateColor("#ffffff", highlightColor, colorStops);
const FADE = true;

function hoverOn(event) {
  if (event.target.classList.contains("cell")) {
    let cell = event.target;
    //cell.classList.add("highlight");
    cell.style.backgroundColor = highlightColor;
    console.log(cell.id);

    if (FADE) {
      let i = 0;
      function loop() {
        setTimeout(function () {
          cell.style.backgroundColor = "#" + colorArray[i];
          i++;
          if (i < colorStops) {
            loop();
          } else {
            //cell.classList.remove("highlight");
          }
        }, 500);
      }

      loop();
    }
  }
}

function movingDot() {
  let startingX = 39;
  let startingY = 39;
  let redCell = document.getElementById("x" + startingX + "y" + startingY);
  redCell.style.backgroundColor = "red";

  let direction = Math.floor(Math.random() * 5);
  let c = 0;

  function redLoop() {
    setTimeout(function (direction) {
      direction = Math.floor(Math.random() * 5);
      redCell.style.backgroundColor = "#ffffff";
      if (direction === 0) {
        startingX++;
      }
      if (direction === 1) {
        startingY++;
      }
      if (direction === 2) {
        startingX--;
      }
      if (direction === 3) {
        startingY--;
      }

      redCell = document.getElementById("x" + startingX + "y" + startingY);
      redCell.style.backgroundColor = "red";
      c++;

      if (startingX > 0 && startingX < 79 && startingY > 0 && startingY < 79) {
        redLoop();
      }
    }, 0);
  }

  redLoop();
  console.log(c);
}

movingDot();

//////////////////////////////////////////////////////////////////////////
//color adjusting functinon from stackoverflow user Euler Junior:
//https://stackoverflow.com/questions/3080421/javascript-color-gradient
{
  function hex(c) {
    var s = "0123456789abcdef";
    var i = parseInt(c);
    if (i == 0 || isNaN(c)) return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
  }
  /* Convert an RGB triplet to a hex string */
  function convertToHex(rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
  }
  /* Remove '#' in color hex string */
  function trim(s) {
    return s.charAt(0) == "#" ? s.substring(1, 7) : s;
  }
  /* Convert a hex string to an RGB triplet */
  function convertToRGB(hex) {
    var color = [];
    color[0] = parseInt(trim(hex).substring(0, 2), 16);
    color[1] = parseInt(trim(hex).substring(2, 4), 16);
    color[2] = parseInt(trim(hex).substring(4, 6), 16);
    return color;
  }
  function generateColor(colorStart, colorEnd, colorCount) {
    // The beginning of your gradient
    var start = convertToRGB(colorStart);

    // The end of your gradient
    var end = convertToRGB(colorEnd);

    // The number of colors to compute
    var len = colorCount;

    //Alpha blending amount
    var alpha = 0.0;

    var saida = [];

    for (i = 0; i < len; i++) {
      var c = [];
      alpha += 1.0 / len;

      c[0] = start[0] * alpha + (1 - alpha) * end[0];
      c[1] = start[1] * alpha + (1 - alpha) * end[1];
      c[2] = start[2] * alpha + (1 - alpha) * end[2];

      saida.push(convertToHex(c));
    }

    return saida;
  }
} /////////////////////////end of code by Euler Junior on Stackoverflow

function hoverOff(event) {
  if (event.target.classList.contains("cell")) {
    let cell = event.target;
    cell.classList.remove("highlight");
  }
}

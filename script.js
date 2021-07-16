const GRID_SIZE = 70; //maximum suggested size is 80
const TRAIL_FADE = true;
let SHADE_AVERAGING = false;
let RED_DOT = false;

let highlightColor = "#2d314e";
let colorStops = 3;
let colorArray = generateColor("#ffffff", highlightColor, colorStops);
let colorGradient = generateColor("#ffffff", highlightColor, 10);

let cellsContainer = document.querySelector(".cells__container");
cellsContainer.addEventListener("mouseover", hoverOn);
//cellsContainer.addEventListener("mouseout", hoverOff);
let averagingBtn = document.getElementById("averaging_btn");
let redDotBtn = document.getElementById("redDot_btn");
averagingBtn.addEventListener("click", toggleAveraging);
redDotBtn.addEventListener("click", toggleRedDot);

function toggleAveraging(event) {
  let e = event.target;
  e.classList.toggle("active");
  if (e.classList.contains("active")) {
    SHADE_AVERAGING = true;
    console.log("SHADING ON");
  } else {
    SHADE_AVERAGING = false;
    console.log("SHADING OFF");
  }
  console.log(e);
  checkStates();
}

function toggleRedDot(event) {
  let e = event.target;
  e.classList.toggle("active");
  if (e.classList.contains("active")) {
    RED_DOT = true;
  } else {
    RED_DOT = false;
  }
  //console.log(e);
  checkStates();
}

for (let y = 0; y < GRID_SIZE; y++) {
  for (let x = 0; x < GRID_SIZE; x++) {
    let newBlock = document.createElement("div");
    newBlock.classList.add("cell");
    cellId = "x" + x + "y" + y;
    newBlock.id = cellId;
    newBlock.style.backgroundColor = "rgb(255, 255, 255)";
    newBlock.shade = 0;
    cellsContainer.appendChild(newBlock);
  }
  const br = document.createElement("br");
  cellsContainer.appendChild(br);
}

function checkStates() {
  averaging();
  movingDot();
}

//console.log(colorArray) => ["737589", "b9bac4", "ffffff"]
function averaging() {
  if (SHADE_AVERAGING) {
    setInterval(() => {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          //console.log();
          let cell = document.getElementById("x" + x + "y" + y);
          let average = 0;
          let total = 0;
          let neighbors = 0;

          try {
            let cellRight = document.getElementById("x" + (x + 1) + "y" + y);
            total = total + cellRight.shade;
            neighbors = neighbors + 1;
          } catch {}
          try {
            let cellBelow = document.getElementById("x" + x + "y" + (y + 1));
            total = total + cellBelow.shade;
            neighbors = neighbors + 1;
          } catch {}
          try {
            let cellLeft = document.getElementById("x" + (x - 1) + "y" + y);
            total = total + cellLeft.shade;
            neighbors = neighbors + 1;
          } catch {}
          try {
            let cellAbove = document.getElementById("x" + x + "y" + (y - 1));
            total = total + cellAbove.shade;
            neighbors = neighbors + 1;
          } catch {}

          average = Math.floor(total / neighbors);
          let result = 10 - average;
          cell.style.backgroundColor = "#" + colorGradient[result];
          //console.log(cell.style.backgroundColor);
        }
      }
    }, 50);
  }
}

//draws trail on grid, controlling length, color, duration.
function hoverOn(event) {
  if (event.target.classList.contains("cell")) {
    let cell = event.target;
    cell.style.backgroundColor = highlightColor;
    console.log(cell.id);

    if (TRAIL_FADE) {
      let i = 0;
      function loop() {
        setTimeout(function () {
          cell.style.backgroundColor = "#" + colorArray[i];
          switch (i) {
            case 2:
              cell.shade = 0;
              break;
            case 1:
              cell.shade = 4;
              break;
            case 0:
              cell.shade = 9;
              break;
          }
          i++;
          if (i < colorStops) {
            loop();
          }
        }, 200);
      }

      loop();
    }
  }
}

//function controlling red dot on screen
function movingDot() {
  if (RED_DOT) {
    let xPosition = GRID_SIZE / 2;
    let yPosition = GRID_SIZE / 2;
    let redCell = document.getElementById("x" + xPosition + "y" + yPosition);
    redCell.style.backgroundColor = "red";

    let direction = Math.floor(Math.random() * 5);

    //self-referencing function that updates direction and speed of red dot
    function redDotLoop() {
      setTimeout(function () {
        //checking surrounding cells
        let cellRight = document.getElementById(
          "x" + (xPosition + 1) + "y" + yPosition
        );
        //cellRight.style.backgroundColor = "limegreen";

        let cellBelow = document.getElementById(
          "x" + xPosition + "y" + (yPosition + 1)
        );
        //cellBelow.style.backgroundColor = "limegreen";

        let cellLeft = document.getElementById(
          "x" + (xPosition - 1) + "y" + yPosition
        );
        //cellLeft.style.backgroundColor = "green";

        let cellAbove = document.getElementById(
          "x" + xPosition + "y" + (yPosition - 1)
        );

        movement();

        redCell.style.backgroundColor = "rgb(255, 255, 255)";
        redCell = document.getElementById("x" + xPosition + "y" + yPosition);
        redCell.style.backgroundColor = "red";

        if (
          xPosition > 0 &&
          xPosition < 79 &&
          yPosition > 0 &&
          yPosition < 79
        ) {
          redDotLoop();
        }

        function movement() {
          if (direction === 0) {
            if (cellRight.style.backgroundColor === "rgb(255, 255, 255)") {
              xPosition++;
            } else {
              direction = Math.floor(Math.random() * 5);
              movement();
            }
          } else if (direction === 1) {
            if (cellBelow.style.backgroundColor === "rgb(255, 255, 255)") {
              yPosition++;
            } else {
              direction = Math.floor(Math.random() * 5);
              movement();
            }
          } else if (direction === 2) {
            if (cellLeft.style.backgroundColor === "rgb(255, 255, 255)") {
              xPosition--;
            } else {
              direction = Math.floor(Math.random() * 5);
              movement();
            }
          } //(direction === 3)
          else {
            if (cellAbove.style.backgroundColor === "rgb(255, 255, 255)") {
              yPosition--;
            } else {
              direction = Math.floor(Math.random() * 5);
              movement();
            }
          }
        }
      }, 100); //ms of setTimeout controlling speed of red dot
    }

    redDotLoop();
  }

  //else {}
  RED_DOT = false; //end of function, no longer active
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

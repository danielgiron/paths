let cellsContainer = document.querySelector(".cells__container");

let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let alpha = 0; //index variable of letters[]
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
let num = 0; //index variable of numbers[]

let cellFlip = true; //used to create alternating cells classed as "even" or not
for (let i = 0; i < 80; i++) {
  for (let n = 0; n < 80; n++) {
    let newBlock = document.createElement("div");
    newBlock.classList.add("cell");
    if (cellFlip) {
      newBlock.classList.add("even");
    }
    cellFlip = !cellFlip;
    cellId = "" + letters[alpha] + numbers[num];
    newBlock.id = cellId;
    cellsContainer.appendChild(newBlock);

    num = num + 1;
  }
  const br = document.createElement("br");
  cellsContainer.appendChild(br);
  cellFlip = !cellFlip;
  num = 0;
  alpha = alpha + 1;
}

cellsContainer.addEventListener("mouseover", hoverOn);
//cellsContainer.addEventListener("mouseout", hoverOff);

function hoverOn(event) {
  if (event.target.classList.contains("cell")) {
    let cell = event.target;
    cell.classList.add("highlight");
  }
}

function hoverOff(event) {
  if (event.target.classList.contains("cell")) {
    let cell = event.target;
    cell.classList.remove("highlight");
  }
}

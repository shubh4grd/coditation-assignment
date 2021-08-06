/*
  TO TAKE CARE OF:
1. Any live cell with fewer than two live neighbors dies, as if by loneliness.
2. Any live cell with more than three live neighbors dies, as if by overcrowding.
3. Any live cell with two or three live neighbors lives, unchanged, to the next generation.
4. Any dead cell with exactly three live neighbors comes to life.
*/

// GLOBAL
const colors = { green: "#67c642", red: "#ed3f36" }; // Green indicates alive and red indicates dead cell
let nodes = Array();

// Main element
const grid = document.querySelector(".grid");

// Initial 500 Cells and a counter
let totalCells = 500;
let counter = 0;

// Initialization
let cell_row = 1;
let count = 0;
let rows = parseInt(totalCells / 20);

// Get Random Color
var getRandomColor = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

// Intro Content and storing cells data
for (let i = 1; i <= rows; ++i) {
  let row_nodes = []; // storing cells of each row in an Array
  for (let j = 1; j <= 20; ++j) {
    const randomColor = getRandomColor(colors);
    const alive = randomColor == colors.green ? true : false;
    const id = +alive;
    const li = document.createElement("li");
    counter += 1;
    li.innerHTML = `${counter}`;
    li.setAttribute("class", `cell cell_${i}_${j}`);
    li.setAttribute("alive", alive);
    li.setAttribute("id", id);
    // styles for cells
    li.style.backgroundColor = randomColor;
    li.style.borderRadius ="5px";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "center";
    li.style.boxShadow = "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px";

    row_nodes.push(li);

    grid.append(li);
  }
  nodes.push(row_nodes);
}

// The main tasks to be performed mentioned at the top

function challenge() {
  const new_rows = nodes.length;
  const new_cols = nodes[0].length;

  console.log(new_rows, new_cols, nodes.length, nodes[0].length);

  // Making Changes
  for (let row = 0; row < new_rows; ++row) {
    for (let col = 0; col < new_cols; ++col) {
      // count live neighbors for each cell
      let live_neighbors = 0;
      for (let neigh of neighbors) {
        // row and column of neighbouring cell
        let r = row + neigh[0];
        let c = col + neigh[1];

        // Verifying the existence of the new cell and alive.

        if (r < new_rows && r >= 0 && c < new_cols && c >= 0) {
          const id = parseInt(nodes[r][c].getAttribute("id"));
          if (Math.abs(id) == 1) live_neighbors += 1;
        }
      }

      // Rule 1 or Rule 2
      const id = Math.abs(parseInt(nodes[row][col].getAttribute("id")));
      if (id == 1 && (live_neighbors < 2 || live_neighbors > 3)) {
        nodes[row][col].setAttribute("id", -1);
      }

      // Rule 4
      if (id == 0 && live_neighbors == 3) {
        nodes[row][col].setAttribute("id", 2);
      }

      // Rule 3 -> left unchanged when the live cell has 2 or more live neighbors
    }
  }
}

// Adding an element to keep to maintain the Grid Updates.
const update = document.querySelector("update");

// Add Form to take input from the user
// I have taken:
// -> input field (max - 100) multiples of 20
// -> submit to add new cells to the grid
// click on update shall reflect the challenge.

const userForm = document.createElement("form");
userForm.setAttribute("align", "center");

userForm.innerHTML = `
		<label for="user-input" id="label-input">New Cells (Multiples of 20): </label>
    <input type="number" id="user-input" name="user-input" placeholder=" <=100" min="20" max="100"  required>
    &nbsp;<button id="add-cells"> ADD </button> <br> <br>
`;
update.append(userForm);

// Adding eventListener to add new cells on form submission
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const noOfNewCells = parseInt(document.getElementById("user-input").value);

  // adding new cells on the interface and storing them in nodes
  const uRows = noOfNewCells / 20;
  const uCols = 20;
  for (let i = 0; i < uRows; ++i) {
    let rowNodes = [];
    for (let j = 0; j < uCols; ++j) {
      const randomColor = getRandomColor(colors);
      const alive = randomColor == colors.green ? true : false;
      const id = +alive;
      const li = document.createElement("li");
      counter += 1;
      li.innerHTML = `${counter}`;
      li.setAttribute("class", `cell cell_${i}_${j}`);
      li.setAttribute("alive", alive);
      li.setAttribute("id", id);
      // styles for added cells
      li.style.backgroundColor = randomColor;
      li.style.borderRadius ="5px";
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.justifyContent = "center";
      li.style.boxShadow = "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px";

      rowNodes.push(li);
      grid.append(li);
    }
    nodes.push(rowNodes);
  }

  document.getElementById("user-input").value = "";
  window.scrollTo(0, document.body.scrollHeight);
  challenge(); // Updating nodes array
});

// Neighbors => (horizontally, vertically, or diagonally adjacent)
const neighbors = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

// Timer to see updates in action
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Update Grids Function
async function updateGrids() {
  const new_rows = nodes.length;
  const new_cols = nodes[0].length;

  for (let row = 0; row < new_rows; ++row) {
    for (let col = 0; col < new_cols; ++col) {
      let cell = nodes[row][col];
      cell.style.outline = "2px solid black";
      const id = parseInt(cell.getAttribute("id"));
      if (id > 0) {
        cell.setAttribute("id", 1);
        cell.setAttribute("alive", true);
        cell.style.backgroundColor = colors.green;
      } else {
        cell.setAttribute("id", 0);
        cell.setAttribute("alive", false);
        cell.style.backgroundColor = colors.red;
      }
      await sleep(5);
      cell.style.outline = "";
    }
  }
}

// Adding button to make changes

const container = document.createElement("div");
const startButton = document.createElement("button");

startButton.setAttribute("type", "submit");
startButton.setAttribute("id", "update");
startButton.setAttribute("align", "center");
startButton.innerHTML = `UPDATE`;

container.append(startButton);
update.append(container);

startButton.addEventListener("click", (e) => {
  window.scrollTo(20, 20);
  updateGrids();
  challenge();
});

// Adding Search Functionality
function search() {
  let searchText = document.getElementById("search-text").value;
  window.find(searchText);
  document.getElementById("search-text").value = "";
}

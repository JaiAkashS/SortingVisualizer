let container = document.getElementById("container");
let n = parseInt(document.getElementById("numBars").value);

let isSorting = false;
let cancelRequested = false;

let heights = [];
let items;


initializeBars();

function initializeBars() {
  let h = container.clientHeight / n;
  let h1 = h;

  for (let i = 0; i < n; i++) {
    heights[i] = h;
    h += h1;
  }

  for (let i = 0; i < n; i++) {
    container.appendChild(document.createElement("div"));
  }

  items = document.querySelectorAll("#container div");
  setHeight();
}

function clearBars() {
  container.innerHTML = "";
  heights = [];
}

function createBars() {
  n = parseInt(document.getElementById("numBars").value);
  clearBars();

  let h = container.clientHeight / n;
  let h1 = h;

  for (let i = 0; i < n; i++) {
    heights[i] = h;
    h += h1;
  }

  for (let i = 0; i < n; i++) {
    container.appendChild(document.createElement("div"));
  }

  items = document.querySelectorAll("#container div");
  setHeight();
}

function setHeight() {
  let containerWidth = container.clientWidth;
  let width = containerWidth / n;

  items.forEach((div, index) => {
    index = Math.floor(Math.random() * heights.length);
    let newHeight = heights[index];
    heights.splice(index, 1);
    div.style.height = `${newHeight}px`;
    div.style.width = `${width}px`;
  });
}

function changeColor(item, color) {
  item.style.backgroundColor = color;
}

function disableButtons() {
  buttons.forEach((btn) => (btn.disabled = true));
  document.querySelector(".CancelSort").disabled = false;
}

function enableButtons() {
  buttons.forEach((btn) => (btn.disabled = false));
  document.querySelector(".CancelSort").disabled = true;
}

document.querySelector(".CancelSort").addEventListener("click", () => {
  if (isSorting) {
    cancelRequested = true;
    console.log("Sort cancelled.");
  }
});

document.getElementById("numBars").addEventListener("change", () => {
  if (!isSorting) {
    createBars();
  }
});

async function sort_bubble() {
  if (isSorting) return;
  isSorting = true;
  cancelRequested = false;
  disableButtons();

  for (let i = 0; i < n; i++) {
    if (cancelRequested) break;

    for (let j = 0; j < n - i - 1; j++) {
      if (cancelRequested) break;

      changeColor(items[j], "#EF5A6F");
      changeColor(items[j + 1], "#EF5A6F");

      await new Promise((resolve) => setTimeout(resolve, 200));

      let height1 = parseInt(window.getComputedStyle(items[j]).getPropertyValue("height"));
      let height2 = parseInt(window.getComputedStyle(items[j + 1]).getPropertyValue("height"));

      if (height1 > height2) {
        items[j].style.height = `${height2}px`;
        items[j + 1].style.height = `${height1}px`;
      }

      changeColor(items[j], "#008a8a");
      changeColor(items[j + 1], "#008a8a");
    }

    items[n - i - 1].style.backgroundColor = "#88D66C";
  }

  if (!cancelRequested) {
    for (let i = 0; i < n; i++) {
      items[i].style.backgroundColor = "#88D66C";
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  isSorting = false;
  enableButtons();
}

function swap(xp, yp) {
  let heightxp = parseInt(window.getComputedStyle(items[xp]).getPropertyValue("height"));
  let heightyp = parseInt(window.getComputedStyle(items[yp]).getPropertyValue("height"));

  items[xp].style.height = `${heightyp}px`;
  items[yp].style.height = `${heightxp}px`;
}

async function selectionSort() {
  if (isSorting) return;
  isSorting = true;
  cancelRequested = false;
  disableButtons();

  for (let i = 0; i < n - 1; i++) {
    if (cancelRequested) break;

    let min_idx = i;

    for (let j = i + 1; j < n; j++) {
      if (cancelRequested) break;

      changeColor(items[j], "#EF5A6F");
      await new Promise((resolve) => setTimeout(resolve, 200));

      let heightj = parseInt(window.getComputedStyle(items[j]).getPropertyValue("height"));
      let heightmin = parseInt(window.getComputedStyle(items[min_idx]).getPropertyValue("height"));

      if (heightj < heightmin) min_idx = j;
      changeColor(items[j], "#008a8a");
    }

    swap(min_idx, i);
    items[i].style.backgroundColor = "#88D66C";
  }

  if (!cancelRequested) {
    for (let i = 0; i < n; i++) {
      items[i].style.backgroundColor = "#88D66C";
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  isSorting = false;
  enableButtons();
}

async function insertionSort() {
  if (isSorting) return;
  isSorting = true;
  cancelRequested = false;
  disableButtons();

  for (let i = 1; i < n; i++) {
    if (cancelRequested) break;

    let keyHeight = parseInt(window.getComputedStyle(items[i]).getPropertyValue("height"));
    let j = i - 1;

    changeColor(items[i], "#EF5A6F");
    await new Promise((resolve) => setTimeout(resolve, 200));

    while (j >= 0) {
      if (cancelRequested) break;

      let heightJ = parseInt(window.getComputedStyle(items[j]).getPropertyValue("height"));

      changeColor(items[j], "#EF5A6F");
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (heightJ > keyHeight) {
        items[j + 1].style.height = `${heightJ}px`;
        changeColor(items[j + 1], "#008a8a");
        j--;
      } else {
        changeColor(items[j], "#008a8a");
        break;
      }
    }

    items[j + 1].style.height = `${keyHeight}px`;
    changeColor(items[i], "#008a8a");
  }

  if (!cancelRequested) {
    for (let i = 0; i < n; i++) {
      items[i].style.backgroundColor = "#88D66C";
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  isSorting = false;
  enableButtons();
}


const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isSorting) return;

    setHeight();
    if (button.className === "BubbleSort") {
      sort_bubble();
    } else if (button.className === "SelectionSort") {
      selectionSort();
    } else if (button.className === "InsertionSort") {
      insertionSort();
    }
  });
});

const myCanvas = document.getElementById("myCanvas");
const ctx = setupCanvas(myCanvas);
const width = 1500;
const height = 1000;

let list = new LinkedList();
let tree = new BST();
let stack = new Stack(10);

let selectedDS = "linkedlist";
let xPoint = 200;
let yPoint = 10;

function changeDS(ds) {
  if (selectedDS == ds) {
    return;
  }
  selectedDS = ds;
  ctx.clearRect(0, 0, 2000, 2000);
  switch (ds) {
    case "tree":
      list = null;
      tree = new BST();
      stack = null;
      break;
    case "linkedlist":
      tree = null;
      list = new LinkedList();
      stack = null;
      break;
    case "stack":
      tree = null;
      list = null;
      stack = new Stack(10);
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle =  "black";
      ctx.moveTo(width / 2-3, 10);
      ctx.lineTo(width / 2-3, 400);
      ctx.moveTo(width / 2+63, 10);
      ctx.lineTo(width / 2+63, 400);
      ctx.moveTo(width / 2-3, 400);
      ctx.lineTo(width / 2+63, 400);
      ctx.stroke();
      ctx.closePath();
      break;
  }
}

function insert(value) {
  switch (selectedDS) {
    case "tree":
      return insertTree(value);
    case "linkedlist":
      return insertList(value);
    case "stack":
      return push(value);
  }
}

function deleteNode(value) {
  switch (selectedDS) {
    case "tree":
      return deleteNodeTree(value);
    case "linkedlist":
      return deleteNodeList(value);
      case "stack":
        return pop();
  }
}

function search(value) {
  switch (selectedDS) {
    case "tree":
      return searchTree(value);
    case "linkedlist":
      return Promise.resolve(true);
    case "stack":
        return peek();
    
  }
}

function insertList(value) {
  if (xPoint + 200 > width) {
    xPoint = 200;
    yPoint += 100;
  }
  const data = {
    data: value,
    x: xPoint,
    y: yPoint,
    width: 60,
    height: 30,
    color: "blue",
    context: ctx,
  };
  xPoint += 100;
  return list.insert(data);
}
function deleteNodeList(value) {
  return list.delete(value);
}

function insertTree(value) {
  const data = {
    data: parseInt(value),
    x: width / 2,
    y: 0,
    width: 60,
    height: 30,
    color: "blue",
    context: ctx,
  };
  return tree.insert(data);
}
function deleteNodeTree(value) {
  return tree.delete(value);
}
function searchTree(value) {
  return tree.search(value);
}

function push(value) {
  const data = {
    data: parseInt(value),
    x: width / 2,
    y: 368,
    width: 60,
    height: 30,
    color: "blue",
    context: ctx,
  };
  return stack.push(data);
}
function pop() {
  return stack.pop(value);
}
function peek() {
  return stack.peek();
}

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}
function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
function getColor() {
  let r = getRandomNum(0, 255);
  let g = getRandomNum(0, 255);
  let b = getRandomNum(0, 255);
  return {
    backColor: `rgba(${r},${g},${b},1.5)`,
    hoverColor: `rgba(${r},${g},${b},3)`,
  };
}

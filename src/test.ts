type MyBool = true | false;
type WindowState = "open" | "closed" | "minimized";

function showState(state: WindowState) {
  
}

interface Point {
  x: number,
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x} : ${p.y}`);
}

const point = { x: 1, y: 2}

logPoint(point)
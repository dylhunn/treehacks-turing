// get the textarea
// add an on-change listener for it that calls machine build

  // if parsing this every time is too slow, we can
  // make the event listener just change an 'edited'
  // flag to true. if it was already true, the function stops.
  // if it was false, then we call the function that parses the input.
  // that function can then wait a second or two, then set the
  // flag to false..... or something like that

var CELL_SPACING = 5;

var machine;

var running = false;

var textarea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  height: "500"
});

editor.setSize("100%", "500px");



// editor.on("change", function(event) {
//   // machine = TuringMachine.buildMachine();
//
//   initTuringMachine();
//
// });

function initTuringMachine() {
  var lines = editor.display.view.map(function(lineview) {
    return lineview.text.innerText;
  });
  machine = TuringMachine.buildMachine(lines);
  var inputStr = document.getElementById("tapeinput").value;
  machine.initialize(inputStr);
  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.innerText = "paused";
  drawTape();
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stepBtn").disabled = false;
}

var TAPE_SIZE = 55;

function drawTape(offset) {
  if (!offset) offset = 0;
  var outerContainer = document.getElementById("tape-content");
  var innerContainer = document.getElementById("tape-container");
  outerContainer.removeChild(innerContainer);
  innerContainer = document.createElement("div");
  innerContainer.id = "tape-container";
  var tapeTable = document.createElement("table");
  tapeTable.cellspacing = CELL_SPACING + "px";
  tapeTable.id="tape";
  var rowTop = document.createElement("tr");
  var rowBottom = document.createElement("tr");
  for (var i = 0; i < TAPE_SIZE; i++) {
    var columnBottom = document.createElement("td");
    var centerIndex = Math.floor(TAPE_SIZE / 2);

    var innerCell = document.createElement("span");
    if (machine) {
      var tapeArray = machine.tape.tape;
      var tapeHead = machine.tape.head;
      var character = tapeArray[i - centerIndex + tapeHead + offset] || "_";
      if (character == " ") character = "_";
      innerCell.innerText = character;
    }
    else innerCell.innerText = "_";
    columnBottom.appendChild(innerCell);

    columnBottom.classList.add("tapeCell");
    rowBottom.appendChild(columnBottom);
  }
  tapeTable.appendChild(rowBottom);
  innerContainer.appendChild(tapeTable);
  outerContainer.appendChild(innerContainer);
  var left = outerContainer.offsetWidth / 2 - innerContainer.offsetWidth / 2;
  innerContainer.style.left = left + "px";
}

drawTape();

window.onresize = drawTape;


document.getElementById("startBtn").onclick = function() {
  // initTuringMachine();
  document.getElementById("status").innerText = "running";
  document.getElementById("pauseBtn").disabled = false;
  document.getElementById("startBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;
  document.getElementById("stepBtn").disabled = true;
  run();
}

document.getElementById("pauseBtn").onclick = function() {
  running = false;
  document.getElementById("pauseBtn").disabled = true;
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("startBtn").disabled = false;
  document.getElementById("resetBtn").disabled = false;


}

document.getElementById("stepBtn").onclick = function() {
  step();
}

var ANIMATION_DELAY = 300; // ms

function run() {
  running = true;
  step();
  setTimeout(function() {
    if (running) run();
  }, ANIMATION_DELAY);
}

function step() {
  var direction = machine.getNextDirection();
  var result = machine.step();
  if (result != undefined) stop(result);

  drawTape(direction == DirectionEnum.RIGHT ? -1 : 1);

  var innerContainer = document.getElementById("tape-container");
  var firstCell = document.getElementById("tape").firstChild;
  var distance = firstCell.offsetWidth / TAPE_SIZE;

  if (!direction) distance = 0;
  if (direction == DirectionEnum.RIGHT) distance *= -1;
  innerContainer.style.left = parseInt(innerContainer.style.left) + distance + "px";

  setTimeout(function() {
    drawTape();
  }, 200);
}

function stop(result) {
  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.classList.add(result ? "accept" : "reject");
  resultSpan.innerText = result ? "accept" : "reject";
  running = false;
  document.getElementById("resetBtn").disabled = false;
  document.getElementById("pauseBtn").disabled = true;
}

document.getElementById("resetBtn").onclick = function() {
  initTuringMachine();
  running = false;
}

// get the input field's value to feed into the simulate function

// reset_button
// pause button


// if we add subroutines, then we can have the
// machineachine's map go to either States or Subroutines
// and we can use instanceof to determine which one it is

// to simulate a subroutine, we run a machine with the current tape
// as its input, then we


// simulate function simulates the given machine









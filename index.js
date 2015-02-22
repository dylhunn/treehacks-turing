// get the textarea
// add an on-change listener for it that calls machine build

  // if parsing this every time is too slow, we can
  // make the event listener just change an 'edited'
  // flag to true. if it was already true, the function stops.
  // if it was false, then we call the function that parses the input.
  // that function can then wait a second or two, then set the
  // flag to false..... or something like that

var BINARY_PANINDROME_TM = "#palindrome\n\nstart 0 _ r end-zero\nstart 1 _ r end-one\nstart _ _ r accept\n\nend-zero 0 0 r end-zero\nend-zero 1 1 r end-zero\nend-zero _ _ l read-zero\n\nend-one 0 0 r end-one\nend-one 1 1 r end-one\nend-one _ _ l read-one\n\nread-zero 0 _ l go-home\nread-zero 1 _ r reject\nread-zero _ _ r accept\n\nread-one 1 _ l go-home\nread-one 0 _ r reject\nread-one _ _ r accept\n\ngo-home 0 0 l go-home\ngo-home 1 1 l go-home\ngo-home _ _ r start\n\naccept : 1\nreject : 0";

var PRESETS = [BINARY_PANINDROME_TM];

var CELL_SPACING = 5;

var machine;

var running = false;

var textarea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  height: "500",
  saveFunction: save
});

editor.setSize("100%", "500px");

editor.on("change", function(event) {
  document.getElementById("saveBtn").disabled = false;
});

function initializePresets() {
  for (var i = 0; i < PRESETS.length; i++) {
    var preset = PRESETS[i];
    localStorage.setItem(preset.split("\n")[0], preset);
  }
}

function initTuringMachine() {
  var lines = editor.getValue().split("\n");
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
  document.getElementById("startBtn").disabled = true;
  document.getElementById("stepBtn").disabled = true;
}

document.getElementById("resetBtn").onclick = function() {
  initTuringMachine();
  running = false;
}

document.getElementById("saveBtn").onclick = function() {
 save();
}

function save() {
  document.getElementById("saveBtn").disabled = true;
  var code = editor.getValue();
  console.log(code.split("\n")[0]);
  localStorage.setItem(code.split("\n")[0], code);
}

document.getElementById("loadBtn").onfocus = function() {
  fillLoadDropdown();
  document.getElementById("loadDropdown").hidden = !document.getElementById("loadDropdown").hidden;
}

function fillLoadDropdown() {
  var dropDown = document.getElementById("loadDropdown");
  while(dropDown.firstChild) {
    dropDown.removeChild(dropDown.firstChild);
  }
  for (var key in localStorage) {
    var item = document.createElement("li");
    item.innerText = key;
    item.addEventListener("click", loadFile);
    dropDown.appendChild(item);
  }
}

function loadFile(event) {
  var key = event.toElement.innerHTML;
  console.log(localStorage.getItem(key));
  editor.setValue(localStorage.getItem(key));
  document.getElementById("loadDropdown").hidden = true;
}

initializePresets();

// get the input field's value to feed into the simulate function

// reset_button
// pause button


// if we add subroutines, then we can have the
// machineachine's map go to either States or Subroutines
// and we can use instanceof to determine which one it is

// to simulate a subroutine, we run a machine with the current tape
// as its input, then we


// simulate function simulates the given machine









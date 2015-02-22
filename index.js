/* * * * * * * * * * * * * * * * * * * * * * *\
 *                 constants                 *
\* * * * * * * * * * * * * * * * * * * * * * */

var BINARY_PANINDROME_TM = "# palindrome\n\nstart 0 _ r end-zero\nstart 1 _ r end-one\nstart _ _ r accept\n\nend-zero 0 0 r end-zero\nend-zero 1 1 r end-zero\nend-zero _ _ l read-zero\n\nend-one 0 0 r end-one\nend-one 1 1 r end-one\nend-one _ _ l read-one\n\nread-zero 0 _ l go-home\nread-zero 1 _ r reject\nread-zero _ _ r accept\n\nread-one 1 _ l go-home\nread-one 0 _ r reject\nread-one _ _ r accept\n\ngo-home 0 0 l go-home\ngo-home 1 1 l go-home\ngo-home _ _ r start\n\naccept : 1\nreject : 0";
var BALANCED_PARENS_TM = "# balanced ()\n\n0 _ _ r accept\n0 ( { r 1\n0 ) _ r reject\n0 \\ / l 0\n0 / \\ r 0\n\n1 ( [ r 1\n1 ) / l 1\n1 [ \\ r 1\n1 _ _ r reject\n1 { \\ r 0\n1 \\ / l 1\n1 / \\ r 1\n\naccept : 1\nreject : 0";
var ACCEPT_BINARY_TM = "# accept\n\nstart 1 _ r accept\nstart 0 _ r accept\nstart _ _ r\n\naccept : 1"

var PRESETS = [BINARY_PANINDROME_TM, BALANCED_PARENS_TM, ACCEPT_BINARY_TM];

var CELL_SPACING = 5;

var ANIMATION_DELAY = 300; // ms
var DRAW_DELAY = 200; // ms

var TAPE_SIZE = 55;

/* * * * * * * * * * * * * * * * * * * * * * *\
 *             global variables              *
\* * * * * * * * * * * * * * * * * * * * * * */

var machine;
var running = false;
var editor;

function initializeEditor() {
  var textarea = document.getElementById("code");
  editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    height: "500",
    saveFunction: save,
    theme: "peacock"
  });

  editor.setSize("100%", "500px");

  editor.on("change", function(event) {
    document.getElementById("saveBtn").disabled = false;
  });
}

function initializePresets() {
  for (var i = 0; i < PRESETS.length; i++) {
    var preset = PRESETS[i];
    localStorage.setItem(preset.split("\n")[0], preset);
  }
}

function initTuringMachine() {
  document.getElementById("step-count").innerText = "0";
  document.getElementById("errors").innerText = "";
  setButtonEnables(true, false, true, true);

  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.innerText = "paused";

  var lines = editor.getValue().split("\n");
  machine = TuringMachine.buildMachine(lines);
  if (typeof machine == "string") {
    return document.getElementById("errors").innerText = machine;
  }
  machine.initialize(document.getElementById("tapeinput").value);

  drawTape();
}

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
  ensureInfinite(innerContainer, outerContainer);
}

function ensureInfinite(innerContainer, outerContainer) {
  if (innerContainer.offsetWidth < outerContainer.offsetWidth) {
    TAPE_SIZE = (outerContainer.offsetWidth / innerContainer.offsetWidth) * TAPE_SIZE;
    if (TAPE_SIZE % 2 == 0) TAPE_SIZE++;
    drawTape();
  }
}

document.getElementById("startBtn").onclick = function() {
  document.getElementById("status").innerText = "running";
  setButtonEnables(false, true, false, true);
  run();
}

document.getElementById("pauseBtn").onclick = function() {
  running = false;
  setButtonEnables(true, false, true, true);
}

document.getElementById("stepBtn").onclick = step;

function run() {
  running = true; step();
  setTimeout(function() { if (running) run(); }, ANIMATION_DELAY);
}

function step() {
  incrementStepCount();
  var direction = machine.getNextDirection();
  var result = machine.step()
  if (result != undefined) stop(result);

  drawTape(direction);

  var innerContainer = document.getElementById("tape-container");
  var firstCell = document.getElementById("tape").firstChild;
  var distance = firstCell.offsetWidth / TAPE_SIZE * direction;
  innerContainer.style.left = parseInt(innerContainer.style.left) + distance + "px";

  setTimeout(drawTape, DRAW_DELAY);
}

function incrementStepCount() {
  var count = parseInt(document.getElementById("step-count").innerText) + 1;
  document.getElementById("step-count").innerText = count;
}

function stop(result) {
  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.classList.add(result ? "accept" : "reject");
  resultSpan.innerText = result ? "accept" : "reject";
  setButtonEnables(false, false, false, true);
  running = false;
}

document.getElementById("resetBtn").onclick = function() {
  initTuringMachine();
  running = false;
}

document.getElementById("saveBtn").onclick = save;

function save() {
  document.getElementById("saveBtn").disabled = true;
  var code = editor.getValue();
  localStorage.setItem(code.split("\n")[0], code);
}

document.getElementById("loadBtn").onfocus = function() {
  fillLoadDropdown();
  var dropdown = document.getElementById("loadDropdown");
  dropdown.hidden = !dropdown.hidden;
}

function fillLoadDropdown() {
  var dropdown = document.getElementById("loadDropdown");
  while(dropdown.firstChild) dropdown.removeChild(dropdown.firstChild);
  for (var key in localStorage) {
    var item = document.createElement("li");
    item.innerText = key;
    item.addEventListener("click", loadFile);
    dropdown.appendChild(item);
  }
}

function setButtonEnables(play, pause, step, load) {
  document.getElementById("startBtn").disabled = !play;
  document.getElementById("pauseBtn").disabled = !pause;
  document.getElementById("stepBtn").disabled = !step;
  document.getElementById("resetBtn").disabled = !load;
}

function loadFile(event) {
  var key = event.toElement.innerHTML;
  editor.setValue(localStorage.getItem(key));
  document.getElementById("loadDropdown").hidden = true;
}

initializePresets();
initializeEditor();

window.onresize = drawTape;
drawTape();









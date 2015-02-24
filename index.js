/* * * * * * * * * * * * * * * * * * * * * * *\
 *                 constants                 *
\* * * * * * * * * * * * * * * * * * * * * * */

var BINARY_PANINDROME_TM = "# palindrome\n\nstart 0 _ r end-zero\nstart 1 _ r end-one\nstart _ _ r accept\n\nend-zero 0 0 r end-zero\nend-zero 1 1 r end-zero\nend-zero _ _ l read-zero\n\nend-one 0 0 r end-one\nend-one 1 1 r end-one\nend-one _ _ l read-one\n\nread-zero 0 _ l go-home\nread-zero 1 _ r reject\nread-zero _ _ r accept\n\nread-one 1 _ l go-home\nread-one 0 _ r reject\nread-one _ _ r accept\n\ngo-home 0 0 l go-home\ngo-home 1 1 l go-home\ngo-home _ _ r start\n\naccept : 1\nreject : 0";
var BALANCED_PARENS_TM = "# balanced ()\n\n0 _ _ r accept\n0 ( { r 1\n0 ) _ r reject\n0 \\ / l 0\n0 / \\ r 0\n\n1 ( [ r 1\n1 ) / l 1\n1 [ \\ r 1\n1 _ _ r reject\n1 { \\ r 0\n1 \\ / l 1\n1 / \\ r 1\n\naccept : 1\nreject : 0";
var ACCEPT_BINARY_TM = "# accept\n\nstart 1 _ r accept\nstart 0 _ r accept\nstart _ _ r accept\n\naccept : 1";
var GENERAL_PALINDROME_TM = "# palindrome 2\n\nstart a _ r end-a\nstart b _ r end-b\nstart c _ r end-c\nstart d _ r end-d\nstart e _ r end-e\nstart f _ r end-f\nstart g _ r end-g\nstart h _ r end-h\nstart i _ r end-i\nstart j _ r end-j\nstart k _ r end-k\nstart l _ r end-l\nstart m _ r end-m\nstart n _ r end-n\nstart o _ r end-o\nstart p _ r end-p\nstart q _ r end-q\nstart r _ r end-r\nstart s _ r end-s\nstart t _ r end-t\nstart u _ r end-u\nstart v _ r end-v\nstart w _ r end-w\nstart x _ r end-x\nstart y _ r end-y\nstart z _ r end-z\nstart A _ r end-A\nstart B _ r end-B\nstart C _ r end-C\nstart D _ r end-D\nstart E _ r end-E\nstart F _ r end-F\nstart G _ r end-G\nstart H _ r end-H\nstart I _ r end-I\nstart J _ r end-J\nstart K _ r end-K\nstart L _ r end-L\nstart M _ r end-M\nstart N _ r end-N\nstart O _ r end-O\nstart P _ r end-P\nstart Q _ r end-Q\nstart R _ r end-R\nstart S _ r end-S\nstart T _ r end-T\nstart U _ r end-U\nstart V _ r end-V\nstart W _ r end-W\nstart X _ r end-X\nstart Y _ r end-Y\nstart Z _ r end-Z\nstart 0 _ r end-0\nstart 1 _ r end-1\nstart 2 _ r end-2\nstart 3 _ r end-3\nstart 4 _ r end-4\nstart 5 _ r end-5\nstart 6 _ r end-6\nstart 7 _ r end-7\nstart 8 _ r end-8\nstart 9 _ r end-9\nstart _ _ r accept\nend-a * * r end-a\nend-a _ _ l read-a\nend-b * * r end-b\nend-b _ _ l read-b\nend-c * * r end-c\nend-c _ _ l read-c\nend-d * * r end-d\nend-d _ _ l read-d\nend-e * * r end-e\nend-e _ _ l read-e\nend-f * * r end-f\nend-f _ _ l read-f\nend-g * * r end-g\nend-g _ _ l read-g\nend-h * * r end-h\nend-h _ _ l read-h\nend-i * * r end-i\nend-i _ _ l read-i\nend-j * * r end-j\nend-j _ _ l read-j\nend-k * * r end-k\nend-k _ _ l read-k\nend-l * * r end-l\nend-l _ _ l read-l\nend-m * * r end-m\nend-m _ _ l read-m\nend-n * * r end-n\nend-n _ _ l read-n\nend-o * * r end-o\nend-o _ _ l read-o\nend-p * * r end-p\nend-p _ _ l read-p\nend-q * * r end-q\nend-q _ _ l read-q\nend-r * * r end-r\nend-r _ _ l read-r\nend-s * * r end-s\nend-s _ _ l read-s\nend-t * * r end-t\nend-t _ _ l read-t\nend-u * * r end-u\nend-u _ _ l read-u\nend-v * * r end-v\nend-v _ _ l read-v\nend-w * * r end-w\nend-w _ _ l read-w\nend-x * * r end-x\nend-x _ _ l read-x\nend-y * * r end-y\nend-y _ _ l read-y\nend-z * * r end-z\nend-z _ _ l read-z\nend-A * * r end-A\nend-A _ _ l read-A\nend-B * * r end-B\nend-B _ _ l read-B\nend-C * * r end-C\nend-C _ _ l read-C\nend-D * * r end-D\nend-D _ _ l read-D\nend-E * * r end-E\nend-E _ _ l read-E\nend-F * * r end-F\nend-F _ _ l read-F\nend-G * * r end-G\nend-G _ _ l read-G\nend-H * * r end-H\nend-H _ _ l read-H\nend-I * * r end-I\nend-I _ _ l read-I\nend-J * * r end-J\nend-J _ _ l read-J\nend-K * * r end-K\nend-K _ _ l read-K\nend-L * * r end-L\nend-L _ _ l read-L\nend-M * * r end-M\nend-M _ _ l read-M\nend-N * * r end-N\nend-N _ _ l read-N\nend-O * * r end-O\nend-O _ _ l read-O\nend-P * * r end-P\nend-P _ _ l read-P\nend-Q * * r end-Q\nend-Q _ _ l read-Q\nend-R * * r end-R\nend-R _ _ l read-R\nend-S * * r end-S\nend-S _ _ l read-S\nend-T * * r end-T\nend-T _ _ l read-T\nend-U * * r end-U\nend-U _ _ l read-U\nend-V * * r end-V\nend-V _ _ l read-V\nend-W * * r end-W\nend-W _ _ l read-W\nend-X * * r end-X\nend-X _ _ l read-X\nend-Y * * r end-Y\nend-Y _ _ l read-Y\nend-Z * * r end-Z\nend-Z _ _ l read-Z\nend-0 * * r end-0\nend-0 _ _ l read-0\nend-1 * * r end-1\nend-1 _ _ l read-1\nend-2 * * r end-2\nend-2 _ _ l read-2\nend-3 * * r end-3\nend-3 _ _ l read-3\nend-4 * * r end-4\nend-4 _ _ l read-4\nend-5 * * r end-5\nend-5 _ _ l read-5\nend-6 * * r end-6\nend-6 _ _ l read-6\nend-7 * * r end-7\nend-7 _ _ l read-7\nend-8 * * r end-8\nend-8 _ _ l read-8\nend-9 * * r end-9\nend-9 _ _ l read-9\nread-a a _ l go-home\nread-a _ _ r accept\nread-b b _ l go-home\nread-b _ _ r accept\nread-c c _ l go-home\nread-c _ _ r accept\nread-d d _ l go-home\nread-d _ _ r accept\nread-e e _ l go-home\nread-e _ _ r accept\nread-f f _ l go-home\nread-f _ _ r accept\nread-g g _ l go-home\nread-g _ _ r accept\nread-h h _ l go-home\nread-h _ _ r accept\nread-i i _ l go-home\nread-i _ _ r accept\nread-j j _ l go-home\nread-j _ _ r accept\nread-k k _ l go-home\nread-k _ _ r accept\nread-l l _ l go-home\nread-l _ _ r accept\nread-m m _ l go-home\nread-m _ _ r accept\nread-n n _ l go-home\nread-n _ _ r accept\nread-o o _ l go-home\nread-o _ _ r accept\nread-p p _ l go-home\nread-p _ _ r accept\nread-q q _ l go-home\nread-q _ _ r accept\nread-r r _ l go-home\nread-r _ _ r accept\nread-s s _ l go-home\nread-s _ _ r accept\nread-t t _ l go-home\nread-t _ _ r accept\nread-u u _ l go-home\nread-u _ _ r accept\nread-v v _ l go-home\nread-v _ _ r accept\nread-w w _ l go-home\nread-w _ _ r accept\nread-x x _ l go-home\nread-x _ _ r accept\nread-y y _ l go-home\nread-y _ _ r accept\nread-z z _ l go-home\nread-z _ _ r accept\nread-A A _ l go-home\nread-A _ _ r accept\nread-B B _ l go-home\nread-B _ _ r accept\nread-C C _ l go-home\nread-C _ _ r accept\nread-D D _ l go-home\nread-D _ _ r accept\nread-E E _ l go-home\nread-E _ _ r accept\nread-F F _ l go-home\nread-F _ _ r accept\nread-G G _ l go-home\nread-G _ _ r accept\nread-H H _ l go-home\nread-H _ _ r accept\nread-I I _ l go-home\nread-I _ _ r accept\nread-J J _ l go-home\nread-J _ _ r accept\nread-K K _ l go-home\nread-K _ _ r accept\nread-L L _ l go-home\nread-L _ _ r accept\nread-M M _ l go-home\nread-M _ _ r accept\nread-N N _ l go-home\nread-N _ _ r accept\nread-O O _ l go-home\nread-O _ _ r accept\nread-P P _ l go-home\nread-P _ _ r accept\nread-Q Q _ l go-home\nread-Q _ _ r accept\nread-R R _ l go-home\nread-R _ _ r accept\nread-S S _ l go-home\nread-S _ _ r accept\nread-T T _ l go-home\nread-T _ _ r accept\nread-U U _ l go-home\nread-U _ _ r accept\nread-V V _ l go-home\nread-V _ _ r accept\nread-W W _ l go-home\nread-W _ _ r accept\nread-X X _ l go-home\nread-X _ _ r accept\nread-Y Y _ l go-home\nread-Y _ _ r accept\nread-Z Z _ l go-home\nread-Z _ _ r accept\nread-0 0 _ l go-home\nread-0 _ _ r accept\nread-1 1 _ l go-home\nread-1 _ _ r accept\nread-2 2 _ l go-home\nread-2 _ _ r accept\nread-3 3 _ l go-home\nread-3 _ _ r accept\nread-4 4 _ l go-home\nread-4 _ _ r accept\nread-5 5 _ l go-home\nread-5 _ _ r accept\nread-6 6 _ l go-home\nread-6 _ _ r accept\nread-7 7 _ l go-home\nread-7 _ _ r accept\nread-8 8 _ l go-home\nread-8 _ _ r accept\nread-9 9 _ l go-home\nread-9 _ _ r accept\ngo-home * * l go-home\ngo-home _ _ r start\naccept : 1\nreject : 0";

var PRESETS = [BINARY_PANINDROME_TM, BALANCED_PARENS_TM, ACCEPT_BINARY_TM, GENERAL_PALINDROME_TM];

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
  document.getElementById("step-count").textContent = "0";
  document.getElementById("errors").textContent = "";


  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.textContent = "paused";

  var lines = editor.getValue().split("\n");
  machine = TuringMachine.buildMachine(lines);
  console.log(machine);
  if (typeof machine === "string") {

    return document.getElementById("errors").textContent = machine;

  }
  else setButtonEnables(true, false, true, true);
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
      innerCell.textContent = character;
    }
    else innerCell.textContent = "_";
    columnBottom.appendChild(innerCell);

    columnBottom.classList.add("tapeCell");
    rowBottom.appendChild(columnBottom);
  }
  tapeTable.appendChild(rowBottom);
  innerContainer.appendChild(tapeTable);
  outerContainer.appendChild(innerContainer);
  var left = outerContainer.offsetWidth / 2 - innerContainer.offsetWidth / 2;
  innerContainer.style.left = left + "px";
  ensureInfinite(innerContainer, outerContainer, offset);
}

function ensureInfinite(innerContainer, outerContainer, offset) {
  if (innerContainer.offsetWidth < outerContainer.offsetWidth) {
    redraw = TAPE_SIZE = Math.ceil(outerContainer.offsetWidth / innerContainer.offsetWidth) * TAPE_SIZE;
    if (TAPE_SIZE % 2 == 0) redraw = TAPE_SIZE++;
    drawTape(offset);
  }
}

document.getElementById("startBtn").onclick = function() {
  document.getElementById("status").textContent = "running";
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
  var left = parseInt(innerContainer.style.left) + distance + "px";
  $("#tape-container").animate({left: left}, 200);

  setTimeout(drawTape, DRAW_DELAY);
}

function incrementStepCount() {
  var count = parseInt(document.getElementById("step-count").textContent) + 1;
  document.getElementById("step-count").textContent = count;
}

function stop(result) {
  var resultSpan = document.getElementById("status");
  resultSpan.classList.remove("accept", "reject");
  resultSpan.classList.add(result ? "accept" : "reject");
  resultSpan.textContent = result ? "accept" : "reject";
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

document.getElementById("loadBtn").onclick = function() {
  fillLoadDropdown();
  var dropdown = document.getElementById("loadDropdown");
  dropdown.hidden = !dropdown.hidden;
}

function fillLoadDropdown() {
  var dropdown = document.getElementById("loadDropdown");
  while(dropdown.firstChild) dropdown.removeChild(dropdown.firstChild);
  for (var key in localStorage) {
    var item = document.createElement("li");
    item.textContent = key;
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
  var destination = event.toElement || event.target;
  var key = destination.innerHTML;
  editor.setValue(localStorage.getItem(key));
  document.getElementById("loadDropdown").hidden = true;
  document.getElementById("errors").textContent = "";
}

initializePresets();
initializeEditor();

window.onresize = drawTape;
drawTape();









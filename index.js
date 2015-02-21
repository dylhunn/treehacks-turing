// get the textarea
// add an on-change listener for it that calls machine build

  // if parsing this every time is too slow, we can
  // make the event listener just change an 'edited'
  // flag to true. if it was already true, the function stops.
  // if it was false, then we call the function that parses the input.
  // that function can then wait a second or two, then set the
  // flag to false..... or something like that


var machine;

var textarea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  height: "500"
});

editor.setSize("100%", "500px");



// editor.on("change", function(event) {
//   // machine = TuringMachine.buildMachine();
//   // console.log(event.display.input.value);
//   initTuringMachine();
//   console.log(machine);
// });

function initTuringMachine() {
  var lines = editor.display.view.map(function(lineview) {
    return lineview.text.innerText;
  });
  machine = TuringMachine.buildMachine(lines);
}

var TAPE_SIZE = 45;

function drawTape() {
  var tapeTable = document.getElementById("tape");
  while (tapeTable.firstChild) {
    tapeTable.removeChild(tapeTable.firstChild);
  }
  var rowTop = document.createElement("tr");
  var rowBottom = document.createElement("tr");
  for (var i = 0; i < TAPE_SIZE; i++) {
    var columnTop = document.createElement("td");
    var columnBottom = document.createElement("td");
    var centerIndex = Math.floor(TAPE_SIZE / 2);
    if (i == centerIndex) {
      var center = document.createElement("center");
      center.innerText = "|||";
      columnTop.appendChild(center);
    }

    var innerCell = document.createElement("span");
    if (machine) {
      var tapeArray = machine.tape.tape;
      var tapeHead = machine.tape.head;
      var character = tapeArray[i - centerIndex + tapeHead] || "_";
      if (character == " ") character = "_";
      innerCell.innerText = character;
    }
    else innerCell.innerText = "_";
    columnBottom.appendChild(innerCell);

    columnBottom.classList.add("tapeCell");
    rowTop.appendChild(columnTop);
    rowBottom.appendChild(columnBottom);
  }
  tapeTable.appendChild(rowTop);
  tapeTable.appendChild(rowBottom);
}

drawTape();


document.getElementById("startBtn").onclick = function() {
  initTuringMachine();
  console.log("machine started");
  var inputStr = document.getElementById("tapeinput").value;
  // load input
  machine.initialize(inputStr);
  drawTape();
}

document.getElementById("pauseBtn").onclick = function() {
  console.log("machine paused");
}

document.getElementById("stepBtn").onclick = function() {
  machine.step();
  drawTape();
}

document.getElementById("resetBtn").onclick = function() {
  console.log("machine reset");
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









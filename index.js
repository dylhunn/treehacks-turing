// get the textarea
// add an on-change listener for it that calls TM build

  // if parsing this every time is too slow, we can
  // make the event listener just change an 'edited'
  // flag to true. if it was already true, the function stops.
  // if it was false, then we call the function that parses the input.
  // that function can then wait a second or two, then set the
  // flag to false..... or something like that


var tm;

var textarea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true
});

editor.on("change", function(event) {
  // tm = TuringMachine.buildMachine();
  // console.log(event.display.input.value);
  var lines = event.display.view.map(function(lineview) {
    return lineview.text.innerText;
  });
  tm = TuringMachine.buildMachine(lines);
  console.log(tm);

});

var TAPE_SIZE = 25;

function drawTape() {
  var tapeTable = document.getElementById("tape");
  var rowTop = document.createElement("tr");
  var rowBottom = document.createElement("tr");
  for (var i = 0; i < TAPE_SIZE; i++) {
    var columnTop = document.createElement("td");
    var columnBottom = document.createElement("td");
    if (i == Math.floor(TAPE_SIZE / 2)) {
      console.log("foo");
      columnTop.innerText = "|";
    }
    columnBottom.innerText = "_";
    columnBottom.classList.add("tapeCell");
    rowTop.appendChild(columnTop);
    rowBottom.appendChild(columnBottom);
  }
  tapeTable.appendChild(rowTop);
  tapeTable.appendChild(rowBottom);



}

drawTape();


document.getElementById("startBtn").onclick = function() {
  console.log("machine started");
  var inputStr = document.getElementById("tapeinput").value;
  // load input
  tm.initialize(inputStr);
}

document.getElementById("pauseBtn").onclick = function() {
  console.log("machine paused");
}

document.getElementById("stepBtn").onclick = function() {
  console.log("machine stopped");
}

document.getElementById("resetBtn").onclick = function() {
  console.log("machine reset");
}

// get the input field's value to feed into the simulate function

// reset_button
// pause button


// if we add subroutines, then we can have the
// TMachine's map go to either States or Subroutines
// and we can use instanceof to determine which one it is

// to simulate a subroutine, we run a TM with the current tape
// as its input, then we


// simulate function simulates the given TM









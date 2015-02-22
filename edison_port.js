// CYLON.JS CODE FOR INTEL EDISON

var Cylon = require('cylon');

var statusTextLeft = "running";
var statusTextRight = " <first>";
var my2;
var machine;

function writeToScreen(screen, message) {
  screen.setCursor(0,0);
  screen.write(message);
  screen.setCursor(1,7);
  screen.write("^");
  screen.setCursor(1,0);
  screen.write(statusTextLeft);
  screen.setCursor(1,8);
  screen.write(statusTextRight);
}

Cylon
  .robot({ name: 'LCD'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function(my) {
    my2 = my;
    writeToScreen(my.screen, "initializing...");
  })
  .start();


// TURING MACHINE CLASS

var DirectionEnum = { RIGHT: "r", LEFT: "l" };

var TuringMachine = function() {
  this.states = {};
  this.startStateName = undefined;
  this.currentStateName = undefined;
  this.tape = undefined;
  this.steps = 0;
}

TuringMachine.prototype.addState = function(stateToAdd) {
  this.states[stateToAdd.name] = stateToAdd;
}

TuringMachine.prototype.getState = function(nameToGet){
  return this.states[nameToGet];
}

TuringMachine.prototype.setStart = function(nameOfStarting){ // TODO: what if start does not exist?
  this.startStateName = nameOfStarting;
}

TuringMachine.prototype.initialize = function(input) {
  this.steps = 0;
  this.currentStateName = this.startStateName;
  this.tape = new Tape();
  this.tape.setInput(input);
}

TuringMachine.prototype.getNextDirection = function() {
  var currentState = this.getState(this.currentStateName);
  var currentSymbol = this.tape.read();
  var transition = currentState.transitions[currentSymbol];
  if (transition === undefined) transition = currentState.transitions["*"];
  return transition ? transition.direction : false;
}

TuringMachine.prototype.step = function() {
  var currentState = this.getState(this.currentStateName);
  var currentSymbol = this.tape.read();
  var transition = currentState.transitions[currentSymbol];
  if (transition === undefined) transition = currentState.transitions["*"];
  if (transition === undefined) return false;
  this.currentStateName = transition.destination;
  this.tape.write((transition.write == "*") ? currentSymbol : transition.write);
  if (transition.direction == DirectionEnum.RIGHT) this.tape.moveRight();
  else this.tape.moveLeft();
  currentState = this.getState(this.currentStateName);
  if (currentState.isHalting()) return currentState.type;
}

TuringMachine.buildMachine = function(lines) {
  var machine = new TuringMachine();
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^#.*$/.test(line)) continue;
    if (/^\s*$/.test(line)) continue;
    var transitionRegex = /^(.*)\s(.)\s(.)\s(l|r)\s(.*)$/;    // TODO: add support for arbitrary spacing
    var haltRegex = /^(.*)\s:\s(0|1)/;
    if (transitionRegex.test(line)) {
      var match = line.match(transitionRegex);
      var stateName = match[1];
      if (machine.states[stateName] === undefined) {
        machine.addState(new State(stateName));
      }
      if (machine.startStateName === undefined) {
        machine.startStateName = stateName;
      }
      machine.states[stateName].addTransition(match[2].trim(), match[3], match[4], match[5]);
      if (machine.states[match[5]] === undefined) {
        machine.addState(new State(match[5]));
      }
    }
    else if (haltRegex.test(line)) {
      var match = line.match(haltRegex);
      machine.states[match[1]].setType(parseInt(match[2]));
    }
    else return "error: syntax error on line " + (i + 1);
  }
  return machine;
}



// STATE CLASS 

var NONE = undefined;

function State(name) {
  this.transitions = {};
  this.name = name;
  this.type = NONE;
}

State.prototype.addTransition = function(read, write, direction, state) {
  this.transitions[read] = new Transition(read, write, direction, state);
}

State.prototype.getTransition = function(read) {
  return this.transitions[read];
}

State.prototype.setType = function(type) {
  this.type = type;
}

State.prototype.isHalting = function() {
  return this.type != NONE;
}

// TAPE CLASS

function Tape() {
  this.tape = [];
  this.head = 0;
}

Tape.prototype.write = function(character) {
  this.tape[this.head] = character;
};

Tape.prototype.read = function() {
  return this.tape[this.head];
};

Tape.prototype.moveLeft = function() {
  if (this.head == 0) this.tape.unshift("_");
  else this.head--;
};

Tape.prototype.moveRight = function() {
  this.head++;
  if (this.head >= this.tape.length) {
    this.tape.push("_");
  }
};

Tape.prototype.getInput = function() {
  return this.tape.join("");
};

Tape.prototype.setInput = function(input) {
  this.tape = input.split("");
};

Tape.prototype.setHead = function(head) {
  this.head = head;
};

// TRANSITION CLASS

function Transition(read, write, direction, destination) {
  this.read = read;
  this.write = write;
  this.direction = direction;
  this.destination = destination;
}

// PROCEDURAL CODE

var INPUT_STR = "11100111"
var BINARY_PANINDROME_TM = "# palindrome\n\nstart 0 _ r end-zero\nstart 1 _ r end-one\nstart _ _ r accept\n\nend-zero 0 0 r end-zero\nend-zero 1 1 r end-zero\nend-zero _ _ l read-zero\n\nend-one 0 0 r end-one\nend-one 1 1 r end-one\nend-one _ _ l read-one\n\nread-zero 0 _ l go-home\nread-zero 1 _ r reject\nread-zero _ _ r accept\n\nread-one 1 _ l go-home\nread-one 0 _ r reject\nread-one _ _ r accept\n\ngo-home 0 0 l go-home\ngo-home 1 1 l go-home\ngo-home _ _ r start\n\naccept : 1\nreject : 0";
var TAPE_SIZE = 16;
var myDisplayTapeArray = [];

initTuringMachine();
run(function() {
  initTuringMachine();
  run();
});

function initTuringMachine() {
  myDisplayTapeArray = [];
  var lines = BINARY_PANINDROME_TM.split("\n");
  machine = TuringMachine.buildMachine(lines);
  machine.initialize(INPUT_STR);
  drawTape();
}

function drawTape(offset) {
  if (!offset) offset = 0;
  myDisplayTapeArray = []; // reset the display
  for (var i = 0; i < TAPE_SIZE; i++) {
    var centerIndex = Math.floor(TAPE_SIZE / 2);
    var currentCellText;
    if (machine) {
      var tapeArray = machine.tape.tape;
      var tapeHead = machine.tape.head;
      var character = tapeArray[i - centerIndex + tapeHead + offset] || "_";
      if (character == " ") character = "_";
      currentCellText = character;
    }
    else currentCellText = "_";
    myDisplayTapeArray.push(currentCellText);
  }
  var tapestr = myDisplayTapeArray.join("");
  writeToScreen(my2.screen, tapestr);
}

function run(callback) {
  step(callback);
  setTimeout(run, 200); // delay
}

function step(callback) {
  var direction = machine.getNextDirection();
  var result = machine.step();
  if (result !== undefined) {
    statusTextRight = result ? "accepted" : "rejected";
    callback();
  }
  drawTape(direction == "r" ? -1 : 1);
  setTimeout(function() {
    drawTape();
  }, 200);
}

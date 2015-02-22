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

TuringMachine.prototype.setStart = function(nameOfStarting){
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
  if (transition == undefined) transition = currentState.transitions["*"];
  return transition ? transition.direction : 0;
}

TuringMachine.prototype.step = function() {
  var currentState = this.getState(this.currentStateName);
  var currentSymbol = this.tape.read();
  var transition = currentState.transitions[currentSymbol];
  if (transition == undefined) transition = currentState.transitions["*"];
  if (transition == undefined) return false;
  this.currentStateName = transition.destination;
  this.tape.write((transition.write == "*") ? currentSymbol : transition.write);
  this.tape.move(transition.direction);
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
      if (machine.states[stateName] == undefined) {
        machine.addState(new State(stateName));
      }
      if (machine.startStateName == undefined) {
        machine.startStateName = stateName;
      }
      machine.states[stateName].addTransition(match[2].trim(), match[3], match[4], match[5]);
      if (machine.states[match[5]] == undefined) {
        machine.addState(new State(match[5]));
      }
    }
    else if (haltRegex.test(line)) {
      var match = line.match(haltRegex);
      console.log(machine.states, match[1]);
      var state = machine.states[match[1]];
      if (state) state.setType(parseInt(match[2]));
    }
    else return "error: syntax error on line " + (i + 1);
  }
  return machine;
}

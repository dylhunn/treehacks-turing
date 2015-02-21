(function(window, document, undefined) {

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
    this.currentState = this.startState;
    this.tape = new Tape();
    this.tape.setInput(input);
  }

  TuringMachine.prototype.step = function() {
    var currentState = this.getState(this.currentStateName);
    var currentSymbol = this.tape.read();
    var transition = currentState.transitions[currentSymbol];
    if (transition == undefined) return false;
    this.currentStateName = transition.destination;
    this.tape.write(transition.write);
    if (transition.direction == DirectionEnum.RIGHT) this.tape.moveRight();
    else this.type.moveLeft();
  }


  // end-one 1 1 r end-one
  TuringMachine.buildMachine = function(lines) {
    var machine = new TuringMachine();
    lines.forEach(function(line) {
      if (/^#.*$/.test(line)) return;
      var regex = /^(.*)\s(.)\s(.)\s(l|r)\s(.*)$/;
      if (regex.test(line)) {
        var match = line.match(regex);
        var stateName = match[1];
        if (machine.states[stateName] == undefined) {
          machine.addState(new State(stateName));
        }
        machine.states[stateName].addTransition(match[2], match[3], match[4], match[5]);
        if (machine.states[match[5]] == undefined) {
          machine.addState(new State(match[5]));
        }
      }
      var haltRegex = /^(.*)\s*:\s*(0|1)/;
      if (haltRegex.test(line)) {
        var match = line.match(haltRegex);
        machine.states[match[1]].setType(parseInt(match[2]))
      }
    });
    return machine;
  }

  window.TuringMachine = TuringMachine;

})(this, this.document);


// class TuringMachine
  // has a map 'states' that maps state names
  // to state instances

  // has a start state, which is the name of the start state
  // has a current state (name)
  // has a Tape instance
  // has a steps number

  // has a step function that simulates one step
    // remember to increment step count
  // has an initialize_simulation function
    // takes an input string. starts by constructing the tape
    // takes an optional tape head index (for subroutines)
    // takes a speed (either a flag to go slowly or an actual speed)
    // sets steps count to 0
    // returns the type of the first halting state reached

  // addState
  // getState
  // setStart

// buildTM function takes TM code and builds a TM instance

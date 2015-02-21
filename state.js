var NONE = NaN;

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



//   this.transtions["state-name"];
//   this.transtions["state-name"] = new Transition("a", "b", "other-state");
// }




// class State
  // has a map 'transitions' from characters to read
  // to Transition instances
  // has a name

  // has type string "1" or "0", or somehting else if
    // a subroutine state, e.g. "even" or "odd"
    // "" for non-halting
  // has a function isHalting() which checks if the state
  // is either accepting or rejecting.

  // constructor takes a name

  // setType (by default NONE)
  // addTransition
  // getTransition (if no transition, the TM rejects)
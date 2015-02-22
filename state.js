var NONE = undefined;

function State(name) {
  this.transitions = {};
  this.name = name;
  this.type = NONE;
}

State.prototype.addTransition = function(read, write, direction, state) {
  direction = direction == "r" ? -1 : 1;
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
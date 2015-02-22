function Transition(read, write, direction, destination, line) {
  this.read = read;
  this.write = write;
  this.direction = direction;
  this.destination = destination;
  this.line = line;
}



// new Transition("a", "b", "state-two");


// Transition.prototype.changeRead(read) {
//   this.read = read;
// }

// class Transition
  // has a character to read
  // has a character to write
  // has a state (name) to go to
function Transition(read, write, direction, destination) {
  this.read = read;
  this.write = write;
  this.direction = direction;
  this.destination = destination;
}



// new Transition("a", "b", "state-two");


// Transition.prototype.changeRead(read) {
//   this.read = read;
// }

// class Transition
  // has a character to read
  // has a character to write
  // has a state (name) to go to
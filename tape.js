function Tape() {
  this.tape = [];
  this.head = 0;
}

Tape.prototype.write = function(character) {
  this.tape[this.head] = character;
}

Tape.prototype.read = function() {
  return this.tape[this.head];
}

Tape.prototype.move = function(direction) {
  (direction == -1) ? this.moveRight() : this.moveLeft();
}

Tape.prototype.moveLeft = function() {
  if (this.head == 0) this.tape.unshift("_");
  else this.head--;
}

Tape.prototype.moveRight = function() {
  this.head++;
  if (this.head >= this.tape.length) {
    this.tape.push("_");
  }
}

Tape.prototype.getInput = function() {
  return this.tape.join("");
}

Tape.prototype.setInput = function(input) {
  this.tape = input.split("");
}

Tape.prototype.setHead = function(head) {
  this.head = head;
}

// class Tape
  // has a tape head (index)
  // has a blank character (_)
  // has an array of characters
  // possibly takes a max tape size
  // constructor takes a string input and splits it using split('')

  // has moveLeft and moveRight functions, which call
  // move with -1 and 1 respectively

  // move function needs to expand the array to the right or left
  // when overflow happens. if we move right to length, then we
  // expand the array one (by pushing the blank character)
  // and when we move right to -1, we expand (by unshifting the blank)
  // and then we set the tape head to 0 (only if underflow)

  // read function returns the character at the tape head
  // write function writes a given character to the head

  // has getInput, setInput, and setHead functions to alter the state
  // mostly for subroutine stuff
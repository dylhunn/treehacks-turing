// class Subroutine
  // has a TM
  // has a map of TM outputs to states

  // getTransition
  // setTransition

  // simulate function (input, start, callback)
    // simulate TM on caller's input
    // starting at the caller's tape head location
    // calls the callback with inputs
      // current tape state
      // current head location
      // result of subroutine
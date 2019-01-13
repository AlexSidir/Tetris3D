let array = [];
let levelFull = true;
let completeArray = [];
Pieces = {};

Pieces.STATES = {EMPTY:0, FIXED:1};
Object.freeze(Pieces.STATES);

function init(_y, _x, _z) {
  for(let y = 0; y < _y; y++) {
    array[y] = [];
    for(let x = 0; x < _x; x++) {
      array[y][x] = [];
      for(let z = 0; z < _z; z++) {
        array[y][x][z] = Pieces.STATES.EMPTY;
      }
    }
  }
}

function checkIfLevelIsFull() {
  for(let y = 0; y < 12; y++) {
    for(let x = 0; x < 5; x++) {
      for(let z = 0; z < 5; z++) {
        if (array[y][x][z] == 1 ){
          levelFull = true;
        } else {
          levelFull = false;
        }
      }
    }
    if(levelFull) {
      for(let k = 0; k < completeArray.length; k++) {
        if(completeArray[k].position.y == y) {
          scene.remove(completeArray[k]);
        }
      }
      levelFull = false;
    }
  }
}

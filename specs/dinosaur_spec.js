const assert    = require('assert');
const Dinosaur  = require('../models/dinosaur.js');
const dinoType  = require('../enums/dinoType.js')


describe('Dinosaur', function(){

  let dinosaur;

  beforeEach(function(){
    dinosaur = new Dinosaur(dinoType.TRICERATOPS);
  })

  it('should have a type', function(){
    assert.strictEqual(dinosaur.type, "triceratops");
  })

  it('should have a number of offspring per year', function(){
    assert.strictEqual(dinosaur.annualOffspring, 1)
  })

})

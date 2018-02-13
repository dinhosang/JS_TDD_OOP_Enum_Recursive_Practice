const assert    = require('assert');
const Park      = require('../models/park.js');
const Dinosaur  = require ('../models/dinosaur.js')


describe('Park', function(){

  let parkEmpty;
  let parkWith;
  let dinosaurTric1;
  let dinosaurTric2;
  let dinosaurVelo1;
  let dinosaurVelo2;
  let dinosaurTyra1;
  let dinosaurTyra2;
  let arrayOfDinosaurs;


  beforeEach(function(){
    parkEmpty = new Park("JP");
    parkWith = new Park("Dinosaurs R Us");
    tric1 = new Dinosaur("Triceratops", 3);
    tric2 = new Dinosaur("Triceratops", 1);
    velo1 = new Dinosaur("Velociraptor", 4);
    velo2 = new Dinosaur("Velociraptor", 2);
    tyra1 = new Dinosaur("Tyrannosaurus", 2);
    tyra2 = new Dinosaur("Tyrannosaurus", 1);
    arrayOfDinosaurs = [tric1, velo1,tric2,
                        tyra1, velo2, tyra2];
    parkWith.addMultipleDinosaurs(arrayOfDinosaurs);
  })

  it('should have a name', function(){
    assert.equal(park.name, "JP");
  })

  describe('enclosure', function(){

    it('should start empty', function(){
      assert.deepEqual(park.enclosure, [])
    })

    it('should be able to have a dinosaur', function(){
      park.addDinosaur(tric1);
      const expectedEnclosure = [tric1];
      assert.deepEqual(park.enclosure, expectedEnclosure);
    })

    it('should be able to have many dinosaurs', function(){
      park.addMultipleDinosaurs(arrayOfDinosaurs);
      assert.deepStrictEqual(park.enclosure, arrayOfDinosaurs)
    })

    it('should be able to remove all dinosaurs of a certain type', function(){
      const startNumberDinos = parkWith.getNumberDinosaurs();
      assert.strictEqual(startNumberDinos, 6)
      parkWith.removeDinosaursOfType("Tyrannosaurus");
      const finishNumberDinos = parkWith.enclosure.length;
      assert.strictEqual(finishNumberDinosnumberDinos, 4)
    })


  })


})

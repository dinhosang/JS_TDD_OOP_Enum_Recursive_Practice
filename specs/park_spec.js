const assert    = require('assert');
const Park      = require('../models/park.js');
const Dinosaur  = require('../models/dinosaur.js')
const dinoType  = require('../enums/dinoType.js')

describe('Park', function(){

  let park;

  beforeEach(function(){
    park = new Park("JP");
  })

  it('should have a name', function(){
    assert.equal(park.name, "JP");
  })


  describe('enclosure', function(){

    let parkWith;
    let dinosaurTric1;
    let dinosaurTric2;
    let dinosaurVelo1;
    let dinosaurVelo2;
    let dinosaurTyra1;
    let dinosaurTyra2;
    let arrayOfDinosaurs;
    let arrayOfDinosaursWithoutTyra;
    let arrayOfDinosaursWithTwoOrMoreAnnualOffspring;

    beforeEach(function(){
      parkWith = new Park("Dinosaurs R Us");
      tric1 = new Dinosaur(dinoType.TRICERATOPS);
      tric2 = new Dinosaur(dinoType.TRICERATOPS);
      velo1 = new Dinosaur(dinoType.VELOCIRAPTOR);
      velo2 = new Dinosaur(dinoType.VELOCIRAPTOR);
      tyra1 = new Dinosaur(dinoType.TYRANNOSAURUS);
      tyra2 = new Dinosaur(dinoType.TYRANNOSAURUS);
      // console.log(tyra2.type);
      arrayOfDinosaurs = [tric1, velo1,tric2,
                          tyra1, velo2, tyra2];

      arrayOfDinosaursWithoutTyra = [tric1, velo1,
                                      tric2, velo2];

      arrayOfDinosaursWithTwoOrMoreAnnualOffspring = [
        velo1, tyra1, velo2, tyra2
      ]

      parkWith.addMultipleDinosaurs(arrayOfDinosaurs);
    });

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

      parkWith.removeDinosaursOfType(dinoType.TYRANNOSAURUS);
      const finishNumberDinos = parkWith.getNumberDinosaurs();

      assert.strictEqual(finishNumberDinos, 4)
      assert.deepStrictEqual(parkWith.enclosure, arrayOfDinosaursWithoutTyra)
    })

    it('should be able to see all dinosaurs with an annual offspring count equal to or higher than a chosen value', function(){
      const actual = parkWith.getDinosAnnualOffspringOfOrMore(2);
      assert.deepStrictEqual(actual, arrayOfDinosaursWithTwoOrMoreAnnualOffspring);
    })
  })


  describe('calculating offspring', function(){

    let tyrannosaurus;
    let dilophosaurus;

    beforeEach(function(){
      tyrannosaurus = new Dinosaur(dinoType.TYRANNOSAURUS);
      dilophosaurus = new Dinosaur(dinoType.DILOPHOSAURUS);
    })

    it('should be able to calculate number of dinosaurs after 1 year starting with 1 dinosaur', function(){
      park.addDinosaur(tyrannosaurus);
      assert.strictEqual(park.calculateDinosaurs(1), 4);
    });

    it('should be able to calculate number of dinosaurs after 2 years starting with 1 dinosaur', function(){
      park.addDinosaur(tyrannosaurus);
      park.addDinosaur(tyrannosaurus);
      assert.strictEqual(park.calculateDinosaurs(2), 32);
    });
    
    it('should be able to calculate number of dinosaur after year two starting with 2 dinosaurs', function(){
      park.addDinosaur(tyrannosaurus);
      park.addDinosaur(dilophosaurus);
      assert.strictEqual(park.calculateDinosaurs(2), 25);
    });
  })


})

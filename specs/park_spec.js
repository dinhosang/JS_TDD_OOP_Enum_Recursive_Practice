const assert    = require('assert');
const Park      = require('../models/park.js');
const Dinosaur  = require('../models/dinosaur.js')
const dinoType  = require('../enums/dinoType.js')

describe('Park', function(){

  let park;
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
    park = new Park("JP");
    parkWith = new Park("Dinosaurs R Us");
    tric1 = new Dinosaur(dinoType.TRICEROTOPS, 3);
    tric2 = new Dinosaur(dinoType.TRICEROTOPS, 1);
    velo1 = new Dinosaur(dinoType.VELOCIRAPTOR, 4);
    velo2 = new Dinosaur(dinoType.VELOCIRAPTOR, 2);
    tyra1 = new Dinosaur(dinoType.TYRANNOSAURUS, 2);
    tyra2 = new Dinosaur(dinoType.TYRANNOSAURUS, 1);
    // console.log(tyra2.type);
    arrayOfDinosaurs = [tric1, velo1,tric2,
                        tyra1, velo2, tyra2];

    arrayOfDinosaursWithoutTyra = [tric1, velo1,
                                    tric2, velo2];

    arrayOfDinosaursWithTwoOrMoreAnnualOffspring = [
      tric1, velo1, tyra1, velo2
    ]

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
    
  })


})

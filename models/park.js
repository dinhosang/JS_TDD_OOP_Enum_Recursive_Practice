const Park = function(name){

  this.name = name;
  this.enclosure = [];

  Object.preventExtensions(this);
}


Park.prototype.addDinosaur = function(dinosaur){
  this.enclosure.push(dinosaur);
}


Park.prototype.addMultipleDinosaurs = function(arrayOfDinosaurs){

  for(const dinosaur of arrayOfDinosaurs){
    this.enclosure.push(dinosaur);
  }
}


Park.prototype.getNumberDinosaurs = function(){
  return this.enclosure.length;
}


Park.prototype.checkForDinosaurOfTypeToRemove = function(type){
  for(const dinosaur of this.enclosure){

    if(type.name === dinosaur.type){
      return this.enclosure.indexOf(dinosaur)
    }
  }

  return null
}


Park.prototype.removeDinosaursOfType = function(type){
  // // below is not needed as if the array is empty
  // // it still doesn't throw an error :o
  // if(this.enclosure == []){
  //   return;
  // }

  let dinosaurIndexToRemove;

  dinosaurIndexToRemove = this.checkForDinosaurOfTypeToRemove(type);

  if(dinosaurIndexToRemove !== null){

    this.enclosure.splice(dinosaurIndexToRemove, 1);
    this.removeDinosaursOfType(type);
  }
}


Park.prototype.getDinosAnnualOffspringMoreThan = function(number){

  let arrayOfDinosaurs = [];
  for(const dinosaur of this.enclosure){

    if(dinosaur.annualOffspring > number){
      arrayOfDinosaurs.push(dinosaur);
    }
  }

  return arrayOfDinosaurs;
}


Park.prototype.calculateFirstYearOffspring = function(){

  let type;
  let innerHash;
  let totalHash = {};

  for(const dinosaur of this.enclosure){
    type = dinosaur.type
    if (totalHash[type] === undefined) {

      totalHash[type] = {};
      innerHash = totalHash[type];
      innerHash.total = dinosaur.annualOffspring + 1;
      innerHash.multiplier = dinosaur.annualOffspring + 1;
    }
    else {
      innerHash = totalHash[type];
      innerHash.total += dinosaur.annualOffspring + 1;
    }
  }

  return totalHash;
}


Park.prototype.calculateLaterYearOffspring = function(totalHash){

  for(const type in totalHash){

    let innerHash = totalHash[type];
    innerHash.total *= innerHash.multiplier;
  }

  return totalHash;
}


Park.prototype.calcYearOffspring = function(yearsToCalculate, total){

  let totalHash = total;

  if (yearsToCalculate <= 0) {
    return totalHash;
  }

  if(totalHash === null){
    totalHash = this.calculateFirstYearOffspring();
  }
  else {
    totalHash = this.calculateLaterYearOffspring(totalHash);
  }

  yearsToCalculate -= 1;

  return this.calcYearOffspring(yearsToCalculate,
                                totalHash);
}

Park.prototype.calculateDinosaurs = function(years){
  let totalDinosAfterFinalCalc = 0;
  let hashTotalsPerType = null;
  let yearsToCalculate = years;

  hashTotalsPerType = this.calcYearOffspring(years,
                                  hashTotalsPerType);

  for(const type in hashTotalsPerType){
    let totalForType = hashTotalsPerType[type].total;
    totalDinosAfterFinalCalc += totalForType;
  }

  return totalDinosAfterFinalCalc;

}

module.exports = Park;

// look into overloading the addMultiple;
// to accept not just an array but individual as well

// tried to use arguments but having to react differently
// to an array being passed through, to indiviual
// dinos being passed thourgh comma separated, was causing
// difficulty. Look into another day time willing.

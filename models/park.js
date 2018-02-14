const Park = function(name){

  this.name = name;
  this.enclosure = [];
}


Park.prototype.addDinosaur = function(dinosaur){
  this.enclosure.push(dinosaur);
}


Park.prototype.addMultipleDinosaurs = function(dinosaurs){
  for(let dinosaur of dinosaurs){
    this.enclosure.push(dinosaur);
  }
}


Park.prototype.getNumberDinosaurs = function(){
  return this.enclosure.length;
}


Park.prototype.checkForDinosaurOfTypeToRemove = function(type){
  for(let dinosaur of this.enclosure){

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


Park.prototype.getDinosAnnualOffspringOfOrMore = function(number){

  let arrayOfDinosaurs = [];
  for(let dinosaur of this.enclosure){

    if(dinosaur.annualOffspring >= number){
      arrayOfDinosaurs.push(dinosaur);
    }
  }

  return arrayOfDinosaurs;
}


Park.prototype.calcYearOffspring = function(yearsToCalculate, totalHash){

  let finalCountOfOffspring;

  if (yearsToCalculate <= 0) {
    return totalHash;
  }

  for(let dinosaur of this.enclosure){
    let type = dinosaur.type
    if (totalHash[type] == undefined) {
      totalHash[type] = dinosaur.annualOffspring + 1;
    }
    else {
      totalHash[type] += dinosaur.annualOffspring + 1;
    }
  }

  yearsToCalculate -= 1;

  return this.calcYearOffspring(yearsToCalculate,
                                totalHash);
}

Park.prototype.calculateDinosaurs = function(years){
  let totalDinosAfterFinalCalc = 0;
  let hashTotalsPerType = {};
  let yearsToCalculate = years;

  hashTotalsPerType = this.calcYearOffspring(years,
                                  hashTotalsPerType);

  for(let type in hashTotalsPerType){
    totalDinosAfterFinalCalc += hashTotalsPerType[type];
  }

  return totalDinosAfterFinalCalc;

}

module.exports = Park;

// look into overloading the addMultiple;
// to accept not just an array but individual as well

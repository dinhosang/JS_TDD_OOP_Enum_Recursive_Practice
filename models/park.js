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


Park.prototype.calculateFirstYearOffspring = function(totalHash){

  let type;
  let innerHash;

  for(let dinosaur of this.enclosure){
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
  console.log(innerHash.multiplier);
  return totalHash;
}


Park.prototype.calculateLaterYearOffspring = function(totalHash){

  for(let type in totalHash){
    console.log(type);
    let innerHash = totalHash[type];
    console.log(innerHash);
    innerHash.total *= innerHash.multiplier;
  }

  return totalHash;
}


Park.prototype.calcYearOffspring = function(yearsToCalculate, total){

  let finalCountOfOffspring;
  let totalHash = total;

  if (yearsToCalculate <= 0) {
    return totalHash;
  }

  if(totalHash === null){
    totalHash = {};
    totalHash = this.calculateFirstYearOffspring(totalHash);
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

  for(let type in hashTotalsPerType){
    let innerHash = hashTotalsPerType[type];
    totalDinosAfterFinalCalc += innerHash.total;
  }

  return totalDinosAfterFinalCalc;

}

module.exports = Park;

// look into overloading the addMultiple;
// to accept not just an array but individual as well

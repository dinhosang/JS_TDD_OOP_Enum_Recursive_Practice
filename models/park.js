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

// can catalogue dinos we want to keep rather than other way
// simpler looking code that achieves same end
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


Park.prototype.setupTotalOffspringHashAndCalculateFirstYear = function(){

  let type;
  let innerHash;
  let totalHash = {};

  for(const dinosaur of this.enclosure){
    type = dinosaur.type
    if (totalHash[type] === undefined) {

      totalHash[type] = {};
      innerHash = totalHash[type];
      innerHash.total = 1;
      innerHash.multiplier = dinosaur.annualOffspring + 1;
    }
    else {
      innerHash.total += 1;
    }
  }

  totalHash = this.calculateOffspringForYear(totalHash)
  return totalHash;
}


Park.prototype.calculateOffspringForYear = function(totalHash){

  for(const type in totalHash){

    let innerHash = totalHash[type];
    innerHash.total *= innerHash.multiplier;
  }

  return totalHash;
}


Park.prototype.calcHashOffspringInRange = function(yearsToCalculate, total){

  let totalHash = total;

  if (yearsToCalculate <= 0) {
    return totalHash;
  }

  if(totalHash === null){
    totalHash = this.setupTotalOffspringHashAndCalculateFirstYear();
  }
  else {
    totalHash = this.calculateOffspringForYear(totalHash);
  }

  yearsToCalculate -= 1;

  return this.calcHashOffspringInRange(yearsToCalculate,
                                totalHash);
}

// could also just get the total of only the setup hash of first year
// before sending it to the calculateOffspringForYear part,
// and then bring it to the power of the number of years :o
Park.prototype.calculateDinosaurs = function(years){
  let totalDinosAfterFinalCalc = 0;
  let hashTotalsPerType = null;

  hashTotalsPerType = this.calcHashOffspringInRange(years, hashTotalsPerType);

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

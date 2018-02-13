const Park = function(name){

  this.name = name;
  this.enclosure = [];
}


Park.prototype.addDinosaur = function(dinosaur){
  this.enclosure.push(dinosaur);
}


Park.prototype.addMultipleDinosaurs = function(dinosaurs){
  for(dinosaur of dinosaurs){
    this.enclosure.push(dinosaur);
  }
}


Park.prototype.getNumberDinosaurs = function(){
  return this.enclosure.length;
}


Park.prototype.checkForDinosaurOfTypeToRemove = function(type){
  for(dinosaur of this.enclosure){

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
  for(dinosaur of this.enclosure){

    if(dinosaur.annualOffspring >= number){
      arrayOfDinosaurs.push(dinosaur);
    }
  }

  return arrayOfDinosaurs;
}


Park.prototype.calculateDinosaurs = function(years){

}

module.exports = Park;

// look into overloading the addMultiple;
// to accept not just an array but individual as well

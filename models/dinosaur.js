const Dinosaur = function(type){
  this.type = type.name;
  this.annualOffspring = type.annualOffspring;

  Object.preventExtensions(this);
}

module.exports = Dinosaur;

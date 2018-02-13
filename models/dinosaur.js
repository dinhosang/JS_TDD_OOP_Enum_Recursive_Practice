const Dinosaur = function(type, annualOffspring){
  this.type = type;
  this.annualOffspring = annualOffspring;

  Object.preventExtensions(this);
}

module.exports = Dinosaur;

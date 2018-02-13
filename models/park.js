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

module.exports = Park;

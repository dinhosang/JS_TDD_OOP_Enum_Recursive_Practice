const dinoType = {

  TRICERATOPS:    {name: "triceratops",
                  annualOffspring: 1},
  VELOCIRAPTOR:   {name: "velociraptor",
                  annualOffspring: 4},
  TYRANNOSAURUS:  {name: "tyrannosaurus",
                  annualOffspring: 3},
  DILOPHOSAURUS:  {name: "dilophosaurus",
                  annualOffspring: 2}
};

// below stops attributes being modifed
// also prevents new ones being added
Object.freeze(dinoType);

module.exports = dinoType;

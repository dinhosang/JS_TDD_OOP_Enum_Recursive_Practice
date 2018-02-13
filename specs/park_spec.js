const assert  = require('assert');
const Park    = require('../models/park.js');


describe('Park', function(){

  let park;

  beforeEach(function(){
    park = new Park("JP");
  })

  it('should have a name', function(){
    assert.equal(park.name, "JP");
  })


})

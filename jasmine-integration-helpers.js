if(typeof(setupApplication) === undefined){
  setupApplication = function() {
  };
}

var Scenario = function(description, specDefinitions) {
  return jasmine.getEnv().Scenario(description, function() {
    setupApplication();
    specDefinitions();
  });
};
var Given = function(description, specDefinitions) {
  return jasmine.getEnv().Given(description, specDefinitions);
};
var When = function(description, specDefinitions) {
  return jasmine.getEnv().When(description, specDefinitions);
};
var And  = function(description, specDefinitions) {
  return jasmine.getEnv().And(description, specDefinitions);
};
var Then = function(description, specDefinitions) {
  return jasmine.getEnv().Then(description, function() {
    specDefinitions(JasmineSproutcore.Page.create({selector: 'body'}));
  });
};
var context = function(description, specDefinitions) {
  return jasmine.getEnv().context(description, specDefinitions);
};


jasmine.Env.prototype.Scenario = jasmine.Env.prototype.describe;
jasmine.Env.prototype.Given    = jasmine.Env.prototype.describe;
jasmine.Env.prototype.When     = jasmine.Env.prototype.describe;
jasmine.Env.prototype.And      = jasmine.Env.prototype.describe;
jasmine.Env.prototype.Then     = jasmine.Env.prototype.it;
jasmine.Env.prototype.context  = jasmine.Env.prototype.describe;

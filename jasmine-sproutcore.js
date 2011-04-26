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


var JasmineSproutcore = {
  Page: SC.Object.extend({
    html: function() {
      var selector = this.get('selector');
      return SC.CoreQuery(selector).html();
    }.property('selection'),

    hasContent: function(content) {
      return this.get('html').indexOf(content) >= 0;
    },

    within: function(selector, callback) {
      this.set('selection', selector);
      var page = this;
      callback.apply(page, [page]);
    },
  })
};

var WebPage = {
  fillIn: function() {
    throw new Error('ERROR: Jasmine-Sproutcore no longer supports integration helpers. Please look at Simulo (https://github.com/gmoeck/simulo)');
  },

  clickOn: function() {
    throw new Error('ERROR: Jasmine-Sproutcore no longer supports integration helpers. Please look at Simulo (https://github.com/gmoeck/simulo)');
  }
}

function fillIn(selector, value) {
  WebPage.fillIn(selector, value);
}

function clickOn(selector) {
  WebPage.clickOn(selector);
}

jasmine.Matchers.prototype.toHaveClass = function(className) {
  this.message = function() {
    return [
        "Expected object to have the '" + className + "' css class, but it did not",
        "Expected object not to have the '" + className + "' css class, but it did"
    ];
  };

  return this.actual.hasClass(className);
};

jasmine.Matchers.prototype.toHaveContent = function(content) {
  this.message = function() {
    return [
        "Expected page to have '" + content + "' within it's content, but it did not",
        "Expected page not to have '" + content + "' within it's content, but it did"
    ];
  };

  return this.actual.hasContent(content);
};

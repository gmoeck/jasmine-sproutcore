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
    specDefinitions(WebPage.Page.create({selector: 'body'}));
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


var WebPage = {
  Page: SC.Object.extend({
    html: function() {
      var selector = this.get('selector');
      return SC.CoreQuery(selector).html();
    }.property('selection'),

    hasContent: function(content) {
      return this.get('html').indexOf(content) >= 0;
    }
  }),

  clickOn: function(selector) {
    SC.RunLoop.begin();
    var target = SC.CoreQuery(selector);
    if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
    waits(1);
    runs(function() {
      SC.Event.trigger(target, 'mouseover');
      SC.Event.trigger(target, 'mousedown');
      SC.Event.trigger(target, 'focus');
      SC.Event.trigger(target, 'mouseup');
    });
    SC.RunLoop.end();
  },

  fillIn: function(selector, value) {
    var keyCodes = { ' ': 32, '0': 48,'1': 49,'2': 50,'3': 51,'4': 52,'5': 53,'6': 54,'7': 55,'8': 56,'9': 57,
      'a': 65,'b': 66,'c': 67,'d': 68,'e': 69,'f': 70,'g': 71,'h': 72,'i': 73,'j': 74,'k': 75,'l': 76,'m': 77,
      'n': 78,'o': 79,'p': 80,'q': 81,'r': 82,'s': 83,'t': 84,'u': 85,'v': 86,'w': 87,'x': 88,'y': 89,'z': 90
    };
    SC.RunLoop.begin();
    var target = SC.CoreQuery(SC.CoreQuery(selector));
    if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
    this.clickOn(selector);
    value.split('').forEach(function(str) {
      var keyCode = keyCodes[str[0]];
      var charCode = str.charCodeAt(0);
      var keyDownKeyUpAttributes = {
        keyCode: keyCode,
        which: keyCode,
        charCode: 0,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      };
      waits(1);
      runs(function() {
        var event = SC.Event.simulateEvent(target, 'keydown', keyDownKeyUpAttributes);
        SC.Event.trigger(target, 'keydown', event);
        var event = SC.Event.simulateEvent(target, 'keypress', { keyCode: charCode, which: charCode, charCode: charCode });
        SC.Event.trigger(target, 'keypress', event);
        target.val(target.val() + str);
        var event = SC.Event.simulateEvent(target, 'keyup', keyDownKeyUpAttributes);
        SC.Event.trigger(target, 'keyup', event);
      });
    });
    SC.RunLoop.end();
  },

  within: function(selector, callback) {
    var page = this;
    callback.apply(page, [WebPage.Page.create({selector: selector})]);
  },
};

function fillIn(selector, value) {
  console.log('NOTE: The global fillIn has been depreciated and will be removed in the future, please use WebPage.fillIn');
  WebPage.fillIn(selector, value);
}

function clickOn(selector) {
  console.log('NOTE: The global clickOn has been depreciated and will be removed in the future, please use WebPage.clickOn');
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


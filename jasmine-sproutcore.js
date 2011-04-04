function clickOn(selector) {
  SC.RunLoop.begin();
  var target = SC.CoreQuery(selector);
  if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
  SC.Event.trigger(target, 'mouseover');
  SC.Event.trigger(target, 'mousedown');
  SC.Event.trigger(target, 'focus');
  SC.Event.trigger(target, 'mouseup');
  SC.RunLoop.end();
}

function fillIn(selector, value) {
  var keyCodes = { ' ': 32, '0': 48,'1': 49,'2': 50,'3': 51,'4': 52,'5': 53,'6': 54,'7': 55,'8': 56,'9': 57,
    'a': 65,'b': 66,'c': 67,'d': 68,'e': 69,'f': 70,'g': 71,'h': 72,'i': 73,'j': 74,'k': 75,'l': 76,'m': 77,
    'n': 78,'o': 79,'p': 80,'q': 81,'r': 82,'s': 83,'t': 84,'u': 85,'v': 86,'w': 87,'x': 88,'y': 89,'z': 90
  };
  SC.RunLoop.begin();
  var target = SC.CoreQuery(SC.CoreQuery(selector)[1]);
  if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
  clickOn(selector);
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
    var event = SC.Event.simulateEvent(target, 'keydown', keyDownKeyUpAttributes);
    SC.Event.trigger(target, 'keydown', event);
    var event = SC.Event.simulateEvent(target, 'keypress', { keyCode: charCode, which: charCode, charCode: charCode });
    SC.Event.trigger(target, 'keypress', event);
    target.val(target.val() + str);
    var event = SC.Event.simulateEvent(target, 'keyup', keyDownKeyUpAttributes);
    SC.Event.trigger(target, 'keyup', event);
  });
  // });
  // target.val(value);
  SC.RunLoop.end();
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


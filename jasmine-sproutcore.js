function clickOn(selector) {
  SC.RunLoop.begin();
  var target = SC.CoreQuery(selector);
  if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
  SC.Event.trigger(target, 'mousemove');
  SC.Event.trigger(target, 'mousedown');
  SC.Event.trigger(target, 'mouseup');
  SC.RunLoop.end();
}

function fillIn(selector, value) {
  SC.RunLoop.begin();
  var target = SC.CoreQuery(selector);
  if(target.length == 0) throw new Error('Could not find ' + selector + ' on the page');
  target.val(value);
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


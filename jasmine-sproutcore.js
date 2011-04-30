var JasmineSproutcore = {
  Page: SC.Object.extend({
    html: function() {
      var selector = this.get('selector');
      queryObject = SC.CoreQuery(selector);
      if(queryObject.length == 0) throw new Error('ERROR: Could not find ' + selector + ' on the page');
      if(queryObject.length > 1) throw new Error('ERROR: Page has multiple elements that match ' + selector);
      return queryObject.html();
    }.property('selector'),

    hasContent: function(content) {
      return this.get('html').indexOf(content) >= 0;
    },

    within: function(selector, callback) {
      var page = this;
      runs(function() {
        page.set('selector', selector);
        callback.apply(page, [page]);
      });
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

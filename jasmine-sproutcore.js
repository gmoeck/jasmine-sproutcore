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

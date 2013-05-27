(function() {
  require(['LinkedIn', 'mootools'], function(LinkedIn) {
    console.log('main init');
    return document.body.addEvent('click:relay(.linkedInShare)', function(event) {
      return LinkedIn.share({
        url: this.getProperty('data-url')
      });
    });
  });

}).call(this);

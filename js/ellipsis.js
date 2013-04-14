/*  Ellipsis
    Author: Kanikar
    Info: https://github.com/kanikarphan
    Licensed under the MIT license
*/

/*  Usage: 
    // attach the ellipsis to an element
    $('.element').ellipsis({ellipsis: 'foo'});

    // set the value of a property with data attributes
    data-plugin-options='{"ellipsis":"foo"}'
*/

 ;(function($, window, document, undefined) {
  // the ellipsis constructor
  var ellipsis = function(element, options) {
    this.element = element; // reference to the actual DOM element
    this.options = options; // reference to pluigin option
    this.metadata = $(element).data('plugin-options'); // html5 data attributes to support customization of the plugin on a per-element
  };
  // the ellipsis prototype
  ellipsis.prototype = {
    // ellipsis default options. this is private property and is  accessible only from inside the ellipsis
    defaults: { // default setting for ellipsis.
      ellipsis: '...', // ellipsis element with this
      multiClass: 'multiline', // class to use for multiline ellipsis
      href: {}, // make ellipsis a link
      target: '_self', // ellipsis link target '_self' || '_blank'
      before: '', // add text or space before the ellipsis
      after: '', // add text or space after the ellipsis
      title: 0, // add title to the parent container 1 || 0 which is true or false
      wrape: {}, // wrape ellipsis with this tag
      ellipsisStart: null, // ellipsis start callback function
      ellipsisComplete: null // ellipsis complete callback function
    },
    init: function() { // introduce defaults that can be extended either globally or using an object literal.
      this.settings = $.extend({}, this.defaults, this.options, this.metadata);
      $(this.element).css({'overflow':'hidden'}); // overflow hidden is required for plugin
      this.ellipsisIt(this.element); // init ellipsisThis method
      if(this.settings.title === 1) { // init ellipsisTitle method
        this.ellipsisTitle(this.element);
      }
      return this;
    },
    ellipsisIt: function(element) {
      var _clone = this.element.cloneNode(true), // clone element content
          _elem = $(element); // cache this selector
      if (_elem.css('overflow') === 'hidden') { // ellipsis container needs to have css propierty 'overflow: hidden'
        ($.isFunction(this.settings.ellipsisStart)) ? this.settings.ellipsisStart.call() : 0; // ellipsis start callback function
        var _text = _elem.html(), // element content
            _multiline = _elem.hasClass(this.settings.multiClass), // check if element has this multiline class
            _this = $(_clone).hide().css({'position': 'absolute','overflow': 'visible'}).width(_multiline ? _elem.width() : 'auto').height(_multiline ? 'auto' : _elem.height()); // clone current background and get content
        _elem.after(_this); // add ellipsis after the content
        function height() { return _this.height() > _elem.height(); } // calculate size of content
        function width() { return _this.width() > _elem.width(); } // calculate size of content
        var _calcFunc = _multiline ? height : width;
        while (_text.length > 0 && _calcFunc()) { // fit content to container
          _text = _text.substr(0, _text.length - 1);
          if (this.settings.href.length > 0) { // ellipsis as a link
            _this.html(_text + this.settings.before + '<a href="' + this.settings.href + '" target="' + this.settings.target + '">' + this.settings.ellipsis + '</a>' + this.settings.after);
          } else if (this.settings.wrape.length > 0) { // wrape ellipsis with this
            _this.html(_text + this.settings.before + '<' + this.settings.wrape + '>' + this.settings.ellipsis + '</' + this.settings.wrape + '>' + this.settings.after);
          } else { // ellipsis normally
            _this.html(_text + this.settings.before + this.settings.ellipsis + this.settings.after);
          }
        }
        _elem.html($.trim(_this.html())); // setup content
        _this.remove(); // clean up content
        ($.isFunction(this.settings.ellipsisComplete)) ? this.settings.ellipsisComplete.call() : 0; // ellipsis complete callback function
      }
    },
    ellipsisTitle: function(element) { // append content to container as title attribute 
      var _this = $(element),
          _title = _this.text(); // content text
      _this.parent().attr('title', _title); // add the title attribute
    }
  }
  ellipsis.defaults = ellipsis.prototype.defaults; 
  $.fn.ellipsis = function(options) {
    return this.each(function() {
      new ellipsis(this, options).init();
    });
  };
})(jQuery, window, document);
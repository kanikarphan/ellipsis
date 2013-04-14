/*  Ellipsis
    Company: kbb.com
    Licensed under the MIT license
*/

/*  Usage: 
    // attach the ellipsis to an elementent
    $('.elementent').ellipsis({ellipsis: 'foo'});

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
      var _this = $(element); // cache this selector
      if(_this.css('overflow') === 'hidden') { // ellipsis container needs to have css propierty 'overflow: hidden'
        ($.isFunction(this.settings.ellipsisStart)) ? this.settings.ellipsisStart.call() : 0; // ellipsis start callback function
        var _text = _this.html(), // element text
            _multiline = _this.hasClass(this.settings.multiClass), // check if element has this multiline class
            _elem = $(_this.clone()) // clone current element content
              .hide()
              .css({
                'position': 'absolute',
                'overflow': 'visible'
              })
              .width(_multiline ? _this.width() : 'auto')
              .height(_multiline ? 'auto' : _this.height()),
            _calculate = _multiline ? calcHeight : calcWidth; // calc height / width
        _this.after(_elem); // add ellipsis after the content
        while(_text.length > 0 && _calculate()) { // fit content to container
          _text = _text.substr(0, _text.length - 1);
          if(this.settings.href.length > 0) { // ellipsis as a link
            _elem.html(_text + this.settings.before + '<a href="' + this.settings.href + '" target="' + this.settings.target + '">' + this.settings.ellipsis + '</a>' + this.settings.after);
          } else if(this.settings.wrape.length > 0) { // wrape ellipsis with this
            _elem.html(_text + this.settings.before + '<' + this.settings.wrape + '>' + this.settings.ellipsis + '</' + this.settings.wrape + '>' + this.settings.after);
          } else { // ellipsis normally
            _elem.html(_text + this.settings.before + this.settings.ellipsis + this.settings.after);          
          }
        }
        _this.html($.trim(_elem.html())); // setup content
        _elem.remove(); // clean up content
        function calcHeight() { return _elem.height() > _this.height(); } // calculate size of content height
        function calcWidth() { return _elem.width() > _this.width(); } // calculate size of content width
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
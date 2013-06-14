/*  Ellipsis
    Author: Kanikar
    Info: https://github.com/kanikarphan
    Licensed under the MIT license
*/

/*  Usage: 
    // attach the ellipsis to an element
    $(element).ellipsis({ellipsis: 'foo'});

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
      wrap: {}, // wrap ellipsis with this tag
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
      // plugin options from default
      var _ellipsis = this.settings.ellipsis,
          _href = this.settings.href,
          _target = this.settings.target,
          _before = this.settings.before,
          _after = this.settings.after,
          _wrap = this.settings.wrap,
          _clone = this.element.cloneNode(true), // clone element text
          _elem = $(element), // cache this selector
          _elemMaxHeight = parseInt(_elem.css('max-height')), // 
          _elemHeight = _elem.height(),
          _thisHeight = _elemMaxHeight ? _elemMaxHeight : _elemHeight;
      if (_elem.css('overflow') === 'hidden') { // ellipsis container needs to have css propierty 'overflow: hidden'
        ($.isFunction(this.settings.ellipsisStart)) ? this.settings.ellipsisStart.call() : 0; // ellipsis start callback function
        var _text = _elem.html(), // element text
            _multiline = _elem.hasClass(this.settings.multiClass), // check if element has this multiline class
            _this = $(_clone).hide()
              .css('position', 'absolute')
              .css('overflow', 'visible')
              .css('max-height','none')
              .width(_multiline ? _elem.width() : 'auto')
              .height(_multiline ? 'auto' : _thisHeight)
        _elem.after(_this);
        var heightFunc = function() {
          return _this.height() > _thisHeight;
        };
        var widthFunc = function() {
          return _this.width() > _elem.width();
        };
        var calcFunc = _multiline ? heightFunc : widthFunc;
        // if the element is too long
        if(!!calcFunc()) {
          var originalText = _text;
          // ellipsis the text
          var createFunc = function(i) {
            _text = originalText.substr(0, i);
            if (_href.length > 0) { // ellipsis as a link
              _this.html(_text + _before + '<a href="' + _href + '" target="' + _target + '">' + _ellipsis + '</a>' + _after);
            } else if (_wrap.length > 0) { // wrap ellipsis with this
              _this.html(_text + _before + '<' + _wrap + '>' + _ellipsis + '</' + _wrap + '>' + _after);
            } else { // ellipsis normally
              _this.html(_text + _before + _ellipsis + _after);
            }
          };
          var searchFunc = function(i) {
            createFunc(i);
            if(calcFunc()) {
              return -1;
            }
            return 0;
          };
          // binary search
          var binarySearch = function(_length, _func) {
            var _mid,
                _low = 0,
                _high = _length - 1,
                _best = -1,
                _tries = 0;
            // find best match
            while(_low <= _high) {
              _tries++;
              _mid = ~~((_low + _high) / 2);
              var result = _func(_mid);
              if(result < 0) {
                _high = _mid - 1;
              } else if(result > 0) {
                _low = _mid + 1;
              } else {
                _best = _mid;
                _low = _mid + 1;
              }
              // more than 15 tries just break
              if(_tries === 15) {
                break;
              }
            }
            return createFunc(_best);
          }
          binarySearch(_text.length - 1, searchFunc); // use binary serach method
          _elem.html(_this.html());
        }
        _this.remove(); // clean up
        ($.isFunction(this.settings.ellipsisComplete)) ? this.settings.ellipsisComplete.call() : 0; // ellipsis complete callback function
      }
    },
    ellipsisTitle: function(element) { // append text to container as title attribute 
      var _this = $(element),
          _title = _this.text(); // use element text as title
      _this.attr('title', _title); // add the title attribute
    }
  }
  ellipsis.defaults = ellipsis.prototype.defaults; 
  $.fn.ellipsis = function(options) {
    return this.each(function() {
      new ellipsis(this, options).init();
    });
  };
})(jQuery, window, document);
Ellipsis Plugin
=====================
There are many scenarios in the display of online text where shortened, truncated representations are best used. For these scenarios, many opt for the implementation of ellipses. Ellipsis is a customizable jQuery plugin for the smart truncation of text base on container width and not character count.

## How to use it
Attach the ellipsis to an element
```
$(element).ellipsis();
```

Single line ellipsis require a width to be define.

To ellipsis a paragraph, a class is needed to indicate it is multiline. The default class is `multiline`, this can be change through the plugin option. Height or max height is required for multiple lines to set line limit.


## Plugin options
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ellipsis</td>
      <td>string</td>
      <td>...</td>
      <td>ellipsis element with this</td>
    </tr>
    <tr>
      <td>multiClass</td>
      <td>string</td>
      <td>multiline</td>
      <td>class to use to determine if element is multiline ellipsis</td>
    </tr>
    <tr>
      <td>href</td>
      <td>string</td>
      <td>none</td>
      <td>make the ellipsis into a clickable link</td>
    </tr>
    <tr>
      <td>target</td>
      <td>string</td>
      <td>_self</td>
      <td>ellipsis link target '_self' or '_blank'</td>
    </tr>
    <tr>
      <td>before</td>
      <td>string</td>
      <td>none</td>
      <td>insert any character before the ellipsis</td>
    </tr>
    <tr>
      <td>after</td>
      <td>string</td>
      <td>none</td>
      <td>insert any character after the ellipsis</td>
    </tr>
    <tr>
      <td>title</td>
      <td>boolean</td>
      <td>0</td>
      <td>add a title attribute with content to the ellipsis container</td>
    </tr>
    <tr>
      <td>wrape</td>
      <td>string</td>
      <td>none</td>
      <td>wrape the ellipsis with the html tag</td>
    </tr>
  </tbody>
</table>
<i>For the boolean option above use 0 or 1 instead of false or true.</i>

## Plugin options taken to the next level
All options above are configurable with HTML5 data attribute. This is a significantly cleaner solution (as long as you don’t mind the inline approach).

You can use the standard approach
```
$(element1).ellipsis();
$(element2).ellipsis({ellipsis: 'read more', multiClass: 'multi'});
$(element3).ellipsis({title: 1});
```
<strong>or</strong>

HTML5 data approach
```
data-plugin-options='{"ellipsis":"read more","multiClass":"multi"}'
data-plugin-options='{"ellipsis":"read more"}'
$(element).ellipsis(); // init the plugin once
```

## Plugin callback method
This plugin has two callback.
```
$(element).ellipsis({
  ellipsisStart: function() {
    // do stuff here
  },
  ellipsisComplete: function() {
    // do stuff here
  }
});
```
/* globals AFRAME */

var html2canvas = require('html2canvas/src/core');

var renderedCanvas;

AFRAME.registerComponent('htmltexture', {
  dependencies: ['draw'],
  schema: {
    asset: {}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.draw = this.el.components.draw;
    this.draw.register(this.render.bind(this));
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function () {
    var draw = this.el.components.draw;
    var selector = this.data.asset;
    var width = draw.data.width;
    var height = draw.data.height;

    if (this.rendering) {
      return;
    }

    this.rendering = true;

    var node = document.querySelector(selector);

    if (!node) {
      console.error('Could not find html element with selector "' + selector + '"');
      return;
    }

    node.style.display = 'block';

    var clone = node.cloneNode(true);
    document.body.appendChild(clone);

    clone.style.cssText = 'width: ' + width + 'px !important; height: ' + height + 'px !important; padding: 0; position: absolute; left: 0; top: 0; z-index: -1; box-sizing: border-box;';

    html2canvas(clone, { width: width, height: height, onrendered: function (canvas) {
      document.body.removeChild(clone);
      renderedCanvas = canvas;
      draw.render();
    }});
  },

  render: function () {
    var draw = this.el.components.draw;
    var ctx = draw.ctx;

    if (renderedCanvas) {
      ctx.drawImage(renderedCanvas, 0, 0);
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {}
});

/* globals AFRAME */

var html2canvas = require('html2canvas/src/core');
window.html2canvas = html2canvas;

AFRAME.registerComponent('webtexture', {
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
    var self = this;
    var selector = this.data.asset;

    draw.render();
    console.log(draw.canvas);

    if (this.rendering) {
      return;
    }

    this.rendering = true;

    console.log(selector);
    html2canvas(document.querySelector(selector), { onrendered: function (canvas) {
      document.querySelector(selector).style.display = 'none';
      // ctx.drawImage(c, 0, 0);
      window.xh = canvas;
      // self.htmlcanvas = canvas;
      draw.render();
    }});

    // html2canvas(document.querySelector(this.data.asset), {
    //   javascriptEnabled: false,
    //   onrendered: function (canvas) {
    //     // console.log('eh!?');
    //     // self.htmlcanvas = canvas;
    //   }
    // });
  },

  render: function () {
    var draw = this.el.components.draw;
    var ctx = draw.ctx;

    if (window.xh) {
      ctx.drawImage(window.xh, 0, 0);
      console.log('??');
    }
  },

  //  var html = document.querySelector(this.data.asset).innerHTML;
  //  ctx.fillText(html, 10, 10);
  // },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {}
});

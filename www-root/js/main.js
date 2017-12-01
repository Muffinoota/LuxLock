'use strict';
let main = (() => {

  let _initialized = false,
    mod = {};

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function setBGColor($el, color) {
    $el.css('background-color', color.getCSSColor());
  }

  mod.init = () => {
    console.log('sauce'); //Print to verify it's working

    class Color {
      constructor(red = 127, green = 127, blue = 127, time = 1000) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.time = time;
      }
      getCSSColor() {
        return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
      }
      getColorDiv() {
        return '<div class="flextainer flex">\
        <div class="colorbox" style="height: 80px; width: 200px; background-color: '
        + color.getCSSColor() + ';>\
        </div "> <p>Color: ' + color.getCSSColor() + '<br> \
        Time: ' + this.time + 'ms</p>'
        + '</div>';
      }
      setTime(time) {
        this.time = time;
      }
      getTime() {
        return this.time;
      }
    }

    class ColorCode {
      constructor() {
        this.colors = [];
        this.currentColor = this.colors[0];
      }

      addColor(color) {
        this.colors.push(new Color(color.red, color.green, color.blue, color.getTime()));
      }

      removeColor() {
        this.colors.pop();
      }

      clearColors() {
        this.colors = [];
      }

      playColors($el) {
        console.log('gonna play');
        let i = 0;
        let startTime = Date.now() - 1;
        let colors = this.colors;
        setBGColor($el, colors[0]);
        let colorPlayer = setInterval(function() {
          if (Date.now() - startTime > colors[i].getTime()) {
            console.log('#' + i, ' Color: ', colors[i].getCSSColor(), 'Time: ', colors[i].getTime());
            console.log(Date.now() - startTime);
            console.log(colors[i].getTime());
            setBGColor($el, colors[i+1]);
            startTime = Date.now();
            if (i >= colors.length - 2) clearInterval(colorPlayer);
            i++;
          }
        }, 10)
      }

      toString() {
        let colors = [];
        for (let color of this.colors) {
          colors.push('Color: ' + color.getCSSColor() + ' Time: ' + color.getTime());
        }
        return colors;
      }

    }

    let colorCode = new ColorCode();

    let $colorCode = $('.js-lux-code').first();

    let $redSlider = $('#redSlider').first();
    let $greenSlider = $('#greenSlider').first();
    let $blueSlider = $('#blueSlider').first();
    $redSlider.on('input', () => {
      color.red = $redSlider.val();
      setBGColor($colorCode, color);
    });
    $greenSlider.on('input', () => {
      color.green = $greenSlider.val();
      setBGColor($colorCode, color);
    });
    $blueSlider.on('input', () => {
      color.blue = $blueSlider.val();
      setBGColor($colorCode, color);
    });

    let color = new Color($redSlider.val(), $greenSlider.val(), $blueSlider.val());
    setBGColor($colorCode, color);


    let $colorButton = $('#colorButton');
    $colorButton.click( () => {
      colorCode.playColors($colorCode);
      console.log('clicked');
    });

    function absorbEvent_(event) {
      var e = event || window.event;
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }

    let timer = 0;
    let buttonPause = 0;
    let $saveColorButton = $('#saveColor');
    $saveColorButton
    .mousedown(() => {
      if (buttonPause - Date.now() < 50) {
        console.log(buttonPause - Date.now());
      } else timer = Date.now();
    })
    .on('touchstart', () => {
      timer = Date.now();
    })
    .on('touchend', () => {
      buttonPause = Date.now();
      color.time = Date.now() - timer;
      $('.js-saved-colors').first().append(color.getColorDiv());
      colorCode.addColor(color);
      console.log(colorCode.toString());
    })
    .mouseup(() => {
      if (buttonPause - Date.now() < 50) {
        console.log(buttonPause - Date.now());
      }
      else {
        color.time = Date.now() - timer;
        $('.js-saved-colors').first().append(color.getColorDiv());
        colorCode.addColor(color);
        console.log(colorCode.toString());
      }
    })
    .on('touchmove', absorbEvent_)
    .on('touchcancel', absorbEvent_);

    let $clearColorsButton = $('#clearColors');
    $clearColorsButton
    .click(() => {
      colorCode.clearColors();
      $('.js-saved-colors').first().html('');
    });

    _initialized = true;
  };


  return mod;
})();

$(() => { main.init(); });

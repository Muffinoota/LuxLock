'use strict';
let main = (() => {

  let _initialized = false,
    mod = {};

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function setBGColor($el, red, green, blue) {
    let color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    $el.css('background-color', color);
  }

  // function getSliderVals() {
  //
  // }

  mod.init = () => {
    console.log('sauce'); //Print to verify it's working
    let $colorCode = $('.js-lux-code').first();

    let $colorButton = $('#colorButton');
    $colorButton.click( () => {
      setBGColor($colorCode, 255, 12, 3);
    });


    let color = {
      red: 127,
      green: 127,
      blue: 127,
      getCSSColor() {
        return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
      }
    }
    let $redSlider = $('#redSlider').first();
    $redSlider.on('input', () => {
      color.red = $redSlider.val();
      setBGColor($colorCode, color.red, color.green, color.blue);
    });


    let $greenSlider = $('#greenSlider').first();
    $greenSlider.on('input', () => {
      color.green = $greenSlider.val();
      setBGColor($colorCode, color.red, color.green, color.blue);
    });

    let $blueSlider = $('#blueSlider').first();
    $blueSlider.on('input', () => {
      color.blue = $blueSlider.val();
      setBGColor($colorCode, color.red, color.green, color.blue);
    });

    let $saveColorButton = $('#saveColor');
    $saveColorButton.click( () => {
      $('.js-saved-colors').first().append('<div style="height: 240px; width: 240px; background-color: ' + color.getCSSColor() + ';></div ">')
    });



    _initialized = true;
  };


  return mod;
})();

$(() => { main.init(); });

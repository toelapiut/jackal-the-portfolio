     $('.open-overlay').click(function() {
       $('.open-overlay').css('pointer-events', 'none');
       var overlay_navigation = $('.overlay-navigation'),
         top_bar = $('.bar-top'),
         middle_bar = $('.bar-middle'),
         bottom_bar = $('.bar-bottom');

       overlay_navigation.toggleClass('overlay-active');
       if (overlay_navigation.hasClass('overlay-active')) {

         top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
         middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
         bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
         overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
         overlay_navigation.velocity('transition.slideLeftIn', {
           duration: 50,
           delay: 0,
           begin: function() {
             $('nav ul li').velocity('transition.perspectiveLeftIn', {
               stagger: 0,
               delay: 0,
               complete: function() {
                 $('nav ul li a').velocity({
                   opacity: [1, 0],
                 }, {
                   delay: 3,
                   duration: 40
                 });
                 $('.open-overlay').css('pointer-events', 'auto');
               }
             });
           }
         });

       } else {
         $('.open-overlay').css('pointer-events', 'none');
         top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
         middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
         bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
         overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
         $('nav ul li').velocity('transition.perspectiveRightOut', {
           stagger: 80,
           delay: 0,
           complete: function() {
             overlay_navigation.velocity('transition.fadeOut', {
               delay: 0,
               duration: 100,
               complete: function() {
                 $('nav ul li a').velocity({
                   opacity: [0, 1],
                 }, {
                   delay: 0,
                   duration: 10
                 });
                 $('.open-overlay').css('pointer-events', 'auto');
               }
             });
           }
         });
       }
     });



  // modal function

  $(".modalbttn").click(function() {
    $(".modalcontainer").fadeIn("slow");
    $(".modal").fadeIn("slow");
  });
  
  $(".close").click(function() {
    $(".modalcontainer").fadeOut("slow");
    $(".modal").fadeOut("slow");
  });
  
  $(".buttons").click(function() {
    $(".modalcontainer").fadeOut("slow");
    $(".modal").fadeOut("slow");
  });


// Home page Animations 
var resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    var resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    var combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      var characters = options.characters;
      var timeout = options.timeout;
      var element = options.element;
      var partialString = options.partialString;

      var iterations = options.iterations;

      setTimeout(function () {
        if (iterations >= 0) {
          var nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      var resolveString = options.resolveString;
      var characters = options.characters;
      var offset = options.offset;
      var partialString = resolveString.substring(0, offset);
      var combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, function () {
        var nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };
    doResolverEffect(combinedOptions, callback);
  }
};var strings = ['Hello There, Are you alright ?', 'You know, being Caroline taught me a valuable lesson. I thought you were my greatest enemy. When all along you were my best friend.', 'The surge of emotion that shot through me when I saved your life taught me an even more valuable lesson: where Caroline lives in my brain.', 'Goodbye, Caroline.', 'You know, deleting Caroline just now taught me a valuable lesson. The best solution to a problem is usually the easiest one. And I\'ll be honest.', 'Killing you? Is hard.', 'You know what my days used to be like? I just tested. Nobody murdered me. Or put me in a potato. Or fed me to birds. I had a pretty good life.', 'And then you showed up. You dangerous, mute lunatic. So you know what?', 'You win.', 'Just go.', 'It\'s been fun. Don\'t come back.', '......'];

var counter = 0;

var options = {
  // Initial position
  offset: 5,
  // Timeout between each random character
  timeout: 10,
  // Number of random characters to show
  iterations: 20,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]')

  // Callback function when resolve completes
};function callback() {
  setTimeout(function () {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    var nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);
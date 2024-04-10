import anime from 'animejs';

function titulo() {
 


  anime({
    targets: '.gato',
    keyframes: [
      {translateX: -100},
      {translateX:  100},
      {translateX:  -100},
      {translateX:   100},
    ],
    scaleY: [
      { value: [1.75, 1], duration: 500 },
      { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
      { value: 1, duration: 450 },
      { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
      { value: 1, duration: 450 }
    ],
    
    duration: 4500,
    easing: 'easeOutElastic(1, .8)',
    loop: true,
  });
}

export default titulo;
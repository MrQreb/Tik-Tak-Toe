import anime from 'animejs';
  // Animaciones componetes
function animations() {
  anime({
    targets: '.titulo',
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


  //Animacion tablero al perder/empatar
  anime({
    targets: '.animationWinner',
    scale: [
      {value: .5, easing: 'easeOutSine', duration: 500},
      {value: 1.1, easing: 'easeInOutQuad', duration: 1200}
    ],
    loop: true
    
    
  });
}
export default animations;
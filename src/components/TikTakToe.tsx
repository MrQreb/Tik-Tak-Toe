
import { useState, useEffect } from 'react';
import animations  from '../animations/animations';
import X from '../assets/tiktaktoe/X.svg';
import Circle from '../assets/tiktaktoe/Circle.svg';

const TikTakToe = () => {

  // Guarda quien gana
  const [winner, setWinner] = useState<string>(''); 
  
  // Guarda si el juego termino
  const [gameFinished, setGameFinished] = useState<boolean>(false); 

  // Carga las animaciones
  useEffect(() => {
    animations();
  }, []);

  // Inicializa el tablero
  const [board, setBoard] = useState(Array(9).fill(null));
  
  // Inicializa el turno
  //turn es un booleano que indica si es el turno de X o de O
  const [turns, setTurns] = useState(true);

  //Para saber si hay empate 
  const [ counter, setCounter] = useState(0);

  //Posiciones de X
  const [positionX, setPositionX] = useState<number[]>([]);

  //Posiciones de Y
  const [positionY, setPositionY] = useState<number[]>([]);

  //Creo type para saber que tipo de dato es lineWinner
  type LineWinnerType = number | string;

  //Guarda la linea de ganadores para pintarla
  const [lineWinner, setLineWinner] = useState<LineWinnerType>('');

  // se activa cada vez que haya un cambio en turns,
  // checkWinner() se ejecute después de que turns se haya actualizado correctamente.
  useEffect(() => {
    checkWinner();
  }, [turns]);

  //Para empatar
  useEffect(() => {
    checkWinner();
  }, [counter]);
  
  // Función para pintar x o o en el tablero
  const paint = (index: number) => {
    
    // Verificar si la celda ya está ocupada
    if (!board[index]) {
     
      // Crear una copia del tablero actual
      const newBoard = [...board];
     
      // Dibujar el SVG correspondiente al turno actual
      const symbol = turns ? <img src={X} alt="X" className='xl:w-10 xl:h-10 md:w-7 md:h-7 xs:w-5 xs:h-5'  /> : <img src={Circle}  className='xl:w-10 xl:h-10 md:w-7 md:h-7 xs:w-4 xs:h-4' alt="O" />;
      newBoard[index] = symbol;
      
      // Actualizar el tablero
      setBoard(newBoard);
      
      //Guardar la posicion de X y O
      savePostions(index);
    
      //Aumentar el contador
      setCounter(counter + 1);
      
      // Cambiar el turno
      setTurns(!turns);
                           
    }
  };

  const savePostions = (index: number) => {

    //Guardar posicion de X y O
    if (turns) {
      setPositionX([...positionX , index]);
    } else {
      setPositionY([...positionY, index]);
    }
  

  }

  //Reiniciar juego
  const newGame = ():void => {

    setBoard(Array(9).fill(null));
    setTurns(true);
    setCounter(0);
    setPositionY([]);
    setPositionX([]);
    setGameFinished(false);
    setWinner('');
    setLineWinner('');
  }

  //Objeto de posiciones ganadoras
  const possitionsWinner = [
    // Horizontales
    [ 0, 1 , 2 ],
    [ 3, 4 , 5 ],
    [ 6, 7 , 8 ],
    // Verticales
    [ 0, 3 , 6 ],
    [ 1, 4 , 7 ],
    [ 2, 5 , 8 ],
    //Diagonales
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
  ]

  const checkWinner = () => {
    // Recorrer arreglo de ganadores
    possitionsWinner.forEach((win ,index) => {
      
       // Empatan
       if (counter === 9) {
        setWinner('Empate');
        setGameFinished(true);
        return;
      }

       // Gana x en la ultima jugada
       if (counter === 9 && !turns) {
        setLineWinner(index);
        setWinner('Gana X');
        setGameFinished(true);
        return;
      }
     
      // Checar si hay un ganador
      if (win.every((index) => positionX.includes(index))) {
        //Le paso el index de la linea ganadora
        setLineWinner(index);
        
        // Guardar el ganador
        setWinner('Gana X');

        //permite reinicar el juego
        setGameFinished(true);
        return;
      } 

      if (win.every((index) => positionY.includes(index))) {
      
        //Le paso el index de la linea ganadora
        setLineWinner(index);
        
        // Guardar el ganador
        setWinner('Gana O');
        
        //permite reinicar el juego
        setGameFinished(true);
        return;
      }      
    });
  };

  return (
    <>
      
      {/* Mostrar ganador */}
      <p className={`text-6xl xs:text-3xl xs:mb-0 text-center font-pixel mt-11 animationWinner sm:text-4xl ${ gameFinished ? 'visible ' : 'visible'} `}>{winner}</p>

      <main className='flex justify-center xl:mt-8 xs:mt-28 md:mt-20'>
        {/* Tablero */}
        <div className={`grid grid-cols-3 gap-[2px`}>
          
          {board.map((turn, index) => (
            <button
              key={index}

              // Una vez gana no deja dar click
              disabled={  gameFinished }
              // Cada que se da click se checa si gana
              onClick={() => {
                paint(index);

              }}
            >
              {/* Cada celda del tablero */}
              <div className={`   flex items-center justify-center font-pixel text-red-600 border-solid border-4 border-black hover:scale-125 hover:border-blue-400 hover:transition-all duration-200
                                  xs:w-28 xs:h-28 xs:text-2xl xl:h-40 xl:w-40 xl:text-5xl  md:w-32 md:h-32  md:text-3xl 
                                  ${winner ? 'border-gray-300 bg-gray-200 hover:border-black' : 'border-black'}
                                  ${ index % 2 === 0 ? 'bg-blue-100 hover:boder-black' : 'bg-orange-200' } `}>
                {turn}
              </div>
            </button>
          ))}

        </div>

        {/* Se dibujan en base a la posicion de possitionsWinner estan ocultas se muestran con useState  */}
        {/* lineas ocultas hasta que sabe que linea gano */}
        {/* Verticales */}
        <div className={` bg-red-700 absolute opacity-60
                         xl:ml-[-320px] xl:mt-4 xl:w-1 xl:h-1/2 
                         md:ml-[-260px] md:mt-8 md:w-1 md:h-1/3 
                         xs:ml-[-221px] xs:mt-8 xs:w-1 xs:h-1/3 
                         ${ lineWinner === 3 ? 'visible'  : 'hidden' } `}>
        </div>

        <div className={` bg-red-700 absolute opacity-60 
                          xl:w-1 xl:h-1/2 xl:ml-[2px] xl:mt-8
                          md:w-1 md:h-1/3 md:ml-[2px] md:mt-8
                          xs:w-1 xs:h-1/3 xs:ml-[2px] xs:mt-8
                          ${ lineWinner === 4 ? 'visible'  : 'hidden' }   `}>
        </div>

        <div className={` bg-red-700 absolute opacity-60 
                          xl:ml-[330px] xl:mt-8 xl:w-1 xl:h-1/2
                          md:ml-[260px] md:mt-8 md:w-1 md:h-1/3
                          xs:ml-[225px] xs:mt-8 xs:w-1 xs:h-1/3
                          ${ lineWinner === 5 ? 'visible'  : 'hidden' } `}></div>
        {/* Horizontales */}
        <div className={` bg-red-700 absolute opacity-60
                           xl:w-[470px] xl:h-1 xl:mt-20
                           md:w-[370px] md:h-1 md:mt-16
                           xs:w-[320px] xs:h-1 xs:mt-14
                           ${ lineWinner === 0 ? 'visible'  : 'hidden' } ` }></div>
        <div className={`bg-red-700 absolute opacity-60
                          xl:w-[470px] xl:h-1 xl:mt-[245px]
                          md:w-[370px] md:h-1 md:mt-[190px]
                          xs:w-[320px] xs:h-1 xs:mt-[168px]
                          ${ lineWinner === 1 ? 'visible'  : 'hidden' } ` }></div>
        <div className={`bg-red-700 absolute opacity-60
                          xl:w-[470px] xl:h-1 xl:mt-[408px]
                          md:w-[370px] md:h-1 md:mt-[320px]
                          xs:w-[320px] xs:h-1 xs:mt-[280px]
                         ${ lineWinner === 2 ? 'visible'  : 'hidden' } ` }>

        </div>
        {/* Diagonales */}
        <div className={`bg-red-700 absolute opacity-60 rotate-45 
                          xl:w-[530px] xl:h-1 xl:mt-[275px] xl:ml-[60px]
                          md:w-[420px] md:h-1 md:mt-[220px] md:ml-[65px]
                          xs:w-[360px] xs:h-1 xs:mt-[170px] 
                          ${ lineWinner === 6 ? 'visible'  : 'hidden' } ` }>
        </div>
        <div className={`bg-red-700 absolute rotate-[130deg]
                          xl:w-[570px] xl:h-1 xl:mt-[245px]
                          md:w-[450px] md:h-1 md:mt-[190px]
                          xs:w-[370px] xs:h-1 xs:mt-[170px]
                          ${ lineWinner === 7 ? 'visible animate-pulse'  : 'hidden' } `}>

        </div>

      </main>

      {/* Turno */}
      <div className='mt-5 flex justify-center gap-1'>
        {/* Mostrar quien sigue */}
        <div className={`bg-blue-100  xl:h-24 xl:w-24 xs:w-16 xs:h-16 md:w-20 md:h-20 xl:text-4xl xs:text-xl md:text-2xl flex items-center justify-center font-pixel text-red-600 border-solid border-4    ${!turns  ? 'border-black ' : 'border-blue-400 animate-pulse'} `}>
          <img 
            src={X} 
           alt="X svg"
           className='w-10 h-10 xs:w-4 xs:h-4 md:w-7 md:h-7'
          />
        </div>

        <div className={`bg-orange-100 xl:h-24 xl:w-24 xs:w-16 xs:h-16 md:w-20 md:h-20 xl:text-4xl xs:text-xl md:text-2xl flex items-center justify-center font-pixel text-red-600 border-solid border-4  ${turns ? 'border-black' :  'border-blue-400  animate-pulse'} `}>
        <img 
            src={Circle} 
           alt="Circle svg"
           className='w-10 h-10 xs:w-4 xs:h-4 md:w-7 md:h-7'
          />
        </div>
      </div>

      <button
      
        onClick={ () =>  newGame()}
        className={`xl:w-1/5 xl:h-20 xl:text-2xl xs:w-44 xs:h-16 xs:text-lg md:w-52 md:h-20 md:text-xl p-4  text-white font-pixel mt-6 text-3xl m-auto block border-[3px] border-black uppercase shadow-2xl shadow-green-400  bg-green-500 boder-4 hover:animate-bounce rounded-md`}
      >
        jugar de nuevo
      </button>
      
    </>
  );
};

export default TikTakToe;

import { useState, useEffect } from 'react';
import animations  from '../animations/animations';


const Titulo = () => {

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

  const [lineWinner, setLineWinner] = useState<LineWinnerType>('');

  // //Para determinar animacion
  // //true para x, false para O
  // const [animationTurn, setAnimationTurn] = useState<boolean>(true);

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
      
      // Asignar el símbolo correspondiente (X o O) al índice clicado
      newBoard[index] = turns ? 'X' : 'O';
      

     
      // Actualizar el tablero
      setBoard(newBoard);
      

      
      //Guardar la posicion de X y O
      savePostions(index);
    
      
       
      setCounter(counter + 1);
      
      // Cambiar el turno
      setTurns(!turns);
      
      //Cambia la animacion
      setAnimationTurn(!animationTurn);
      
      
     
      
    
      
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
      
       // Gana x en la ultima jugada
       if (counter === 9 && !turns) {
        setWinner('Gana X');
        setGameFinished(true);
        setLineWinner(index);
        return;
      }


      // Empatan
      if (counter === 9) {
        setWinner('Empate');
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
      
      {/* <h1 className="text-6xl text-center mt-4 font-serif uppercase titulo text-gray-600 font-extrabold">Gato</h1> */}
      {/* <img className='m-auto  nyancat w-24 ' src={'./public/nyancat.svg'} alt="nyancat" /> */}

      {/* Mostrar ganador */}
      <p className={`text-6xl text-center font-pixel mt-16 mb-5 animationWinner ${ gameFinished ? 'visible ' : 'hidden'} `}>{winner}</p>

 
      <main className='flex justify-center mt-16'>
        
        {/* Tablero */}
        <div className={`grid grid-cols-3 gap-1`}>
          
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
           
              {/* Cada celda */}
              <div className={`bg-gray-300 h-40 w-40 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4 border-black hover:scale-125 hover:border-blue-400  ${winner ? 'border-gray-300 bg-gray-200 hover:border-black' : 'border-black'} `}>
                {turn}
              </div>
            </button>
          ))}
            
            

        </div>



       
        {/* Se dibujan en base a la posicion de possitionsWinner estan ocultas se muestran con useState  */}
        {/* lineas ocultas hasta que sabe que linea gano */}
  
        {/* Verticales */}
        <div className={`w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[-330px] mt-8 opacity-60 ${ lineWinner === 3 ? 'visible'  : 'hidden' } `}></div>
        <div className={`w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[2px] mt-8 opacity-60    ${ lineWinner === 4 ? 'visible'  : 'hidden' }   `}></div>
        <div className={`w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[330px] mt-8 opacity-60  ${ lineWinner === 5 ? 'visible'  : 'hidden' } `}></div>
        
        {/* Horizontales */}
        <div className={`w-[485px] h-1 bg-blue-400 font-pixel absolute mt-20 opacity-60       ${ lineWinner === 0 ? 'visible'  : 'hidden' } ` }></div>
        <div className={`w-[485px] h-1 bg-blue-400 font-pixel absolute mt-[245px] opacity-60  ${ lineWinner === 1 ? 'visible'  : 'hidden' } ` }></div>
        <div className={`w-[485px] h-1 bg-blue-400 font-pixel absolute mt-[408px] opacity-60  ${ lineWinner === 2 ? 'visible'  : 'hidden' } ` }></div>

        {/* Diagonales */}
        <div className={`w-[570px] h-1 bg-blue-400 font-pixel absolute mt-[275px] opacity-60 rotate-45 ml-[65px] ${ lineWinner === 6 ? 'visible'  : 'hidden' } ` }></div>
        <div className={`w-[570px] h-1 bg-blue-400 font-pixel absolute mt-[245px] opacity-60 rotate-[130deg]     ${ lineWinner === 7 ? 'visible'  : 'hidden' } `}></div>

      </main>

      {/* Turno */}
      <div className='mt-5 flex justify-center gap-2'>
        
        {/* Mostrar quien sigue */}
        <div className={`bg-gray-300 h-24 w-24 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4    ${!turns  ? 'border-black ' : 'border-blue-400'} `}>X</div>
        <div className={`bg-gray-300 h-24 w-24 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4  ${turns ? 'border-black' : 'border-blue-400'} `}>O</div>
      </div>

      <button
      
        onClick={ () =>  newGame()}
        className={`w-25 h-20 p-4  text-white font-pixel mt-6 text-3xl m-auto block border-[3px] border-black uppercase shadow-2xl shadow-green-400  bg-green-500 boder-4 hover:scale-110 rounded-md`}
      >
        jugar de nuevo
      </button>
      
    </>
  );
};

export default Titulo;

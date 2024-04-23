import React, { useState, useEffect } from 'react';
import animations from '../animations/animations';

const Titulo = () => {
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
  const [positionX, setPositionX] = useState([]);

  //Posiciones de Y
  const [positionY, setPositionY] = useState([]);

  // se activa cada vez que haya un cambio en turns,
  // checkWinner() se ejecute después de que turns se haya actualizado correctamente.
  useEffect(() => {
    checkWinner();
  }, [turns]);


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
    
      
      
      
      // Cambiar el turno
      setTurns(!turns);
      
      
      
      setCounter(counter + 1);
      
    
      
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
    possitionsWinner.forEach((win) => {
      // Checar si hay un ganador
      if (win.every((index) => positionX.includes(index))) {
        console.log('Gana X')
        
      } else if (win.every((index) => positionY.includes(index))) {
      
        console.log('Gana X')
      }
    });
  };

  

  return (
    <>
      <h1 className="text-8xl text-center mt-10 font-serif uppercase titulo text-gray-600 font-extrabold">Gato</h1>
      <img className='m-auto mt-10 nyancat w-28 ' src={'./public/nyancat.svg'} alt="nyancat" />

      <main className='flex justify-center mt-5'>
        <div className='grid grid-cols-3 gap-1 '>
          
          {board.map((turn, index) => (
            <button
              key={index}
              // Cada que se da click se checa si gana
              onClick={() => {
                paint(index);
                
             
              }}
            >
              <div className='bg-gray-300 h-40 w-40 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4 border-black hover:scale-125 hover:border-blue-400 '>
                {turn}
              </div>
            </button>
          ))}
            
            

        </div>


       
        {/* lineas */}
  
        {/* Verticales */}
        {/* <div className='w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[2px] mt-8 opacity-60'></div> */}
        {/* <div className='w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[330px] mt-8 opacity-60'></div> */}
        {/* <div className='w-1 h-1/2 bg-blue-400 font-pixel absolute ml-[-330px] mt-8 opacity-60'></div> */}
        
        {/* Horizontales */}
        {/* <div className='w-[485px] h-1 bg-blue-400 font-pixel absolute mt-20 opacity-60'></div> */}
        {/* <div className='w-[485px] h-1 bg-blue-400 font-pixel absolute mt-[245px] opacity-60'></div> */}
        {/* <div className='w-[485px] h-1 bg-blue-400 font-pixel absolute mt-[408px] opacity-60'></div> */}

        {/* Diagonales */}
        {/* <div className='w-[570px] h-1 bg-blue-400 font-pixel absolute mt-[275px] opacity-60 rotate-45 ml-[65px]'></div> */}
        {/* <div className='w-[570px] h-1 bg-blue-400 font-pixel absolute mt-[245px] opacity-60 rotate-[130deg]'></div> */}

      </main>

      {/* Turno */}
      <div className='mt-5 flex justify-center gap-2'>
        {/* Usar state para cambiar hover */}
        <div className={`bg-gray-300 h-24 w-24 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4  ${!turns  ? 'border-black' : 'border-blue-400'} `}>X</div>
        <div className={`bg-gray-300 h-24 w-24 flex items-center justify-center text-4xl font-pixel text-gray-600 border-solid border-4  ${turns ? 'border-black' : 'border-blue-400'} `}>O</div>
      </div>

      <button
        disabled={counter <= 8 ? true : false}
        onClick={ () =>  newGame()}
        className={`w-25 h-20 p-6 bg-gray-300 text-white font-pixel mt-5 text-3xl m-auto block border-2 border-black uppercase shadow-2xl shadow-green-400  ${counter <= 8 ? 'bg-gray-300' : 'bg-green-500 boder-4 hover:scale-110 '}`}
      >
        jugar de nuevo
      </button>
      
    </>
  );
};

export default Titulo;

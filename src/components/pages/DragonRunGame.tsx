import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const INITIAL_SPEED = 250;
const SPEED_INCREMENT = 5;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [cellSize, setCellSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Calculate responsive grid and cell size
  const calculateGridSize = useCallback(() => {
    if (!gameContainerRef.current) return;

    const availableWidth = window.innerWidth - 32;
    const availableHeight = window.innerHeight - 180;
    
    const maxGridSize = isMobile ? 25 : 30;
    const minCellSize = isMobile ? 12 : 15;
    
    const calculatedCellSize = Math.max(
      minCellSize,
      Math.floor(Math.min(availableWidth, availableHeight) / maxGridSize)
    );
    
    const calculatedGridSize = Math.min(
      maxGridSize,
      Math.floor(Math.min(availableWidth, availableHeight) / calculatedCellSize)
    );

    setCellSize(calculatedCellSize);
    setGridSize(calculatedGridSize);
  }, [isMobile]);

  // Enhanced fullscreen toggle for both mobile and desktop
  const enterFullscreen = async () => {
    if (!gameContainerRef.current) return;

    try {
      const elem = gameContainerRef.current;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        await (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      
      // Lock orientation to landscape on mobile if supported
      if (isMobile && 'orientation' in screen && 'lock' in (screen as any).orientation) {
        try {
          await (screen as any).orientation.lock('landscape').catch(() => {});
        } catch (err) {}
      }
      
      setIsFullscreen(true);
    } catch (error) {
      console.error('Fullscreen error:', error);
      // If fullscreen fails, still mark as fullscreen for layout purposes
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
      
      if (isMobile && 'orientation' in screen && 'unlock' in (screen as any).orientation) {
        try {
          (screen as any).orientation.unlock();
        } catch (err) {}
      }
      
      setIsFullscreen(false);
    } catch (error) {
      console.error('Exit fullscreen error:', error);
    }
  };

  // Auto-enter fullscreen on first interaction
  const handleFirstInteraction = useCallback(async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      await enterFullscreen();
    }
  }, [hasInteracted]);

  // Handle resize and fullscreen changes
  useEffect(() => {
    calculateGridSize();
    
    const handleResize = () => {
      calculateGridSize();
    };

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
      setTimeout(calculateGridSize, 100);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [calculateGridSize]);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [gridSize]);

  const resetGame = useCallback(async () => {
    const initialSnake = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
    await handleFirstInteraction();
  }, [generateFood, gridSize, handleFirstInteraction]);

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      return true;
    }
    return body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, [gridSize]);

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver || isPaused) return;

    setDirection(nextDirection);

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (nextDirection) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        setHighScore(prev => Math.max(prev, score));
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(80, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, gameStarted, gameOver, isPaused, food, checkCollision, generateFood, score]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && isFullscreen) {
        exitFullscreen();
        return;
      }

      if (!gameStarted && !gameOver) {
        if (e.code === 'Space' || e.code.startsWith('Arrow')) {
          e.preventDefault();
          resetGame();
          return;
        }
      }

      if (gameOver && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        resetGame();
        return;
      }

      if (e.code === 'Space' && gameStarted && !gameOver) {
        e.preventDefault();
        setIsPaused(prev => !prev);
        return;
      }

      const directionMap: Record<string, Direction> = {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT',
        'KeyW': 'UP',
        'KeyS': 'DOWN',
        'KeyA': 'LEFT',
        'KeyD': 'RIGHT'
      };

      const newDirection = directionMap[e.code];
      if (newDirection) {
        e.preventDefault();
        setNextDirection(prev => {
          if (
            (prev === 'UP' && newDirection === 'DOWN') ||
            (prev === 'DOWN' && newDirection === 'UP') ||
            (prev === 'LEFT' && newDirection === 'RIGHT') ||
            (prev === 'RIGHT' && newDirection === 'LEFT')
          ) {
            return prev;
          }
          return newDirection;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, resetGame, isFullscreen]);

  // Touch controls for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!gameStarted && !gameOver) {
      resetGame();
      return;
    }

    if (gameOver) {
      resetGame();
      return;
    }

    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [gameStarted, gameOver, resetGame]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      setNextDirection(prev => {
        const newDir = deltaX > 0 ? 'RIGHT' : 'LEFT';
        if ((prev === 'LEFT' && newDir === 'RIGHT') || (prev === 'RIGHT' && newDir === 'LEFT')) {
          return prev;
        }
        return newDir;
      });
    } else if (Math.abs(deltaY) > minSwipeDistance) {
      setNextDirection(prev => {
        const newDir = deltaY > 0 ? 'DOWN' : 'UP';
        if ((prev === 'UP' && newDir === 'DOWN') || (prev === 'DOWN' && newDir === 'UP')) {
          return prev;
        }
        return newDir;
      });
    }

    touchStartRef.current = null;
  }, []);

  // Game loop
  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [moveSnake, speed, gameStarted, gameOver, isPaused]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;

    ctx.fillStyle = '#9bbc0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (cellSize > 15) {
      ctx.strokeStyle = '#8bac0f';
      ctx.lineWidth = 1;
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, gridSize * cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(gridSize * cellSize, i * cellSize);
        ctx.stroke();
      }
    }

    const foodPadding = Math.max(2, cellSize * 0.1);
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(
      food.x * cellSize + foodPadding,
      food.y * cellSize + foodPadding,
      cellSize - foodPadding * 2,
      cellSize - foodPadding * 2
    );

    const snakePadding = Math.max(1, cellSize * 0.05);
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
      ctx.fillRect(
        segment.x * cellSize + snakePadding,
        segment.y * cellSize + snakePadding,
        cellSize - snakePadding * 2,
        cellSize - snakePadding * 2
      );

      if (index === 0 && cellSize > 12) {
        ctx.fillStyle = '#9bbc0f';
        const eyeSize = Math.max(2, cellSize * 0.15);
        const eyeOffset = cellSize * 0.3;
        
        if (direction === 'RIGHT') {
          ctx.fillRect(
            segment.x * cellSize + cellSize - eyeOffset - eyeSize,
            segment.y * cellSize + eyeOffset,
            eyeSize, eyeSize
          );
          ctx.fillRect(
            segment.x * cellSize + cellSize - eyeOffset - eyeSize,
            segment.y * cellSize + cellSize - eyeOffset - eyeSize,
            eyeSize, eyeSize
          );
        } else if (direction === 'LEFT') {
          ctx.fillRect(
            segment.x * cellSize + eyeOffset,
            segment.y * cellSize + eyeOffset,
            eyeSize, eyeSize
          );
          ctx.fillRect(
            segment.x * cellSize + eyeOffset,
            segment.y * cellSize + cellSize - eyeOffset - eyeSize,
            eyeSize, eyeSize
          );
        } else if (direction === 'UP') {
          ctx.fillRect(
            segment.x * cellSize + eyeOffset,
            segment.y * cellSize + eyeOffset,
            eyeSize, eyeSize
          );
          ctx.fillRect(
            segment.x * cellSize + cellSize - eyeOffset - eyeSize,
            segment.y * cellSize + eyeOffset,
            eyeSize, eyeSize
          );
        } else {
          ctx.fillRect(
            segment.x * cellSize + eyeOffset,
            segment.y * cellSize + cellSize - eyeOffset - eyeSize,
            eyeSize, eyeSize
          );
          ctx.fillRect(
            segment.x * cellSize + cellSize - eyeOffset - eyeSize,
            segment.y * cellSize + cellSize - eyeOffset - eyeSize,
            eyeSize, eyeSize
          );
        }
      }
    });
  }, [snake, food, direction, gridSize, cellSize]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0f380f] flex items-center justify-center">
        <style>{`
          @keyframes slither {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(10px) translateY(-5px); }
            50% { transform: translateX(0) translateY(5px); }
            75% { transform: translateX(-10px) translateY(-5px); }
          }
          .snake-segment {
            animation: slither 2s ease-in-out infinite;
          }
          .snake-segment:nth-child(2) { animation-delay: 0.1s; }
          .snake-segment:nth-child(3) { animation-delay: 0.2s; }
          .snake-segment:nth-child(4) { animation-delay: 0.3s; }
          .snake-segment:nth-child(5) { animation-delay: 0.4s; }
        `}</style>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#9bbc0f] mb-8 font-mono">SNAKE</h1>
          
          {/* Snake Loader */}
          <div className="flex items-center justify-center mb-8 gap-2">
            <div className="snake-segment w-6 h-6 bg-[#0f380f] border-4 border-[#9bbc0f] rounded"></div>
            <div className="snake-segment w-6 h-6 bg-[#306230] border-4 border-[#9bbc0f] rounded"></div>
            <div className="snake-segment w-6 h-6 bg-[#306230] border-4 border-[#9bbc0f] rounded"></div>
            <div className="snake-segment w-6 h-6 bg-[#306230] border-4 border-[#9bbc0f] rounded"></div>
            <div className="snake-segment w-6 h-6 bg-[#306230] border-4 border-[#9bbc0f] rounded"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-4 bg-[#9bbc0f]/30 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-[#9bbc0f] transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <p className="text-[#9bbc0f] text-xl font-mono">{Math.floor(loadingProgress)}%</p>
          <p className="text-[#9bbc0f]/70 text-sm font-mono mt-4">Loading Game...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={gameContainerRef}
      className="fixed inset-0 bg-[#0f380f] flex items-center justify-center w-full z-50"
      style={{ touchAction: 'none' }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-[#9bbc0f] w-full h-full flex flex-col items-center justify-center p-4">
          {/* Header */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between mb-4 gap-2 sm:gap-4 w-full max-w-4xl`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-5xl'} font-bold text-[#0f380f] font-mono`}>
              SNAKE
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-[#0f380f] text-[#9bbc0f] px-3 sm:px-4 py-2 rounded-lg shadow-inner">
                <div className="text-xs opacity-80">Score</div>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{score}</div>
              </div>
              <div className="bg-[#0f380f] text-[#9bbc0f] px-3 sm:px-4 py-2 rounded-lg shadow-inner">
                <div className="text-xs opacity-80">High</div>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{highScore}</div>
              </div>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative mb-4 flex justify-center items-center flex-1">
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-2xl touch-none max-w-full max-h-full"
              style={{ touchAction: 'none' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />

            {/* Overlays */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-[#9bbc0f]/90 rounded-lg flex items-center justify-center">
                <div className="bg-[#0f380f] text-[#9bbc0f] rounded-lg p-4 sm:p-6 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-xl sm:text-3xl font-bold mb-4 font-mono">
                    Ready to Play?
                  </h2>
                  {isMobile ? (
                    <p className="mb-4 text-sm">
                      Swipe to move the snake.
                      <br />
                      Tap to start.
                    </p>
                  ) : (
                    <div className="mb-4 text-sm space-y-1">
                      <p><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">ARROWS</kbd> or <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">WASD</kbd> to move</p>
                      <p><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">SPACE</kbd> to pause</p>
                      <p><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">ESC</kbd> to exit fullscreen</p>
                    </div>
                  )}
                  <button
                    onClick={resetGame}
                    className="bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono text-sm sm:text-base mx-auto"
                  >
                    <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 bg-[#0f380f]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="bg-[#9bbc0f] text-[#0f380f] rounded-lg p-4 sm:p-6 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2 font-mono">Game Over!</h2>
                  <p className="mb-4 text-sm">
                    Final Score: <span className="text-xl sm:text-3xl font-bold">{score}</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <p className="text-sm font-bold mb-4">🎉 NEW HIGH SCORE!</p>
                  )}
                  <button
                    onClick={resetGame}
                    className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono text-sm sm:text-base mx-auto"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-[#0f380f]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="bg-[#9bbc0f] text-[#0f380f] rounded-lg p-4 sm:p-6 text-center shadow-2xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 font-mono">Paused</h3>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono text-sm sm:text-base mx-auto"
                  >
                    <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                    Resume
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-2 sm:gap-4 w-full max-w-4xl`}>
            <div className="text-center text-xs sm:text-sm text-[#0f380f] font-mono">
              {isMobile ? (
                <p>Swipe to move. Don't hit the walls!</p>
              ) : (
                <div className="space-y-1">
                  <p><kbd className="px-1 sm:px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded text-xs">ARROWS</kbd> or <kbd className="px-1 sm:px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded text-xs">WASD</kbd> to move</p>
                  <p><kbd className="px-1 sm:px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded text-xs">SPACE</kbd> pause • <kbd className="px-1 sm:px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded text-xs">ESC</kbd> exit</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                disabled={!gameStarted || gameOver}
                className="border-2 border-[#0f380f] bg-[#9bbc0f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-mono p-2 rounded-lg shadow-lg transition-all disabled:opacity-50"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                onClick={resetGame}
                className="border-2 border-[#0f380f] bg-[#9bbc0f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-mono p-2 rounded-lg shadow-lg transition-all"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Suggested filename: SnakeGame.tsx

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Play, Pause, Trophy, Gamepad2, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/button'; // Assuming shadcn/ui

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
  
  const gameLoopRef = useRef<number | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Calculate responsive grid and cell size
  const calculateGridSize = useCallback(() => {
    if (!gameContainerRef.current) return;

    const container = gameContainerRef.current;
    const availableWidth = container.clientWidth - 32; // Account for padding
    const availableHeight = container.clientHeight - 200; // Account for header and controls
    
    const maxGridSize = isMobile ? 25 : 30;
    const minCellSize = isMobile ? 15 : 18;
    
    // Calculate optimal grid size based on available space
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

  // Handle resize and fullscreen changes
  useEffect(() => {
    calculateGridSize();
    
    const handleResize = () => {
      calculateGridSize();
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // Recalculate after a brief delay to ensure DOM has updated
      setTimeout(calculateGridSize, 100);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const resetGame = useCallback(() => {
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
  }, [generateFood, gridSize]);

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      return true;
    }
    // Self collision
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

      // Check if food is eaten
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

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    if (!gameContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await gameContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Fullscreen toggle (F key)
      if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
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

      if (e.code === 'Escape' && isFullscreen) {
        toggleFullscreen();
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
          // Prevent 180-degree turns
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

  // Touch controls for mobile with swipe detection
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

    const minSwipeDistance = 30; // Minimum distance for a swipe

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      // Horizontal swipe
      setNextDirection(prev => {
        const newDir = deltaX > 0 ? 'RIGHT' : 'LEFT';
        if ((prev === 'LEFT' && newDir === 'RIGHT') || (prev === 'RIGHT' && newDir === 'LEFT')) {
          return prev;
        }
        return newDir;
      });
    } else if (Math.abs(deltaY) > minSwipeDistance) {
      // Vertical swipe
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

    // Set canvas size based on calculated dimensions
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;

    // Clear canvas with retro green background
    ctx.fillStyle = '#9bbc0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (only for larger cells)
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

    // Draw food
    const foodPadding = Math.max(2, cellSize * 0.1);
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(
      food.x * cellSize + foodPadding,
      food.y * cellSize + foodPadding,
      cellSize - foodPadding * 2,
      cellSize - foodPadding * 2
    );

    // Draw snake
    const snakePadding = Math.max(1, cellSize * 0.05);
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
      ctx.fillRect(
        segment.x * cellSize + snakePadding,
        segment.y * cellSize + snakePadding,
        cellSize - snakePadding * 2,
        cellSize - snakePadding * 2
      );

      // Draw eyes on head (only for larger cells)
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
        } else { // DOWN
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

  return (
    <div 
      ref={gameContainerRef}
      className="min-h-screen bg-[#0f380f] flex items-center justify-center p-4 w-full"
    >
      <div className={`w-full max-w-6xl ${isFullscreen ? 'h-screen flex items-center justify-center' : ''}`}>
        <div className={`bg-[#9bbc0f] rounded-3xl shadow-2xl p-4 sm:p-8 border-8 border-[#0f380f] ${
          isFullscreen ? 'w-full h-full max-h-screen rounded-none border-none' : ''
        }`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <h1 className="text-3xl sm:text-5xl font-bold text-[#0f380f] font-mono">
              SNAKE
            </h1>
            <div className="flex items-center gap-4">
              <div className="bg-[#0f380f] text-[#9bbc0f] px-4 py-2 rounded-lg shadow-inner">
                <div className="text-xs opacity-80">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="bg-[#0f380f] text-[#9bbc0f] px-4 py-2 rounded-lg shadow-inner">
                <div className="text-xs opacity-80">High Score</div>
                <div className="text-2xl font-bold">{highScore}</div>
              </div>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative mb-4 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-2xl touch-none max-w-full max-h-full"
              style={{ 
                touchAction: 'none',
                maxHeight: isFullscreen ? 'calc(100vh - 200px)' : 'none'
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />

            {/* Overlays */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-[#9bbc0f]/90 rounded-lg flex items-center justify-center">
                <div className="bg-[#0f380f] text-[#9bbc0f] rounded-lg p-6 sm:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-mono">
                    Ready to Play?
                  </h2>
                  {isMobile ? (
                    <p className="mb-4 text-sm sm:text-base">
                      Swipe to move the snake.
                      <br />
                      Tap to start.
                    </p>
                  ) : (
                    <div className="mb-4 text-sm sm:text-base space-y-2">
                      <p>Use <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">ARROWS</kbd> or <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">WASD</kbd> to move</p>
                      <p>Press <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">F</kbd> for fullscreen</p>
                      <p>Press <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">SPACE</kbd> to pause</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      onClick={resetGame}
                      variant="default"
                      className="bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                    >
                      <Play className="h-5 w-5" />
                      Start Game
                    </Button>
                    {!isMobile && (
                      <Button
                        onClick={toggleFullscreen}
                        variant="outline"
                        className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-bold py-3 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                      >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 bg-[#0f380f]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="bg-[#9bbc0f] text-[#0f380f] rounded-lg p-6 sm:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 font-mono">Game Over!</h2>
                  <p className="mb-4 text-sm sm:text-base">
                    Final Score: <span className="text-2xl sm:text-3xl font-bold">{score}</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <p className="text-sm font-bold mb-4">🎉 NEW HIGH SCORE!</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      onClick={resetGame}
                      variant="default"
                      className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                    >
                      <RotateCcw className="h-5 w-5" />
                      Play Again
                    </Button>
                    {!isMobile && (
                      <Button
                        onClick={toggleFullscreen}
                        variant="outline"
                        className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-bold py-3 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                      >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-[#0f380f]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="bg-[#9bbc0f] text-[#0f380f] rounded-lg p-6 sm:p-8 text-center shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4 font-mono">Paused</h3>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      onClick={() => setIsPaused(false)}
                      variant="default"
                      className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                    >
                      <Play className="h-5 w-5" />
                      Resume
                    </Button>
                    {!isMobile && (
                      <Button
                        onClick={toggleFullscreen}
                        variant="outline"
                        className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-bold py-3 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
                      >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center text-sm text-[#0f380f] font-mono">
              {isMobile ? (
                <p>Swipe to move. Don't hit the walls!</p>
              ) : (
                <div className="space-y-1">
                  <p>Use <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">ARROWS</kbd> or <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">WASD</kbd> to move</p>
                  <p>Press <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">F</kbd> for fullscreen • <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">SPACE</kbd> to pause</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!isMobile && (
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-mono"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              )}
              <Button
                onClick={() => setIsPaused(!isPaused)}
                disabled={!gameStarted || gameOver}
                variant="outline"
                size="sm"
                className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-mono"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                size="sm"
                className="border-[#0f380f] text-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f] font-mono"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
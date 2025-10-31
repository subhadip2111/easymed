// Suggested filename: SnakeGame.tsx

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Play, Pause, Trophy, Gamepad2 } from 'lucide-react';
import { Button } from '../ui/button'; // Assuming shadcn/ui

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20; // This makes the canvas 400x400 (20 * 20)
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
  }, [generateFood]);

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

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
        setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, gameStarted, gameOver, isPaused, food, checkCollision, generateFood, score]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
  }, [gameStarted, gameOver, resetGame]);

  // Touch controls for mobile
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = touchX - centerX;
    const deltaY = touchY - centerY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setNextDirection(prev => {
        const newDir = deltaX > 0 ? 'RIGHT' : 'LEFT';
        if ((prev === 'LEFT' && newDir === 'RIGHT') || (prev === 'RIGHT' && newDir === 'LEFT')) {
          return prev;
        }
        return newDir;
      });
    } else {
      setNextDirection(prev => {
        const newDir = deltaY > 0 ? 'DOWN' : 'UP';
        if ((prev === 'UP' && newDir === 'DOWN') || (prev === 'DOWN' && newDir === 'UP')) {
          return prev;
        }
        return newDir;
      });
    }
  }, [gameStarted, gameOver, resetGame]);

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

    // Clear canvas with retro green background
    ctx.fillStyle = '#9bbc0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#8bac0f';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = '#9bbc0f';
        const eyeSize = 3;
        const eyeOffset = 6;
        
        if (direction === 'RIGHT') {
          ctx.fillRect(segment.x * CELL_SIZE + eyeOffset + 6, segment.y * CELL_SIZE + 5, eyeSize, eyeSize);
          ctx.fillRect(segment.x * CELL_SIZE + eyeOffset + 6, segment.y * CELL_SIZE + 12, eyeSize, eyeSize);
        } else if (direction === 'LEFT') {
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 5, eyeSize, eyeSize);
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 12, eyeSize, eyeSize);
        } else if (direction === 'UP') {
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 5, eyeSize, eyeSize);
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 5, eyeSize, eyeSize);
        } else {
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 12, eyeSize, eyeSize);
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 12, eyeSize, eyeSize);
        }
      }
    });
  }, [snake, food, direction]);

  return (
    <div className="min-h-screen bg-[#0f380f] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-[#9bbc0f] rounded-3xl shadow-2xl p-4 sm:p-8 border-8 border-[#0f380f]">
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

          {/* Canvas */}
          <div className="relative mb-4 flex justify-center">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="rounded-lg shadow-2xl touch-none"
              style={{ touchAction: 'none' }}
              onTouchStart={handleTouchStart}
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
                      Tap the screen to start.
                      <br />
                      Tap in a direction to move.
                    </p>
                  ) : (
                    <p className="mb-4 text-sm sm:text-base">
                      Press <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">SPACE</kbd> or <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded">ARROWS</kbd> to start.
                    </p>
                  )}
                  <Button
                    onClick={resetGame}
                    variant="default"
                    className="bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mx-auto font-mono"
                  >
                    <Play className="h-5 w-5" />
                    Start Game
                  </Button>
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
                  <Button
                    onClick={resetGame}
                    variant="default"
                    className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mx-auto font-mono"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Play Again
                  </Button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-[#0f380f]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="bg-[#9bbc0f] text-[#0f380f] rounded-lg p-6 sm:p-8 text-center shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4 font-mono">Paused</h3>
                  <Button
                    onClick={() => setIsPaused(false)}
                    variant="default"
                    className="bg-[#0f380f] hover:bg-[#306230] text-[#9bbc0f] font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mx-auto font-mono"
                  >
                    <Play className="h-5 w-5" />
                    Resume
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-[#0f380f] font-mono">
            {isMobile ? (
              <p>Tap in a direction to move. Don't hit the walls!</p>
            ) : (
              <p>Use <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">ARROWS</kbd> or <kbd className="px-2 py-1 bg-[#306230] text-[#9bbc0f] rounded">WASD</kbd> to move. Don't hit the walls!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
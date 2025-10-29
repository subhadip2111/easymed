import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'flying';
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

export const PlayDragonGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameRef = useRef({
    player: {
      x: 80,
      y: 0,
      width: 50,
      height: 50,
      velocityY: 0,
      jumping: false,
      ducking: false,
      groundY: 0
    },
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    particles: [] as Particle[],
    gameLoop: null as number | null,
    groundY: 0,
    speed: 5,
    baseSpeed: 5,
    gravity: 0.6,
    jumpPower: -12,
    frameCount: 0,
    scoreCount: 0,
    obstacleTimer: 0,
    dayNight: 0 // 0-1 for day/night cycle
  });

  // Touch controls
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const game = gameRef.current;
    
    if (gameOver) {
      resetGame();
      return;
    }
    
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touchY = touch.clientY - rect.top;
    const canvasHeight = canvas.height;

    // Top half = jump, bottom half = duck
    if (touchY < canvasHeight / 2) {
      jump();
    } else {
      duck();
    }
  };

  const handleTouchEnd = () => {
    gameRef.current.player.ducking = false;
  };

  // Keyboard controls
  const handleKeyDown = (e: KeyboardEvent) => {
    const game = gameRef.current;
    
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (gameOver) {
        resetGame();
        return;
      }
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }
      jump();
    }
    
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      if (!gameOver && gameStarted) {
        duck();
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowDown') {
      gameRef.current.player.ducking = false;
    }
  };

  const jump = () => {
    const player = gameRef.current.player;
    if (!player.jumping && !player.ducking) {
      player.velocityY = gameRef.current.jumpPower;
      player.jumping = true;
      createJumpParticles();
    }
  };

  const duck = () => {
    const player = gameRef.current.player;
    if (!player.jumping) {
      player.ducking = true;
    }
  };

  const createJumpParticles = () => {
    const player = gameRef.current.player;
    const particles = gameRef.current.particles;
    
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: player.x + player.width / 2,
        y: player.y + player.height,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        life: 1,
        size: Math.random() * 4 + 2,
        color: '#3b82f6'
      });
    }
  };

  const createCrashParticles = () => {
    const player = gameRef.current.player;
    const particles = gameRef.current.particles;
    
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: player.x + player.width / 2,
        y: player.y + player.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        size: Math.random() * 6 + 3,
        color: Math.random() > 0.5 ? '#ef4444' : '#f97316'
      });
    }
  };

  const spawnObstacle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const game = gameRef.current;
    const rand = Math.random();
    
    // 30% flying, 70% ground
    if (rand < 0.3) {
      // Flying obstacle
      game.obstacles.push({
        x: canvas.width,
        y: game.groundY - 80 - Math.random() * 40,
        width: 40,
        height: 30,
        type: 'flying'
      });
    } else {
      // Ground obstacle
      const height = 30 + Math.random() * 30;
      game.obstacles.push({
        x: canvas.width,
        y: game.groundY - height,
        width: 25 + Math.random() * 15,
        height: height,
        type: 'ground'
      });
    }
  };

  const spawnCloud = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameRef.current.clouds.push({
      x: canvas.width,
      y: Math.random() * (canvas.height * 0.4),
      width: 60 + Math.random() * 40,
      speed: 0.5 + Math.random() * 1
    });
  };

  const checkCollision = (player: typeof gameRef.current.player, obstacle: Obstacle) => {
    const playerHeight = player.ducking ? player.height * 0.5 : player.height;
    const playerY = player.ducking ? player.y + player.height * 0.5 : player.y;
    
    return (
      player.x < obstacle.x + obstacle.width - 10 &&
      player.x + player.width - 10 > obstacle.x &&
      playerY < obstacle.y + obstacle.height - 5 &&
      playerY + playerHeight - 5 > obstacle.y
    );
  };

  const drawDragon = (ctx: CanvasRenderingContext2D, player: typeof gameRef.current.player) => {
    const x = player.x;
    const y = player.ducking ? player.y + player.height * 0.5 : player.y;
    const height = player.ducking ? player.height * 0.5 : player.height;
    const width = player.width;

    // Dragon body gradient
    const bodyGradient = ctx.createLinearGradient(x, y, x, y + height);
    bodyGradient.addColorStop(0, '#8b5cf6');
    bodyGradient.addColorStop(1, '#6366f1');
    
    // Body
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(x + width * 0.6, y + height * 0.5, width * 0.35, height * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.ellipse(x + width * 0.3, y + height * 0.3, width * 0.25, height * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + width * 0.35, y + height * 0.25, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + width * 0.36, y + height * 0.25, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Wings
    if (!player.ducking) {
      const wingOffset = Math.sin(Date.now() * 0.01) * 5;
      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
      ctx.beginPath();
      ctx.moveTo(x + width * 0.5, y + height * 0.4);
      ctx.lineTo(x + width * 0.5, y - 10 + wingOffset);
      ctx.lineTo(x + width * 0.8, y + height * 0.3);
      ctx.closePath();
      ctx.fill();
    }
    
    // Tail
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x + width * 0.85, y + height * 0.5);
    ctx.quadraticCurveTo(
      x + width * 1.1,
      y + height * 0.7 + Math.sin(Date.now() * 0.01) * 5,
      x + width * 1.2,
      y + height * 0.4
    );
    ctx.stroke();
  };

  const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    if (obstacle.type === 'flying') {
      // Flying enemy (bat/bird)
      const gradient = ctx.createRadialGradient(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        0,
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2
      );
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#991b1b');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2,
        obstacle.height / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Wings
      const wingFlap = Math.sin(Date.now() * 0.02) * 10;
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
      ctx.lineTo(obstacle.x - 10, obstacle.y + wingFlap);
      ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.fill();
    } else {
      // Ground obstacle (rock/spike)
      const gradient = ctx.createLinearGradient(
        obstacle.x,
        obstacle.y,
        obstacle.x,
        obstacle.y + obstacle.height
      );
      gradient.addColorStop(0, '#64748b');
      gradient.addColorStop(1, '#334155');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
      ctx.closePath();
      ctx.fill();
      
      // Highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width * 0.3, obstacle.y + obstacle.height * 0.7);
      ctx.stroke();
    }
  };

  const drawCloud = (ctx: CanvasRenderingContext2D, cloud: Cloud) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width * 0.3, cloud.y - 5, cloud.width * 0.25, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width * 0.6, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
    ctx.fill();
  };

  const resetGame = () => {
    const game = gameRef.current;
    game.obstacles = [];
    game.clouds = [];
    game.particles = [];
    game.player.y = game.groundY - game.player.height;
    game.player.velocityY = 0;
    game.player.jumping = false;
    game.player.ducking = false;
    game.speed = game.baseSpeed;
    game.frameCount = 0;
    game.scoreCount = 0;
    game.obstacleTimer = 0;
    game.dayNight = 0;
    
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const game = gameRef.current;

    // Responsive canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = Math.min(800, container.clientWidth - 32);
      canvas.height = Math.min(400, window.innerHeight * 0.5);
      
      game.groundY = canvas.height - 50;
      game.player.y = game.groundY - game.player.height;
      game.player.groundY = game.groundY - game.player.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Spawn initial clouds
    for (let i = 0; i < 5; i++) {
      spawnCloud();
    }

    const gameLoop = () => {
      if (!gameStarted || gameOver || isPaused) {
        game.gameLoop = requestAnimationFrame(gameLoop);
        return;
      }

      game.frameCount++;

      // Update score
      game.scoreCount += 0.1;
      setScore(Math.floor(game.scoreCount));

      // Increase speed gradually
      game.speed = game.baseSpeed + Math.floor(game.scoreCount / 100) * 0.5;

      // Day/night cycle
      game.dayNight = (Math.sin(game.frameCount * 0.002) + 1) / 2;

      // Background gradient (day/night)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const t = game.dayNight;
      skyGradient.addColorStop(0, `hsl(${200 + t * 30}, 70%, ${85 - t * 20}%)`);
      skyGradient.addColorStop(1, `hsl(${220 + t * 20}, 60%, ${90 - t * 30}%)`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw clouds
      game.clouds = game.clouds.filter(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width > 0) {
          drawCloud(ctx, cloud);
          return true;
        }
        return false;
      });

      if (Math.random() < 0.01) spawnCloud();

      // Ground
      ctx.fillStyle = `hsl(140, 40%, ${35 - t * 10}%)`;
      ctx.fillRect(0, game.groundY, canvas.width, canvas.height - game.groundY);
      
      // Ground line
      ctx.strokeStyle = `hsl(140, 40%, ${25 - t * 10}%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, game.groundY);
      ctx.lineTo(canvas.width, game.groundY);
      ctx.stroke();

      // Update player
      const player = game.player;
      player.velocityY += game.gravity;
      player.y += player.velocityY;

      if (player.y >= player.groundY) {
        player.y = player.groundY;
        player.velocityY = 0;
        player.jumping = false;
      }

      // Spawn obstacles
      game.obstacleTimer++;
      if (game.obstacleTimer > 100 - Math.min(game.speed * 5, 40)) {
        spawnObstacle();
        game.obstacleTimer = 0;
      }

      // Update obstacles
      game.obstacles = game.obstacles.filter(obstacle => {
        obstacle.x -= game.speed;

        if (checkCollision(player, obstacle)) {
          setGameOver(true);
          setHighScore(prev => Math.max(prev, Math.floor(game.scoreCount)));
          createCrashParticles();
          return true;
        }

        if (obstacle.x + obstacle.width > 0) {
          drawObstacle(ctx, obstacle);
          return true;
        }
        return false;
      });

      // Update particles
      game.particles = game.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 0.02;

        if (p.life > 0) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          return true;
        }
        return false;
      });

      // Draw player
      drawDragon(ctx, player);

      game.gameLoop = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      if (game.gameLoop) cancelAnimationFrame(game.gameLoop);
    };
  }, [gameStarted, gameOver, isPaused]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 animate-pulse" />
              <h1 className="text-3xl sm:text-5xl font-bold text-gradient-game">
                Dragon Runner
              </h1>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg">
                <div className="text-xs sm:text-sm opacity-80">Score</div>
                <div className="text-xl sm:text-3xl font-bold">{score}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg">
                <div className="text-xs sm:text-sm opacity-80">High Score</div>
                <div className="text-xl sm:text-3xl font-bold">{highScore}</div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative mb-4">
            <canvas
              ref={canvasRef}
              className="w-full border-4 border-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl bg-gradient-to-b from-blue-100 to-purple-100"
            />

            {/* Overlays */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gradient-game mb-4">
                    Ready to Fly?
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Press <kbd className="px-2 py-1 bg-gray-200 rounded">SPACE</kbd> or tap to start!
                  </p>
                  <Button
                    onClick={() => setGameStarted(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">Game Over!</h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Final Score: <span className="text-2xl sm:text-3xl font-bold text-purple-600">{score}</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <p className="text-sm text-green-600 font-bold mb-4">🎉 NEW HIGH SCORE!</p>
                  )}
                  <Button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Play Again
                  </Button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Paused</h3>
                  <Button
                    onClick={() => setIsPaused(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </div>
  );
};

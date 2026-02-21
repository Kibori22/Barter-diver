// server.js
const io = require('socket.io')(3000, {
  cors: { origin: "*" }
});

let queue = []; // Rappers waiting for a match

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 1. Join Matchmaking
  socket.on('join-battle', (userData) => {
    queue.push({ id: socket.id, ...userData });
    
    if (queue.length >= 2) {
      const rapper1 = queue.shift();
      const rapper2 = queue.shift();
      const roomName = `battle_${rapper1.id}_${rapper2.id}`;

      // Join both to a private room
      io.to(rapper1.id).emit('match-found', { opponent: rapper2.username, room: roomName, role: 'rapper' });
      io.to(rapper2.id).emit('match-found', { opponent: rapper1.username, room: roomName, role: 'rapper' });
    }
  });

  // 2. Score Tracking & Streak Logic
  socket.on('submit-score', (data) => {
    // data: { roomId, points, isMetaphor, streakCount, isPremium }
    let finalPoints = data.points;

    // Apply Streak Booster
    if (data.streakCount > 3) {
      finalPoints *= 1.5; // 50% boost for streaks
    }

    // Premium Perk: Extra 10% bonus
    if (data.isPremium) {
      finalPoints += (finalPoints * 0.1);
    }

    io.to(data.roomId).emit('update-leaderboard', { 
      user: socket.id, 
      newScore: finalPoints 
    });
  });
});

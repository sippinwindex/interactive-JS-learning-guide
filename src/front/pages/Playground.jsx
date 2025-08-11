import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export const Playground = ({ navigateTo, isDarkMode = false }) => {
  // Professional templates for learning
  const templates = {
    welcome: {
      name: '👋 Welcome Tutorial',
      description: 'Start here to learn the basics',
      html: `<!-- Welcome to the VS Code-like Playground! -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Coding!</title>
</head>
<body>
    <div class="welcome-container">
        <h1>🎉 Welcome to JavaScript!</h1>
        <p>This is a VS Code-like editor. Try these features:</p>
        
        <ul>
            <li>✨ IntelliSense (start typing and see suggestions)</li>
            <li>🎨 Syntax highlighting</li>
            <li>🔍 Error detection</li>
            <li>⚡ Auto-completion</li>
            <li>📝 Multi-cursor editing (Alt+Click)</li>
        </ul>
        
        <button id="startBtn" class="start-button">
            Click to Start Learning!
        </button>
        
        <div id="output" class="output-area"></div>
    </div>
</body>
</html>`,
      css: `/* VS Code-like Playground Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
}

.welcome-container {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 2.5rem;
    text-align: center;
}

ul {
    list-style: none;
    padding: 20px 0;
}

li {
    padding: 10px;
    margin: 5px 0;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: transform 0.2s;
}

li:hover {
    transform: translateX(10px);
    background: #e9ecef;
}

.start-button {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 20px;
}

.start-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.start-button:active {
    transform: translateY(0);
}

.output-area {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    min-height: 100px;
    display: none;
    animation: fadeIn 0.3s ease-out;
}

.output-area.show {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.success-message {
    color: #28a745;
    font-size: 1.2rem;
    font-weight: bold;
}`,
      javascript: `// Welcome to the VS Code-like JavaScript editor!
// You get IntelliSense, error checking, and more!

console.log('🚀 VS Code Playground Initialized!');
console.log('💡 Try typing "document." and see the IntelliSense!');

// Get DOM elements
const button = document.getElementById('startBtn');
const output = document.getElementById('output');

// Track learning progress
let clickCount = 0;
const lessons = [
    '🎯 Great! You clicked the button!',
    '📚 Now try modifying the code above',
    '✏️ Change the button text in the HTML',
    '🎨 Try changing colors in the CSS',
    '⚡ Add a new console.log() statement',
    '🏆 Excellent! You are learning fast!'
];

// Add event listener with IntelliSense support
button?.addEventListener('click', function(event) {
    // Show output area
    output.classList.add('show');
    
    // Display progressive messages
    const message = lessons[Math.min(clickCount, lessons.length - 1)];
    
    output.innerHTML = \`
        <div class="success-message">
            \${message}
        </div>
        <p>Click count: \${clickCount + 1}</p>
        <p>Timestamp: \${new Date().toLocaleTimeString()}</p>
    \`;
    
    // Animate button
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    clickCount++;
    
    // Log to console (check the console panel!)
    console.log('Button clicked!', {
        count: clickCount,
        message: message,
        timestamp: new Date().toISOString()
    });
});

// Demonstrate IntelliSense with different types
const student = {
    name: 'New Coder',
    level: 1,
    skills: ['HTML', 'CSS', 'JavaScript'],
    
    // Method with JSDoc comment for IntelliSense
    /**
     * Level up the student
     * @param {string} newSkill - The new skill learned
     * @returns {number} The new level
     */
    levelUp(newSkill) {
        this.skills.push(newSkill);
        this.level++;
        console.log(\`🎉 Leveled up to \${this.level}! New skill: \${newSkill}\`);
        return this.level;
    }
};

// Try typing "student." to see IntelliSense suggestions!
console.log('Student profile:', student);

// Demonstrate error detection - uncomment the line below to see an error
// console.log(undefinedVariable);

// Pro tip: Try these shortcuts:
// - Ctrl+Space: Trigger IntelliSense
// - F1: Command palette
// - Ctrl+/: Toggle comment
// - Alt+Shift+F: Format document
// - Ctrl+D: Select next occurrence`
    },
    interactive: {
      name: '🎮 Interactive App',
      description: 'Build an interactive web application',
      html: `<div class="app">
    <header class="app-header">
        <h1>🎮 Interactive Dashboard</h1>
        <div class="stats">
            <div class="stat-card">
                <span class="stat-value" id="score">0</span>
                <span class="stat-label">Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="level">1</span>
                <span class="stat-label">Level</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="time">00:00</span>
                <span class="stat-label">Time</span>
            </div>
        </div>
    </header>

    <main class="app-main">
        <div class="control-panel">
            <input type="text" id="nameInput" placeholder="Enter your name..." class="input-field">
            <button id="actionBtn" class="action-btn">Start Game</button>
        </div>

        <div class="game-area" id="gameArea">
            <canvas id="canvas" width="600" height="400"></canvas>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" id="progressBar"></div>
        </div>
    </main>
</div>`,
      css: `.app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.app-header h1 {
    margin: 0 0 20px 0;
    font-size: 2.5rem;
    text-align: center;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.stat-card {
    background: rgba(255,255,255,0.2);
    padding: 15px 25px;
    border-radius: 10px;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
    background: rgba(255,255,255,0.3);
}

.stat-value {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.app-main {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.control-panel {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.input-field {
    flex: 1;
    padding: 12px 20px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
}

.input-field:focus {
    outline: none;
    border-color: #667eea;
}

.action-btn {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.game-area {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#canvas {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.progress-bar {
    height: 30px;
    background: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    width: 0%;
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}`,
      javascript: `// Interactive Dashboard with Canvas Graphics
console.log('🎮 Interactive Dashboard Loading...');

// Game state
const gameState = {
    score: 0,
    level: 1,
    isPlaying: false,
    playerName: '',
    startTime: null,
    particles: []
};

// DOM Elements
const elements = {
    scoreEl: document.getElementById('score'),
    levelEl: document.getElementById('level'),
    timeEl: document.getElementById('time'),
    nameInput: document.getElementById('nameInput'),
    actionBtn: document.getElementById('actionBtn'),
    progressBar: document.getElementById('progressBar'),
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas')?.getContext('2d')
};

// Particle class for visual effects
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.radius = Math.random() * 3 + 2;
        this.color = color;
        this.life = 100;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 2;
        this.radius *= 0.98;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Initialize canvas drawing
function initCanvas() {
    const { canvas, ctx } = elements;
    if (!ctx) return;
    
    // Draw welcome message
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎮 Ready to Play!', canvas.width / 2, canvas.height / 2);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = '#999';
    ctx.fillText('Enter your name and click Start Game', canvas.width / 2, canvas.height / 2 + 30);
}

// Create explosion effect
function createExplosion(x, y) {
    const colors = ['#667eea', '#764ba2', '#4CAF50', '#FF9800', '#F44336'];
    for (let i = 0; i < 20; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        gameState.particles.push(new Particle(x, y, color));
    }
}

// Animation loop
function animate() {
    const { canvas, ctx } = elements;
    if (!ctx || !gameState.isPlaying) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update particles
    gameState.particles = gameState.particles.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
    });
    
    // Draw game elements
    drawGame();
    
    // Continue animation
    requestAnimationFrame(animate);
}

// Draw game elements
function drawGame() {
    const { canvas, ctx } = elements;
    if (!ctx) return;
    
    // Draw player info
    ctx.fillStyle = '#333';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(\`Player: \${gameState.playerName}\`, 20, 30);
    
    // Draw interactive circles
    const time = Date.now() * 0.001;
    for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        const y = canvas.height / 2 + Math.sin(time + i) * 50;
        const radius = 20 + Math.sin(time * 2 + i) * 10;
        
        ctx.fillStyle = \`hsl(\${(time * 50 + i * 60) % 360}, 70%, 50%)\`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add instructions
    ctx.fillStyle = '#999';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Click on the circles to score points!', canvas.width / 2, canvas.height - 20);
}

// Handle canvas click
elements.canvas?.addEventListener('click', (e) => {
    if (!gameState.isPlaying) return;
    
    const rect = elements.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create explosion at click position
    createExplosion(x, y);
    
    // Update score
    gameState.score += 10;
    elements.scoreEl.textContent = gameState.score;
    
    // Update progress
    updateProgress();
    
    // Level up every 100 points
    if (gameState.score % 100 === 0) {
        gameState.level++;
        elements.levelEl.textContent = gameState.level;
        console.log(\`🎉 Level Up! Now at level \${gameState.level}\`);
    }
    
    console.log(\`Click at (\${Math.round(x)}, \${Math.round(y)}) - Score: \${gameState.score}\`);
});

// Update progress bar
function updateProgress() {
    const progress = (gameState.score % 100);
    elements.progressBar.style.width = progress + '%';
    elements.progressBar.textContent = progress + '%';
}

// Timer update
function updateTimer() {
    if (!gameState.isPlaying || !gameState.startTime) return;
    
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    elements.timeEl.textContent = \`\${minutes}:\${seconds}\`;
}

// Start/Stop game
elements.actionBtn?.addEventListener('click', () => {
    if (!gameState.isPlaying) {
        // Start game
        gameState.playerName = elements.nameInput.value || 'Player';
        gameState.isPlaying = true;
        gameState.startTime = Date.now();
        elements.actionBtn.textContent = 'Stop Game';
        elements.actionBtn.style.background = 'linear-gradient(135deg, #f44336, #e91e63)';
        
        console.log(\`🎮 Game started for \${gameState.playerName}!\`);
        animate();
        
        // Start timer
        setInterval(updateTimer, 100);
    } else {
        // Stop game
        gameState.isPlaying = false;
        elements.actionBtn.textContent = 'Start Game';
        elements.actionBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        console.log('🛑 Game stopped!');
        console.log('Final Stats:', {
            score: gameState.score,
            level: gameState.level,
            player: gameState.playerName
        });
    }
});

// Initialize
initCanvas();
console.log('✅ Dashboard ready! Enter your name and start playing!');

// IntelliSense Demo - try typing these:
// elements.
// gameState.
// document.
// console.
// Math.`
    },
    dataViz: {
      name: '📊 Data Visualization',
      description: 'Create interactive charts and graphs',
      html: `<div class="dashboard">
    <h1>📊 Data Analytics Dashboard</h1>
    
    <div class="controls">
        <button onclick="generateData()">🔄 Generate Data</button>
        <button onclick="animateCharts()">✨ Animate</button>
        <select id="chartType" onchange="updateCharts()">
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
        </select>
    </div>
    
    <div class="charts-grid">
        <div class="chart-container">
            <h3>Monthly Sales</h3>
            <canvas id="chart1"></canvas>
        </div>
        <div class="chart-container">
            <h3>Categories</h3>
            <canvas id="chart2"></canvas>
        </div>
    </div>
    
    <div class="stats-grid">
        <div class="stat-box">
            <div class="stat-icon">💰</div>
            <div class="stat-value" id="revenue">$0</div>
            <div class="stat-label">Revenue</div>
        </div>
        <div class="stat-box">
            <div class="stat-icon">📈</div>
            <div class="stat-value" id="growth">0%</div>
            <div class="stat-label">Growth</div>
        </div>
        <div class="stat-box">
            <div class="stat-icon">👥</div>
            <div class="stat-value" id="users">0</div>
            <div class="stat-label">Users</div>
        </div>
    </div>
</div>`,
      css: `.dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, system-ui, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
}

h1 {
    text-align: center;
    color: white;
    margin-bottom: 30px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
}

.controls button, .controls select {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: white;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s;
}

.controls button:hover, .controls select:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.chart-container {
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.chart-container h3 {
    margin: 0 0 15px 0;
    color: #333;
}

canvas {
    width: 100%;
    height: 250px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.stat-box {
    background: white;
    padding: 25px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.stat-box:hover {
    transform: scale(1.05);
}

.stat-icon {
    font-size: 2rem;
    margin-bottom: 10px;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #667eea;
    margin: 10px 0;
}

.stat-label {
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
}`,
      javascript: `// Data Visualization with Canvas API
console.log('📊 Loading Data Visualization Dashboard...');

// Chart data
let chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [],
    categories: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        values: []
    }
};

// Generate random data
function generateData() {
    // Generate sales data
    chartData.values = Array.from({length: 6}, () => 
        Math.floor(Math.random() * 10000) + 2000
    );
    
    // Generate category data
    chartData.categories.values = Array.from({length: 4}, () => 
        Math.floor(Math.random() * 100) + 20
    );
    
    // Update statistics
    const totalRevenue = chartData.values.reduce((a, b) => a + b, 0);
    const growth = Math.floor(Math.random() * 50) + 10;
    const users = Math.floor(Math.random() * 5000) + 1000;
    
    document.getElementById('revenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('growth').textContent = growth + '%';
    document.getElementById('users').textContent = users.toLocaleString();
    
    console.log('📊 New data generated:', chartData);
    
    updateCharts();
}

// Draw bar chart
function drawBarChart(canvasId, data, labels, color = '#667eea') {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const barWidth = (canvas.width - padding * 2) / data.length;
    const maxValue = Math.max(...data);
    const scale = (canvas.height - padding * 2) / maxValue;
    
    data.forEach((value, i) => {
        const barHeight = value * scale;
        const x = padding + i * barWidth + barWidth * 0.1;
        const y = canvas.height - padding - barHeight;
        const width = barWidth * 0.8;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '88');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw value
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toLocaleString(), x + width/2, y - 5);
        
        // Draw label
        ctx.fillStyle = '#666';
        ctx.font = '11px Arial';
        ctx.fillText(labels[i], x + width/2, canvas.height - padding + 15);
    });
}

// Draw line chart
function drawLineChart(canvasId, data, labels, color = '#764ba2') {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const maxValue = Math.max(...data);
    const scaleY = (canvas.height - padding * 2) / maxValue;
    const stepX = (canvas.width - padding * 2) / (data.length - 1);
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    data.forEach((value, i) => {
        const x = padding + i * stepX;
        const y = canvas.height - padding - (value * scaleY);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    data.forEach((value, i) => {
        const x = padding + i * stepX;
        const y = canvas.height - padding - (value * scaleY);
        
        // Outer circle
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Value
        ctx.fillStyle = '#333';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toLocaleString(), x, y - 10);
        
        // Label
        ctx.fillStyle = '#666';
        ctx.fillText(labels[i], x, canvas.height - padding + 15);
    });
}

// Draw pie chart
function drawPieChart(canvasId, data, labels) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    
    const total = data.reduce((a, b) => a + b, 0);
    const colors = ['#667eea', '#764ba2', '#4CAF50', '#FF9800'];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((value, i) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], labelX, labelY - 5);
        ctx.fillText(Math.round(value / total * 100) + '%', labelX, labelY + 10);
        
        currentAngle += sliceAngle;
    });
}

// Update charts based on selected type
function updateCharts() {
    const chartType = document.getElementById('chartType').value;
    
    switch(chartType) {
        case 'bar':
            drawBarChart('chart1', chartData.values, chartData.labels);
            drawBarChart('chart2', chartData.categories.values, chartData.categories.labels, '#4CAF50');
            break;
        case 'line':
            drawLineChart('chart1', chartData.values, chartData.labels);
            drawLineChart('chart2', chartData.categories.values, chartData.categories.labels, '#4CAF50');
            break;
        case 'pie':
            drawPieChart('chart1', chartData.values, chartData.labels);
            drawPieChart('chart2', chartData.categories.values, chartData.categories.labels);
            break;
    }
    
    console.log(\`📊 Charts updated: \${chartType}\`);
}

// Animate charts
function animateCharts() {
    const containers = document.querySelectorAll('.chart-container, .stat-box');
    
    containers.forEach((el, i) => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'fadeInUp 0.5s ease-out';
        }, i * 100);
    });
    
    console.log('✨ Animation triggered!');
}

// Add animation CSS
const style = document.createElement('style');
style.textContent = \`
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
\`;
document.head.appendChild(style);

// Initialize with data
generateData();

console.log('✅ Dashboard ready! Try the buttons to interact with the charts.');
console.log('💡 Tip: Use the Monaco Editor features like IntelliSense and formatting!');`
    }
  };

  const [code, setCode] = useState({
    html: templates.welcome.html,
    css: templates.welcome.css,
    javascript: templates.welcome.javascript
  });

  const [activeTab, setActiveTab] = useState('html');
  const [autoRun, setAutoRun] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  
  const iframeRef = useRef(null);
  const runTimeoutRef = useRef(null);
  const monacoRef = useRef(null);

  // Monaco Editor configuration for VS Code experience
  const editorOptions = {
    // Core settings
    fontSize: 14,
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontLigatures: true,
    
    // IntelliSense and suggestions
    quickSuggestions: {
      other: true,
      comments: false,
      strings: true
    },
    parameterHints: {
      enabled: true
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    tabCompletion: "on",
    wordBasedSuggestions: true,
    
    // Editor features
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    lineNumbers: "on",
    renderLineHighlight: "all",
    renderWhitespace: "selection",
    
    // Formatting
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: "full",
    
    // Brackets
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    bracketPairColorization: {
      enabled: true
    },
    
    // Scrollbar
    scrollbar: {
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      useShadows: false
    },
    
    // Other VS Code features
    mouseWheelZoom: true,
    multiCursorModifier: "alt",
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: true,
    renderControlCharacters: false,
    
    // Auto save simulation
    autoSurround: "languageDefined",
    folding: true,
    foldingStrategy: "indentation",
    showFoldingControls: "mouseover",
    
    // Match VS Code theme
    automaticLayout: true
  };

  const runCode = () => {
    if (!iframeRef.current) return;
    
    setIsRunning(true);
    
    const iframe = iframeRef.current;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      margin: 0; 
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    ${code.css}
  </style>
</head>
<body>
  ${code.html.replace(/<\/?html[^>]*>/gi, '').replace(/<\/?head[^>]*>/gi, '').replace(/<\/?body[^>]*>/gi, '').replace(/<title[^>]*>.*?<\/title>/gi, '')}
  <script>
    // Enhanced console with full VS Code-like logging
    const originalConsole = { ...console };
    
    function sendToParent(method, args) {
      window.parent.postMessage({
        type: 'console',
        method: method,
        args: args.map(arg => {
          if (arg === undefined) return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        })
      }, '*');
    }
    
    ['log', 'error', 'warn', 'info', 'debug', 'table'].forEach(method => {
      console[method] = function(...args) {
        sendToParent(method, args);
        originalConsole[method].apply(console, args);
      };
    });
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Runtime Error at line ' + lineNo + ': ' + msg);
      return false;
    };
    
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled Promise Rejection:', event.reason);
    });
    
    try {
      ${code.javascript}
    } catch (error) {
      console.error('Execution Error:', error.message, '\\nStack:', error.stack);
    }
  </script>
</body>
</html>`;

    iframe.srcdoc = fullHTML;
    
    setTimeout(() => {
      setIsRunning(false);
    }, 500);
  };

  // Listen for console messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        const timestamp = new Date().toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        setConsoleOutput(prev => {
          const newLog = {
            method: event.data.method,
            args: event.data.args,
            timestamp
          };
          return [...prev, newLog].slice(-200);
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run with debounce
  useEffect(() => {
    if (autoRun) {
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current);
      }
      
      runTimeoutRef.current = setTimeout(runCode, 1000);
      
      return () => {
        if (runTimeoutRef.current) {
          clearTimeout(runTimeoutRef.current);
        }
      };
    }
  }, [code, autoRun]);

  // Initial run
  useEffect(() => {
    setTimeout(runCode, 100);
  }, []);

  // Monaco editor mount handler
  const handleEditorMount = (editor, monaco) => {
    monacoRef.current = { editor, monaco };
    
    // Add VS Code keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      console.log('💾 Code saved (Ctrl+S)');
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  const clearConsole = () => setConsoleOutput([]);

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setCode({
        html: template.html,
        css: template.css,
        javascript: template.javascript
      });
      setSelectedTemplate(templateKey);
      clearConsole();
      console.log(`📚 Loaded template: ${template.name}`);
    }
  };

  const tabs = [
    { key: 'html', label: 'HTML', icon: '📄', language: 'html' },
    { key: 'css', label: 'CSS', icon: '🎨', language: 'css' },
    { key: 'javascript', label: 'JavaScript', icon: '⚡', language: 'javascript' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* VS Code-like Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              VS Code Playground
            </h1>
            {isRunning && (
              <span className="text-xs px-2 py-1 bg-green-600 rounded animate-pulse">
                RUNNING
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedTemplate}
              onChange={(e) => loadTemplate(e.target.value)}
              className="bg-gray-700 text-sm px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              {Object.entries(templates).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.name}
                </option>
              ))}
            </select>
            
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded"
              />
              Auto-run
            </label>
            
            <button 
              onClick={runCode}
              className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors flex items-center gap-2"
            >
              ▶ Run (Ctrl+Enter)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-48px)]">
        {/* Editor Panel */}
        <div className="border-r border-gray-700 flex flex-col">
          {/* File Tabs */}
          <div className="bg-gray-800 flex border-b border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 border-r border-gray-700 ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white border-t-2 border-t-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={tabs.find(t => t.key === activeTab)?.language}
              value={code[activeTab]}
              theme={isDarkMode ? "vs-dark" : "vs"}
              onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value || '' }))}
              onMount={handleEditorMount}
              options={editorOptions}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div>Loading VS Code Editor...</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          {/* Preview */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 text-sm font-medium">
              👁️ Preview
            </div>
            <iframe
              ref={iframeRef}
              className="flex-1 bg-white"
              title="Preview"
              sandbox="allow-scripts"
            />
          </div>
          
          {/* Console */}
          <div className="h-64 flex flex-col border-t border-gray-700">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-sm">
              <span>Console ({consoleOutput.length})</span>
              <button 
                onClick={clearConsole}
                className="text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 bg-gray-950 p-3 overflow-y-auto font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className="text-gray-500">Console output will appear here...</div>
              ) : (
                consoleOutput.map((log, i) => (
                  <div key={i} className={`mb-1 ${
                    log.method === 'error' ? 'text-red-400' :
                    log.method === 'warn' ? 'text-yellow-400' :
                    log.method === 'info' ? 'text-blue-400' :
                    'text-gray-300'
                  }`}>
                    <span className="text-gray-500">[{log.timestamp}]</span> {log.args.join(' ')}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
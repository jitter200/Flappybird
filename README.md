# Flappy Bird Web Game

## Overview

This project is a web-based game inspired by the popular Flappy Bird. It is built using HTML, CSS, JavaScript, and Flask. The game offers two modes: **Main Game** and **Mini-Game**, providing players with different challenges. The project is designed to be visually appealing, engaging, and functional across browsers.

---

## Features

### 1. Game Modes
- **Main Game**: Navigate the bird through pipes and earn points for each successful pass.
- **Mini-Game**: Collect coins while avoiding obstacles to score points.

### 2. Dynamic UI
- Intuitive menu with buttons to choose between game modes.
- Smooth animations and transitions.
- High contrast visuals for easy readability and better engagement.

### 3. Responsive Design
- The game is designed to work seamlessly on desktop browsers.

### 4. Scoring System
- The score is displayed in real-time during gameplay.
- Scores are saved locally for viewing high scores.

### 5. Game Over Screen
- A visually distinct **Game Over** screen appears upon losing, with an option to restart.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/flappy-bird-web.git
   cd flappy-bird-web
   ```

2. **Set up the environment:**
   - Ensure you have Python 3.x installed.
   - Install Flask by running:
     ```bash
     pip install flask
     ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Access the game:**
   - Open your browser and navigate to `http://127.0.0.1:5000`.

---

## File Structure

```
├── static/
│   ├── css/
│   │   └── style.css        # Styles for the game
│   ├── images/
│   │   ├── bird.png         # Bird sprite
│   │   ├── pipeTopCap.png   # Top cap of the pipes
│   │   ├── pipeBottomCap.png# Bottom cap of the pipes
│   │   ├── coin.png         # Coin sprite for mini-game
│   │   ├── background.png   # Background image
│   │   └── gameOver.png     # Game over screen
│   └── js/
│       └── game.js          # Game logic
├── templates/
│   └── index.html           # Main HTML file
├── app.py                    # Flask application
└── README.md                 # Project documentation
```

---

## How to Play

1. **Launch the game** by accessing the web page.
2. Choose between **Main Game** and **Mini-Game** from the menu.
3. **Main Game Controls**:
   - Press the `Space` key to make the bird fly.
   - Avoid pipes to score points.
4. **Mini-Game Controls**:
   - Press the `Space` key to make the bird fly.
   - Collect coins to score points.
5. When the game ends, click the **Restart** button to play again.

---

## Technologies Used

- **Frontend**:
  - HTML5 for structure.
  - CSS3 for design and animations.
  - JavaScript for game logic and interactivity.

- **Backend**:
  - Flask for handling routes and backend functionality.

---

## Possible Improvements

1. **Enhancements:**
   - Add new levels and challenges.
   - Introduce a multiplayer mode.
   - Include sound effects and music.

2. **Optimizations:**
   - Improve mobile responsiveness.
   - Optimize code for better performance.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

This project was inspired by the original Flappy Bird game and serves as a practical learning experience in web development and game design.

document.addEventListener('DOMContentLoaded', function() {
    const maze = document.getElementById('maze');
    const player = document.createElement('div');
    player.className = 'player';
    player.style.backgroundImage = "url('me.png')";
    maze.appendChild(player);

    const enemies = [];
    const friends = [];

    function createEnemy(image) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy ' + image;
        enemy.style.backgroundImage = `url('${image}')`;
        maze.appendChild(enemy);

        // Randomly generate initial position for enemy
        let enemyX, enemyY;
        do {
            enemyX = Math.floor(Math.random() * (maze.offsetWidth - 40));
            enemyY = Math.floor(Math.random() * (maze.offsetHeight - 40));
        } while (isColliding(enemyX, enemyY));

        enemy.style.left = enemyX + 'px';
        enemy.style.top = enemyY + 'px';

        return enemy;
    }

    function createFriend(image) {
        const friend = document.createElement('div');
        friend.className = 'friend ' + image;
        friend.style.backgroundImage = `url('${image}')`;
        maze.appendChild(friend);

        // Randomly generate initial position for friend
        let friendX, friendY;
        do {
            friendX = Math.floor(Math.random() * (maze.offsetWidth - 40));
            friendY = Math.floor(Math.random() * (maze.offsetHeight - 40));
        } while (isColliding(friendX, friendY));

        friend.style.left = friendX + 'px';
        friend.style.top = friendY + 'px';

        return friend;
    }

    function isColliding(x, y) {
        // Check if new position overlaps with other shapes
        const playerRect = player.getBoundingClientRect();
        if (playerRect.left < x + 40 && playerRect.right > x &&
            playerRect.top < y + 40 && playerRect.bottom > y) {
            return true; // Colliding with player
        }

        for (const enemy of enemies) {
            const enemyRect = enemy.getBoundingClientRect();
            if (enemyRect.left < x + 40 && enemyRect.right > x &&
                enemyRect.top < y + 40 && enemyRect.bottom > y) {
                return true; // Colliding with other enemies
            }
        }

        for (const friend of friends) {
            const friendRect = friend.getBoundingClientRect();
            if (friendRect.left < x + 40 && friendRect.right > x &&
                friendRect.top < y + 40 && friendRect.bottom > y) {
                return true; // Colliding with friend
            }
        }

        return false; // No collision
    }

    function moveEnemy(enemy, targetX, targetY) {

       //if yale, princeton

    if (enemy.className == 'enemy yale.png' || enemy.className == 'enemy princeton.png') {


        const dx = targetX - enemy.offsetLeft;
        const dy = targetY - enemy.offsetTop;
        const distance = Math.sqrt(dx*dx + dy*dy);
        const vx = dx / distance;
        const vy = dy / distance;

    const step = 1;



        // Check if enemy is trying to enter the four corners area, if so, randomly set their position
        const nextX = enemy.offsetLeft + vx * step;
        const nextY = enemy.offsetTop + vy* step;



        if (!(nextX < 40 && nextY < 40) &&
            !(nextX > maze.offsetWidth - 40 && nextY < 40) &&
            !(nextX < 40 && nextY > maze.offsetHeight - 40) &&
            !(nextX > maze.offsetWidth - 40 && nextY > maze.offsetHeight - 40)) {
            enemy.style.left = nextX + 'px';
            enemy.style.top = nextY + 'px';
        } else {
            // Reset enemy position
            let newX, newY;
            do {
                newX = Math.floor(Math.random() * (maze.offsetWidth - 180));
                newY = Math.floor(Math.random() * (maze.offsetHeight - 180));
            } while (isColliding(newX, newY));
            enemy.style.left = newX + 'px';
            enemy.style.top = newY + 'px';
        }

       } else {


    const step = 3;


    let newX = enemy.offsetLeft;
    let newY = enemy.offsetTop;
    let dx = enemy.dataset.dx ? parseFloat(enemy.dataset.dx) : (Math.random() * 2 - 1); // Initial movement direction
    let dy = enemy.dataset.dy ? parseFloat(enemy.dataset.dy) : (Math.random() * 2 - 1); // Initial movement direction


    newX += dx * step;
    newY += dy * step;


    if (newX <= 0 || newX >= maze.offsetWidth - 40) {
        dx = -dx;
        newX = enemy.offsetLeft + dx * step;
    }
    if (newY <= 0 || newY >= maze.offsetHeight - 40) {
        dy = -dy;
        newY = enemy.offsetTop + dy * step;

     }

    enemy.dataset.dx = dx;
    enemy.dataset.dy = dy;
    enemy.style.left = newX + 'px';
    enemy.style.top = newY + 'px';
     }
    }

function moveFriend(friend) {
    // Fixed step
    const step = 2;

    // Get current position and movement direction of friend
    let newX = friend.offsetLeft;
    let newY = friend.offsetTop;
    let dx = friend.dataset.dx ? parseFloat(friend.dataset.dx) : (Math.random() * 2 - 1); // Initial movement direction
    let dy = friend.dataset.dy ? parseFloat(friend.dataset.dy) : (Math.random() * 2 - 1); // Initial movement direction

    // Calculate new position of friend
    newX += dx * step;
    newY += dy * step;

    // If friend reaches maze boundary, reverse movement direction
    if (newX <= 0 || newX >= maze.offsetWidth - 40) {
        dx = -dx;
        newX = friend.offsetLeft + dx * step;
    }
    if (newY <= 0 || newY >= maze.offsetHeight - 40) {
        dy = -dy;
        newY = friend.offsetTop + dy * step;
    }

    // Update movement direction and position of friend
    friend.dataset.dx = dx;
    friend.dataset.dy = dy;
    friend.style.left = newX + 'px';
    friend.style.top = newY + 'px';
}



function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    for (const friend of friends) {
        const friendRect = friend.getBoundingClientRect();
        if (playerRect.left < friendRect.right && playerRect.right > friendRect.left &&
            playerRect.top < friendRect.bottom && playerRect.bottom > friendRect.top) {
            return 'win'; // Collided with friend, win
        }
    }
    for (const enemy of enemies) {
        const enemyRect = enemy.getBoundingClientRect();
        if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
            return 'lose'; // Collided with enemy, lose
        }
    }
    return 'none'; // No collision
}

function gameLoop() {
    const targetX = player.offsetLeft + player.offsetWidth / 2;
    const targetY = player.offsetTop + player.offsetHeight / 2;
    for (const enemy of enemies) {
        moveEnemy(enemy, targetX, targetY);
    }
    for (const friend of friends) {
        moveFriend(friend);
    }
    const collisionResult = checkCollision();
    if (collisionResult === 'win') {
        alert('You Win!');
        clearInterval(gameInterval);
    } else if (collisionResult === 'lose') {
        // Reset player position
        player.style.left = '0px';
        player.style.top = '0px';
    }
}


    const gameInterval = setInterval(gameLoop, 1000 / 60);

    const keysPressed = {};

    function handleKeyPress() {
        const speed = 20;
        let dx = 0;
        let dy = 0;

        if (keysPressed['ArrowUp']) {
            dy -= speed;
        }
        if (keysPressed['ArrowDown']) {
            dy += speed;
        }
        if (keysPressed['ArrowLeft']) {
            dx -= speed;
        }
        if (keysPressed['ArrowRight']) {
            dx += speed;
        }

        player.style.left = Math.max(0, Math.min(maze.offsetWidth - player.offsetWidth, player.offsetLeft + dx)) + 'px';
        player.style.top = Math.max(0, Math.min(maze.offsetHeight - player.offsetHeight, player.offsetTop + dy)) + 'px';
    }

    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
        handleKeyPress();
    });

    document.addEventListener('keyup', function(event) {
        delete keysPressed[event.key];
    });

    // Create enemies and friends
    enemies.push(createEnemy('harvard.png'));
    enemies.push(createEnemy('harvard.png'));
    enemies.push(createEnemy('harvard.png'));
    enemies.push(createEnemy('harvard.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('mit.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('yale.png'));
    enemies.push(createEnemy('princeton.png'));
    enemies.push(createEnemy('princeton.png'));
    enemies.push(createEnemy('princeton.png'));
    enemies.push(createEnemy('princeton.png'));
    friends.push(createFriend('slps.png'));
});

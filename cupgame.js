document.addEventListener("DOMContentLoaded", function() {
    const cup = document.getElementById("cup");
    const scoreDisplay = document.getElementById("score");
    let score = 0;
    let startTime = 0;


    // set cup height randomly
    const cupHeight = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
    cup.style.height = cupHeight + "px";

    // update water height
    function updateWater(waterPercentage) {
        const waterHeight = (cupHeight * waterPercentage) / 100;
        const water = document.getElementById("water");
        water.style.height = waterPercentage + "%";
        scoreDisplay.textContent = "Percentage: " + score + "%";
    }

    // press down during time
    function calculatePressTime() {
        return new Date().getTime() - startTime;
    }

    // press down event
    cup.addEventListener("mousedown", function(event) {
        startTime = new Date().getTime();
    });
    function createCup() {
        const cup = document.createElement("div");
        cup.id = "cup";
        cup.style.height = "273px";
        container.appendChild(cup);
        return cup;
    }
    // mouseup
    cup.addEventListener("mouseup", function(event) {
        const pressTime = calculatePressTime(); 
        const waterPercentage = Math.min((pressTime / 1000) * 100, 200); // water height: cup height        
        score = Math.round(waterPercentage);
        updateWater(waterPercentage);
        if (waterPercentage >= 95 && waterPercentage <= 100 ) {
            alert("You win！");
        } else if (waterPercentage > 100) {
            updateWater(waterPercentage);
            alert("too much！");
            score = 0;
            cup.style.transform = "translateX(-100%)";
            setTimeout(() => {
                cup.style.display = "none";
            }, 1000);
        }
    });
});

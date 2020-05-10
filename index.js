// ---- keydown, keyup, keypress

document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard');
    const score = document.querySelector('.header__score');

    const generateEgg = () => {
        const xPos = Math.round(Math.random() * 800 + 200);
        const yPos = Math.round(Math.random() * 400 + 200);
        const eggMaxSize = 70;
        const eggMinSize = 30;
        const eggSize = Math.round(Math.random() * (eggMaxSize - eggMinSize) + eggMinSize);
        const availableColor = ['tomato', 'yellow', 'white', 'pink', 'salmon', 'lightblue', 'lightgreen'];
        const fillColor = availableColor[Math.round(Math.random() * (availableColor.length - 1))];

        const eggSvg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            style="position: fixed; z-index: 2; left: ${xPos}px; top: ${yPos}px;"
             x="0px" y="0px"
            width="${eggSize}px" height="${eggSize}px" 
            viewBox="0 0 540.016 540.016" style="enable-background:new 0 0 540.016 540.016;"
            xml:space="preserve">
            <g>
            <path fill="${fillColor}" d="M270.005,0c-7.05,0-13.911,0.851-20.6,2.355c-39.076,8.838-71.781,41.487-96.041,75.074
        c-12.809,17.729-23.268,35.71-31.071,50.563c-13.886,26.433-25.967,55.417-35.582,84.401
        c-15.086,45.472-24.058,90.936-24.058,126.518c0,31.721,7.209,61.512,20.159,87.945c33.079,67.533,103.63,113.158,187.192,113.158
        c18.464,0,36.279-2.246,53.213-6.443c70.699-17.535,125.675-69.451,145.804-137.113c5.403-18.17,8.341-37.455,8.341-57.533
        c0-58.27-23.972-143.031-59.646-210.927C392.601,80.196,340.006,0,270.005,0z M315.58,113.771
        c30.142-11.077,65.681,10.165,79.377,47.442c13.702,37.276,0.373,76.476-29.768,87.553c-30.142,11.077-65.68-10.166-79.377-47.442
        C272.116,164.046,285.439,124.848,315.58,113.771z M114.71,433.717c-5.171,0-10.214-0.635-15.159-1.609
        c-15.723-27.35-24.664-59.064-24.664-93.182c0-36.391,9.761-83.581,25.998-130.289c4.523-0.808,9.113-1.359,13.819-1.359
        c51.843,0,93.875,50.692,93.875,113.221C208.584,383.025,166.552,433.717,114.71,433.717z M164.312,93.146
        c-1.493-1.327-2.84-2.771-4.101-4.271c24.168-34.657,57.437-69.131,96.806-75.539c9.309,19.449,4.566,46.322-13.666,66.794
        C220.47,105.814,185.084,111.646,164.312,93.146z M285.011,393.412c-23.678-0.135-42.742-23.979-42.577-53.27
        c0.166-29.291,19.492-52.92,43.17-52.785c23.679,0.135,42.742,23.979,42.577,53.27
        C328.017,369.91,308.689,393.545,285.011,393.412z M458.023,390.326C439.627,455.561,386.854,505.67,318.8,522.041
        c-8.825-30.379-0.71-67.717,24.296-97.436C374.498,387.285,422.271,374.207,458.023,390.326z"/>
        </g>
        </svg>`;

        gameboard.innerHTML += eggSvg;
    };

    const getCurrentScore = () => parseInt(score.textContent);

    const checkScore = () => {
        const currentScore = getCurrentScore();

        if (currentScore == 20) {
            const gameOverBoard = document.querySelector('.gameover-board');
            const closeButton = gameOverBoard.querySelector('.close');
            const startAgain = gameOverBoard.querySelector(('.start-again'))

            gameOverBoard.classList.add('gameover-board--shown');
            closeButton.addEventListener('click', () => window.close());
            startAgain.addEventListener('click', () => location.reload());
        }
    }

    const incrementScore = () => {
        score.textContent = getCurrentScore() + 1;

        checkScore();
    };

    const increaseSizeOfTheDino = () => {
        const dino = document.querySelector('.dino');
        const prevHeight = getComputedStyle(dino).height;
        const prevWidth = getComputedStyle(dino).width;

        dino.style.height = `${prevHeight + (prevHeight * 0.05)}px;`;
        dino.style.width = `${prevWidth + (prevWidth * 0.05)}px;`;
    };


    const isDinoReachedEgg = () => {
        const dino = document.querySelector('.dino');
        const egg = document.querySelector('svg');

        const eggPosX = parseInt(getComputedStyle(egg).left);
        const eggPosY = parseInt(getComputedStyle(egg).top);
        const eggW = parseInt(getComputedStyle(egg).width);
        const eggH = parseInt(getComputedStyle(egg).height);

        const dinoPosX = parseInt(getComputedStyle(dino).left);
        const dinoPosY = parseInt(getComputedStyle(dino).top);
        const dinoW = parseInt(getComputedStyle(dino).width);
        const dinoH = parseInt(getComputedStyle(dino).height);

        const isDinoOverEggOnXAxis = dinoPosX < eggPosX && dinoPosX + dinoW > eggPosX + eggW;
        const isDinoOverEggOnYAxis = dinoPosY < eggPosY && dinoPosY + dinoH > eggPosY + eggH;

        if (isDinoOverEggOnXAxis && isDinoOverEggOnYAxis) {
            egg.remove();
            generateEgg();
            incrementScore();
            increaseSizeOfTheDino();
        }

    };
    generateEgg();


    document.addEventListener('keydown', event => {
        const { key } = event;
        const dino = document.querySelector('.dino');
        const step = 50;
        let oldPosition = '';

        switch (event.key) {
            case "ArrowDown":
                oldPosition = parseInt(getComputedStyle(dino).top);
                dino.style.top = `${oldPosition + step}px`;
                break;
            case "ArrowUp":
                oldPosition = parseInt(getComputedStyle(dino).top);
                dino.style.top = `${oldPosition - step}px`;
                break;

            case "ArrowLeft":
                oldPosition = parseInt(getComputedStyle(dino).left);
                dino.style.left = `${oldPosition - step}px`;
                break;

            case "ArrowRight":
                oldPosition = parseInt(getComputedStyle(dino).left);
                dino.style.left = `${oldPosition + step}px`;
                break;
        }

        isDinoReachedEgg();
    });


});
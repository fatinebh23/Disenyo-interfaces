$(document).ready(function() {
    const memoryGame = $("#memory-game");

    const photoArray = [
        "foto1.jpg",
        "foto2.jpg",
        "foto3.jpg",
        "foto4.jpg",
        "foto1.jpg", // Matching pair
        "foto2.jpg", // Matching pair
        "foto3.jpg", // Matching pair
        "foto4.jpg"  // Matching pair
    ];

    shuffleArray(photoArray);

    $.each(photoArray, function(index, imageUrl) {
        const card = $("<div>").addClass("card").attr("data-index", index).click(flipCard);

        const cardImage = $("<img>").attr("src", "detras.jpg").appendTo(card);

        memoryGame.append(card);
    });

    const flippedCards = [];
    let matchedPairs = 0;

    function flipCard() {
        const clickedCard = $(this);
        const clickedIndex = clickedCard.data("index");

        if (flippedCards.length < 2 && !flippedCards.includes(clickedIndex)) {
            flippedCards.push(clickedIndex);
            showImage(clickedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function showImage(card) {
        const cardImage = card.find("img");
        const index = card.data("index");
        cardImage.attr("src", photoArray[index]).show();
    }

    function checkMatch() {
        const [index1, index2] = flippedCards;
        const card1 = $(`.card[data-index="${index1}"]`);
        const card2 = $(`.card[data-index="${index2}"]`);

        if (photoArray[index1] === photoArray[index2]) {
            matchedPairs++;
            if (matchedPairs === photoArray.length / 2) {
                alert("¡Felicidades! Has encontrado todas las parejas.");
            }
        } else {
            hideImage(card1);
            hideImage(card2);
        }

        flippedCards.length = 0;
    }

    function hideImage(card) {
        const cardImage = card.find("img");
        cardImage.attr("src", "detras.jpg").hide();
    }

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
});


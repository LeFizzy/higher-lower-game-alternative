/**
 * Randomize game data for each new game.
 * Using Durstenfeld shuffle algorithm.
 * @param {Object} dataObject 
 */

const randomizeElements = (dataObject) => {
    for (let i = dataObject.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dataObject[i], dataObject[j]] = [dataObject[j], dataObject[i]];
    }

    return dataObject;
}

module.exports = randomizeElements;
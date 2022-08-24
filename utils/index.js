/**
 * Returns a random number from 0 to maxRange.
 * @param  {number} maxRange [maximum number]
 * @return {number}      [a random number between 0 and maxRange]
 */
function getRandomNumber(maxRange = 1) {
  return Math.floor(Math.random() * maxRange);
}

module.exports = { getRandomNumber };

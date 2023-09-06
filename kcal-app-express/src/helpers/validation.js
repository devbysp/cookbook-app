const { createBusinessException } = require('./utils');

async function validateNewFood(food) {
  const requiredProps = ['foodName', 'kcal', 'fat', 'saturatedFat', 'carbs', 'sugar', 'fiber', 'protein'];
  const propTypes = ['string', 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
  const props = Object.keys(food);

  const missingProps = requiredProps.filter((prop) => (!props.includes(prop)));
  if (missingProps.length) {
    throw createBusinessException(`Some reqired props are missing: ${missingProps}`);
  }

  const emptyProps = requiredProps.filter((prop) => (!food[prop]));
  if (emptyProps.length) {
    throw createBusinessException(`Some reqired props are empty: ${emptyProps}`);
  }

  const wrongPropType = requiredProps
    .filter((prop, index) => (typeof (food[prop]) !== propTypes[index]));
  if (wrongPropType.length) {
    throw createBusinessException(`Some props have incorrect type: ${wrongPropType}`);
  }
}

module.exports = {
  validateNewFood,
};

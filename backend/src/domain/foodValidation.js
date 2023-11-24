async function validateNewFood(food) {
  const requiredProps = ['name',  'protein', 'fat', 'saturatedFat', 'carbs', 'sugar', 'fiber'];
  const propTypes = ['string', 'number', 'number', 'number', 'number', 'number', 'number'];
  const props = Object.keys(food);

  const missingProps = requiredProps.filter((prop) => (!props.includes(prop)));
  if (missingProps.length) {
    throw new Error(`Some reqired props are missing: ${missingProps}`);
  }

  const emptyProps = requiredProps.filter((prop) => (!food[prop]));
  if (emptyProps.length) {
    throw new Error(`Some reqired props are empty: ${emptyProps}`);
  }

  const wrongPropType = requiredProps.filter((prop, index) => (typeof (food[prop]) !== propTypes[index]));
  if (wrongPropType.length) {
    throw new Error(`Some props have incorrect type: ${wrongPropType}`);
  }
}

module.exports = {
  validateNewFood,
};

module.exports = function(food) {
  let serialized = {
    id: food.id,
    name: food.name,
    calories: food.calories
  };
  return serialized;
}

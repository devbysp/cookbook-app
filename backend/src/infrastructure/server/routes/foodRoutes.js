const app = require('../adapters');
const foodService = require('../../../services/food/foodService');
const { withSlash } = require('../../../utils/path/path');

const basePath = withSlash(process.env.BASE_PATH);

app.get(`${basePath}/food`, (_req, res) => {
  foodService.getAllFoods()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

// endpoint.post(`${basePath}/food`, (req, res) => {
//   validateNewFood(req.body)
//     .then((food) => {
//       foodsTable.addNewFood(res, food);
//       res.send();
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });
// 
// endpoint.delete(`${basePath}/food/:id`, (req, res) => {
//   foodsTable.deleteFood(req.params.id)
//     .then(() => res.send());
// });


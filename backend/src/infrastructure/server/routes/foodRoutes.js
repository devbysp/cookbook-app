const app = require('../adapters');
const foodService = require('../../../services/food/foodService');
const { 
  logger, 
  withSlash, 
  ExceptionTypes, 
  wrapException
} = require('../../../utils');

const basePath = withSlash(process.env.BASE_PATH);

app.get(`${basePath}/food`, async (_req, res) => {
  try {
    logger.debug(`GET: ${basePath}/food`);

    const result = await foodService.getAllFoods();
    res.send(result);
  }
  catch(error) {
    res.status(500).send(error)

    if(error.type === ExceptionTypes.CRITICAL) {
      throw wrapException(`GET: ${basePath}/food failed`, error);
    }
  }
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


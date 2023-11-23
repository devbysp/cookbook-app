import axios from 'axios';
import { getEndpoint } from '../helpers/endpoint';

export function loadFoods(onSuccess) {
  const endpoint = getEndpoint('food');
  const message = `GET ${endpoint}`;
  console.debug(message);
  axios
    .get(endpoint)
    .then((res) => {
      if (res.status !== 200) {
        console.debug(message, `status: ${res.status}`);
        return;
      }
      console.debug(message, `status: ${res.status}`, 'response:', res.data);
      onSuccess(res.data);
    });
}

export function addNewFood(food, onSuccess) {
  const endpoint = getEndpoint('food');
  const message = `PUT ${endpoint}`;
  console.debug(message, food);
  axios
    .post(endpoint, food, (res) => {
      if (res.status !== 200) {
        console.debug(message, `status: ${res.status}`);
        return;
      }
      console.debug(message, `status: ${res.status}`);
      onSuccess();
    });
}

export function deleteFood(food, onSuccess) {
  const endpoint = `${getEndpoint('food')}/${food.id}`;
  const message = `DELETE ${endpoint}`;
  console.debug(message, food);
  axios
    .delete(endpoint, (res) => {
      if (res.status !== 200) {
        console.debug(message, `status: ${res.status}`);
        return;
      }
      console.debug(message, `status: ${res.status}`);
      onSuccess();
    });
}

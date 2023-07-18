import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 } // Ramp up to 100 requests per second over 1 minute
  ],
};

export default function () {
  let min = 900000;
  let max = 1000011;
  let product_id = Math.floor(Math.random() * (max - min)) + min;
  let res = http.get(`http://localhost:9000/products/${product_id}/styles`);

  sleep(1);
}
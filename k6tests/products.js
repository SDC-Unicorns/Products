import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 } // Ramp up to 100 requests per second over 1 minute
  ],
};

export default function () {
  let res = http.get(`http://localhost:9000/products`);

  sleep(1); // Sleep for 1 second to maintain the desired throughput
}
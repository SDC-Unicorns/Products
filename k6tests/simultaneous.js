import http from 'k6/http';
import { sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 4250 },
    { duration: '30s', target: 4250 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  let min = 900000;
  let max = 1000011;
  let product_id = Math.floor(Math.random() * (max - min)) + min;

  group('product', function() {
    let res1 = http.get(`http://localhost:9000/products/${product_id}`);
    sleep(1); // Sleep for 1 second to maintain the desired throughput
  });

  group('styles', function() {
    let res2 = http.get(`http://localhost:9000/products/${product_id}/styles`);
    sleep(1);
  });

  group('related', function() {
    let res3 = http.get(`http://localhost:9000/products/${product_id}/styles`);
    sleep(1);
  });


}
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  hosts: {
    'test.ingress-nginx-controller.ga:80': '127.0.0.1:80',
    'test.ingress-nginx-controller.ga:443': '127.0.0.1:443',
  },
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    http_req_duration: ['p(99)<1500'], // 95 percent of response times must be below 1500ms
  },
};

export default function () {
  const params = {
    headers: {'host': 'test.ingress-nginx-controller.ga'},
  };
  const res = http.get('http://test.ingress-nginx-controller.ga/user-agent', params);
  sleep(1);
}

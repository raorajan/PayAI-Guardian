import http from 'k6/http';
import { check, sleep } from 'k6';

// 500 Users Optimized Load Test
export const options = {
  discardResponseBodies: true, // Reduce memory and socket overhead
  noConnectionReuse: false,    // Force connection reuse (Keep-Alive)
  
  stages: [
    { duration: '30s', target: 1000 }, // Ramp up to 1000
    { duration: '1m', target: 1000 },  // Steady state at 1000
    { duration: '30s', target: 0 },    // Ramp down
  ],
  
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const url = 'http://localhost:8000/health';
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive', // Crucial for 500+ users
    },
  };

  const res = http.get(url, params);

  // Validate the response
  const checkResult = check(res, {
    'is status 200': (r) => r.status === 200,
  });

  if (!checkResult) {
    console.error(`Request failed: Status ${res.status}`);
  }

  sleep(1);
}

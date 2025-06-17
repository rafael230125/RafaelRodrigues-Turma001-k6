import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },    // Sobe para 10 VUs em 1 minuto
    { duration: '5m', target: 300 },   // Sobe para 300 VUs ao longo de 5 minutos
    { duration: '5m', target: 300 },   // Mantém 300 VUs por 5 minutos
    { duration: '2m', target: 0 },     // Reduz gradualmente para 0
  ],
};

export default function () {
  const res = http.get('https://reqres.in/api/users?page=2');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}

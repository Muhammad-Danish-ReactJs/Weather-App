export function getTicket(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10));
}

export function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

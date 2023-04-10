export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let num = from; num <= to; num += 1) {
    numbers.push(num);
  }

  return numbers;
}

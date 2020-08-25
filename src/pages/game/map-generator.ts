import { Difficulty } from './index'

function generateField(size:number, dif: Difficulty): number[] {
  let bombCount = 0;
  const field = new Array(size * size).fill(0).map(() => {
    if (Math.random() < 0.25 + (0.05 * dif) && bombCount < size + dif) {
      bombCount++;
      return 9;
    }
    return 0;
  });
  return field;
}

export default generateField;
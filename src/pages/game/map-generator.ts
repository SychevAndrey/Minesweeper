import { Difficulty } from './index'

function generateField(size:number, dif: Difficulty): number[] {
  let bombCount = 0;
  const length = size * size;
  let field = new Array(length).fill(0).map((item, index) => {
    if (Math.random() < (1 / size) + (0.001 * dif * index) && bombCount < size + dif) {
      bombCount++;
      return 9;
    }
    return 0;
  });
  for (let i = 0; i <= length; i++) {
    if (field[i] === 9) {
      if (i % size !== 0) {
        if (field[i - 1] < 9) field[i - 1] += 1;
        if (field[i + size - 1] < 9) field[i + size - 1] += 1;
        if (field[i - size - 1] < 9) field[i - size - 1] += 1;
      }
      if (i % (Math.floor(i / size + 1) * (size) - 1) !== 0) {
        if (field[i + 1] < 9) field[i + 1] += 1;
        if (field[i + size + 1] < 9) field[i + size + 1] += 1;
        if (field[i - size + 1] < 9) field[i - size + 1] += 1;
      }
      if (field[i + size] < 9) field[i + size] += 1;
      if (field[i - size] < 9) field[i - size] += 1;
    }
  }
  console.log("THE FIELD HAS BEEN GENERATED")
  return field;
}

export default generateField;
export class Matrix {
  rows: number
  cols: number
  data: number[][]

  constructor(values: number[][]) {
    this.rows = values.length
    this.cols = values[0].length
    this.data = values

    for (const row of values) {
      if (row.length !== this.cols) {
        throw new Error('Todas as linhas devem ter o mesmo número de colunas.')
      }
    }
  }

  print() {
    console.log(this.data.map((row) => row.join(' ')).join('\n'))
  }

  multiplyByMatrix(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(
        'A multiplicação não é possível. O número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.',
      )
    }

    const result = new Matrix(
      Array(this.rows)
        .fill([])
        .map(() => Array(other.cols).fill(0)),
    )

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        for (let k = 0; k < this.cols; k++) {
          result.data[i][j] += this.data[i][k] * other.data[k][j]
        }
      }
    }

    return result
  }

  multiplyByVector(vector: number[]): number[] {
    if (this.cols !== vector.length) {
      throw new Error(
        'A multiplicação não é possível. O número de colunas da matriz deve ser igual ao número de elementos do vetor.',
      )
    }

    const result = Array(this.rows).fill(0)

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result[i] += this.data[i][j] * vector[j]
      }
    }

    return result
  }
}

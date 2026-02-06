

export const generateUserBarcode = () => {
  // 先頭3桁固定
  let code = "108"

  // 残り9桁（チェックデジット除く）をランダム生成
  for (let i = 0; i < 9; i++) {
    code += Math.floor(Math.random() * 10).toString()
  }

  // チェックデジット計算
  const checkDigit = calcJAN13CheckDigit(code)

  return code + checkDigit.toString()
}

// JAN-13 チェックデジット計算
const calcJAN13CheckDigit = (code12: string): number  => {
  let sum = 0

  for (let i = 0; i < code12.length; i++) {
    const digit = Number(code12[i])
    if (i % 2 === 0) {
      sum += digit
    } else {
      sum += digit * 3
    }
  }

  return (10 - (sum % 10)) % 10
}
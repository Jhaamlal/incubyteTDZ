/**
 * 1. In a test-first manner, create a simple class class StringCalculator
with a method public int Add(string numbers)
1. The method can take 0, 1 or 2 numbers, and will return their sum
(for an empty string it will return 0) 
for example 
“” == 0 , “1” == 1 , “1,2” == 3
2. Start with the simplest test case of an empty string and move to one & two 
numbers
3. Remember to solve things as simply as possible so that you force yourself to 
write tests you did not think about
4. Remember to refactor after each passing tes
 */

export class StringCalculator {
  private static callCount = 0

  public add(numbers: string): number {
    StringCalculator.callCount++

    if (numbers === "") {
      return 0
    }

    // Split the input by comma
    const tokens = numbers.split(",")
    const parsedNumbers: number[] = []
    const negatives: number[] = []

    for (const token of tokens) {
      const num = parseInt(token, 10)
      if (num < 0) {
        negatives.push(num)
      }
      parsedNumbers.push(num)
    }

    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(", ")}`)
    }

    return parsedNumbers.reduce((sum, num) => sum + num, 0)
  }

  public getCalledCount(): number {
    return StringCalculator.callCount
  }
}

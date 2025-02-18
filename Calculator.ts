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
  private callCount = 0
  public addOccurred: Array<(input: string, result: number) => void> = []

  public add(numbers: string): number {
    this.callCount++
    let delimiters: string[] = [",", "\n"]
    let numStr = numbers

    // Custom delimiter support
    if (numbers.startsWith("//")) {
      const delimEndIndex = numbers.indexOf("\n")
      const delimSpec = numbers.substring(2, delimEndIndex)

      // Delimiters  square brackets.

      if (delimSpec.startsWith("[") && delimSpec.endsWith("]")) {
        // Match one or more delimiters of any length with rejex
        const delimiterMatches = delimSpec.match(/\[(.*?)\]/g)
        if (delimiterMatches) {
          delimiters = delimiterMatches.map((d) => d.slice(1, -1))
        }
      } else {
        // Single-character delimiter
        delimiters = [delimSpec]
      }
      numStr = numbers.substring(delimEndIndex + 1)
    }

    // Escape delimiters for regex
    const escapedDelimiters = delimiters.map((delim) =>
      delim.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    )
    const regexPattern = new RegExp(escapedDelimiters.join("|"), "g")
    const tokens = numStr.split(regexPattern).filter((val) => val !== "")

    const nums = tokens.map((token) => parseInt(token, 10))

    // Check for negatives
    const negatives = nums.filter((n) => n < 0)
    if (negatives.length > 0) {
      throw new Error("negatives not allowed " + negatives.join(" "))
    }

    // Ignore if more then 1000
    const sum = nums.reduce((acc, cur) => (cur > 1000 ? acc : acc + cur), 0)

    // Trigger the event callbacks
    for (const callback of this.addOccurred) {
      callback(numbers, sum)
    }

    return sum
  }
  // simple to count callCount
  public getCalledCount(): number {
    return this.callCount
  }
}

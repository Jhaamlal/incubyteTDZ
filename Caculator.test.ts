/**
 * Calculator => Take sting , and number
 * Now we need to see How  Base case,normal Case,Edge Case ,Special Case
 * what if both are empty
 * what if one of them is empty
 * If Something UN-CHANGE
 */
import { StringCalculator } from "./Calculator"

describe("Calculator-test", () => {
  let calculator: StringCalculator
  beforeEach(() => {
    calculator = new StringCalculator()
  })
  //      when zero
  test("empty string condition ", () => {
    expect(calculator.add("")).toBe(0)
  })
  //   when 1
  test("When single Item is provides  ", () => {
    expect(calculator.add("1")).toBe(1)
  })
  // when 2
  test("When single Item is provides  ", () => {
    expect(calculator.add("1,2")).toBe(3)
  })

  //   any number
  test("sums n amount of numbers", () => {
    expect(calculator.add("1,2,3,4")).toBe(10)
  })
  //  negative
  test(" Error for negative numbers with the negatives listed", () => {
    expect(() => calculator.add("1,-2,3,-4")).toThrow(/negatives not allowed /)
  })
})

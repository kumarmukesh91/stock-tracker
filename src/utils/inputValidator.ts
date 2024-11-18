export const validateIsin = (isin: string) => {
  /**
   * The bellow regex validates ISIN code like US0378331005
   * It should be a combination of numbers and letters and of length 12
   * The ISIN code only begin with letters and it should end with numbers
   * It should not contain any spaces or special character
   **/

  const regex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/
  return regex.test(isin)
}

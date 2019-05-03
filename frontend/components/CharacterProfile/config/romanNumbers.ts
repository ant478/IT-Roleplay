type ArabicNumber = 1 | 2 | 3 | 4 | 5;
type RomanNumbers = Record<ArabicNumber, string>;

const romanNumbers: RomanNumbers = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
};

export default romanNumbers;

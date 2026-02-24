function powBigInt(base: bigint, exponent: bigint): bigint {
  let result = 1n;
  let currentBase = base;
  let currentExponent = exponent;

  while (currentExponent > 0n) {
    if (currentExponent % 2n === 1n) {
      result *= currentBase;
    }
    currentBase *= currentBase;
    currentExponent /= 2n;
  }

  return result;
}

function isPrime(value: number): boolean {
  if (value < 2) {
    return false;
  }

  if (value === 2) {
    return true;
  }

  if (value % 2 === 0) {
    return false;
  }

  const limit = Math.floor(Math.sqrt(value));
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    if (value % divisor === 0) {
      return false;
    }
  }

  return true;
}

function isSquareAndCube(value: number): boolean {
  if (value < 0) {
    return false;
  }

  const sixthRoot = Math.round(Math.pow(value, 1 / 6));
  return sixthRoot ** 6 === value;
}

export default function QueryProcessor(query: string): string {
  const normalizedQuery = query.toLowerCase();

  const minusMatch = normalizedQuery.match(/what is (-?\d+) minus (-?\d+)\??/);
  if (minusMatch) {
    const left = BigInt(minusMatch[1]);
    const right = BigInt(minusMatch[2]);
    return (left - right).toString();
  }

  const multiplyMatch = normalizedQuery.match(
    /what is (-?\d+) multiplied by (-?\d+)\??/
  );
  if (multiplyMatch) {
    const left = BigInt(multiplyMatch[1]);
    const right = BigInt(multiplyMatch[2]);
    return (left * right).toString();
  }

  const powerMatch = normalizedQuery.match(
    /what is (-?\d+) to the power of (-?\d+)\??/
  );
  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    const exponent = BigInt(powerMatch[2]);

    if (exponent < 0n) {
      return "";
    }

    return powBigInt(base, exponent).toString();
  }

  if (normalizedQuery.includes("which of the following numbers are primes")) {
    const numbers = (query.match(/-?\d+/g) || []).map((value) =>
      Number.parseInt(value, 10)
    );
    const primeNumbers = numbers.filter((value) => isPrime(value));
    return primeNumbers.join(", ");
  }

  if (normalizedQuery.includes("both a square and a cube")) {
    const numbers = (query.match(/-?\d+/g) || []).map((value) =>
      Number.parseInt(value, 10)
    );
    const squareAndCubeNumbers = numbers.filter((value) =>
      isSquareAndCube(value)
    );
    return squareAndCubeNumbers.join(", ");
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (normalizedQuery.includes("my name is")) {
    const name = query
      .slice(normalizedQuery.indexOf("my name is") + "my name is".length)
      .trim();

    return name;
  }

  if (normalizedQuery.includes("name")) {
    return "justinw5";
  }

  if (normalizedQuery.includes("andrew id")) {
    return "justinw5";
  }

  return "";
}

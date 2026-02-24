export default function QueryProcessor(query: string): string {
  const normalizedQuery = query.toLowerCase();

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
    return "Rohan";
  }

  if (normalizedQuery.includes("andrew id")) {
    return "justinw5";
  }

  return "";
}

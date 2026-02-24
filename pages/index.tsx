import { FormEvent, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  async function submitQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      setResponse("No Match");
      return;
    }

    const apiResponse = await fetch(`/api?q=${encodeURIComponent(query)}`);
    const body = await apiResponse.text();
    setResponse(body || "No Match");
  }

  return (
    <div>
      <h1>Welcome!!</h1>
      <p>Please enter your query in the box below:</p>
      <form onSubmit={submitQuery}>
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <button type="submit">Ask</button>
      </form>
      <div>{response || "No Match"}</div>
    </div>
  );
}

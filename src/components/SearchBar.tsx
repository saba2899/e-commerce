import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      className="relative w-[220px] sm:w-[260px] md:w-[320px]"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="header-search" className="sr-only">
        Search
      </label>
      <input
        id="header-seearch"
        type="search"
        placeholder="What are you looking for?"
        className="w-full pl-4 pr-10 py-2 rounded-md bg-[#EFF0F6] placeholder=[#A0A3BD] outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/5"
      >
        <CiSearch size={22} />
      </button>
    </form>
  );
}

export default SearchBar;

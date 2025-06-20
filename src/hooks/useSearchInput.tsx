import { usefetchSearchMovie } from "@Apis/fetchSearchMovie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounceState } from "./useDebounceState";

const useSearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const debouncedValue = useDebounceState({
    value: searchInput,
    ms: 3000,
  });
  const { data, isLoading, error } = usefetchSearchMovie(debouncedValue);

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(debouncedValue)}`);
    }
  }, [debouncedValue, navigate]);

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const useSearchResults = (query: string) => usefetchSearchMovie(query);

  return {
    searchInput,
    data,
    isLoading,
    error,
    handleSearchInputChange,
    handleSearch,
    handleKeyPress,
    useSearchResults,
  };
};

export default useSearchInput;

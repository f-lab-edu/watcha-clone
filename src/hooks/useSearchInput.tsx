import { useSearchMovieQuery } from "@Apis/fetchSearchMovie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const { data, isLoading, error } = useSearchMovieQuery(debouncedValue);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchInput);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(debouncedValue)}`);
    }
  }, [debouncedValue, navigate]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const useSearchResults = (query: string) => {
    const { data, isLoading, error } = useSearchMovieQuery(query);

    return {
      data,
      isLoading,
      error,
    };
  };

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

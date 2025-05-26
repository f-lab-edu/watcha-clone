import { useState } from "react";

const useSearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputClick = () => {
    console.log("url 이동");
  };

  return {
    searchInput,
    handleSearchInputChange,
    handleSearchInputClick,
  };
};

export default useSearchInput;

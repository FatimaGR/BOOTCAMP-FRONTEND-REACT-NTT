import { FC } from "react";
import searchIcon from "../assets/icons/search.svg"

interface SearchInputProps {
  filterBySearch: (searchInputValue: string) => void
}

const SearchInput: FC<SearchInputProps> = ({filterBySearch}) => {
  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue: string = target.value.trim().toUpperCase();
    filterBySearch(searchInputValue);
  }

  return(
    <div className="search-form">
      <input type="text" onChange={handleChange} name="search-input" placeholder="Search products..."/>
      <img src={searchIcon} alt="Search icon" />
    </div>
  )
}

export default SearchInput;
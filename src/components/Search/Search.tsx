import { FC } from "react";
import searchIcon from "../../assets/icons/search.svg"
import Input from "../../shared/components/Input/Input";

interface SearchInputProps {
  filterBySearch: (searchInputValue: string) => void,
}

const SearchInput: FC<SearchInputProps> = ({filterBySearch}) => {
  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = target.value.trim().toUpperCase();
    filterBySearch(searchInputValue);
  }

  return(
    <Input 
      firstContainerClassName="search-form"
      onChange={handleChange}
      name="search-input"
      placeholder="Search products..."
      icon={searchIcon}
      iconAlt="Search for products"
    />
  )
}

export default SearchInput;
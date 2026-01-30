import { SearchIcon } from '../assets/icons/dashboard-icons/dashboard'

type SearchBarProps = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({
  placeholder = 'Search for anything',
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={placeholder}
        className='search-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className='search-button' type='button'>
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBar
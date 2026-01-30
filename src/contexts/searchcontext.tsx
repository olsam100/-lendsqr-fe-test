import { createContext, useContext, type ReactNode } from 'react'

type SearchContextType = {
  searchQuery: string
}

const SearchContext = createContext<SearchContextType>({ searchQuery: '' })

export const useSearchQuery = () => useContext(SearchContext)

export const SearchQueryProvider = ({
  value,
  children,
}: {
  value: string
  children?: ReactNode
}) => {
  return (
    <SearchContext.Provider value={{ searchQuery: value }}>
      {children}
    </SearchContext.Provider>
  )
}

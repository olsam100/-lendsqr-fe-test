import { useState } from 'react'

type FilterDropdownProps = {
  onClose: () => void
  onApply: (filters: FilterValues) => void
  columnId: 'company' | 'username'
}

export type FilterValues = {
  searchValue: string
  email?: string
  phone?: string
  selectedStatus?: string
  dateFrom?: string
  dateTo?: string
}

const FilterDropdown = ({
  onClose,
  onApply,
  columnId,
}: FilterDropdownProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const handleReset = () => {
    setSearchValue('')
    setEmail('')
    setPhone('')
    setSelectedStatus('')
    setDateFrom('')
    setDateTo('')
  }

  const handleApply = () => {
    onApply({
      searchValue,
      email,
      phone,
      selectedStatus,
      dateFrom,
      dateTo,
    })
    onClose()
  }

  return (
    <div className='filter-dropdown' onClick={(e) => e.stopPropagation()}>
      <div className='filter-dropdown-content'>
        <div className='filter-field'>
          <label>{columnId === 'company' ? 'Organization' : 'Username'}</label>
          <input
            type='text'
            placeholder={`Enter ${
              columnId === 'company' ? 'organization' : 'username'
            }`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='filter-input'
          />
        </div>

        <div className='filter-field'>
          <label>Email</label>
          <input
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='filter-input'
          />
        </div>

        <div className='filter-field'>
          <label>Phone Number</label>
          <input
            type='text'
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='filter-input'
          />
        </div>

        <div className='filter-field'>
          <label>Date</label>
          <input
            type='date'
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className='filter-input'
          />
        </div>

        <div className='filter-field'>
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='filter-select'
          >
            <option value=''>Select status</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
            <option value='pending'>Pending</option>
            <option value='blacklisted'>Blacklisted</option>
          </select>
        </div>

        <div className='filter-actions'>
          <button onClick={handleReset} className='filter-btn reset-btn'>
            Reset
          </button>
          <button onClick={handleApply} className='filter-btn apply-btn'>
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterDropdown

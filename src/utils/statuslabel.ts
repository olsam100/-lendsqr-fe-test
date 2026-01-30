export const getActionButtonLabel = (currentStatus: string) => {
  switch (currentStatus.toLowerCase()) {
    case 'active':
      return 'Blacklist User'
    case 'blacklisted':
      return 'Activate User'
    case 'pending':
      return 'Approve User'
    case 'inactive':
      return 'Activate User'
    default:
      return 'Manage Status'
  }
}

export const getActionButtonClass = (currentStatus: string) => {
  if (currentStatus.toLowerCase() === 'active') {
    return 'btn-danger'
  }
  return 'btn-success'
}

export const isActionDisabled = (currentStatus: string) => {
  return currentStatus.toLowerCase() === 'pending'
}

type SearchCallback = (query: string) => void

class SearchBus {
  private listeners: Set<SearchCallback> = new Set()

  subscribe(callback: SearchCallback) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  publish(query: string) {
    this.listeners.forEach((callback) => callback(query))
  }
}

export const searchBus = new SearchBus()

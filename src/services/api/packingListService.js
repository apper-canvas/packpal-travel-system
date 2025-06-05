import packingListsData from '../mockData/packingLists.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let packingLists = [...packingListsData]

export const packingListService = {
  async getAll() {
    await delay(300)
    return [...packingLists]
  },

  async getById(id) {
    await delay(200)
    const list = packingLists.find(l => l.id === id)
    if (!list) throw new Error('Packing list not found')
    return { ...list }
  },

  async getByTripId(tripId) {
    await delay(250)
    const list = packingLists.find(l => l.tripId === tripId)
    return list ? { ...list } : null
  },

  async create(listData) {
    await delay(400)
    const newList = {
      id: Date.now().toString(),
      ...listData,
      lastModified: new Date().toISOString()
    }
    packingLists = [newList, ...packingLists]
    return { ...newList }
  },

  async update(id, data) {
    await delay(300)
    const index = packingLists.findIndex(l => l.id === id)
    if (index === -1) throw new Error('Packing list not found')
    
    const updatedList = { 
      ...packingLists[index], 
      ...data,
      lastModified: new Date().toISOString()
    }
    packingLists[index] = updatedList
    return { ...updatedList }
  },

  async delete(id) {
    await delay(250)
    const index = packingLists.findIndex(l => l.id === id)
    if (index === -1) throw new Error('Packing list not found')
    
    packingLists = packingLists.filter(l => l.id !== id)
    return { success: true }
  }
}
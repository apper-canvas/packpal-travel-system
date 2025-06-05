import remindersData from '../mockData/reminders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let reminders = [...remindersData]

export const reminderService = {
  async getAll() {
    await delay(300)
    return [...reminders]
  },

  async getById(id) {
    await delay(200)
    const reminder = reminders.find(r => r.id === id)
    if (!reminder) throw new Error('Reminder not found')
    return { ...reminder }
  },

  async getByCategory(category) {
    await delay(250)
    return reminders.filter(r => r.category === category).map(r => ({ ...r }))
  },

  async create(reminderData) {
    await delay(400)
    const newReminder = {
      id: Date.now().toString(),
      ...reminderData
    }
    reminders = [newReminder, ...reminders]
    return { ...newReminder }
  },

  async update(id, data) {
    await delay(300)
    const index = reminders.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Reminder not found')
    
    const updatedReminder = { ...reminders[index], ...data }
    reminders[index] = updatedReminder
    return { ...updatedReminder }
  },

  async delete(id) {
    await delay(250)
    const index = reminders.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Reminder not found')
    
    reminders = reminders.filter(r => r.id !== id)
    return { success: true }
  }
}
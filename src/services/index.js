import { tripService } from './api/tripService.js'
import { packingListService } from './api/packingListService.js'
import { reminderService } from './api/reminderService.js'

export {
  tripService,
  packingListService,
  reminderService
}

export const weightService = {
  convertToKg: (grams) => grams / 1000,
  convertToLbs: (grams) => grams / 453.592,
  formatWeight: (grams, unit = 'kg') => {
    const converted = unit === 'lbs' ? grams / 453.592 : grams / 1000;
    return `${converted.toFixed(1)} ${unit}`;
  }
}
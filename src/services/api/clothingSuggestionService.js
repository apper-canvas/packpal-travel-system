// Clothing suggestion calculation service
let userPreferences = {
  clothingStyle: 'average',
  activityLevel: 'moderate',
  climate: 'mixed'
};

const clothingSuggestionService = {
  async calculateSuggestions({ duration, hasLaundry, laundryFrequency, clothingStyle, activityLevel, climate }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const baseCalculations = {
      shirts: duration,
      pants: Math.ceil(duration / 2),
      underwear: duration,
      socks: duration,
      sweaters: Math.ceil(duration / 4),
      sleepwear: Math.ceil(duration / 3)
    };

    // Adjust for laundry availability
    let suggestions = { ...baseCalculations };
    if (hasLaundry === 'yes' && laundryFrequency > 0) {
      const laundryFactor = Math.ceil(duration / laundryFrequency);
      suggestions.shirts = Math.max(3, laundryFactor + 2);
      suggestions.pants = Math.max(2, Math.ceil(laundryFactor / 2) + 1);
      suggestions.underwear = Math.max(3, laundryFactor + 2);
      suggestions.socks = Math.max(3, laundryFactor + 2);
      suggestions.sweaters = Math.max(1, Math.ceil(duration / 7));
      suggestions.sleepwear = Math.max(2, Math.ceil(laundryFactor / 2) + 1);
    }

    // Apply style multipliers
    const styleMultipliers = {
      minimalist: 0.8,
      average: 1.0,
      overpacker: 1.3
    };
    const styleMultiplier = styleMultipliers[clothingStyle] || 1.0;

    // Apply activity level adjustments
    const activityAdjustments = {
      relaxing: { shirts: -1, pants: 0, underwear: 0, socks: 0 },
      moderate: { shirts: 0, pants: 0, underwear: 0, socks: 0 },
      active: { shirts: 2, pants: 1, underwear: 2, socks: 2 }
    };
    const activityAdjustment = activityAdjustments[activityLevel] || activityAdjustments.moderate;

    // Apply climate adjustments
    const climateAdjustments = {
      hot: { shirts: 1, pants: -1, underwear: 1, socks: 1, sweaters: -1 },
      cold: { shirts: 0, pants: 0, underwear: 0, socks: 1, sweaters: 2 },
      mixed: { shirts: 0, pants: 0, underwear: 0, socks: 0, sweaters: 1 }
    };
    const climateAdjustment = climateAdjustments[climate] || climateAdjustments.mixed;

    // Calculate final suggestions
    const finalSuggestions = {};
    Object.keys(suggestions).forEach(category => {
      let quantity = Math.ceil(suggestions[category] * styleMultiplier);
      quantity += activityAdjustment[category] || 0;
      quantity += climateAdjustment[category] || 0;
      finalSuggestions[category] = Math.max(1, quantity);
    });

    // Generate reasoning text
    const reasoning = this.generateReasoning({
      duration,
      hasLaundry,
      laundryFrequency,
      clothingStyle,
      activityLevel,
      climate
    });

    return {
      items: finalSuggestions,
      reasoning,
      preferences: { clothingStyle, activityLevel, climate }
    };
  },

  generateReasoning({ duration, hasLaundry, laundryFrequency, clothingStyle, activityLevel, climate }) {
    let reasoning = `For your ${duration}-day trip, `;

    if (hasLaundry === 'yes') {
      reasoning += `with laundry available every ${laundryFrequency} days, `;
    } else {
      reasoning += 'without laundry facilities, ';
    }

    reasoning += `we've calculated quantities based on your ${clothingStyle} packing style, `;
    reasoning += `${activityLevel} activity level, and ${climate} climate conditions. `;

    if (clothingStyle === 'minimalist') {
      reasoning += 'We've reduced quantities to help you pack light. ';
    } else if (clothingStyle === 'overpacker') {
      reasoning += 'We've included extra items for peace of mind. ';
    }

    if (activityLevel === 'active') {
      reasoning += 'Extra clothing items are included for high-activity days. ';
    }

    if (climate === 'hot') {
      reasoning += 'Increased shirts and underwear for hot weather comfort.';
    } else if (climate === 'cold') {
      reasoning += 'Additional warm layers for cold weather protection.';
    } else {
      reasoning += 'Balanced quantities for variable weather conditions.';
    }

    return reasoning;
  },

  async savePreferences(preferences) {
    await new Promise(resolve => setTimeout(resolve, 200));
    userPreferences = { ...userPreferences, ...preferences };
    return userPreferences;
  },

  async getPreferences() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { ...userPreferences };
  }
};

export default clothingSuggestionService;
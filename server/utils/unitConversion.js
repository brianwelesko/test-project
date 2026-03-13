// Unit conversion utility for server-side package deductions
// Ported from app.js client-side logic

// Ingredient density database (grams per teaspoon)
// Sources: USDA FoodData Central, King Arthur Baking
const INGREDIENT_DENSITIES = {
    // Spices (ground) - grams per teaspoon
    'allspice': 1.9,
    'anise': 2.1,
    'basil': 0.7,
    'bay leaf': 0.6,
    'bay leaves': 0.6,
    'cardamom': 2.0,
    'cayenne': 1.8,
    'cayenne pepper': 1.8,
    'celery seed': 2.0,
    'chili powder': 2.6,
    'chipotle': 2.5,
    'cinnamon': 2.3,
    'cloves': 2.1,
    'coriander': 1.8,
    'cumin': 2.1,
    'curry powder': 2.0,
    'dill': 1.0,
    'dill weed': 1.0,
    'fennel': 2.0,
    'fennel seed': 2.0,
    'fenugreek': 3.7,
    'garam masala': 2.0,
    'garlic powder': 2.8,
    'ginger': 1.8,
    'mace': 1.7,
    'marjoram': 0.6,
    'mustard': 3.0,
    'mustard powder': 3.0,
    'mustard seed': 3.3,
    'nutmeg': 2.2,
    'onion powder': 2.4,
    'oregano': 1.0,
    'paprika': 2.3,
    'smoked paprika': 2.3,
    'parsley': 0.5,
    'pepper': 2.3,
    'black pepper': 2.3,
    'white pepper': 2.4,
    'red pepper': 1.8,
    'red pepper flakes': 1.5,
    'rosemary': 1.2,
    'saffron': 0.7,
    'sage': 0.7,
    'salt': 6.0,
    'sea salt': 5.0,
    'kosher salt': 4.8,
    'table salt': 6.0,
    'tarragon': 0.7,
    'thyme': 0.8,
    'turmeric': 3.0,
    'vanilla': 4.2,

    // Herbs (dried) - grams per teaspoon
    'chives': 0.5,
    'cilantro': 0.5,
    'mint': 0.5,
    'peppermint': 0.5,

    // Baking ingredients
    'baking powder': 4.6,
    'baking soda': 4.6,
    'cocoa': 2.5,
    'cocoa powder': 2.5,
    'cornstarch': 2.5,
    'cream of tartar': 3.0,
    'yeast': 3.1,
    'active dry yeast': 3.1,
    'instant yeast': 3.0,

    // Sugars & sweeteners
    'sugar': 4.2,
    'white sugar': 4.2,
    'granulated sugar': 4.2,
    'brown sugar': 4.0,
    'powdered sugar': 2.5,
    'confectioners sugar': 2.5,
    'honey': 7.0,
    'maple syrup': 6.7,
    'molasses': 6.9,

    // Flours & grains
    'flour': 2.6,
    'all-purpose flour': 2.6,
    'bread flour': 2.6,
    'whole wheat flour': 2.5,
    'almond flour': 2.1,
    'coconut flour': 2.1,
    'rice flour': 2.6,
    'oats': 2.5,
    'rolled oats': 2.5,
    'cornmeal': 2.9,

    // Oils & fats
    'oil': 4.5,
    'olive oil': 4.5,
    'vegetable oil': 4.5,
    'coconut oil': 4.5,
    'butter': 4.7,
    'margarine': 4.7,

    // Liquids
    'water': 5.0,
    'milk': 5.1,
    'cream': 4.8,
    'vinegar': 5.0,
    'soy sauce': 5.3,
    'lemon juice': 5.1,
    'lime juice': 5.1,

    // Seeds & nuts
    'sesame seeds': 3.0,
    'poppy seeds': 2.8,
    'chia seeds': 2.4,
    'flax seeds': 2.5,
    'flaxseed': 2.5,

    // Default fallback for unknown ingredients
    '_default_spice': 2.0,
    '_default_herb': 0.7,
    '_default_liquid': 5.0,
    '_default_dairy': 5.0,
    '_default_nut_butter': 5.4,
    '_default': 2.5
};

// Volume units and their conversion to teaspoons
const volumeToTsp = {
    'tsp': 1,
    'tbsp': 3,
    'cups': 48,
    'cup': 48,
    'ml': 0.2029,
    'l': 202.9
};

// Weight units and their conversion to grams
const weightToGrams = {
    'g': 1,
    'kg': 1000,
    'oz': 28.35,
    'lbs': 453.6,
    'lb': 453.6
};

/**
 * Get the density of an ingredient (grams per teaspoon)
 * Uses fuzzy matching to find the best match
 */
function getIngredientDensity(ingredientName) {
    if (!ingredientName) return INGREDIENT_DENSITIES['_default'];

    const name = ingredientName.toLowerCase().trim();

    // Try exact match first
    if (INGREDIENT_DENSITIES[name]) {
        return INGREDIENT_DENSITIES[name];
    }

    // Try partial match - check if ingredient contains a known item
    for (const [key, density] of Object.entries(INGREDIENT_DENSITIES)) {
        if (key.startsWith('_')) continue; // Skip defaults
        if (name.includes(key) || key.includes(name)) {
            return density;
        }
    }

    // Try matching individual words
    const words = name.split(/\s+/);
    for (const word of words) {
        if (word.length < 3) continue;
        for (const [key, density] of Object.entries(INGREDIENT_DENSITIES)) {
            if (key.startsWith('_')) continue;
            if (key.includes(word) || word.includes(key)) {
                return density;
            }
        }
    }

    // Use category-based defaults
    if (name.includes('oil') || name.includes('vinegar') || name.includes('sauce')) {
        return INGREDIENT_DENSITIES['_default_liquid'];
    }
    if (name.includes('herb') || name.includes('leaf') || name.includes('leaves')) {
        return INGREDIENT_DENSITIES['_default_herb'];
    }

    // Fallback to default spice density
    return INGREDIENT_DENSITIES['_default'];
}

/**
 * Convert a quantity from one unit to another
 * Returns null if conversion is not possible
 */
function convertQuantity(amount, fromUnit, toUnit, ingredientName = '') {
    if (fromUnit === toUnit) return amount;

    // Normalize units
    fromUnit = normalizeUnit(fromUnit);
    toUnit = normalizeUnit(toUnit);

    if (fromUnit === toUnit) return amount;

    const isFromVolume = volumeToTsp[fromUnit] !== undefined;
    const isToVolume = volumeToTsp[toUnit] !== undefined;
    const isFromWeight = weightToGrams[fromUnit] !== undefined;
    const isToWeight = weightToGrams[toUnit] !== undefined;

    // Same category conversion (volume to volume or weight to weight)
    if (isFromVolume && isToVolume) {
        const tsp = amount * volumeToTsp[fromUnit];
        return Math.round((tsp / volumeToTsp[toUnit]) * 100) / 100;
    }

    if (isFromWeight && isToWeight) {
        const grams = amount * weightToGrams[fromUnit];
        return Math.round((grams / weightToGrams[toUnit]) * 100) / 100;
    }

    // Cross-category conversion (volume <-> weight) using density
    const density = getIngredientDensity(ingredientName);

    if (isFromVolume && isToWeight && density) {
        // Convert volume to tsp, then to grams using density
        const tsp = amount * volumeToTsp[fromUnit];
        const grams = tsp * density;
        return Math.round((grams / weightToGrams[toUnit]) * 100) / 100;
    }

    if (isFromWeight && isToVolume && density) {
        // Convert weight to grams, then to tsp using density
        const grams = amount * weightToGrams[fromUnit];
        const tsp = grams / density;
        return Math.round((tsp / volumeToTsp[toUnit]) * 100) / 100;
    }

    // Count units (items) - if both are 'items', they're equivalent
    if (fromUnit === 'items' && toUnit === 'items') {
        return amount;
    }

    // Items can't be converted to volume/weight units
    if (fromUnit === 'items' || toUnit === 'items') {
        return null;
    }

    // Unknown units - return null
    return null;
}

/**
 * Normalize unit names to standard form
 */
function normalizeUnit(unit) {
    if (!unit) return 'items';

    const normalized = unit.toLowerCase().trim();

    const unitMap = {
        'teaspoon': 'tsp',
        'teaspoons': 'tsp',
        'tablespoon': 'tbsp',
        'tablespoons': 'tbsp',
        'tbs': 'tbsp',
        'cups': 'cup',
        'c': 'cup',
        'ounce': 'oz',
        'ounces': 'oz',
        'pound': 'lbs',
        'pounds': 'lbs',
        'gram': 'g',
        'grams': 'g',
        'kilogram': 'kg',
        'kilograms': 'kg',
        'milliliter': 'ml',
        'milliliters': 'ml',
        'liter': 'l',
        'liters': 'l'
    };

    return unitMap[normalized] || normalized;
}

module.exports = {
    convertQuantity,
    getIngredientDensity,
    normalizeUnit,
    INGREDIENT_DENSITIES
};

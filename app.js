// Spice Inventory Tracker - Main Application

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

    // Oils & fats (approximate - liquids)
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

    // Default fallback for unknown spices
    '_default_spice': 2.0,
    '_default_herb': 0.7,
    '_default_liquid': 5.0,
    '_default': 2.5
};

// Default expiration days by category
const EXPIRATION_DEFAULTS = {
    'produce': 7,
    'dairy': 14,
    'protein': 5,
    'herb': 7,
    'canned': 730,
    'frozen': 180,
    'grain': 365,
    'spice': 1095,
    'seasoning': 730,
    'oil': 365,
    'baking': 365,
    'other': 30
};

// Category display names
const CATEGORY_NAMES = {
    'spice': 'Spice',
    'herb': 'Herb',
    'seasoning': 'Seasoning Blend',
    'produce': 'Produce',
    'dairy': 'Dairy & Refrigerated',
    'canned': 'Canned & Jarred',
    'grain': 'Grain & Pasta',
    'frozen': 'Frozen',
    'oil': 'Oil/Vinegar/Condiment',
    'baking': 'Baking Supply',
    'protein': 'Protein',
    'other': 'Other'
};

// Location display names
const LOCATION_NAMES = {
    'pantry': 'Pantry',
    'fridge': 'Refrigerator',
    'freezer': 'Freezer',
    'spice-cabinet': 'Spice Cabinet',
    'counter': 'Counter',
    'other': 'Other'
};

// Ingredient database for auto-categorization and expiration
const INGREDIENT_DATABASE = {
    // Proteins
    'chicken': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'chicken breast': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'chicken thighs': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'ground beef': { category: 'protein', location: 'fridge', expirationDays: 3 },
    'beef': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'steak': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'pork': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'pork chops': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'bacon': { category: 'protein', location: 'fridge', expirationDays: 7 },
    'sausage': { category: 'protein', location: 'fridge', expirationDays: 5 },
    'fish': { category: 'protein', location: 'fridge', expirationDays: 2 },
    'salmon': { category: 'protein', location: 'fridge', expirationDays: 2 },
    'tuna': { category: 'protein', location: 'fridge', expirationDays: 2 },
    'shrimp': { category: 'protein', location: 'freezer', expirationDays: 180 },
    'eggs': { category: 'protein', location: 'fridge', expirationDays: 35 },
    'tofu': { category: 'protein', location: 'fridge', expirationDays: 7 },
    'turkey': { category: 'protein', location: 'fridge', expirationDays: 3 },
    'ground turkey': { category: 'protein', location: 'fridge', expirationDays: 3 },
    'lamb': { category: 'protein', location: 'fridge', expirationDays: 5 },

    // Dairy
    'milk': { category: 'dairy', location: 'fridge', expirationDays: 14 },
    'butter': { category: 'dairy', location: 'fridge', expirationDays: 90 },
    'cheese': { category: 'dairy', location: 'fridge', expirationDays: 30 },
    'cheddar': { category: 'dairy', location: 'fridge', expirationDays: 30 },
    'mozzarella': { category: 'dairy', location: 'fridge', expirationDays: 21 },
    'parmesan': { category: 'dairy', location: 'fridge', expirationDays: 60 },
    'cream cheese': { category: 'dairy', location: 'fridge', expirationDays: 21 },
    'yogurt': { category: 'dairy', location: 'fridge', expirationDays: 14 },
    'sour cream': { category: 'dairy', location: 'fridge', expirationDays: 21 },
    'heavy cream': { category: 'dairy', location: 'fridge', expirationDays: 10 },
    'half and half': { category: 'dairy', location: 'fridge', expirationDays: 10 },
    'cottage cheese': { category: 'dairy', location: 'fridge', expirationDays: 14 },

    // Produce
    'lettuce': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'spinach': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'kale': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'arugula': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'tomato': { category: 'produce', location: 'counter', expirationDays: 7 },
    'tomatoes': { category: 'produce', location: 'counter', expirationDays: 7 },
    'onion': { category: 'produce', location: 'pantry', expirationDays: 30 },
    'onions': { category: 'produce', location: 'pantry', expirationDays: 30 },
    'garlic': { category: 'produce', location: 'pantry', expirationDays: 30 },
    'potato': { category: 'produce', location: 'pantry', expirationDays: 21 },
    'potatoes': { category: 'produce', location: 'pantry', expirationDays: 21 },
    'sweet potato': { category: 'produce', location: 'pantry', expirationDays: 21 },
    'carrot': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'carrots': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'celery': { category: 'produce', location: 'fridge', expirationDays: 14 },
    'broccoli': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'cauliflower': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'bell pepper': { category: 'produce', location: 'fridge', expirationDays: 10 },
    'peppers': { category: 'produce', location: 'fridge', expirationDays: 10 },
    'cucumber': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'zucchini': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'squash': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'mushrooms': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'asparagus': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'green beans': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'corn': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'cabbage': { category: 'produce', location: 'fridge', expirationDays: 14 },
    'apple': { category: 'produce', location: 'fridge', expirationDays: 30 },
    'apples': { category: 'produce', location: 'fridge', expirationDays: 30 },
    'banana': { category: 'produce', location: 'counter', expirationDays: 7 },
    'bananas': { category: 'produce', location: 'counter', expirationDays: 7 },
    'orange': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'oranges': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'lemon': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'lemons': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'lime': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'limes': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'avocado': { category: 'produce', location: 'counter', expirationDays: 5 },
    'ginger': { category: 'produce', location: 'fridge', expirationDays: 21 },
    'jalapeño': { category: 'produce', location: 'fridge', expirationDays: 14 },
    'jalapeno': { category: 'produce', location: 'fridge', expirationDays: 14 },
    'berries': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'strawberries': { category: 'produce', location: 'fridge', expirationDays: 5 },
    'blueberries': { category: 'produce', location: 'fridge', expirationDays: 7 },
    'grapes': { category: 'produce', location: 'fridge', expirationDays: 10 },

    // Spices
    'salt': { category: 'spice', location: 'spice-cabinet', expirationDays: 1825 },
    'pepper': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'black pepper': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'paprika': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'smoked paprika': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'cumin': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'cinnamon': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'nutmeg': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'turmeric': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'cayenne': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'chili powder': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'garlic powder': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'onion powder': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'ginger powder': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'curry powder': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'garam masala': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'coriander': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'cardamom': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'cloves': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'allspice': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },
    'red pepper flakes': { category: 'spice', location: 'spice-cabinet', expirationDays: 1095 },

    // Herbs (dried)
    'oregano': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'basil': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'thyme': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'rosemary': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'parsley': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'cilantro': { category: 'herb', location: 'fridge', expirationDays: 7 },
    'bay leaves': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'dill': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'sage': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'mint': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'tarragon': { category: 'herb', location: 'spice-cabinet', expirationDays: 730 },
    'chives': { category: 'herb', location: 'fridge', expirationDays: 7 },

    // Grains & Pasta
    'rice': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'white rice': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'brown rice': { category: 'grain', location: 'pantry', expirationDays: 180 },
    'basmati rice': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'jasmine rice': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'pasta': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'spaghetti': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'penne': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'noodles': { category: 'grain', location: 'pantry', expirationDays: 730 },
    'bread': { category: 'grain', location: 'counter', expirationDays: 7 },
    'tortillas': { category: 'grain', location: 'pantry', expirationDays: 14 },
    'oats': { category: 'grain', location: 'pantry', expirationDays: 365 },
    'oatmeal': { category: 'grain', location: 'pantry', expirationDays: 365 },
    'quinoa': { category: 'grain', location: 'pantry', expirationDays: 365 },
    'couscous': { category: 'grain', location: 'pantry', expirationDays: 365 },
    'cereal': { category: 'grain', location: 'pantry', expirationDays: 180 },

    // Baking
    'flour': { category: 'baking', location: 'pantry', expirationDays: 365 },
    'all-purpose flour': { category: 'baking', location: 'pantry', expirationDays: 365 },
    'bread flour': { category: 'baking', location: 'pantry', expirationDays: 365 },
    'whole wheat flour': { category: 'baking', location: 'pantry', expirationDays: 180 },
    'sugar': { category: 'baking', location: 'pantry', expirationDays: 730 },
    'brown sugar': { category: 'baking', location: 'pantry', expirationDays: 730 },
    'powdered sugar': { category: 'baking', location: 'pantry', expirationDays: 730 },
    'baking soda': { category: 'baking', location: 'pantry', expirationDays: 540 },
    'baking powder': { category: 'baking', location: 'pantry', expirationDays: 365 },
    'vanilla extract': { category: 'baking', location: 'pantry', expirationDays: 1825 },
    'vanilla': { category: 'baking', location: 'pantry', expirationDays: 1825 },
    'cocoa powder': { category: 'baking', location: 'pantry', expirationDays: 1095 },
    'chocolate chips': { category: 'baking', location: 'pantry', expirationDays: 730 },
    'yeast': { category: 'baking', location: 'fridge', expirationDays: 120 },
    'cornstarch': { category: 'baking', location: 'pantry', expirationDays: 730 },

    // Oils & Condiments
    'olive oil': { category: 'oil', location: 'pantry', expirationDays: 730 },
    'vegetable oil': { category: 'oil', location: 'pantry', expirationDays: 365 },
    'coconut oil': { category: 'oil', location: 'pantry', expirationDays: 730 },
    'sesame oil': { category: 'oil', location: 'pantry', expirationDays: 365 },
    'avocado oil': { category: 'oil', location: 'pantry', expirationDays: 365 },
    'vinegar': { category: 'oil', location: 'pantry', expirationDays: 1825 },
    'balsamic vinegar': { category: 'oil', location: 'pantry', expirationDays: 1095 },
    'apple cider vinegar': { category: 'oil', location: 'pantry', expirationDays: 1825 },
    'rice vinegar': { category: 'oil', location: 'pantry', expirationDays: 1825 },
    'soy sauce': { category: 'oil', location: 'pantry', expirationDays: 1095 },
    'fish sauce': { category: 'oil', location: 'pantry', expirationDays: 1095 },
    'hot sauce': { category: 'oil', location: 'pantry', expirationDays: 1095 },
    'sriracha': { category: 'oil', location: 'pantry', expirationDays: 730 },
    'ketchup': { category: 'oil', location: 'fridge', expirationDays: 180 },
    'mustard': { category: 'oil', location: 'fridge', expirationDays: 365 },
    'mayonnaise': { category: 'oil', location: 'fridge', expirationDays: 60 },
    'honey': { category: 'oil', location: 'pantry', expirationDays: 1825 },
    'maple syrup': { category: 'oil', location: 'fridge', expirationDays: 365 },
    'peanut butter': { category: 'oil', location: 'pantry', expirationDays: 270 },
    'almond butter': { category: 'oil', location: 'pantry', expirationDays: 270 },
    'worcestershire': { category: 'oil', location: 'pantry', expirationDays: 1095 },
    'bbq sauce': { category: 'oil', location: 'fridge', expirationDays: 180 },
    'teriyaki sauce': { category: 'oil', location: 'fridge', expirationDays: 365 },
    'salsa': { category: 'oil', location: 'fridge', expirationDays: 30 },

    // Canned & Jarred
    'canned tomatoes': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'diced tomatoes': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'crushed tomatoes': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'tomato paste': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'tomato sauce': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'marinara': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'beans': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'black beans': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'kidney beans': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'pinto beans': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'chickpeas': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'garbanzo beans': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'lentils': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'coconut milk': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'broth': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'chicken broth': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'beef broth': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'vegetable broth': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'stock': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'tuna canned': { category: 'canned', location: 'pantry', expirationDays: 1095 },
    'olives': { category: 'canned', location: 'pantry', expirationDays: 730 },
    'pickles': { category: 'canned', location: 'fridge', expirationDays: 365 },

    // Frozen
    'frozen vegetables': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'frozen peas': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'frozen corn': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'frozen broccoli': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'frozen fruit': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'frozen berries': { category: 'frozen', location: 'freezer', expirationDays: 240 },
    'ice cream': { category: 'frozen', location: 'freezer', expirationDays: 60 },
    'frozen pizza': { category: 'frozen', location: 'freezer', expirationDays: 180 },
    'frozen chicken': { category: 'frozen', location: 'freezer', expirationDays: 270 },
    'frozen fish': { category: 'frozen', location: 'freezer', expirationDays: 180 }
};

class PantryInventory {
    constructor() {
        this.storageKey = 'spiceInventory';
        this.inventory = this.loadInventory();
        this.editingId = null;

        // New state for command bar enhancements
        this.pendingDeleteId = null;
        this.currentLocationFilter = null;
        this.currentSpecialFilter = null;
        this.currentSortMode = null;

        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('spiceForm');
        this.formSection = document.getElementById('formSection');
        this.formTitle = document.getElementById('formTitle');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.editIdInput = document.getElementById('editId');
        this.nameInput = document.getElementById('name');
        this.quantityInput = document.getElementById('quantity');
        this.unitSelect = document.getElementById('unit');
        this.thresholdInput = document.getElementById('threshold');
        this.categorySelect = document.getElementById('category');
        this.locationSelect = document.getElementById('location');
        this.purchaseDateInput = document.getElementById('purchaseDate');
        this.expirationDateInput = document.getElementById('expirationDate');
        this.isStapleCheckbox = document.getElementById('isStaple');
        this.boughtFromInput = document.getElementById('boughtFrom');

        // Recipe section
        this.recipeSection = document.getElementById('recipeSection');

        // Quick links
        this.quickLinks = document.querySelectorAll('.command-quick-links a');

        // Live search filter
        this.currentSearchFilter = '';

        // Inventory elements
        this.inventoryList = document.getElementById('inventoryList');
        this.filterCategory = document.getElementById('filterCategory');
        this.sortBy = document.getElementById('sortBy');

        // Alerts elements
        this.alertsSection = document.getElementById('alertsSection');
        this.expiringAlerts = document.getElementById('expiringAlerts');
        this.expiringList = document.getElementById('expiringList');
        this.lowStockAlerts = document.getElementById('lowStockAlerts');
        this.lowStockList = document.getElementById('lowStockList');

        // Recipe elements
        this.recipeText = document.getElementById('recipeText');
        this.recipeFile = document.getElementById('recipeFile');
        this.dropZone = document.getElementById('dropZone');
        this.browseBtn = document.getElementById('browseBtn');
        this.fileName = document.getElementById('fileName');
        this.parseRecipeBtn = document.getElementById('parseRecipeBtn');
        this.parsedResults = document.getElementById('parsedResults');
        this.matchedIngredients = document.getElementById('matchedIngredients');
        this.unmatchedIngredients = document.getElementById('unmatchedIngredients');
        this.unmatchedList = document.getElementById('unmatchedList');
        this.applyRecipeBtn = document.getElementById('applyRecipeBtn');
        this.cancelRecipeBtn = document.getElementById('cancelRecipeBtn');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.pasteTab = document.getElementById('pasteTab');
        this.uploadTab = document.getElementById('uploadTab');

        // Quick Deduct elements (command-palette style)
        this.quickDeductInput = document.getElementById('quickDeductInput');
        this.quickDeductSuggestions = document.getElementById('quickDeductSuggestions');
        this.quickDeductPreview = document.getElementById('quickDeductPreview');
        this.quickDeductBtn = document.getElementById('quickDeductBtn');
        this.quickDeductMore = document.getElementById('quickDeductMore');
        this.quickDeductExpanded = document.getElementById('quickDeductExpanded');

        // Expanded form elements
        this.selectedItemName = document.getElementById('selectedItemName');
        this.selectedItemQty = document.getElementById('selectedItemQty');
        this.deductAmountInput = document.getElementById('deductAmount');
        this.deductUnitSelect = document.getElementById('deductUnit');
        this.deductPreviewExpanded = document.getElementById('deductPreviewExpanded');
        this.cancelQuickUseBtn = document.getElementById('cancelQuickUse');
        this.confirmDeductBtn = document.getElementById('confirmDeduct');

        // Help panel
        this.commandHelp = document.getElementById('commandHelp');

        // Item details modal
        this.itemDetailsModal = document.getElementById('itemDetailsModal');
        this.closeDetailsBtn = document.getElementById('closeDetails');
        this.detailsEditBtn = document.getElementById('detailsEditBtn');
        this.detailsCloseBtn = document.getElementById('detailsCloseBtn');
        this.currentDetailsItemId = null;

        // Mobile filter modal
        this.mobileFilterBtn = document.getElementById('mobileFilterBtn');
        this.filterModal = document.getElementById('filterModal');
        this.closeFilterModalBtn = document.getElementById('closeFilterModal');
        this.filterCategoryMobile = document.getElementById('filterCategoryMobile');
        this.sortByMobile = document.getElementById('sortByMobile');
        this.applyFiltersBtn = document.getElementById('applyFiltersBtn');
        this.clearFiltersBtn = document.getElementById('clearFiltersBtn');

        // Store parsed data
        this.parsedRecipeData = null;
        this.selectedQuickUseItem = null;
        this.highlightedSuggestionIndex = -1;
    }

    bindEvents() {
        // Form events
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());

        // Quick links events
        this.quickLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const command = link.dataset.command;
                if (command === 'add') {
                    this.showAddForm();
                } else if (command === 'recipe') {
                    this.showRecipeSection();
                } else if (command === 'help') {
                    this.toggleHelp();
                }
            });
        });

        // Item details modal events
        if (this.closeDetailsBtn) {
            this.closeDetailsBtn.addEventListener('click', () => this.hideItemDetails());
        }
        if (this.detailsCloseBtn) {
            this.detailsCloseBtn.addEventListener('click', () => this.hideItemDetails());
        }
        if (this.detailsEditBtn) {
            this.detailsEditBtn.addEventListener('click', () => {
                this.hideItemDetails();
                if (this.currentDetailsItemId) {
                    this.startEdit(this.currentDetailsItemId);
                }
            });
        }
        if (this.itemDetailsModal) {
            this.itemDetailsModal.addEventListener('click', (e) => {
                // Close if clicking outside modal content
                if (e.target === this.itemDetailsModal) {
                    this.hideItemDetails();
                }
            });
        }

        // Filter and sort events
        this.filterCategory.addEventListener('change', () => this.render());
        this.sortBy.addEventListener('change', () => this.render());

        // Mobile filter modal events
        if (this.mobileFilterBtn) {
            this.mobileFilterBtn.addEventListener('click', () => this.showFilterModal());
        }
        if (this.closeFilterModalBtn) {
            this.closeFilterModalBtn.addEventListener('click', () => this.hideFilterModal());
        }
        if (this.filterModal) {
            this.filterModal.addEventListener('click', (e) => {
                if (e.target === this.filterModal) {
                    this.hideFilterModal();
                }
            });
        }
        if (this.applyFiltersBtn) {
            this.applyFiltersBtn.addEventListener('click', () => this.applyMobileFilters());
        }
        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener('click', () => this.clearMobileFilters());
        }

        // Recipe events
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        this.browseBtn.addEventListener('click', () => this.recipeFile.click());
        this.recipeFile.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });
        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('dragover');
        });
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processFile(files[0]);
            }
        });

        this.parseRecipeBtn.addEventListener('click', () => this.parseRecipe());
        this.applyRecipeBtn.addEventListener('click', () => this.applyRecipeDeductions());
        this.cancelRecipeBtn.addEventListener('click', () => this.cancelRecipe());

        // Quick Deduct events (command-palette style)
        this.quickDeductInput.addEventListener('input', () => this.handleQuickDeductInput());
        this.quickDeductInput.addEventListener('focus', () => this.handleQuickDeductInput());
        this.quickDeductInput.addEventListener('keydown', (e) => this.handleQuickDeductKeydown(e));
        this.quickDeductBtn.addEventListener('click', () => this.executeQuickDeduct());
        this.quickDeductMore.addEventListener('click', () => this.toggleExpandedForm());
        this.quickDeductSuggestions.addEventListener('click', (e) => {
            const item = e.target.closest('.suggestion-item');
            if (item) this.selectSuggestion(item.dataset.id);
        });

        // Expanded form events
        this.deductAmountInput.addEventListener('input', () => this.updateExpandedPreview());
        this.deductUnitSelect.addEventListener('change', () => this.updateExpandedPreview());
        this.cancelQuickUseBtn.addEventListener('click', () => this.cancelExpandedForm());
        this.confirmDeductBtn.addEventListener('click', () => this.confirmExpandedDeduct());

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.quick-use-section')) {
                this.quickDeductSuggestions.classList.add('hidden');
            }
        });
    }

    // Local Storage Operations
    loadInventory() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveInventory() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.inventory));
    }

    // Capitalize first letter of each word
    capitalizeWords(str) {
        return str.trim().split(/\s+/).map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    // CRUD Operations
    addItem(item) {
        const purchaseDate = item.purchaseDate || new Date().toISOString().split('T')[0];
        const expirationDate = item.expirationDate || this.autoCalculateExpiration(item.category, purchaseDate);
        const qty = parseFloat(item.quantity);
        // Default threshold to 20% of quantity if not specified
        const threshold = item.threshold ? parseFloat(item.threshold) : Math.round(qty * 0.2 * 10) / 10;

        const newItem = {
            id: Date.now().toString(),
            name: this.capitalizeWords(item.name),
            quantity: qty,
            unit: item.unit,
            threshold: threshold,
            category: item.category,
            location: item.location || '',
            purchaseDate: purchaseDate,
            expirationDate: expirationDate,
            isStaple: item.isStaple || false,
            boughtFrom: item.boughtFrom ? item.boughtFrom.trim() : '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.inventory.push(newItem);
        this.saveInventory();
        return newItem;
    }

    // Auto-calculate expiration date based on category
    autoCalculateExpiration(category, purchaseDate) {
        const days = EXPIRATION_DEFAULTS[category] || EXPIRATION_DEFAULTS['other'];
        const date = new Date(purchaseDate);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    // Get days until expiration (negative if expired)
    getDaysUntilExpiration(item) {
        if (!item.expirationDate) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expDate = new Date(item.expirationDate);
        const diffTime = expDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Get expiration status: 'fresh', 'expiring-soon', 'expired'
    getExpirationStatus(item) {
        const days = this.getDaysUntilExpiration(item);
        if (days === null) return 'fresh';
        if (days < 0) return 'expired';
        if (days <= 3) return 'expiring-soon';
        return 'fresh';
    }

    // Get urgency score for sorting (higher = more urgent)
    getItemUrgency(item) {
        let urgency = 0;
        const days = this.getDaysUntilExpiration(item);

        // Expired items are most urgent
        if (days !== null && days < 0) urgency += 100;
        // Expiring within 3 days
        else if (days !== null && days <= 3) urgency += 50;
        // Expiring within 7 days
        else if (days !== null && days <= 7) urgency += 20;

        // Low stock adds urgency
        if (item.threshold > 0 && item.quantity <= item.threshold) urgency += 30;

        return urgency;
    }

    // Get items expiring within N days
    getExpiringItems(withinDays = 5) {
        return this.inventory.filter(item => {
            const days = this.getDaysUntilExpiration(item);
            return days !== null && days >= 0 && days <= withinDays;
        }).sort((a, b) => {
            return this.getDaysUntilExpiration(a) - this.getDaysUntilExpiration(b);
        });
    }

    updateItem(id, updates) {
        const index = this.inventory.findIndex(item => item.id === id);
        if (index !== -1) {
            this.inventory[index] = {
                ...this.inventory[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveInventory();
            return this.inventory[index];
        }
        return null;
    }

    deleteItem(id) {
        this.inventory = this.inventory.filter(item => item.id !== id);
        this.saveInventory();
    }

    getItem(id) {
        return this.inventory.find(item => item.id === id);
    }

    // Search functionality
    searchItem(query) {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return null;

        // Find exact match first, then partial matches
        let result = this.inventory.find(item =>
            item.name.toLowerCase() === searchTerm
        );

        if (!result) {
            result = this.inventory.find(item =>
                item.name.toLowerCase().includes(searchTerm)
            );
        }

        return result;
    }

    handleSearch() {
        const query = this.searchInput.value.trim();

        if (!query) {
            this.searchResult.classList.add('hidden');
            return;
        }

        const result = this.searchItem(query);
        this.searchResult.classList.remove('hidden');

        if (result) {
            const isLowStock = result.threshold > 0 && result.quantity <= result.threshold;
            this.searchResult.className = 'search-result found';
            this.searchResult.innerHTML = `
                <h3>Found: ${this.escapeHtml(result.name)}</h3>
                <p class="quantity-display ${isLowStock ? 'low-stock' : ''}">
                    ${result.quantity} ${result.unit}
                </p>
                <p><strong>Category:</strong> ${this.formatCategory(result.category)}</p>
                ${result.threshold > 0 ? `<p><strong>Low stock alert:</strong> Below ${result.threshold} ${result.unit}</p>` : ''}
                ${isLowStock ? '<p style="color: #dc3545; font-weight: bold;">⚠️ Low stock! Time to buy more!</p>' : ''}
                ${result.notes ? `<p><strong>Notes:</strong> ${this.escapeHtml(result.notes)}</p>` : ''}
                <p style="font-size: 0.85rem; color: #888; margin-top: 10px;">
                    Last updated: ${this.formatDate(result.updatedAt)}
                </p>
            `;
        } else {
            this.searchResult.className = 'search-result not-found';
            this.searchResult.innerHTML = `
                <h3>Not Found</h3>
                <p>"${this.escapeHtml(query)}" is not in your inventory.</p>
                <p>Would you like to add it?</p>
            `;
        }
    }

    // Get low stock items
    getLowStockItems() {
        return this.inventory.filter(item =>
            item.threshold > 0 && item.quantity <= item.threshold
        );
    }

    // Form handling
    handleSubmit(e) {
        e.preventDefault();

        const itemData = {
            name: this.nameInput.value,
            quantity: this.quantityInput.value,
            unit: this.unitSelect.value,
            threshold: this.thresholdInput.value,
            category: this.categorySelect.value,
            location: this.locationSelect.value,
            purchaseDate: this.purchaseDateInput.value,
            expirationDate: this.expirationDateInput.value,
            isStaple: this.isStapleCheckbox.checked,
            boughtFrom: this.boughtFromInput.value
        };

        if (this.editingId) {
            // Auto-recalculate expiration if purchase date changed but expiration wasn't manually adjusted
            const originalItem = this.inventory.find(i => i.id === parseInt(this.editingId));
            if (originalItem &&
                itemData.purchaseDate !== originalItem.purchaseDate &&
                itemData.expirationDate === originalItem.expirationDate) {
                itemData.expirationDate = this.autoCalculateExpiration(itemData.category, itemData.purchaseDate);
            }
            this.updateItem(this.editingId, itemData);
            this.cancelEdit();
        } else {
            this.addItem(itemData);
        }

        this.form.reset();
        this.render();
    }

    startEdit(id) {
        const item = this.getItem(id);
        if (!item) return;

        this.editingId = id;
        this.formTitle.textContent = 'Edit Item';
        this.submitBtn.textContent = 'Update Item';
        this.cancelBtn.classList.remove('hidden');

        this.nameInput.value = item.name;
        this.quantityInput.value = item.quantity;
        this.unitSelect.value = item.unit;
        this.thresholdInput.value = item.threshold || '';
        this.categorySelect.value = item.category;
        this.locationSelect.value = item.location || '';
        this.purchaseDateInput.value = item.purchaseDate || '';
        this.expirationDateInput.value = item.expirationDate || '';
        this.isStapleCheckbox.checked = item.isStaple || false;
        this.boughtFromInput.value = item.boughtFrom || item.notes || '';

        // Show form section if hidden
        this.formSection.classList.remove('hidden');

        // Scroll to form
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    cancelEdit() {
        this.editingId = null;
        this.formTitle.textContent = 'Add New Item';
        this.submitBtn.textContent = 'Add Item';
        this.cancelBtn.classList.add('hidden');
        this.form.reset();
        this.formSection.classList.add('hidden');
    }

    // Quick quantity update
    showQuickUpdate(id) {
        const item = this.getItem(id);
        if (!item) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal">
                <h3>Update Quantity: ${this.escapeHtml(item.name)}</h3>
                <div class="form-group">
                    <label>Current: ${item.quantity} ${item.unit}</label>
                    <input type="number" id="newQuantity" value="${item.quantity}" min="0" step="0.1" style="margin-top: 10px;">
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn-save" id="saveQuantityBtn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const input = overlay.querySelector('#newQuantity');
        input.focus();
        input.select();

        overlay.querySelector('#saveQuantityBtn').addEventListener('click', () => {
            const newQty = parseFloat(input.value);
            if (!isNaN(newQty) && newQty >= 0) {
                this.updateItem(id, { quantity: newQty });
                this.render();
            }
            overlay.remove();
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                overlay.querySelector('#saveQuantityBtn').click();
            }
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    // Rendering
    render() {
        this.renderAlerts();
        this.renderInventory();
    }

    renderAlerts() {
        const expiringItems = this.getExpiringItems(5);
        const lowStockItems = this.getLowStockItems();

        const hasAlerts = expiringItems.length > 0 || lowStockItems.length > 0;

        if (!hasAlerts) {
            this.alertsSection.classList.add('hidden');
            return;
        }

        this.alertsSection.classList.remove('hidden');

        // Render expiring items
        if (expiringItems.length > 0) {
            this.expiringAlerts.classList.remove('hidden');
            this.expiringList.innerHTML = expiringItems.map(item => {
                const days = this.getDaysUntilExpiration(item);
                const urgency = days <= 1 ? 'urgent' : '';
                const daysText = days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;
                return `
                    <div class="alert-item ${urgency}">
                        <span class="item-name">${this.escapeHtml(item.name)}</span>
                        <span class="item-status expiring">
                            Expires ${daysText}
                        </span>
                    </div>
                `;
            }).join('');
        } else {
            this.expiringAlerts.classList.add('hidden');
        }

        // Render low stock items
        if (lowStockItems.length > 0) {
            this.lowStockAlerts.classList.remove('hidden');
            this.lowStockList.innerHTML = lowStockItems.map(item => `
                <div class="alert-item">
                    <span class="item-name">${this.escapeHtml(item.name)}</span>
                    <span class="item-status low-stock">
                        ${item.quantity} ${item.unit} remaining
                    </span>
                </div>
            `).join('');
        } else {
            this.lowStockAlerts.classList.add('hidden');
        }
    }

    updateFilterIndicator() {
        const indicator = document.getElementById('filterIndicator');
        if (!indicator) return;

        const filters = [];
        if (this.currentLocationFilter) {
            filters.push(`@${this.currentLocationFilter}`);
        }
        if (this.currentSpecialFilter === 'low-stock') {
            filters.push('low stock');
        } else if (this.currentSpecialFilter === 'expiring') {
            filters.push('expiring');
        }
        if (this.currentSortMode === 'urgency') {
            filters.push('sorted by urgency');
        }

        if (filters.length > 0) {
            indicator.textContent = `(${filters.join(', ')})`;
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }

    renderInventory() {
        let items = [...this.inventory];

        // Apply live search filter
        if (this.currentSearchFilter) {
            items = items.filter(item =>
                item.name.toLowerCase().includes(this.currentSearchFilter)
            );
        }

        // Filter by category (dropdown)
        const categoryFilter = this.filterCategory.value;
        if (categoryFilter && categoryFilter !== 'all') {
            items = items.filter(item => item.category === categoryFilter);
        }

        // Filter by location (command bar)
        if (this.currentLocationFilter) {
            items = items.filter(item => item.location === this.currentLocationFilter);
        }

        // Special filters (command bar: low, expiring)
        if (this.currentSpecialFilter === 'low-stock') {
            items = items.filter(item => item.threshold > 0 && item.quantity <= item.threshold);
        } else if (this.currentSpecialFilter === 'expiring') {
            items = items.filter(item => {
                const days = this.getDaysUntilExpiration(item);
                return days !== null && days <= 7;
            });
        }

        // Update filter indicator
        this.updateFilterIndicator();

        // Sort items - urgency overrides staples grouping, otherwise staples first
        const sortOption = this.currentSortMode || this.sortBy.value;
        items.sort((a, b) => {
            // Urgency sort: expired > expiring soon > low stock > alphabetical
            // This must come BEFORE staples check to properly prioritize expiring items
            if (sortOption === 'urgency') {
                const urgencyA = this.getItemUrgency(a);
                const urgencyB = this.getItemUrgency(b);
                if (urgencyA !== urgencyB) return urgencyB - urgencyA;
                return a.name.localeCompare(b.name);
            }

            // For non-urgency sorts, staples come first
            if (a.isStaple && !b.isStaple) return -1;
            if (!a.isStaple && b.isStaple) return 1;

            // Then apply normal sort within each group
            switch (sortOption) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'expiration':
                    const daysA = this.getDaysUntilExpiration(a);
                    const daysB = this.getDaysUntilExpiration(b);
                    if (daysA === null && daysB === null) return 0;
                    if (daysA === null) return 1;
                    if (daysB === null) return -1;
                    return daysA - daysB;
                case 'quantity':
                    return a.quantity - b.quantity;
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'store':
                    const storeA = (a.boughtFrom || a.notes || '').toLowerCase();
                    const storeB = (b.boughtFrom || b.notes || '').toLowerCase();
                    if (!storeA && !storeB) return 0;
                    if (!storeA) return 1;
                    if (!storeB) return -1;
                    return storeA.localeCompare(storeB);
                case 'updated':
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                default:
                    return 0;
            }
        });

        if (items.length === 0) {
            this.inventoryList.innerHTML = `
                <div class="empty-state">
                    <p>${this.inventory.length === 0 ? 'Your pantry is empty. Add your first item above!' : 'No items match the selected filter.'}</p>
                </div>
            `;
            return;
        }

        this.inventoryList.innerHTML = items.map(item => {
            const isLowStock = item.threshold > 0 && item.quantity <= item.threshold;
            const expirationStatus = this.getExpirationStatus(item);
            const days = this.getDaysUntilExpiration(item);
            const statusClass = expirationStatus !== 'fresh' ? expirationStatus : (isLowStock ? 'low-stock' : '');

            // Format expiration display
            let expirationDisplay = '';
            if (days !== null) {
                if (days < 0) {
                    expirationDisplay = `<span class="expiration-badge expired">Expired ${Math.abs(days)} days ago</span>`;
                } else if (days === 0) {
                    expirationDisplay = `<span class="expiration-badge expired">Expires today</span>`;
                } else if (days <= 3) {
                    expirationDisplay = `<span class="expiration-badge expiring">Expires in ${days} day${days > 1 ? 's' : ''}</span>`;
                } else if (days <= 7) {
                    expirationDisplay = `<span class="expiration-badge fresh">Expires in ${days} days</span>`;
                }
            }

            // Format location
            const locationDisplay = item.location ? LOCATION_NAMES[item.location] || item.location : '';

            // Show boughtFrom (with fallback to notes for backward compatibility)
            const storeInfo = item.boughtFrom || item.notes || '';

            return `
                <div class="inventory-item ${statusClass}" data-id="${item.id}" onclick="if(!event.target.closest('.item-actions') && !event.target.closest('.overflow-menu'))app.showItemDetails('${this.escapeHtml(item.name).replace(/'/g, "\\'")}')">
                    <div class="item-info">
                        <h3>${this.escapeHtml(item.name)}</h3>
                        <div class="meta">
                            <span class="category-badge">${this.formatCategory(item.category)}</span>
                            ${locationDisplay ? `<span class="location-badge">${locationDisplay}</span>` : ''}
                            ${item.isStaple ? '<span class="staple-badge">Staple</span>' : ''}
                        </div>
                        ${expirationDisplay ? `<div class="expiration-info">${expirationDisplay}</div>` : ''}
                        ${storeInfo ? `<div class="item-store">From: ${this.escapeHtml(storeInfo)}</div>` : ''}
                    </div>
                    <div class="item-quantity">
                        <div class="amount">${item.quantity}</div>
                        <div class="unit">${item.unit}</div>
                    </div>
                    <div class="item-actions desktop-only">
                        <button class="btn-update-qty" onclick="app.showQuickUpdate('${item.id}')">Update Qty</button>
                        <button class="btn-edit" onclick="app.startEdit('${item.id}')">Edit</button>
                        <button class="btn-delete" onclick="app.confirmDelete('${item.id}')">Delete</button>
                    </div>
                    <div class="overflow-menu mobile-only">
                        <button class="overflow-btn" onclick="event.stopPropagation(); app.toggleOverflowMenu('${item.id}')">•••</button>
                        <div id="overflow-${item.id}" class="overflow-dropdown hidden">
                            <button onclick="app.showQuickUpdate('${item.id}'); app.closeAllOverflowMenus();">Update Qty</button>
                            <button onclick="app.startEdit('${item.id}'); app.closeAllOverflowMenus();">Edit</button>
                            <button class="delete-action" onclick="app.confirmDelete('${item.id}'); app.closeAllOverflowMenus();">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    confirmDelete(id) {
        const item = this.getItem(id);
        if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
            this.deleteItem(id);
            this.render();
        }
    }

    // Recipe functionality
    switchTab(tab) {
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        this.pasteTab.classList.toggle('active', tab === 'paste');
        this.uploadTab.classList.toggle('active', tab === 'upload');
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        const validTypes = ['text/plain', 'text/markdown'];
        const validExtensions = ['.txt', '.md'];
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
            alert('Please upload a .txt or .md file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.recipeText.value = e.target.result;
            this.switchTab('paste');
        };
        reader.readAsText(file);

        this.fileName.textContent = file.name;
        this.fileName.classList.remove('hidden');
    }

    parseRecipe() {
        const text = this.recipeText.value.trim();
        if (!text) {
            alert('Please paste or upload a recipe first');
            return;
        }

        const ingredients = this.extractIngredients(text);

        if (ingredients.length === 0) {
            alert('No ingredients found in the recipe. Try formatting each ingredient on its own line.');
            return;
        }

        // Match against inventory
        const matched = [];
        const unmatched = [];

        ingredients.forEach(ing => {
            const match = this.findInventoryMatch(ing.name);
            if (match) {
                // Pass ingredient name for density-based volume<->weight conversion
                const convertedQty = this.convertQuantity(ing.quantity, ing.unit, match.unit, match.name);
                matched.push({
                    ingredient: ing,
                    inventoryItem: match,
                    deductAmount: convertedQty,
                    canConvert: convertedQty !== null,
                    isInsufficient: convertedQty !== null && match.quantity < convertedQty
                });
            } else {
                unmatched.push(ing);
            }
        });

        this.parsedRecipeData = { matched, unmatched };
        this.renderParsedResults();
    }

    extractIngredients(text) {
        const ingredients = [];
        const lines = text.split('\n');

        // Common units to look for
        const unitPatterns = [
            'tablespoons?', 'tbsps?', 'tbs?',
            'teaspoons?', 'tsps?',
            'cups?',
            'ounces?', 'oz',
            'pounds?', 'lbs?',
            'grams?', 'g',
            'kilograms?', 'kgs?', 'kg',
            'milliliters?', 'ml',
            'liters?', 'l',
            'pinch(?:es)?',
            'dash(?:es)?',
            'cloves?',
            'items?',
            'pieces?',
            'cans?',
            'jars?',
            'bunche?s?',
            'sprigs?',
            'slices?',
            'stalks?'
        ];

        const unitRegex = new RegExp(`(${unitPatterns.join('|')})`, 'i');

        // Fraction patterns
        const fractionMap = {
            '½': 0.5, '⅓': 0.333, '⅔': 0.667, '¼': 0.25, '¾': 0.75,
            '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
            '1/2': 0.5, '1/3': 0.333, '2/3': 0.667, '1/4': 0.25, '3/4': 0.75,
            '1/8': 0.125, '3/8': 0.375, '5/8': 0.625, '7/8': 0.875
        };

        lines.forEach(line => {
            line = line.trim();
            if (!line || line.length < 2) return;

            // Skip lines that look like headers or instructions
            if (/^(instructions?|directions?|steps?|method|notes?|serves?|prep|cook|total):/i.test(line)) return;
            if (/^\d+\.\s+[A-Z]/.test(line) && line.length > 50) return; // Numbered instructions

            // Try to extract quantity
            let quantity = 1;
            let unit = '';
            let name = line;

            // Match quantity at the beginning (including fractions)
            const qtyMatch = line.match(/^(\d+\s*[-–]\s*\d+|\d+\.?\d*\s*[-–]?\s*\d*\.?\d*|[½⅓⅔¼¾⅛⅜⅝⅞]|\d+\s*\/\s*\d+|\d+\s+\d+\s*\/\s*\d+)/);

            if (qtyMatch) {
                let qtyStr = qtyMatch[1].trim();
                name = line.substring(qtyMatch[0].length).trim();

                // Handle mixed numbers like "1 1/2"
                const mixedMatch = qtyStr.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
                if (mixedMatch) {
                    quantity = parseInt(mixedMatch[1]) + (parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]));
                } else if (fractionMap[qtyStr]) {
                    quantity = fractionMap[qtyStr];
                } else if (qtyStr.includes('/')) {
                    const [num, den] = qtyStr.split('/').map(s => parseFloat(s.trim()));
                    quantity = num / den;
                } else if (qtyStr.includes('-') || qtyStr.includes('–')) {
                    // Range - take the average
                    const parts = qtyStr.split(/[-–]/).map(s => parseFloat(s.trim()));
                    quantity = (parts[0] + parts[1]) / 2;
                } else {
                    quantity = parseFloat(qtyStr) || 1;
                }
            }

            // Extract unit
            const unitMatch = name.match(unitRegex);
            if (unitMatch) {
                unit = this.normalizeUnit(unitMatch[1]);
                name = name.replace(unitMatch[0], '').trim();
            }

            // Clean up the name
            name = name
                .replace(/^(of\s+)/i, '')
                .replace(/,.*$/, '')  // Remove anything after comma
                .replace(/\(.*?\)/g, '')  // Remove parenthetical notes
                .replace(/\s+/g, ' ')
                .trim();

            // Skip if name is too short or looks like instruction
            if (name.length < 2) return;
            if (/^(and|or|to|for|with|into|until)$/i.test(name)) return;

            ingredients.push({ name, quantity, unit: unit || 'items' });
        });

        return ingredients;
    }

    normalizeUnit(unit) {
        const normalizations = {
            'tablespoon': 'tbsp', 'tablespoons': 'tbsp', 'tbsps': 'tbsp', 'tbs': 'tbsp',
            'teaspoon': 'tsp', 'teaspoons': 'tsp', 'tsps': 'tsp',
            'cup': 'cups',
            'ounce': 'oz', 'ounces': 'oz',
            'pound': 'lbs', 'pounds': 'lbs', 'lb': 'lbs',
            'gram': 'g', 'grams': 'g',
            'kilogram': 'kg', 'kilograms': 'kg', 'kgs': 'kg',
            'clove': 'items', 'cloves': 'items',
            'pinch': 'tsp', 'pinches': 'tsp',
            'dash': 'tsp', 'dashes': 'tsp',
            'piece': 'items', 'pieces': 'items',
            'item': 'items',
            'sprig': 'items', 'sprigs': 'items',
            'stalk': 'items', 'stalks': 'items',
            'slice': 'items', 'slices': 'items',
            'bunch': 'items', 'bunches': 'items',
            'can': 'items', 'cans': 'items',
            'jar': 'items', 'jars': 'items'
        };

        const lower = unit.toLowerCase();
        return normalizations[lower] || lower;
    }

    findInventoryMatch(ingredientName) {
        const searchName = ingredientName.toLowerCase();

        // Try exact match first
        let match = this.inventory.find(item =>
            item.name.toLowerCase() === searchName
        );

        if (!match) {
            // Try if inventory item contains ingredient name or vice versa
            match = this.inventory.find(item => {
                const itemName = item.name.toLowerCase();
                return itemName.includes(searchName) || searchName.includes(itemName);
            });
        }

        if (!match) {
            // Try matching individual words
            const words = searchName.split(/\s+/).filter(w => w.length > 2);
            match = this.inventory.find(item => {
                const itemName = item.name.toLowerCase();
                return words.some(word => itemName.includes(word));
            });
        }

        return match;
    }

    convertQuantity(amount, fromUnit, toUnit, ingredientName = '') {
        if (fromUnit === toUnit) return amount;

        // Volume units and their conversion to teaspoons
        const volumeToTsp = {
            'tsp': 1,
            'tbsp': 3,
            'cups': 48,
            'ml': 0.2029,  // 1 ml ≈ 0.2 tsp
            'l': 202.9     // 1 L = 1000 ml ≈ 202.9 tsp
        };

        // Weight units and their conversion to grams
        const weightToGrams = {
            'g': 1,
            'kg': 1000,
            'oz': 28.35,
            'lbs': 453.6
        };

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
        const density = this.getIngredientDensity(ingredientName);

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

        // Items can't be converted
        if (fromUnit === 'items' || toUnit === 'items') {
            return null;
        }

        // Unknown units - return null
        return null;
    }

    getIngredientDensity(ingredientName) {
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

    renderParsedResults() {
        if (!this.parsedRecipeData) return;

        const { matched, unmatched } = this.parsedRecipeData;

        this.parsedResults.classList.remove('hidden');

        // Render matched ingredients
        if (matched.length === 0) {
            this.matchedIngredients.innerHTML = '<p style="color: #888;">No matching items found in your inventory.</p>';
        } else {
            this.matchedIngredients.innerHTML = matched.map((m, index) => {
                const statusClass = m.isInsufficient ? 'insufficient' : (m.canConvert ? '' : 'warning');
                const afterDeduct = m.canConvert ? Math.max(0, m.inventoryItem.quantity - m.deductAmount) : null;

                return `
                    <div class="ingredient-match ${statusClass}">
                        <input type="checkbox" id="match-${index}" ${m.canConvert ? 'checked' : ''} ${!m.canConvert ? 'disabled' : ''}>
                        <div class="match-info">
                            <div class="match-name">${this.escapeHtml(m.inventoryItem.name)}</div>
                            <div class="match-details">
                                Recipe needs: ${m.ingredient.quantity} ${m.ingredient.unit} ${this.escapeHtml(m.ingredient.name)}
                                ${!m.canConvert ? '<br><em>Cannot convert units automatically</em>' : ''}
                                ${m.isInsufficient ? '<br><em>Not enough in stock!</em>' : ''}
                            </div>
                        </div>
                        <div class="match-amount">
                            <div class="deduct-amount">-${m.canConvert ? m.deductAmount : '?'} ${m.inventoryItem.unit}</div>
                            <div class="current-amount">
                                Have: ${m.inventoryItem.quantity} → ${afterDeduct !== null ? afterDeduct : '?'}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render unmatched ingredients
        if (unmatched.length > 0) {
            this.unmatchedIngredients.classList.remove('hidden');
            this.unmatchedList.innerHTML = unmatched.map(ing =>
                `<div class="unmatched-item">${ing.quantity} ${ing.unit} ${this.escapeHtml(ing.name)}</div>`
            ).join('');
        } else {
            this.unmatchedIngredients.classList.add('hidden');
        }
    }

    applyRecipeDeductions() {
        if (!this.parsedRecipeData) return;

        const { matched } = this.parsedRecipeData;
        let deductedCount = 0;

        matched.forEach((m, index) => {
            const checkbox = document.getElementById(`match-${index}`);
            if (checkbox && checkbox.checked && m.canConvert) {
                const newQty = Math.max(0, m.inventoryItem.quantity - m.deductAmount);
                this.updateItem(m.inventoryItem.id, { quantity: newQty });
                deductedCount++;
            }
        });

        if (deductedCount > 0) {
            alert(`Updated ${deductedCount} item(s) in your inventory.`);
            this.cancelRecipe();
            this.render();
        } else {
            alert('No items were selected for deduction.');
        }
    }

    cancelRecipe() {
        this.parsedRecipeData = null;
        this.parsedResults.classList.add('hidden');
        this.recipeText.value = '';
        this.fileName.classList.add('hidden');
        this.recipeFile.value = '';
        this.recipeSection.classList.add('hidden');
    }

    // Quick Deduct functionality (command-palette style)
    parseCommandInput(input) {
        // Special command: "help"
        if (input.toLowerCase() === 'help') {
            return { action: 'show-help' };
        }

        // Special commands: "add" or "add something"
        const addCommand = input.match(/^add(?:\s+(.+))?$/i);
        if (addCommand) {
            return { action: 'show-add-form', prefill: addCommand[1] ? addCommand[1].trim() : null };
        }

        // Special command: "recipe"
        if (input.toLowerCase() === 'recipe') {
            return { action: 'show-recipe' };
        }

        // Sort command: "sort" or "sort name/qty/exp/etc"
        const sortCommand = input.match(/^sort(?:\s+(\w+))?$/i);
        if (sortCommand) {
            return { action: 'sort', sortBy: sortCommand[1] ? sortCommand[1].toLowerCase() : 'urgency' };
        }

        // Delete command: "delete/del/rm item"
        const deleteCommand = input.match(/^(delete|del|rm)\s+(.+)$/i);
        if (deleteCommand) {
            return { action: 'delete', itemQuery: deleteCommand[2].trim() };
        }

        // Edit command: "edit/e item"
        const editCommand = input.match(/^(edit|e)\s+(.+)$/i);
        if (editCommand) {
            return { action: 'edit', itemQuery: editCommand[2].trim() };
        }

        // Set quantity command: "set item amount [unit]"
        const setQtyCommand = input.match(/^set\s+(.+?)\s+(\d*\.?\d+)(?:\s*([a-zA-Z]+))?$/i);
        if (setQtyCommand) {
            return {
                action: 'set-qty',
                itemQuery: setQtyCommand[1].trim(),
                amount: parseFloat(setQtyCommand[2]),
                unit: setQtyCommand[3] ? this.normalizeUnitShortcut(setQtyCommand[3]) : null
            };
        }

        // Staple toggle: "staple/star item"
        const stapleCommand = input.match(/^(staple|star)\s+(.+)$/i);
        if (stapleCommand) {
            return { action: 'toggle-staple', itemQuery: stapleCommand[2].trim() };
        }

        // Filter by location: "@fridge", "@pantry", etc.
        const locationFilter = input.match(/^@(\w+)$/i);
        if (locationFilter) {
            return { action: 'filter-location', location: this.normalizeLocationShortcut(locationFilter[1]) };
        }

        // Filter by category: "#protein", "#dairy", etc.
        const categoryFilter = input.match(/^#(\w+)$/i);
        if (categoryFilter) {
            return { action: 'filter-category', category: this.normalizeCategoryShortcut(categoryFilter[1]) };
        }

        // Filter shortcuts: "low" for low stock, "expiring" for expiring items
        if (input.toLowerCase() === 'low') {
            return { action: 'filter-low-stock' };
        }
        if (input.toLowerCase() === 'expiring' || input.toLowerCase() === 'exp') {
            return { action: 'filter-expiring' };
        }

        // Close all modules: "close"
        if (input.toLowerCase() === 'close') {
            return { action: 'close-all' };
        }

        // Clear filters: "all" or "clear"
        if (input.toLowerCase() === 'all' || input.toLowerCase() === 'clear') {
            return { action: 'clear-filters' };
        }

        // View command: "view name" or "view partial"
        const viewCommand = input.match(/^view\s+(.+)$/i);
        if (viewCommand) {
            return { action: 'view', itemQuery: viewCommand[1].trim() };
        }

        // DEEP MODE: Just "convert" alone → show conversion panel
        if (input.toLowerCase() === 'convert') {
            return { action: 'show-convert-panel' };
        }

        // Full convert syntax: "convert <amount><unit> [ingredient] to <target>"
        const convertFull = input.match(/^convert\s+(.+?)\s+to\s+([a-zA-Z]+)$/i);
        if (convertFull) {
            const parsed = this.parseConvertExpression(convertFull[1], convertFull[2]);
            if (parsed) return { action: 'convert', ...parsed };
        }

        // Convert with ingredient suggestion: "convert 1/4c oli" (no "to" yet)
        const convertPartial = input.match(/^convert\s+(\d*\.?\d*|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞])\s*([a-zA-Z]+)\s+([^t].*)$/i);
        if (convertPartial && !convertPartial[3].match(/^to\s/i)) {
            return {
                action: 'convert-suggest',
                amount: this.parseAmountString(convertPartial[1]),
                fromUnit: this.normalizeUnitShortcut(convertPartial[2]),
                ingredientQuery: convertPartial[3].trim()
            };
        }

        // Short syntax with explicit target: "<amount><unit> [ingredient] in/to <target>"
        const convertShort = input.match(/^(.+?)\s+(?:in|to)\s+([a-zA-Z]+)$/i);
        if (convertShort && !convertShort[1].match(/^(add|view|recipe|help|\+)/i)) {
            const parsed = this.parseConvertExpression(convertShort[1], convertShort[2]);
            if (parsed) return { action: 'convert', ...parsed };
        }

        // QUICK MODE: "<amount><unit> <ingredient>" (no target) → show unit picker
        const quickConvert = input.match(/^(\d*\.?\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞])\s*([a-zA-Z]+)\s+([a-zA-Z].*)$/i);
        if (quickConvert && !quickConvert[3].match(/^(to|in)\s/i)) {
            const possibleIngredient = quickConvert[3].trim().toLowerCase();
            // Check if it matches a known ingredient from density table OR inventory
            const isInDensityTable = Object.keys(INGREDIENT_DENSITIES).some(name =>
                !name.startsWith('_') && (name.includes(possibleIngredient) || possibleIngredient.includes(name))
            );
            const isInInventory = this.inventory.some(item =>
                item.name.toLowerCase().includes(possibleIngredient) || possibleIngredient.includes(item.name.toLowerCase())
            );
            if (isInDensityTable || isInInventory) {
                return {
                    action: 'convert-quick',
                    amount: this.parseAmountString(quickConvert[1]),
                    fromUnit: this.normalizeUnitShortcut(quickConvert[2]),
                    ingredient: quickConvert[3].trim()
                };
            }
        }

        // New item with @location, #category, !threshold: +name amount unit @location #category !threshold
        // e.g., "+chicken 3lb @fridge #protein !0.5"
        const newItemFull = input.match(/^\+\s*(.+?)\s+(\d*\.?\d+)\s*([a-zA-Z]+)(.*)$/);
        if (newItemFull) {
            const extras = newItemFull[4];
            const locationMatch = extras.match(/@(\S+)/);
            const categoryMatch = extras.match(/#(\S+)/);
            const thresholdMatch = extras.match(/!(\d*\.?\d+)/);
            const name = newItemFull[1].trim();
            return {
                action: 'add-new',
                name: name,
                amount: parseFloat(newItemFull[2]),
                unit: newItemFull[3],
                location: locationMatch ? this.normalizeLocationShortcut(locationMatch[1]) : null,
                category: categoryMatch ? this.normalizeCategoryShortcut(categoryMatch[1]) : null,
                threshold: thresholdMatch ? parseFloat(thresholdMatch[1]) : null
            };
        }

        // New item partial: +name (no amount yet)
        const newItemPartial = input.match(/^\+\s*(.+)$/);
        if (newItemPartial && !newItemPartial[1].match(/\d/)) {
            return { action: 'add-new-partial', name: newItemPartial[1].trim() };
        }

        // Restock existing: name +amount unit
        const restock = input.match(/^(.+?)\s*\+\s*(\d*\.?\d+)\s*([a-zA-Z]+)$/);
        if (restock) {
            return { action: 'restock', itemQuery: restock[1].trim(), amount: parseFloat(restock[2]), unit: restock[3] };
        }

        // Deduct: name -amount unit
        const deduct = input.match(/^(.+?)\s*-\s*(\d*\.?\d+)\s*([a-zA-Z]+)$/);
        if (deduct) {
            return { action: 'deduct', itemQuery: deduct[1].trim(), amount: parseFloat(deduct[2]), unit: deduct[3] };
        }

        // Partial with number but no unit: name -amount or name +amount
        const partialDeduct = input.match(/^(.+?)\s*-\s*(\d+\.?\d*)$/);
        if (partialDeduct) {
            return { action: 'deduct-partial', itemQuery: partialDeduct[1].trim(), amount: partialDeduct[2] };
        }

        const partialRestock = input.match(/^(.+?)\s*\+\s*(\d+\.?\d*)$/);
        if (partialRestock) {
            return { action: 'restock-partial', itemQuery: partialRestock[1].trim(), amount: partialRestock[2] };
        }

        // Just operator: name - or name +
        const justOperator = input.match(/^(.+?)\s*([-+])\s*$/);
        if (justOperator) {
            return { action: 'operator-only', itemQuery: justOperator[1].trim(), operator: justOperator[2] };
        }

        // Just searching
        return { action: 'search', query: input };
    }

    // Normalize location shortcuts
    normalizeLocationShortcut(loc) {
        const shortcuts = {
            'fridge': 'fridge', 'refrigerator': 'fridge', 'ref': 'fridge', 'r': 'fridge',
            'freezer': 'freezer', 'freeze': 'freezer', 'f': 'freezer',
            'pantry': 'pantry', 'p': 'pantry',
            'spice': 'spice-cabinet', 'spices': 'spice-cabinet', 'cabinet': 'spice-cabinet', 'sc': 'spice-cabinet',
            'counter': 'counter', 'c': 'counter',
            'other': 'other', 'o': 'other'
        };
        return shortcuts[loc.toLowerCase()] || loc.toLowerCase();
    }

    // Normalize category shortcuts
    normalizeCategoryShortcut(cat) {
        const shortcuts = {
            'protein': 'protein', 'meat': 'protein', 'pr': 'protein',
            'dairy': 'dairy', 'd': 'dairy',
            'produce': 'produce', 'veg': 'produce', 'vegetable': 'produce', 'fruit': 'produce',
            'spice': 'spice', 'sp': 'spice',
            'herb': 'herb', 'h': 'herb',
            'seasoning': 'seasoning', 'se': 'seasoning',
            'grain': 'grain', 'pasta': 'grain', 'g': 'grain',
            'canned': 'canned', 'can': 'canned', 'ca': 'canned',
            'frozen': 'frozen', 'fr': 'frozen',
            'oil': 'oil', 'condiment': 'oil', 'sauce': 'oil',
            'baking': 'baking', 'b': 'baking',
            'other': 'other', 'o': 'other'
        };
        return shortcuts[cat.toLowerCase()] || cat.toLowerCase();
    }

    // Detect ingredient info from database
    detectIngredientInfo(name) {
        const nameLower = name.toLowerCase().trim();

        // Try exact match
        if (INGREDIENT_DATABASE[nameLower]) {
            return INGREDIENT_DATABASE[nameLower];
        }

        // Try partial matches
        for (const [key, info] of Object.entries(INGREDIENT_DATABASE)) {
            if (nameLower.includes(key) || key.includes(nameLower)) {
                return info;
            }
        }

        // Try word-by-word match
        const words = nameLower.split(/\s+/);
        for (const word of words) {
            if (word.length < 3) continue;
            for (const [key, info] of Object.entries(INGREDIENT_DATABASE)) {
                if (key.includes(word) || word.includes(key)) {
                    return info;
                }
            }
        }

        return null;
    }

    // Legacy parser for backward compatibility
    parseQuickDeductInput(input) {
        const parsed = this.parseCommandInput(input);
        if (parsed && parsed.action === 'deduct') {
            return { itemQuery: parsed.itemQuery, amount: parsed.amount, unit: parsed.unit };
        }
        return null;
    }

    normalizeUnitShortcut(unit) {
        const shortcuts = {
            't': 'tsp', 'T': 'tbsp', 'c': 'cups', 'cup': 'cups',
            'lb': 'lbs', 'tbs': 'tbsp', 'tbsps': 'tbsp',
            'teaspoon': 'tsp', 'teaspoons': 'tsp',
            'tablespoon': 'tbsp', 'tablespoons': 'tbsp',
            // Extended unit aliases
            'gram': 'g', 'grams': 'g',
            'kilogram': 'kg', 'kilograms': 'kg', 'kgs': 'kg',
            'ounce': 'oz', 'ounces': 'oz',
            'pound': 'lbs', 'pounds': 'lbs',
            'milliliter': 'ml', 'milliliters': 'ml', 'mls': 'ml',
            'liter': 'l', 'liters': 'l', 'litre': 'l', 'litres': 'l'
        };
        return shortcuts[unit] || unit.toLowerCase();
    }

    // Parse amount string (handles fractions, mixed numbers, decimals)
    parseAmountString(amountStr) {
        const fractionMap = {
            '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 0.333, '⅔': 0.667,
            '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875
        };

        amountStr = amountStr.trim();

        // Unicode fraction
        if (fractionMap[amountStr]) {
            return fractionMap[amountStr];
        }

        // Mixed number: "1 1/2"
        const mixedMatch = amountStr.match(/^(\d+)\s+(\d+)\/(\d+)$/);
        if (mixedMatch) {
            return parseInt(mixedMatch[1]) + (parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]));
        }

        // Slash fraction: "1/4"
        if (amountStr.includes('/')) {
            const [num, den] = amountStr.split('/').map(s => parseFloat(s.trim()));
            return num / den;
        }

        // Decimal or integer
        return parseFloat(amountStr);
    }

    // Parse convert expression: "<amount><unit> [ingredient]"
    parseConvertExpression(expression, targetUnit) {
        const match = expression.trim().match(
            /^(\d+\s+\d+\/\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]|\d*\.?\d+)\s*([a-zA-Z]+)(?:\s+(.+))?$/i
        );
        if (!match) return null;

        const amount = this.parseAmountString(match[1]);
        if (isNaN(amount) || amount <= 0) return null;

        return {
            amount,
            fromUnit: this.normalizeUnitShortcut(match[2]),
            ingredient: match[3]?.trim() || null,
            toUnit: this.normalizeUnitShortcut(targetUnit)
        };
    }

    // Check if unit is a volume unit
    isVolumeUnit(unit) {
        return ['tsp', 'tbsp', 'cups', 'ml', 'l'].includes(unit);
    }

    // Check if unit is a weight unit
    isWeightUnit(unit) {
        return ['g', 'kg', 'oz', 'lbs'].includes(unit);
    }

    // Format conversion result
    formatConversionResult(amount, unit) {
        const rounded = Math.round(amount * 100) / 100;
        return `${rounded} ${unit}`;
    }

    handleQuickDeductInput() {
        const input = this.quickDeductInput.value.trim();
        const parsed = this.parseCommandInput(input);

        // Update button based on action
        this.updateCommandButton(parsed);

        if (!input) {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.classList.add('hidden');
            this.clearSearchFilter();
            return;
        }

        // Handle different parsed actions
        switch (parsed.action) {
            case 'show-help':
                this.quickDeductSuggestions.classList.add('hidden');
                this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to toggle help</span>`;
                this.quickDeductPreview.classList.remove('hidden');
                this.clearSearchFilter();
                break;
            case 'show-add-form':
                this.quickDeductSuggestions.classList.add('hidden');
                this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to open Add Item form${parsed.prefill ? ` (pre-filled: "${this.escapeHtml(parsed.prefill)}")` : ''}</span>`;
                this.quickDeductPreview.classList.remove('hidden');
                this.clearSearchFilter();
                break;
            case 'show-recipe':
                this.quickDeductSuggestions.classList.add('hidden');
                this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to open Recipe section</span>`;
                this.quickDeductPreview.classList.remove('hidden');
                this.clearSearchFilter();
                break;
            case 'view':
                this.showViewSuggestions(parsed.itemQuery);
                this.clearSearchFilter();
                break;
            case 'show-convert-panel':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showConvertPanel();
                this.clearSearchFilter();
                break;
            case 'convert':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showConvertPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'convert-suggest':
                this.showConvertIngredientSuggestions(parsed);
                this.clearSearchFilter();
                break;
            case 'convert-quick':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showQuickConvertPicker(parsed);
                this.clearSearchFilter();
                break;
            case 'deduct':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showDeductPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'restock':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showRestockPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'add-new':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showAddNewPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'add-new-partial':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showAddNewPartialPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'operator-only':
            case 'deduct-partial':
            case 'restock-partial':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showPartialFeedback(parsed);
                this.clearSearchFilter();
                break;
            case 'sort':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showSortPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'delete':
                this.showDeleteSuggestions(parsed);
                this.clearSearchFilter();
                break;
            case 'edit':
                this.showEditSuggestions(parsed);
                this.clearSearchFilter();
                break;
            case 'set-qty':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showSetQtyPreview(parsed);
                this.clearSearchFilter();
                break;
            case 'toggle-staple':
                this.showStaplePreview(parsed);
                this.clearSearchFilter();
                break;
            case 'filter-location':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showFilterPreview('location', parsed.location);
                this.clearSearchFilter();
                break;
            case 'filter-category':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showFilterPreview('category', parsed.category);
                this.clearSearchFilter();
                break;
            case 'filter-low-stock':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showFilterPreview('low-stock');
                this.clearSearchFilter();
                break;
            case 'filter-expiring':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showFilterPreview('expiring');
                this.clearSearchFilter();
                break;
            case 'clear-filters':
                this.quickDeductSuggestions.classList.add('hidden');
                this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to show all items</span>`;
                this.quickDeductPreview.classList.remove('hidden');
                this.clearSearchFilter();
                break;
            case 'close-all':
                this.quickDeductSuggestions.classList.add('hidden');
                this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to close all open panels</span>`;
                this.quickDeductPreview.classList.remove('hidden');
                this.clearSearchFilter();
                break;
            case 'search':
            default:
                this.quickDeductPreview.classList.add('hidden');
                this.showItemSuggestions(parsed.query);
                // Live filter inventory
                this.applySearchFilter(parsed.query);
                break;
        }
    }

    // Show add form section
    showAddForm(prefillName = null) {
        this.formSection.classList.remove('hidden');
        this.recipeSection.classList.add('hidden');
        this.formTitle.textContent = 'Add New Item';
        this.submitBtn.textContent = 'Add Item';
        this.form.reset();

        if (prefillName) {
            this.nameInput.value = prefillName;
            // Auto-detect category and location
            const detected = this.detectIngredientInfo(prefillName);
            if (detected) {
                this.categorySelect.value = detected.category;
                this.locationSelect.value = detected.location;
            }
        }

        this.formSection.scrollIntoView({ behavior: 'smooth' });
        this.nameInput.focus();
        this.clearCommandBar();
    }

    // Show recipe section
    showRecipeSection() {
        this.recipeSection.classList.remove('hidden');
        this.formSection.classList.add('hidden');
        this.recipeSection.scrollIntoView({ behavior: 'smooth' });
        this.recipeText.focus();
        this.clearCommandBar();
    }

    // Toggle help panel
    toggleHelp() {
        this.commandHelp.classList.toggle('hidden');
        this.clearCommandBar();
    }

    // === CONVERSION METHODS ===

    // Toggle the deep mode conversion panel (prefill command bar)
    toggleConvertPanel() {
        // Instead of opening a panel, prefill the command bar with "convert "
        // so user can immediately start typing the conversion
        this.quickDeductInput.value = 'convert ';
        this.quickDeductInput.focus();
        this.handleQuickDeductInput();
    }

    // Show the conversion panel (deep mode) - shows helpful reference + examples
    showConvertPanel() {
        // Get a few inventory items as conversion examples
        const inventoryExamples = this.inventory.slice(0, 3).map(item =>
            `<code>${item.quantity}${item.unit} ${item.name.toLowerCase()}</code>`
        ).join(', ');

        this.quickDeductPreview.innerHTML = `
            <div class="convert-panel-preview">
                <div class="convert-quick-ref">
                    <span><strong>1 cup</strong> = 48 tsp = 16 tbsp = 236 ml</span>
                    <span><strong>1 lb</strong> = 453.6 g = 16 oz</span>
                </div>
                <div class="convert-examples-hint">
                    <span class="preview-hint">Try: <code>1/4c flour to g</code> or <code>100g sugar to cups</code></span>
                    ${inventoryExamples ? `<span class="preview-hint">Your items: ${inventoryExamples}</span>` : ''}
                </div>
            </div>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Show convert preview with result
    showConvertPreview(parsed) {
        const { amount, fromUnit, toUnit, ingredient } = parsed;
        const result = this.convertQuantity(amount, fromUnit, toUnit, ingredient || '');

        if (result === null) {
            // Check if it's volume↔weight without ingredient
            if (this.isVolumeUnit(fromUnit) !== this.isVolumeUnit(toUnit) &&
                this.isVolumeUnit(fromUnit) !== this.isWeightUnit(toUnit)) {
                if (!ingredient) {
                    this.quickDeductPreview.innerHTML = `
                        <span class="preview-hint">
                            Add ingredient for density: <code>convert ${amount}${fromUnit} flour to ${toUnit}</code>
                        </span>
                    `;
                } else {
                    this.quickDeductPreview.innerHTML = `
                        <span class="preview-error">Cannot convert ${fromUnit} to ${toUnit} for "${this.escapeHtml(ingredient)}"</span>
                    `;
                }
            } else {
                this.quickDeductPreview.innerHTML = `
                    <span class="preview-error">Cannot convert ${fromUnit} to ${toUnit}</span>
                `;
            }
        } else {
            const formatted = this.formatConversionResult(result, toUnit);
            const inputDisplay = this.formatConversionResult(amount, fromUnit);
            this.quickDeductPreview.innerHTML = `
                <span class="convert-input">${inputDisplay}</span>
                ${ingredient ? `<span class="convert-ingredient">${this.escapeHtml(ingredient)}</span>` : ''}
                <span class="convert-arrow">=</span>
                <span class="convert-output">${formatted}</span>
                <span class="preview-hint">— Press Enter to copy</span>
            `;
        }
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Show ingredient suggestions for convert command (includes inventory items)
    showConvertIngredientSuggestions(parsed) {
        const query = parsed.ingredientQuery.toLowerCase();

        // Combine inventory items AND density database for suggestions
        const inventoryMatches = this.inventory
            .filter(item => item.name.toLowerCase().includes(query))
            .map(item => ({
                name: item.name,
                density: this.getIngredientDensity(item.name),
                fromInventory: true
            }));

        const densityMatches = Object.keys(INGREDIENT_DENSITIES)
            .filter(name => !name.startsWith('_') && name.includes(query))
            .map(name => ({
                name: name,
                density: INGREDIENT_DENSITIES[name],
                fromInventory: false
            }));

        // Combine and dedupe (inventory first, then density table)
        const seen = new Set();
        const allMatches = [...inventoryMatches, ...densityMatches]
            .filter(item => {
                const key = item.name.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .slice(0, 6);

        if (allMatches.length === 0) {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">Type ingredient, then "to [unit]"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        this.quickDeductPreview.classList.add('hidden');
        this.highlightedSuggestionIndex = -1;

        this.quickDeductSuggestions.innerHTML = allMatches.map((item, idx) => `
            <div class="suggestion-item" data-ingredient="${this.escapeHtml(item.name)}" data-index="${idx}">
                <span class="suggestion-name">${this.escapeHtml(item.name)}${item.fromInventory ? ' <small>✓</small>' : ''}</span>
                <span class="suggestion-density">${item.density} g/tsp</span>
            </div>
        `).join('');
        this.quickDeductSuggestions.classList.remove('hidden');

        // Click to select ingredient
        this.quickDeductSuggestions.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                const base = `convert ${parsed.amount}${parsed.fromUnit} `;
                this.quickDeductInput.value = base + el.dataset.ingredient + ' to ';
                this.quickDeductInput.focus();
                this.handleQuickDeductInput();
            });
        });
    }

    // Show quick convert picker (for quick mode without target unit)
    showQuickConvertPicker(parsed) {
        const { amount, fromUnit, ingredient } = parsed;
        const inputDisplay = this.formatConversionResult(amount, fromUnit);

        // Determine relevant target units based on source unit
        let targetUnits = [];
        if (this.isVolumeUnit(fromUnit)) {
            targetUnits = ['g', 'oz', 'ml', 'tbsp', 'tsp', 'cups'];
        } else if (this.isWeightUnit(fromUnit)) {
            targetUnits = ['cups', 'tbsp', 'tsp', 'ml', 'g', 'oz', 'lbs'];
        }
        // Remove the source unit from targets
        targetUnits = targetUnits.filter(u => u !== fromUnit);

        // Build clickable unit buttons
        const unitButtons = targetUnits.map(unit => {
            const result = this.convertQuantity(amount, fromUnit, unit, ingredient);
            if (result !== null) {
                const formatted = this.formatConversionResult(result, unit);
                return `<button class="convert-unit-btn" data-unit="${unit}" data-result="${formatted}">${formatted}</button>`;
            }
            return '';
        }).filter(Boolean).join('');

        this.quickDeductPreview.innerHTML = `
            <div class="quick-convert-picker">
                <span class="convert-input">${inputDisplay}</span>
                <span class="convert-ingredient">${this.escapeHtml(ingredient)}</span>
                <span class="convert-arrow">=</span>
                <div class="convert-unit-options">${unitButtons}</div>
            </div>
        `;
        this.quickDeductPreview.classList.remove('hidden');

        // Add click handlers to unit buttons
        this.quickDeductPreview.querySelectorAll('.convert-unit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const result = btn.dataset.result;
                navigator.clipboard.writeText(result).then(() => {
                    this.quickDeductPreview.innerHTML = `
                        <span class="convert-output">${this.escapeHtml(result)}</span>
                        <span class="preview-success">✓ Copied to clipboard</span>
                    `;
                }).catch(() => {
                    this.quickDeductPreview.innerHTML = `<span class="convert-output">${this.escapeHtml(result)}</span>`;
                });
            });
        });
    }

    // Execute conversion and copy to clipboard
    executeConvert(parsed) {
        const result = this.convertQuantity(parsed.amount, parsed.fromUnit, parsed.toUnit, parsed.ingredient || '');
        if (result !== null) {
            const formatted = this.formatConversionResult(result, parsed.toUnit);
            navigator.clipboard.writeText(formatted).then(() => {
                this.quickDeductPreview.innerHTML = `
                    <span class="convert-output">${this.escapeHtml(formatted)}</span>
                    <span class="preview-success">✓ Copied to clipboard</span>
                `;
                this.quickDeductPreview.classList.remove('hidden');
            }).catch(() => {
                this.quickDeductPreview.innerHTML = `<span class="convert-output">${this.escapeHtml(formatted)}</span>`;
                this.quickDeductPreview.classList.remove('hidden');
            });
        }
        this.clearCommandBar();
    }

    // === END CONVERSION METHODS ===

    // === SORT/DELETE/EDIT/FILTER METHODS ===

    // Sort preview
    showSortPreview(parsed) {
        const sortLabels = {
            'urgency': 'urgency (expiring + low stock first)',
            'name': 'name (A-Z)',
            'n': 'name (A-Z)',
            'exp': 'expiration (soonest first)',
            'expiration': 'expiration (soonest first)',
            'e': 'expiration (soonest first)',
            'qty': 'quantity (lowest first)',
            'quantity': 'quantity (lowest first)',
            'q': 'quantity (lowest first)',
            'cat': 'category',
            'category': 'category',
            'c': 'category',
            'store': 'store',
            's': 'store',
            'recent': 'recently updated',
            'r': 'recently updated',
            'updated': 'recently updated'
        };
        const label = sortLabels[parsed.sortBy] || parsed.sortBy;
        this.quickDeductPreview.innerHTML = `<span class="preview-hint">Sort by <strong>${label}</strong> — Press Enter</span>`;
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Execute sort
    executeSort(parsed) {
        const sortMap = {
            'urgency': 'urgency',
            'name': 'name', 'n': 'name',
            'exp': 'expiration', 'expiration': 'expiration', 'e': 'expiration',
            'qty': 'quantity', 'quantity': 'quantity', 'q': 'quantity',
            'cat': 'category', 'category': 'category', 'c': 'category',
            'store': 'store', 's': 'store',
            'recent': 'updated', 'r': 'updated', 'updated': 'updated'
        };
        const sortValue = sortMap[parsed.sortBy] || 'name';

        // Add urgency option to the dropdown if not already there
        if (sortValue === 'urgency') {
            this.currentSortMode = 'urgency';
        } else {
            this.sortBy.value = sortValue;
            this.currentSortMode = null;
        }

        this.clearCommandBar();
        this.render();
    }

    // Delete suggestions/preview
    showDeleteSuggestions(parsed) {
        const matches = this.inventory.filter(item =>
            item.name.toLowerCase().includes(parsed.itemQuery.toLowerCase())
        ).slice(0, 5);

        if (matches.length === 0) {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `<span class="preview-error">No items match "${this.escapeHtml(parsed.itemQuery)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        if (matches.length === 1) {
            // Single match - show delete preview
            const item = matches[0];
            this.quickDeductSuggestions.classList.add('hidden');
            if (this.pendingDeleteId === item.id) {
                // Second Enter - ready to delete
                this.quickDeductPreview.innerHTML = `
                    <span class="preview-warning">⚠️ DELETE "${this.escapeHtml(item.name)}"? Press Enter again to confirm</span>
                `;
            } else {
                // First Enter - show warning
                this.quickDeductPreview.innerHTML = `
                    <span class="preview-hint">Delete <strong>${this.escapeHtml(item.name)}</strong> (${item.quantity} ${item.unit})? Press Enter</span>
                `;
            }
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        // Multiple matches - show suggestions
        this.quickDeductPreview.classList.add('hidden');
        this.pendingDeleteId = null;
        this.quickDeductSuggestions.innerHTML = matches.map((item, idx) => `
            <div class="suggestion-item delete-suggestion" data-id="${item.id}" data-name="${this.escapeHtml(item.name)}" data-index="${idx}">
                <span class="suggestion-name">${this.escapeHtml(item.name)}</span>
                <span class="suggestion-qty">${item.quantity} ${item.unit}</span>
            </div>
        `).join('');
        this.quickDeductSuggestions.classList.remove('hidden');

        // Click to select
        this.quickDeductSuggestions.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                this.quickDeductInput.value = `delete ${el.dataset.name}`;
                this.handleQuickDeductInput();
            });
        });
    }

    // Execute delete (with double-Enter confirmation)
    executeDelete(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }

        if (this.pendingDeleteId === item.id) {
            // Second Enter - actually delete
            this.deleteItem(item.id);
            this.pendingDeleteId = null;
            this.quickDeductPreview.innerHTML = `<span class="preview-success">✓ Deleted "${this.escapeHtml(item.name)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            this.clearCommandBar();
            this.render();
            setTimeout(() => this.quickDeductPreview.classList.add('hidden'), 2000);
        } else {
            // First Enter - set pending and update preview
            this.pendingDeleteId = item.id;
            this.quickDeductPreview.innerHTML = `
                <span class="preview-warning">⚠️ DELETE "${this.escapeHtml(item.name)}"? Press Enter again to confirm</span>
            `;
            this.quickDeductPreview.classList.remove('hidden');
        }
    }

    // Edit suggestions
    showEditSuggestions(parsed) {
        const matches = this.inventory.filter(item =>
            item.name.toLowerCase().includes(parsed.itemQuery.toLowerCase())
        ).slice(0, 5);

        if (matches.length === 0) {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `<span class="preview-error">No items match "${this.escapeHtml(parsed.itemQuery)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        if (matches.length === 1) {
            const item = matches[0];
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `
                <span class="preview-hint">Edit <strong>${this.escapeHtml(item.name)}</strong> — Press Enter to open form</span>
            `;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        // Multiple matches
        this.quickDeductPreview.classList.add('hidden');
        this.quickDeductSuggestions.innerHTML = matches.map((item, idx) => `
            <div class="suggestion-item" data-id="${item.id}" data-name="${this.escapeHtml(item.name)}" data-index="${idx}">
                <span class="suggestion-name">${this.escapeHtml(item.name)}</span>
                <span class="suggestion-qty">${item.quantity} ${item.unit}</span>
            </div>
        `).join('');
        this.quickDeductSuggestions.classList.remove('hidden');

        this.quickDeductSuggestions.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                this.quickDeductInput.value = `edit ${el.dataset.name}`;
                this.handleQuickDeductInput();
            });
        });
    }

    // Execute edit
    executeEdit(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }
        this.clearCommandBar();
        this.startEdit(item.id);
    }

    // Set quantity preview
    showSetQtyPreview(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">No items match "${this.escapeHtml(parsed.itemQuery)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const newUnit = parsed.unit || item.unit;
        this.quickDeductPreview.innerHTML = `
            <span class="preview-hint">
                Set <strong>${this.escapeHtml(item.name)}</strong> to ${parsed.amount} ${newUnit}
                <span class="preview-calc">(was ${item.quantity} ${item.unit})</span>
                — Press Enter
            </span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Execute set quantity
    executeSetQty(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }

        const newUnit = parsed.unit || item.unit;
        let newQty = parsed.amount;

        // Convert if different unit
        if (newUnit !== item.unit) {
            const converted = this.convertQuantity(parsed.amount, newUnit, item.unit, item.name);
            if (converted !== null) {
                newQty = converted;
            }
        }

        this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });
        this.quickDeductPreview.innerHTML = `<span class="preview-success">✓ Set ${this.escapeHtml(item.name)} to ${parsed.amount} ${newUnit}</span>`;
        this.quickDeductPreview.classList.remove('hidden');
        this.clearCommandBar();
        this.render();
        setTimeout(() => this.quickDeductPreview.classList.add('hidden'), 2000);
    }

    // Staple toggle preview
    showStaplePreview(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">No items match "${this.escapeHtml(parsed.itemQuery)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const action = item.isStaple ? 'Remove staple status from' : 'Mark as staple:';
        this.quickDeductPreview.innerHTML = `
            <span class="preview-hint">${action} <strong>${this.escapeHtml(item.name)}</strong> — Press Enter</span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Execute staple toggle
    executeToggleStaple(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }

        this.updateItem(item.id, { isStaple: !item.isStaple });
        const status = !item.isStaple ? 'marked as staple' : 'removed from staples';
        this.quickDeductPreview.innerHTML = `<span class="preview-success">✓ ${this.escapeHtml(item.name)} ${status}</span>`;
        this.quickDeductPreview.classList.remove('hidden');
        this.clearCommandBar();
        this.render();
        setTimeout(() => this.quickDeductPreview.classList.add('hidden'), 2000);
    }

    // Filter preview
    showFilterPreview(type, value) {
        let label;
        switch (type) {
            case 'location':
                label = `items in <strong>${LOCATION_NAMES[value] || value}</strong>`;
                break;
            case 'category':
                label = `<strong>${CATEGORY_NAMES[value] || value}</strong> items`;
                break;
            case 'low-stock':
                label = `<strong>low stock</strong> items`;
                break;
            case 'expiring':
                label = `<strong>expiring</strong> items`;
                break;
            default:
                label = value;
        }
        this.quickDeductPreview.innerHTML = `<span class="preview-hint">Show ${label} — Press Enter</span>`;
        this.quickDeductPreview.classList.remove('hidden');
    }

    // Execute filters
    executeFilterLocation(parsed) {
        this.filterCategory.value = '';
        this.currentLocationFilter = parsed.location;
        this.currentSpecialFilter = null;
        this.clearCommandBar();
        this.render();
    }

    executeFilterCategory(parsed) {
        this.filterCategory.value = parsed.category;
        this.currentLocationFilter = null;
        this.currentSpecialFilter = null;
        this.clearCommandBar();
        this.render();
    }

    executeFilterLowStock() {
        this.filterCategory.value = '';
        this.currentLocationFilter = null;
        this.currentSpecialFilter = 'low-stock';
        this.clearCommandBar();
        this.render();
    }

    executeFilterExpiring() {
        this.filterCategory.value = '';
        this.currentLocationFilter = null;
        this.currentSpecialFilter = 'expiring';
        this.clearCommandBar();
        this.render();
    }

    executeClearFilters() {
        this.filterCategory.value = '';
        this.currentLocationFilter = null;
        this.currentSpecialFilter = null;
        this.currentSortMode = null;
        this.clearCommandBar();
        this.render();
    }

    closeAllModules() {
        // Close form section (Add/Edit)
        this.formSection.classList.add('hidden');
        this.cancelEdit();

        // Close recipe section
        this.recipeSection.classList.add('hidden');
        this.cancelRecipe();

        // Close help panel
        this.commandHelp.classList.add('hidden');

        // Close filter modal
        this.filterModal.classList.add('hidden');

        // Close item details modal
        this.itemDetailsModal.classList.add('hidden');

        // Reset body overflow
        document.body.style.overflow = '';

        // Clear command bar
        this.clearCommandBar();
    }

    // === END SORT/DELETE/EDIT/FILTER METHODS ===

    // Show view suggestions for item lookup
    showViewSuggestions(query) {
        const matches = this.inventory.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        if (matches.length === 0) {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">No items match "${this.escapeHtml(query)}"</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        if (matches.length === 1) {
            // Single match - show preview
            const item = matches[0];
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">Press Enter to view <strong>${this.escapeHtml(item.name)}</strong></span>`;
            this.quickDeductPreview.classList.remove('hidden');
        } else {
            // Multiple matches - show suggestions
            this.quickDeductPreview.classList.add('hidden');
            this.quickDeductSuggestions.innerHTML = matches.map((item, idx) => `
                <div class="suggestion-item${idx === 0 ? ' highlighted' : ''}" data-name="${this.escapeHtml(item.name)}" data-view="true">
                    <span class="suggestion-name">view ${this.escapeHtml(item.name)}</span>
                    <span class="suggestion-qty">${item.quantity} ${item.unit}</span>
                </div>
            `).join('');
            this.quickDeductSuggestions.classList.remove('hidden');

            // Add click handlers
            this.quickDeductSuggestions.querySelectorAll('.suggestion-item').forEach(el => {
                el.addEventListener('click', () => {
                    this.quickDeductInput.value = `view ${el.dataset.name}`;
                    this.showItemDetails(el.dataset.name);
                });
            });
        }
    }

    // Show item details modal
    showItemDetails(query) {
        const item = this.findInventoryMatch(query);
        if (!item) {
            alert(`Item "${query}" not found in inventory`);
            return;
        }

        // Populate modal
        document.getElementById('detailsName').textContent = item.name;
        document.getElementById('detailsQty').textContent = `${item.quantity} ${item.unit}`;
        document.getElementById('detailsCategory').textContent = this.formatCategory(item.category);
        document.getElementById('detailsLocation').textContent = LOCATION_NAMES[item.location] || '-';
        document.getElementById('detailsThreshold').textContent = item.threshold ? `${item.threshold} ${item.unit}` : 'None';
        document.getElementById('detailsStore').textContent = item.boughtFrom || item.notes || '-';
        document.getElementById('detailsPurchase').textContent = item.purchaseDate || '-';
        document.getElementById('detailsExpiration').textContent = item.expirationDate || '-';
        document.getElementById('detailsStaple').textContent = item.isStaple ? 'Yes' : 'No';

        // Store item id for edit button
        this.currentDetailsItemId = item.id;

        // Show modal
        this.itemDetailsModal.classList.remove('hidden');
        this.clearCommandBar();
    }

    // Hide item details modal
    hideItemDetails() {
        this.itemDetailsModal.classList.add('hidden');
        this.currentDetailsItemId = null;
    }

    // Mobile Filter Modal Methods
    showFilterModal() {
        // Sync mobile selects with desktop values
        if (this.filterCategoryMobile) {
            this.filterCategoryMobile.value = this.filterCategory.value;
        }
        if (this.sortByMobile) {
            this.sortByMobile.value = this.sortBy.value;
        }
        this.filterModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideFilterModal() {
        this.filterModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    applyMobileFilters() {
        this.filterCategory.value = this.filterCategoryMobile.value;
        this.sortBy.value = this.sortByMobile.value;
        this.render();
        this.hideFilterModal();
    }

    clearMobileFilters() {
        this.filterCategoryMobile.value = 'all';
        this.sortByMobile.value = 'name';
        this.filterCategory.value = 'all';
        this.sortBy.value = 'name';
        this.currentLocationFilter = null;
        this.currentSpecialFilter = null;
        this.currentSortMode = null;
        this.render();
        this.hideFilterModal();
    }

    // Overflow Menu Methods
    toggleOverflowMenu(itemId) {
        this.closeAllOverflowMenus();
        const dropdown = document.getElementById(`overflow-${itemId}`);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            if (!dropdown.classList.contains('hidden')) {
                setTimeout(() => {
                    document.addEventListener('click', this.handleOverflowClickOutside);
                }, 0);
            }
        }
    }

    closeAllOverflowMenus() {
        document.querySelectorAll('.overflow-dropdown').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
        document.removeEventListener('click', this.handleOverflowClickOutside);
    }

    handleOverflowClickOutside = (event) => {
        if (!event.target.closest('.overflow-menu')) {
            this.closeAllOverflowMenus();
        }
    }

    // Apply live search filter to inventory
    applySearchFilter(query) {
        this.currentSearchFilter = query.toLowerCase();
        this.renderInventory();
    }

    // Clear search filter
    clearSearchFilter() {
        if (this.currentSearchFilter !== '') {
            this.currentSearchFilter = '';
            this.renderInventory();
        }
    }

    updateCommandButton(parsed) {
        if (!parsed || parsed.action === 'search') {
            this.quickDeductBtn.textContent = 'Go';
            this.quickDeductBtn.className = 'quick-deduct-btn';
        } else if (parsed.action.startsWith('deduct')) {
            this.quickDeductBtn.textContent = 'Use';
            this.quickDeductBtn.className = 'quick-deduct-btn deduct-mode';
        } else if (parsed.action.startsWith('restock') || parsed.action.startsWith('add')) {
            this.quickDeductBtn.textContent = 'Add';
            this.quickDeductBtn.className = 'quick-deduct-btn add-mode';
        }
    }

    showPartialFeedback(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        const itemName = item ? item.name : parsed.itemQuery;

        if (parsed.action === 'operator-only') {
            const hint = parsed.operator === '-'
                ? `${itemName}: type amount + unit (1c, 2tsp, 0.5lb)`
                : `${itemName}: type amount to add (1lb, 2c, 500g)`;
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">${this.escapeHtml(hint)}</span>`;
        } else {
            // Has amount but no unit
            const verb = parsed.action === 'deduct-partial' ? 'use' : 'add';
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">${this.escapeHtml(itemName)}: ${parsed.amount}... add unit (t, T, c, oz, lb, g)</span>`;
        }
        this.quickDeductPreview.classList.remove('hidden');
    }

    showRestockPreview(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        const unit = this.normalizeUnitShortcut(parsed.unit);

        if (!item) {
            this.quickDeductPreview.innerHTML = `<span class="preview-hint">Item "${this.escapeHtml(parsed.itemQuery)}" not found. Use +name to add new.</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const converted = this.convertQuantity(parsed.amount, unit, item.unit, item.name);

        if (converted === null) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Cannot convert ${unit} to ${item.unit}</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const newQty = item.quantity + converted;
        const roundedNew = Math.round(newQty * 100) / 100;
        const roundedAdd = Math.round(converted * 100) / 100;

        this.quickDeductPreview.innerHTML = `
            <span class="preview-item">${this.escapeHtml(item.name)}:</span>
            <span class="preview-calc">${item.quantity} ${item.unit} → ${roundedNew} ${item.unit}</span>
            <span class="preview-add">(+${roundedAdd} ${item.unit})</span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    showAddNewPreview(parsed) {
        const unit = this.normalizeUnitShortcut(parsed.unit);
        const detected = this.detectIngredientInfo(parsed.name);

        // Use explicit overrides or detected values
        const category = parsed.category || (detected ? detected.category : 'other');
        const location = parsed.location || (detected ? detected.location : null);

        let detailsHtml = '';
        if (detected || parsed.category || parsed.location) {
            const categoryName = CATEGORY_NAMES[category] || category;
            const locationName = location ? (LOCATION_NAMES[location] || location) : null;
            detailsHtml = ` <span class="preview-auto">[${categoryName}${locationName ? ` • ${locationName}` : ''}]</span>`;
        }

        this.quickDeductPreview.innerHTML = `
            <span class="preview-item">New:</span>
            <span class="preview-calc">${this.escapeHtml(parsed.name)} (${parsed.amount} ${unit})</span>
            ${detailsHtml}
            <span class="preview-hint"> — Enter to add</span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    showAddNewPartialPreview(parsed) {
        this.quickDeductPreview.innerHTML = `<span class="preview-hint">New item: ${this.escapeHtml(parsed.name)} — add amount + unit (3lb, 2c, 500g)</span>`;
        this.quickDeductPreview.classList.remove('hidden');
    }

    showItemSuggestions(query) {
        const searchTerm = query.toLowerCase();
        const matches = this.inventory.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        ).slice(0, 5);

        if (matches.length === 0) {
            this.quickDeductSuggestions.innerHTML = '<div class="no-matches">No matching items</div>';
            this.quickDeductSuggestions.classList.remove('hidden');
            return;
        }

        this.highlightedSuggestionIndex = -1;
        this.currentSuggestions = matches;

        this.quickDeductSuggestions.innerHTML = matches.map((item, idx) => {
            const locationText = item.location ? LOCATION_NAMES[item.location] || item.location : '';
            return `
                <div class="suggestion-item" data-id="${item.id}" data-index="${idx}">
                    <span class="suggestion-name">${this.escapeHtml(item.name)}</span>
                    <span class="suggestion-qty">${item.quantity} ${item.unit}</span>
                    ${locationText ? `<span class="suggestion-loc">${locationText}</span>` : ''}
                </div>
            `;
        }).join('');
        this.quickDeductSuggestions.classList.remove('hidden');
    }

    showDeductPreview(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        const unit = this.normalizeUnitShortcut(parsed.unit);

        if (!item) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Item "${this.escapeHtml(parsed.itemQuery)}" not found</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const converted = this.convertQuantity(parsed.amount, unit, item.unit, item.name);

        if (converted === null) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Cannot convert ${unit} to ${item.unit}</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        const newQty = Math.max(0, item.quantity - converted);
        const roundedNew = Math.round(newQty * 100) / 100;
        const roundedDeduct = Math.round(converted * 100) / 100;

        this.quickDeductPreview.innerHTML = `
            <span class="preview-item">${this.escapeHtml(item.name)}:</span>
            <span class="preview-calc">${item.quantity} ${item.unit} → ${roundedNew} ${item.unit}</span>
            <span class="preview-deduct">(-${roundedDeduct} ${item.unit})</span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    selectSuggestion(id) {
        const item = this.getItem(id);
        if (!item) return;

        // Fill the input with item name and a space+dash ready for amount
        this.quickDeductInput.value = item.name + ' -';
        this.quickDeductSuggestions.classList.add('hidden');
        this.quickDeductInput.focus();
    }

    handleQuickDeductKeydown(e) {
        const suggestions = this.quickDeductSuggestions.querySelectorAll('.suggestion-item');

        if (e.key === 'Enter') {
            e.preventDefault();
            // If there's a highlighted suggestion, select it
            if (this.highlightedSuggestionIndex >= 0 && suggestions[this.highlightedSuggestionIndex]) {
                const id = suggestions[this.highlightedSuggestionIndex].dataset.id;
                this.selectSuggestion(id);
            } else {
                // Otherwise try to execute deduct
                this.executeQuickDeduct();
            }
        } else if (e.key === 'Tab' && !e.shiftKey) {
            // Tab selects first suggestion if dropdown is open
            if (!this.quickDeductSuggestions.classList.contains('hidden') && suggestions.length > 0) {
                e.preventDefault();
                const id = suggestions[0].dataset.id;
                this.selectSuggestion(id);
            }
        } else if (e.key === 'ArrowDown') {
            if (!this.quickDeductSuggestions.classList.contains('hidden') && suggestions.length > 0) {
                e.preventDefault();
                this.highlightedSuggestionIndex = Math.min(this.highlightedSuggestionIndex + 1, suggestions.length - 1);
                this.updateSuggestionHighlight(suggestions);
            }
        } else if (e.key === 'ArrowUp') {
            if (!this.quickDeductSuggestions.classList.contains('hidden') && suggestions.length > 0) {
                e.preventDefault();
                this.highlightedSuggestionIndex = Math.max(this.highlightedSuggestionIndex - 1, 0);
                this.updateSuggestionHighlight(suggestions);
            }
        } else if (e.key === 'Escape') {
            this.quickDeductSuggestions.classList.add('hidden');
            this.quickDeductPreview.classList.add('hidden');
        }
    }

    updateSuggestionHighlight(suggestions) {
        suggestions.forEach((el, idx) => {
            if (idx === this.highlightedSuggestionIndex) {
                el.classList.add('highlighted');
            } else {
                el.classList.remove('highlighted');
            }
        });
    }

    executeQuickDeduct() {
        const input = this.quickDeductInput.value.trim();
        const parsed = this.parseCommandInput(input);

        if (!parsed || parsed.action === 'search') {
            return;
        }

        // Handle different actions
        if (parsed.action === 'show-help') {
            this.toggleHelp();
        } else if (parsed.action === 'show-convert-panel') {
            this.toggleConvertPanel();
        } else if (parsed.action === 'convert') {
            this.executeConvert(parsed);
        } else if (parsed.action === 'convert-quick') {
            // Quick mode needs a target unit - don't execute, just show picker
            return;
        } else if (parsed.action === 'show-add-form') {
            this.showAddForm(parsed.prefill);
        } else if (parsed.action === 'show-recipe') {
            this.showRecipeSection();
        } else if (parsed.action === 'view') {
            this.showItemDetails(parsed.itemQuery);
        } else if (parsed.action === 'deduct') {
            this.executeDeduct(parsed);
        } else if (parsed.action === 'restock') {
            this.executeRestock(parsed);
        } else if (parsed.action === 'add-new') {
            this.executeAddNew(parsed);
        } else if (parsed.action === 'add-new-partial') {
            // Open expanded form for new item
            this.openAddNewForm(parsed.name);
        } else if (parsed.action === 'sort') {
            this.executeSort(parsed);
        } else if (parsed.action === 'delete') {
            this.executeDelete(parsed);
        } else if (parsed.action === 'edit') {
            this.executeEdit(parsed);
        } else if (parsed.action === 'set-qty') {
            this.executeSetQty(parsed);
        } else if (parsed.action === 'toggle-staple') {
            this.executeToggleStaple(parsed);
        } else if (parsed.action === 'filter-location') {
            this.executeFilterLocation(parsed);
        } else if (parsed.action === 'filter-category') {
            this.executeFilterCategory(parsed);
        } else if (parsed.action === 'filter-low-stock') {
            this.executeFilterLowStock();
        } else if (parsed.action === 'filter-expiring') {
            this.executeFilterExpiring();
        } else if (parsed.action === 'clear-filters') {
            this.executeClearFilters();
        } else if (parsed.action === 'close-all') {
            this.closeAllModules();
        }
        // Partial actions don't execute, they just show hints
    }

    executeDeduct(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            alert(`Item "${parsed.itemQuery}" not found in inventory`);
            return;
        }

        const unit = this.normalizeUnitShortcut(parsed.unit);
        const converted = this.convertQuantity(parsed.amount, unit, item.unit, item.name);

        if (converted === null) {
            alert(`Cannot convert ${unit} to ${item.unit}`);
            return;
        }

        const newQty = Math.max(0, item.quantity - converted);
        this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    executeRestock(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            alert(`Item "${parsed.itemQuery}" not found. Use +name to add new items.`);
            return;
        }

        const unit = this.normalizeUnitShortcut(parsed.unit);
        const converted = this.convertQuantity(parsed.amount, unit, item.unit, item.name);

        if (converted === null) {
            alert(`Cannot convert ${unit} to ${item.unit}`);
            return;
        }

        const newQty = item.quantity + converted;
        this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    executeAddNew(parsed) {
        const unit = this.normalizeUnitShortcut(parsed.unit);

        // Auto-detect category and location from database
        const detected = this.detectIngredientInfo(parsed.name);

        // Use explicit overrides (@location, #category) or detected values or defaults
        const category = parsed.category || (detected ? detected.category : 'other');
        const location = parsed.location || (detected ? detected.location : '');

        this.addItem({
            name: parsed.name,
            quantity: parsed.amount,
            unit: unit,
            category: category,
            location: location,
            threshold: parsed.threshold // Will use default 20% if null
            // Expiration will be auto-calculated in addItem based on category
        });

        this.clearCommandBar();
        this.render();
    }

    openAddNewForm(name) {
        // Pre-fill the main form with the new item name
        this.nameInput.value = name;
        this.formTitle.textContent = 'Add New Item';
        this.form.scrollIntoView({ behavior: 'smooth' });
        this.quantityInput.focus();
        this.clearCommandBar();
    }

    clearCommandBar() {
        this.quickDeductInput.value = '';
        this.quickDeductPreview.classList.add('hidden');
        this.quickDeductSuggestions.classList.add('hidden');
        this.updateCommandButton(null);
    }

    // Expanded form methods
    toggleExpandedForm() {
        const isHidden = this.quickDeductExpanded.classList.contains('hidden');
        if (isHidden) {
            this.quickDeductExpanded.classList.remove('hidden');
            // If there's an item in the input, pre-populate
            const input = this.quickDeductInput.value.trim();
            const parsed = this.parseQuickDeductInput(input);
            if (parsed) {
                const item = this.findInventoryMatch(parsed.itemQuery);
                if (item) {
                    this.selectedQuickUseItem = item;
                    this.selectedItemName.textContent = item.name;
                    this.selectedItemQty.textContent = `Current: ${item.quantity} ${item.unit}`;
                    this.populateDeductUnits(item);
                    this.deductAmountInput.value = parsed.amount;
                    // Try to set unit
                    const normalizedUnit = this.normalizeUnitShortcut(parsed.unit);
                    if (this.deductUnitSelect.querySelector(`option[value="${normalizedUnit}"]`)) {
                        this.deductUnitSelect.value = normalizedUnit;
                    }
                    this.updateExpandedPreview();
                }
            }
        } else {
            this.quickDeductExpanded.classList.add('hidden');
        }
    }

    populateDeductUnits(item) {
        const volumeUnits = ['tsp', 'tbsp', 'cups', 'ml'];
        const weightUnits = ['oz', 'lbs', 'g', 'kg'];

        let options = [`<option value="${item.unit}">${item.unit}</option>`];

        if (volumeUnits.includes(item.unit)) {
            volumeUnits.forEach(u => {
                if (u !== item.unit) options.push(`<option value="${u}">${u}</option>`);
            });
            weightUnits.forEach(u => options.push(`<option value="${u}">${u}</option>`));
        } else if (weightUnits.includes(item.unit)) {
            weightUnits.forEach(u => {
                if (u !== item.unit) options.push(`<option value="${u}">${u}</option>`);
            });
            volumeUnits.forEach(u => options.push(`<option value="${u}">${u}</option>`));
        }

        this.deductUnitSelect.innerHTML = options.join('');
    }

    updateExpandedPreview() {
        const amount = parseFloat(this.deductAmountInput.value) || 0;
        const unit = this.deductUnitSelect.value;
        const item = this.selectedQuickUseItem;

        if (!item || amount <= 0) {
            this.deductPreviewExpanded.textContent = '';
            return;
        }

        const convertedAmount = this.convertQuantity(amount, unit, item.unit, item.name);

        if (convertedAmount === null) {
            this.deductPreviewExpanded.innerHTML = `<span class="preview-error">Cannot convert ${unit} to ${item.unit}</span>`;
            return;
        }

        const newQty = Math.max(0, item.quantity - convertedAmount);
        const roundedNew = Math.round(newQty * 100) / 100;
        const roundedDeduct = Math.round(convertedAmount * 100) / 100;

        this.deductPreviewExpanded.innerHTML = `
            <span class="preview-calc">${item.quantity} ${item.unit} → ${roundedNew} ${item.unit}</span>
            <span class="preview-deduct">(-${roundedDeduct} ${item.unit})</span>
        `;
    }

    confirmExpandedDeduct() {
        const amount = parseFloat(this.deductAmountInput.value) || 0;
        const unit = this.deductUnitSelect.value;
        const item = this.selectedQuickUseItem;

        if (!item || amount <= 0) {
            alert('Please enter an amount to deduct');
            return;
        }

        const convertedAmount = this.convertQuantity(amount, unit, item.unit, item.name);
        if (convertedAmount === null) {
            alert('Cannot convert these units. Try a different unit.');
            return;
        }

        const newQty = Math.max(0, item.quantity - convertedAmount);
        this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.cancelExpandedForm();
        this.render();
    }

    cancelExpandedForm() {
        this.selectedQuickUseItem = null;
        this.quickDeductExpanded.classList.add('hidden');
        this.deductAmountInput.value = '';
        this.deductPreviewExpanded.textContent = '';
        this.quickDeductInput.value = '';
    }

    // Utility functions
    formatCategory(category) {
        return CATEGORY_NAMES[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PantryInventory();
});

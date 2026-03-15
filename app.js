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

    // Dairy products
    'greek yogurt': 5.1,
    'yogurt': 5.1,
    'plain yogurt': 5.1,
    'sour cream': 4.8,
    'cream cheese': 4.8,
    'cottage cheese': 4.5,
    'ricotta': 5.0,
    'ricotta cheese': 5.0,
    'mascarpone': 4.8,
    'heavy cream': 4.8,
    'heavy whipping cream': 4.8,
    'half and half': 5.0,
    'half & half': 5.0,
    'buttermilk': 5.1,
    'evaporated milk': 5.3,
    'condensed milk': 6.4,
    'sweetened condensed milk': 6.4,
    'whipped cream': 1.0,
    'parmesan': 2.5,
    'parmesan cheese': 2.5,
    'cheddar': 2.3,
    'mozzarella': 2.4,
    'feta': 2.5,
    'feta cheese': 2.5,

    // Condiments & sauces
    'mayonnaise': 4.7,
    'mayo': 4.7,
    'ketchup': 5.1,
    'mustard': 5.0,
    'dijon mustard': 5.0,
    'yellow mustard': 5.0,
    'hot sauce': 5.0,
    'sriracha': 5.3,
    'bbq sauce': 5.6,
    'barbecue sauce': 5.6,
    'teriyaki sauce': 5.4,
    'hoisin sauce': 5.6,
    'fish sauce': 5.3,
    'oyster sauce': 5.5,
    'worcestershire sauce': 5.2,
    'tahini': 4.8,
    'hummus': 5.0,
    'salsa': 5.1,
    'tomato paste': 5.4,
    'tomato sauce': 5.1,
    'marinara': 5.1,
    'pesto': 4.8,
    'jam': 6.4,
    'jelly': 6.4,
    'preserves': 6.4,
    'marmalade': 6.4,

    // Nut butters & spreads
    'peanut butter': 5.4,
    'almond butter': 5.4,
    'cashew butter': 5.4,
    'sunflower seed butter': 5.4,
    'nutella': 5.6,
    'chocolate spread': 5.6,

    // Nuts (chopped/pieces)
    'almonds': 2.8,
    'chopped almonds': 2.5,
    'sliced almonds': 1.5,
    'walnuts': 2.5,
    'chopped walnuts': 2.4,
    'pecans': 2.2,
    'chopped pecans': 2.2,
    'cashews': 2.8,
    'peanuts': 2.9,
    'pine nuts': 2.7,
    'pistachios': 2.5,
    'hazelnuts': 2.4,
    'macadamia nuts': 2.3,
    'coconut flakes': 1.5,
    'shredded coconut': 1.5,

    // Grains & starches
    'rice': 3.3,
    'white rice': 3.3,
    'brown rice': 3.3,
    'basmati rice': 3.3,
    'jasmine rice': 3.3,
    'quinoa': 3.4,
    'couscous': 3.0,
    'bulgur': 3.0,
    'barley': 3.2,
    'breadcrumbs': 2.3,
    'panko': 1.2,
    'pasta': 2.1,
    'orzo': 3.0,
    'polenta': 2.9,
    'grits': 2.9,
    'tapioca': 2.5,
    'arrowroot': 2.5,

    // Produce (mashed/pureed)
    'mashed banana': 4.8,
    'banana': 4.8,
    'applesauce': 5.0,
    'pumpkin puree': 5.0,
    'pumpkin': 5.0,
    'mashed potato': 4.8,
    'mashed potatoes': 4.8,
    'avocado': 4.6,
    'mashed avocado': 4.6,
    'tomatoes': 5.0,
    'diced tomatoes': 5.0,
    'crushed tomatoes': 5.1,

    // Proteins
    'egg': 4.2,
    'eggs': 4.2,
    'egg white': 4.4,
    'egg whites': 4.4,
    'egg yolk': 4.0,
    'egg yolks': 4.0,
    'ground beef': 4.5,
    'ground turkey': 4.5,
    'ground chicken': 4.5,
    'ground pork': 4.5,
    'bacon bits': 2.8,

    // Beans & legumes (cooked)
    'beans': 4.0,
    'black beans': 4.0,
    'kidney beans': 4.0,
    'chickpeas': 4.2,
    'garbanzo beans': 4.2,
    'lentils': 4.0,
    'white beans': 4.0,
    'pinto beans': 4.0,
    'navy beans': 4.0,
    'cannellini beans': 4.0,
    'refried beans': 5.0,

    // Chocolate & baking extras
    'chocolate chips': 3.4,
    'mini chocolate chips': 3.4,
    'white chocolate chips': 3.4,
    'butterscotch chips': 3.4,
    'peanut butter chips': 3.4,
    'sprinkles': 3.0,
    'cocoa nibs': 3.0,
    'espresso powder': 2.0,
    'instant coffee': 2.0,
    'gelatin': 3.0,
    'xanthan gum': 2.5,

    // Dried fruits
    'raisins': 3.0,
    'dried cranberries': 2.5,
    'craisins': 2.5,
    'dried cherries': 2.8,
    'dried apricots': 2.8,
    'dates': 3.0,
    'chopped dates': 2.8,
    'dried mango': 2.5,
    'dried coconut': 1.5,

    // Default fallback for unknown spices
    '_default_spice': 2.0,
    '_default_herb': 0.7,
    '_default_liquid': 5.0,
    '_default_dairy': 5.0,
    '_default_nut_butter': 5.4,
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

// Location-based expiration multipliers
// Applied to base expiration when item is stored in that location
const LOCATION_EXPIRATION_MULTIPLIERS = {
    'fridge': 1,
    'freezer': 36,      // 36x longer (e.g., 5 days protein -> 180 days frozen)
    'pantry': 1,
    'counter': 0.5,     // Half the normal time
    'spice-cabinet': 1,
    'other': 1
};

// Defrost expiration: when moving FROM freezer TO fridge
// Fresh countdown starts for safe handling
const DEFROST_EXPIRATION_DAYS = {
    'protein': 3,       // 3 days to cook after defrosting
    'dairy': 5,
    'produce': 5,
    'other': 7
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

// ===== LAZY-LOADED TESSERACT OCR =====
// Only loads the 3MB Tesseract library when scan/capture is first used
let tesseractWorker = null;
let tesseractLoading = false;
let tesseractLoadPromise = null;

function loadTesseractScript() {
    // Return existing promise if already loading
    if (tesseractLoadPromise) {
        return tesseractLoadPromise;
    }

    // Check if already loaded globally
    if (window.Tesseract) {
        return Promise.resolve(window.Tesseract);
    }

    tesseractLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
        script.async = true;

        script.onload = () => {
            if (window.Tesseract) {
                resolve(window.Tesseract);
            } else {
                reject(new Error('Tesseract failed to initialize'));
            }
        };

        script.onerror = () => {
            tesseractLoadPromise = null;
            reject(new Error('Failed to load OCR library. Please check your internet connection.'));
        };

        document.head.appendChild(script);
    });

    return tesseractLoadPromise;
}

async function loadTesseract() {
    if (tesseractWorker) {
        return tesseractWorker;
    }

    if (tesseractLoading) {
        // Wait for existing load to complete
        while (tesseractLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return tesseractWorker;
    }

    tesseractLoading = true;
    try {
        // Load Tesseract.js via script tag (better mobile browser support)
        const Tesseract = await loadTesseractScript();
        tesseractWorker = await Tesseract.createWorker('eng');
        // PSM 6: single uniform block — receipts are one column, not a multi-column page
        await tesseractWorker.setParameters({ tessedit_pageseg_mode: '6' });
        return tesseractWorker;
    } catch (error) {
        console.error('Failed to load Tesseract:', error);
        throw error;
    } finally {
        tesseractLoading = false;
    }
}

// Pre-process a receipt image for better Tesseract accuracy.
// Converts to grayscale and boosts contrast to reduce thermal-paper noise.
function preprocessReceiptImage(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Scale up small images — Tesseract accuracy improves when text is taller
            const minDim = 1500;
            const scale = Math.max(1, minDim / Math.max(img.width, img.height));
            canvas.width  = Math.round(img.width  * scale);
            canvas.height = Math.round(img.height * scale);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 4) {
                // Grayscale (luminance-weighted)
                const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
                // Contrast stretch (factor 1.8) — pushes near-white background to white
                // and dark ink toward black, reducing mid-gray thermal noise
                const c = Math.max(0, Math.min(255, (gray - 128) * 1.8 + 128));
                d[i] = d[i + 1] = d[i + 2] = c;
            }
            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = imgSrc;
    });
}

// ===== SUGGESTION ENGINE =====
// Fast fuzzy matching with Levenshtein distance for typo-tolerance
const SuggestionEngine = {
    // Calculate Levenshtein distance (edit distance)
    levenshtein(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b[i - 1] === a[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    },

    // Fast prefix matching score (prioritize matches at start)
    prefixScore(query, target) {
        const q = query.toLowerCase();
        const t = target.toLowerCase();

        if (t.startsWith(q)) return 100; // Exact prefix match
        if (t.includes(q)) return 80;    // Substring match

        // Word boundary match (e.g., "pap" matches "smoked paprika")
        const words = t.split(/\s+/);
        for (const word of words) {
            if (word.startsWith(q)) return 90;
        }

        return 0;
    },

    // Combined fuzzy score (higher is better)
    fuzzyScore(query, target) {
        if (!query || !target) return 0;

        const q = query.toLowerCase();
        const t = target.toLowerCase();

        // Exact match
        if (t === q) return 1000;

        // Prefix score (fast path)
        const prefix = this.prefixScore(q, t);
        if (prefix > 0) return prefix;

        // Fuzzy matching for typos (only for short queries to stay fast)
        if (q.length >= 2 && q.length <= 8) {
            const distance = this.levenshtein(q, t.slice(0, q.length + 2));
            const maxDist = Math.floor(q.length / 3) + 1;
            if (distance <= maxDist) {
                return 60 - (distance * 10);
            }
        }

        // Subsequence matching (e.g., "pkra" matches "paprika")
        let qi = 0;
        for (let ti = 0; ti < t.length && qi < q.length; ti++) {
            if (t[ti] === q[qi]) qi++;
        }
        if (qi === q.length) return 40;

        return 0;
    },

    // Highlight matched portions in text
    highlightMatch(query, text) {
        if (!query) return text;

        const q = query.toLowerCase();
        const t = text.toLowerCase();
        const idx = t.indexOf(q);

        if (idx >= 0) {
            return text.slice(0, idx) +
                   '<mark>' + text.slice(idx, idx + query.length) + '</mark>' +
                   text.slice(idx + query.length);
        }

        // Highlight word boundary matches
        const words = text.split(/(\s+)/);
        return words.map(word => {
            if (word.toLowerCase().startsWith(q)) {
                return '<mark>' + word.slice(0, query.length) + '</mark>' + word.slice(query.length);
            }
            return word;
        }).join('');
    },

    // Build unified search index from all sources
    buildSearchIndex(inventory) {
        const index = new Map();
        const seen = new Set();

        // Add inventory items (highest priority)
        inventory.forEach(item => {
            const key = item.name.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                index.set(key, {
                    name: item.name,
                    type: 'inventory',
                    data: item,
                    priority: 100
                });
            }
        });

        // Add known ingredients from database
        Object.keys(INGREDIENT_DATABASE).forEach(name => {
            const key = name.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                index.set(key, {
                    name: name,
                    type: 'known',
                    data: INGREDIENT_DATABASE[name],
                    priority: 50
                });
            }
        });

        // Add ingredients with density info (for conversions)
        Object.keys(INGREDIENT_DENSITIES).forEach(name => {
            if (name.startsWith('_')) return; // Skip defaults
            const key = name.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                index.set(key, {
                    name: name,
                    type: 'density',
                    data: { density: INGREDIENT_DENSITIES[name] },
                    priority: 30
                });
            }
        });

        return index;
    },

    // Search with fuzzy matching
    search(query, index, options = {}) {
        const { limit = 8, minScore = 30 } = options;
        const results = [];

        for (const [key, entry] of index) {
            const score = this.fuzzyScore(query, entry.name);
            if (score >= minScore) {
                results.push({
                    ...entry,
                    score: score + entry.priority,
                    matchedName: this.highlightMatch(query, entry.name)
                });
            }
        }

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);

        return results.slice(0, limit);
    },

    // Recent items tracking
    recentItems: JSON.parse(localStorage.getItem('recentSuggestions') || '[]'),

    trackUsage(itemName) {
        const name = itemName.toLowerCase();
        this.recentItems = this.recentItems.filter(n => n !== name);
        this.recentItems.unshift(name);
        this.recentItems = this.recentItems.slice(0, 20);
        localStorage.setItem('recentSuggestions', JSON.stringify(this.recentItems));
    },

    boostRecent(results) {
        return results.map(r => {
            const recentIdx = this.recentItems.indexOf(r.name.toLowerCase());
            if (recentIdx >= 0) {
                return { ...r, score: r.score + (20 - recentIdx) };
            }
            return r;
        }).sort((a, b) => b.score - a.score);
    }
};

// Debounce utility for snappy input handling
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ===== API CLIENT =====
const API = {
    baseUrl: '/api',
    token: localStorage.getItem('authToken'),

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    },

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    },

    // Auth
    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        this.setToken(data.token);
        return data;
    },

    async signup(email, password) {
        const data = await this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        this.setToken(data.token);
        return data;
    },

    async getMe() {
        return this.request('/auth/me');
    },

    logout() {
        this.setToken(null);
    },

    // Inventory
    async getInventory() {
        return this.request('/inventory');
    },

    async addItem(item) {
        return this.request('/inventory', {
            method: 'POST',
            body: JSON.stringify(item)
        });
    },

    async updateItem(id, item) {
        return this.request(`/inventory/${id}`, {
            method: 'PUT',
            body: JSON.stringify(item)
        });
    },

    async deleteItem(id, reason = null) {
        return this.request(`/inventory/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ reason })
        });
    },

    async syncItems(items) {
        return this.request('/inventory/sync', {
            method: 'POST',
            body: JSON.stringify({ items })
        });
    },

    async getPriceHistory(id) {
        return this.request(`/inventory/${id}/price-history`);
    },

    async updatePriceHistory(historyId, data) {
        return this.request(`/inventory/price-history/${historyId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async getItemHistory(name) {
        return this.request(`/inventory/history/${encodeURIComponent(name)}`);
    },

    async getItemPriceHistoryByName(name) {
        return this.request(`/inventory/history/${encodeURIComponent(name)}/prices`);
    },

    async restoreItem(id) {
        return this.request(`/inventory/${id}/restore`, {
            method: 'POST'
        });
    },

    // Receipt Corrections (learning system)
    async getCorrections() {
        return this.request('/corrections');
    },

    async saveCorrection(correction) {
        return this.request('/corrections', {
            method: 'POST',
            body: JSON.stringify(correction)
        });
    },

    async saveCorrections(corrections) {
        return this.request('/corrections/bulk', {
            method: 'POST',
            body: JSON.stringify({ corrections })
        });
    },

    // Packages (group deductions)
    async getPackages() {
        return this.request('/packages');
    },

    async getPackage(id) {
        return this.request(`/packages/${id}`);
    },

    async getPackageByName(name) {
        return this.request(`/packages/name/${encodeURIComponent(name)}`);
    },

    async createPackage(pkg) {
        return this.request('/packages', {
            method: 'POST',
            body: JSON.stringify(pkg)
        });
    },

    async updatePackage(id, pkg) {
        return this.request(`/packages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(pkg)
        });
    },

    async deletePackage(id) {
        return this.request(`/packages/${id}`, {
            method: 'DELETE'
        });
    },

    async executePackage(id, options = {}) {
        return this.request(`/packages/${id}/execute`, {
            method: 'POST',
            body: JSON.stringify(options)
        });
    },

    async executeAdhocDeduction(items, options = {}) {
        return this.request('/packages/adhoc/execute', {
            method: 'POST',
            body: JSON.stringify({ items, ...options })
        });
    },

    async getPackageHistory(limit = 50, offset = 0) {
        return this.request(`/packages/history/all?limit=${limit}&offset=${offset}`);
    }
};

// ===== AUTH MANAGER =====
const AuthManager = {
    init() {
        this.authSection = document.getElementById('authSection');
        this.mainApp = document.getElementById('mainApp');
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');
        this.loginError = document.getElementById('loginError');
        this.signupError = document.getElementById('signupError');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.migrationModal = document.getElementById('migrationModal');
        this.migrationCount = document.getElementById('migrationCount');

        this.bindEvents();
        this.checkAuth();
    },

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Login form
        this.loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin();
        });

        // Signup form
        this.signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSignup();
        });

        // Logout
        this.logoutBtn.addEventListener('click', () => this.handleLogout());

        // Migration
        document.getElementById('skipMigration').addEventListener('click', () => {
            this.migrationModal.classList.add('hidden');
            this.clearLocalData();
            this.startApp();
        });

        document.getElementById('doMigration').addEventListener('click', async () => {
            await this.migrateData();
        });
    },

    switchTab(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');

        if (tab === 'login') {
            this.loginForm.classList.remove('hidden');
            this.signupForm.classList.add('hidden');
        } else {
            this.loginForm.classList.add('hidden');
            this.signupForm.classList.remove('hidden');
        }

        this.loginError.classList.add('hidden');
        this.signupError.classList.add('hidden');
    },

    async checkAuth() {
        if (!API.token) {
            this.showAuth();
            return;
        }

        try {
            await API.getMe();
            this.showApp();
        } catch (err) {
            API.logout();
            this.showAuth();
        }
    },

    showAuth() {
        this.authSection.classList.remove('hidden');
        this.mainApp.classList.add('hidden');
    },

    showApp() {
        this.authSection.classList.add('hidden');
        this.mainApp.classList.remove('hidden');

        // Check for local data to migrate
        const localData = localStorage.getItem('spiceInventory');
        if (localData) {
            const items = JSON.parse(localData);
            if (items.length > 0) {
                this.migrationCount.textContent = items.length;
                this.migrationModal.classList.remove('hidden');
                return;
            }
        }

        this.startApp();
    },

    startApp() {
        if (!window.app) {
            window.app = new PantryInventory();
        } else {
            window.app.loadFromAPI();
        }
    },

    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            this.loginError.classList.add('hidden');
            await API.login(email, password);
            this.showApp();
        } catch (err) {
            this.loginError.textContent = err.message;
            this.loginError.classList.remove('hidden');
        }
    },

    async handleSignup() {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        if (password !== confirm) {
            this.signupError.textContent = 'Passwords do not match';
            this.signupError.classList.remove('hidden');
            return;
        }

        try {
            this.signupError.classList.add('hidden');
            await API.signup(email, password);
            this.showApp();
        } catch (err) {
            this.signupError.textContent = err.message;
            this.signupError.classList.remove('hidden');
        }
    },

    handleLogout() {
        API.logout();
        window.app = null;
        this.showAuth();
    },

    async migrateData() {
        const localData = localStorage.getItem('spiceInventory');
        if (!localData) {
            this.migrationModal.classList.add('hidden');
            this.startApp();
            return;
        }

        try {
            const items = JSON.parse(localData);
            await API.syncItems(items);
            this.clearLocalData();
            this.migrationModal.classList.add('hidden');
            this.startApp();
        } catch (err) {
            console.error('Migration failed:', err);
            alert('Failed to migrate data. Please try again.');
        }
    },

    clearLocalData() {
        localStorage.removeItem('spiceInventory');
    }
};

class PantryInventory {
    constructor() {
        this.storageKey = 'spiceInventory';
        this.inventory = [];
        this.editingId = null;

        // New state for command bar enhancements
        this.pendingDeleteId = null;
        this.currentLocationFilter = null;
        this.currentSpecialFilter = null;
        this.currentSortMode = null;

        // Search index for fast suggestions
        this.searchIndex = null;

        this.initializeElements();
        this.bindEvents();
        this.loadFromAPI();

        // Create debounced suggestion handler (16ms = ~60fps feel)
        this.debouncedShowSuggestions = debounce((query) => {
            this.showItemSuggestionsEnhanced(query);
        }, 16);
    }

    async loadFromAPI() {
        try {
            this.inventory = await API.getInventory();
            this.rebuildSearchIndex();
            this.render();
        } catch (err) {
            console.error('Failed to load inventory:', err);
            this.inventory = [];
            this.rebuildSearchIndex();
            this.render();
        }
    }

    rebuildSearchIndex() {
        this.searchIndex = SuggestionEngine.buildSearchIndex(this.inventory);
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
        this.brandInput = document.getElementById('brand');
        this.itemPriceInput = document.getElementById('itemPrice');
        this.itemPriceUnitSelect = document.getElementById('itemPriceUnit');

        // Price history modal
        this.priceHistoryModal = document.getElementById('priceHistoryModal');
        this.closePriceHistoryBtn = document.getElementById('closePriceHistory');
        this.priceHistoryChart = null;

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

        // Price history modal events
        if (this.closePriceHistoryBtn) {
            this.closePriceHistoryBtn.addEventListener('click', () => this.hidePriceHistory());
        }
        if (this.priceHistoryModal) {
            this.priceHistoryModal.addEventListener('click', (e) => {
                if (e.target === this.priceHistoryModal) {
                    this.hidePriceHistory();
                }
            });
        }

        // Price point popup events
        const closePricePointBtn = document.getElementById('closePricePointPopup');
        const savePricePointBtn = document.getElementById('savePricePointStore');
        const pricePointPopup = document.getElementById('pricePointPopup');
        if (closePricePointBtn) {
            closePricePointBtn.addEventListener('click', () => this.hidePricePointPopup());
        }
        if (savePricePointBtn) {
            savePricePointBtn.addEventListener('click', () => this.savePricePointStore());
        }
        const pricePointStoreInput = document.getElementById('pricePointStore');
        if (pricePointStoreInput) {
            pricePointStoreInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.savePricePointStore();
                }
            });
        }
        if (pricePointPopup) {
            pricePointPopup.addEventListener('click', (e) => {
                if (e.target === pricePointPopup) {
                    this.hidePricePointPopup();
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

        // Global escape key handler for closing modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAnyOpenModal();
            }
        });

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
            if (item) this.selectSuggestionElement(item);
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

    // Storage Operations (now uses API, localStorage only for offline fallback)
    loadInventory() {
        // Only used for initial empty state - actual load happens in loadFromAPI
        return [];
    }

    saveInventory() {
        // No-op - individual operations now go through API
        // Kept for compatibility with existing code structure
    }

    // Capitalize first letter of each word
    capitalizeWords(str) {
        return str.trim().split(/\s+/).map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    // CRUD Operations
    async addItem(item) {
        const purchaseDate = item.purchaseDate || new Date().toISOString().split('T')[0];
        const expirationDate = item.expirationDate || this.autoCalculateExpiration(item.category, purchaseDate);
        const qty = parseFloat(item.quantity);
        // Default threshold to 20% of quantity if not specified
        const threshold = item.threshold ? parseFloat(item.threshold) : Math.round(qty * 0.2 * 10) / 10;

        const newItem = {
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
            brand: item.brand || null,
            last_price: item.last_price !== undefined ? item.last_price : null
        };

        try {
            const savedItem = await API.addItem(newItem);
            this.inventory.push(savedItem);
            this.rebuildSearchIndex();
            return savedItem;
        } catch (err) {
            console.error('Failed to add item:', err);
            alert('Failed to save item. Please check your connection and try again.');
            throw err;
        }
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

    async updateItem(id, updates) {
        const index = this.inventory.findIndex(item => String(item.id) === String(id));
        if (index !== -1) {
            const updatedItem = {
                ...this.inventory[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            try {
                const savedItem = await API.updateItem(id, updatedItem);
                this.inventory[index] = savedItem;
                this.rebuildSearchIndex();
                return savedItem;
            } catch (err) {
                console.error('Failed to update item:', err);
                alert('Failed to update item. Please check your connection and try again.');
                throw err;
            }
        }
        return null;
    }

    async deleteItem(id, reason = null) {
        try {
            await API.deleteItem(id, reason);
            this.inventory = this.inventory.filter(item => String(item.id) !== String(id));
            this.rebuildSearchIndex();
        } catch (err) {
            console.error('Failed to delete item:', err);
            alert('Failed to delete item. Please check your connection and try again.');
            throw err;
        }
    }

    getItem(id) {
        // Convert both to strings for comparison since onclick passes string IDs
        return this.inventory.find(item => String(item.id) === String(id));
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
    async handleSubmit(e) {
        e.preventDefault();

        const priceVal = this.itemPriceInput ? parseFloat(this.itemPriceInput.value) : NaN;
        const priceUnit = this.itemPriceUnitSelect ? this.itemPriceUnitSelect.value : 'flat';
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
            boughtFrom: this.boughtFromInput.value,
            brand: this.brandInput ? this.brandInput.value.trim() || null : null,
            last_price: !isNaN(priceVal) && priceVal >= 0 ? priceVal : undefined,
            price_unit: !isNaN(priceVal) && priceVal >= 0 ? priceUnit : undefined
        };

        if (this.editingId) {
            // Auto-recalculate expiration if purchase date changed but expiration wasn't manually adjusted
            const originalItem = this.inventory.find(i => i.id === parseInt(this.editingId));
            if (originalItem &&
                itemData.purchaseDate !== originalItem.purchaseDate &&
                itemData.expirationDate === originalItem.expirationDate) {
                itemData.expirationDate = this.autoCalculateExpiration(itemData.category, itemData.purchaseDate);
            }
            await this.updateItem(this.editingId, itemData);
            this.cancelEdit();
        } else {
            await this.addItem(itemData);
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
        if (this.brandInput) this.brandInput.value = item.brand || '';
        if (this.itemPriceInput) this.itemPriceInput.value = item.last_price !== null && item.last_price !== undefined ? item.last_price : '';
        if (this.itemPriceUnitSelect) this.itemPriceUnitSelect.value = item.price_unit || 'flat';

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

        overlay.querySelector('#saveQuantityBtn').addEventListener('click', async () => {
            const newQty = parseFloat(input.value);
            if (!isNaN(newQty) && newQty >= 0) {
                await this.updateItem(id, { quantity: newQty });
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
                        ${item.brand ? `<div class="item-brand">${this.escapeHtml(item.brand)}</div>` : ''}
                        ${storeInfo ? `<div class="item-store">From: ${this.escapeHtml(storeInfo)}</div>` : ''}
                        ${this.renderPriceInfo(item)}
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
                            <button onclick="event.stopPropagation(); app.showQuickUpdate('${item.id}'); app.closeAllOverflowMenus();">Update Qty</button>
                            <button onclick="event.stopPropagation(); app.startEdit('${item.id}'); app.closeAllOverflowMenus();">Edit</button>
                            <button class="delete-action" onclick="event.stopPropagation(); app.confirmDelete('${item.id}'); app.closeAllOverflowMenus();">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render price info with change indicator and unit suffix
    renderPriceInfo(item) {
        if (!item.last_price && item.last_price !== 0) return '';

        const price = parseFloat(item.last_price).toFixed(2);
        const priceUnit = item.price_unit || 'flat';
        const unitSuffix = this.getPriceUnitSuffix(priceUnit);
        let changeIndicator = '';

        if (item.previous_price !== null && item.previous_price !== undefined) {
            const prevPrice = parseFloat(item.previous_price);
            const currPrice = parseFloat(item.last_price);

            if (currPrice > prevPrice) {
                const diff = (currPrice - prevPrice).toFixed(2);
                changeIndicator = `<span class="price-up" title="Up $${diff} from $${prevPrice.toFixed(2)}${unitSuffix}">↑</span>`;
            } else if (currPrice < prevPrice) {
                const diff = (prevPrice - currPrice).toFixed(2);
                changeIndicator = `<span class="price-down" title="Down $${diff} from $${prevPrice.toFixed(2)}${unitSuffix}">↓</span>`;
            }
        }

        return `<div class="item-price">$${price}${unitSuffix}${changeIndicator} <button class="price-history-btn" onclick="event.stopPropagation(); app.showPriceHistory('${this.escapeHtml(item.name).replace(/'/g, "\\'")}')">History</button></div>`;
    }

    async confirmDelete(id) {
        const item = this.getItem(id);
        if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
            await this.deleteItem(id);
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

    // Find item in a specific location
    findItemInLocation(itemQuery, location) {
        const query = itemQuery.toLowerCase();
        return this.inventory.find(item =>
            item.name.toLowerCase().includes(query) &&
            item.location === location &&
            !item.deletedAt
        );
    }

    // Find item by name, preferring items with sufficient quantity, excluding a location
    findItemWithQuantity(itemQuery, minQuantity, excludeLocation = null) {
        const query = itemQuery.toLowerCase();
        return this.inventory
            .filter(item =>
                item.name.toLowerCase().includes(query) &&
                (!excludeLocation || item.location !== excludeLocation) &&
                !item.deletedAt
            )
            .sort((a, b) => b.quantity - a.quantity) // Prefer items with more quantity
            .find(item => item.quantity >= minQuantity);
    }

    // Calculate expiration when moving items between locations
    calculateMoveExpiration(category, fromLocation, toLocation) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Special case: defrosting (freezer -> fridge)
        if (fromLocation === 'freezer' && toLocation === 'fridge') {
            const days = DEFROST_EXPIRATION_DAYS[category] || DEFROST_EXPIRATION_DAYS['other'];
            const expDate = new Date(today);
            expDate.setDate(expDate.getDate() + days);
            return expDate.toISOString().split('T')[0];
        }

        // Standard calculation: base days * location multiplier
        const baseDays = EXPIRATION_DEFAULTS[category] || EXPIRATION_DEFAULTS['other'];
        const multiplier = LOCATION_EXPIRATION_MULTIPLIERS[toLocation] || 1;
        const adjustedDays = Math.round(baseDays * multiplier);

        const expDate = new Date(today);
        expDate.setDate(expDate.getDate() + adjustedDays);
        return expDate.toISOString().split('T')[0];
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

    async applyRecipeDeductions() {
        if (!this.parsedRecipeData) return;

        const { matched } = this.parsedRecipeData;
        let deductedCount = 0;

        for (let index = 0; index < matched.length; index++) {
            const m = matched[index];
            const checkbox = document.getElementById(`match-${index}`);
            if (checkbox && checkbox.checked && m.canConvert) {
                const newQty = Math.max(0, m.inventoryItem.quantity - m.deductAmount);
                await this.updateItem(m.inventoryItem.id, { quantity: newQty });
                deductedCount++;
            }
        }

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

        // Special commands: "scan" or "capture" - opens camera/image OCR
        if (input.toLowerCase() === 'scan' || input.toLowerCase() === 'capture') {
            return { action: 'show-scan' };
        }

        // Package/group commands: open modal, execute, create, or ad-hoc deduction
        if (input.toLowerCase() === 'group' || input.toLowerCase() === 'package') {
            return { action: 'show-packages' };
        }

        // Save and execute: "group save chai cardamom 1 tsp, cinnamon 0.5 tsp"
        const groupSave = input.match(/^(?:group|package)\s+save\s+([a-zA-Z][a-zA-Z0-9]*)\s+(.+,\s*.+)$/i);
        if (groupSave) {
            return { action: 'save-and-execute', packageName: groupSave[1].trim(), itemsString: groupSave[2] };
        }

        // Execute or create named package: "group chai" or "group create chai"
        const groupNamed = input.match(/^(?:group|package)\s+(create\s+)?([a-zA-Z][a-zA-Z0-9\s]*?)$/i);
        if (groupNamed) {
            const isCreate = !!groupNamed[1];
            return { action: isCreate ? 'create-package' : 'execute-package', packageName: groupNamed[2].trim() };
        }

        // Ad-hoc group deduction: "group cardamom 1 tsp, cinnamon 0.5 tsp"
        const groupAdhoc = input.match(/^(?:group|package)\s+(.+,\s*.+)$/i);
        if (groupAdhoc) {
            return { action: 'adhoc-deduct', itemsString: groupAdhoc[1] };
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

        // Move command: "move chicken 2lbs freezer fridge" or "move chicken 2lbs freezer to fridge"
        const moveCommandFull = input.match(/^move\s+(.+?)\s+(\d*\.?\d+)\s*([a-zA-Z]+)\s+(\w+)\s+(?:to\s+)?(\w+)$/i);
        if (moveCommandFull) {
            return {
                action: 'move',
                itemQuery: moveCommandFull[1].trim(),
                amount: parseFloat(moveCommandFull[2]),
                unit: this.normalizeUnitShortcut(moveCommandFull[3]),
                fromLocation: this.normalizeLocationShortcut(moveCommandFull[4]),
                toLocation: this.normalizeLocationShortcut(moveCommandFull[5])
            };
        }

        // Move with auto-detect source: "move chicken 2lbs to fridge"
        const moveCommandAuto = input.match(/^move\s+(.+?)\s+(\d*\.?\d+)\s*([a-zA-Z]+)\s+to\s+(\w+)$/i);
        if (moveCommandAuto) {
            return {
                action: 'move-auto',
                itemQuery: moveCommandAuto[1].trim(),
                amount: parseFloat(moveCommandAuto[2]),
                unit: this.normalizeUnitShortcut(moveCommandAuto[3]),
                toLocation: this.normalizeLocationShortcut(moveCommandAuto[4])
            };
        }

        // Move shorthand: "chicken >2lbs fridge" (move to fridge)
        const moveShorthand = input.match(/^(.+?)\s*>\s*(\d*\.?\d+)\s*([a-zA-Z]+)\s+@?(\w+)$/i);
        if (moveShorthand) {
            return {
                action: 'move-auto',
                itemQuery: moveShorthand[1].trim(),
                amount: parseFloat(moveShorthand[2]),
                unit: this.normalizeUnitShortcut(moveShorthand[3]),
                toLocation: this.normalizeLocationShortcut(moveShorthand[4])
            };
        }

        // View command: "view name" or "view partial"
        const viewCommand = input.match(/^view\s+(.+)$/i);
        if (viewCommand) {
            return { action: 'view', itemQuery: viewCommand[1].trim() };
        }

        // Price history commands: "chart <name>", "graph <name>", "price <name>"
        const priceHistoryCommand = input.match(/^(chart|graph|price)\s+(.+)$/i);
        if (priceHistoryCommand) {
            return { action: 'show-price-history', itemQuery: priceHistoryCommand[2].trim() };
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

        // New item with @location, #category, !threshold, $price, and store name:
        // +name amount unit @location #category !threshold $price/unit storename
        // e.g., "+chicken 3lb @fridge #protein !0.5 $6.99/lb costco"
        // e.g., "+red onion .52lbs $1.99/lb h mart"
        const newItemFull = input.match(/^\+\s*(.+?)\s+(\d*\.?\d+)\s*([a-zA-Z]+)(.*)$/);
        if (newItemFull) {
            const extras = newItemFull[4];
            const locationMatch = extras.match(/@(\S+)/);
            const categoryMatch = extras.match(/#(\S+)/);
            const thresholdMatch = extras.match(/!(\d*\.?\d+)/);
            const priceMatch = extras.match(/\$(\d+\.?\d*)(\/([a-zA-Z]+))?/);

            // After removing known patterns, remaining text is the store name
            let remaining = extras
                .replace(/\$\d+\.?\d*(\/[a-zA-Z]+)?/, '')  // remove price
                .replace(/@\S+/g, '')                       // remove location
                .replace(/#\S+/g, '')                       // remove category
                .replace(/!\d*\.?\d+/g, '')                 // remove threshold
                .trim();
            const store = remaining || null;

            const name = newItemFull[1].trim();
            return {
                action: 'add-new',
                name: name,
                amount: parseFloat(newItemFull[2]),
                unit: newItemFull[3],
                location: locationMatch ? this.normalizeLocationShortcut(locationMatch[1]) : null,
                category: categoryMatch ? this.normalizeCategoryShortcut(categoryMatch[1]) : null,
                threshold: thresholdMatch ? parseFloat(thresholdMatch[1]) : null,
                price: priceMatch ? parseFloat(priceMatch[1]) : null,
                priceUnit: priceMatch ? this.normalizePriceUnit(priceMatch[3]) : null,
                store: store ? this.normalizeStoreName(store) : null
            };
        }

        // New item partial: +name (no amount yet)
        const newItemPartial = input.match(/^\+\s*(.+)$/);
        if (newItemPartial && !newItemPartial[1].match(/\d/)) {
            return { action: 'add-new-partial', name: newItemPartial[1].trim() };
        }

        // Restock existing: name +amount unit (supports fractions like 1/4, 1 1/2, ½)
        const restock = input.match(/^(.+?)\s*\+\s*(\d+\s+\d+\/\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]|\d*\.?\d+)\s*([a-zA-Z]+)$/);
        if (restock) {
            return { action: 'restock', itemQuery: restock[1].trim(), amount: this.parseAmountString(restock[2]), unit: restock[3] };
        }

        // Deduct: name -amount unit (supports fractions like 1/4, 1 1/2, ½)
        const deduct = input.match(/^(.+?)\s*-\s*(\d+\s+\d+\/\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]|\d*\.?\d+)\s*([a-zA-Z]+)$/);
        if (deduct) {
            return { action: 'deduct', itemQuery: deduct[1].trim(), amount: this.parseAmountString(deduct[2]), unit: deduct[3] };
        }

        // Partial with number but no unit: name -amount or name +amount (supports fractions)
        const partialDeduct = input.match(/^(.+?)\s*-\s*(\d+\s+\d+\/\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\.?\d*)$/);
        if (partialDeduct) {
            return { action: 'deduct-partial', itemQuery: partialDeduct[1].trim(), amount: partialDeduct[2] };
        }

        const partialRestock = input.match(/^(.+?)\s*\+\s*(\d+\s+\d+\/\d+|\d+\/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\.?\d*)$/);
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

    // Normalize price unit shortcuts (e.g., lb -> per_lb)
    normalizePriceUnit(unit) {
        if (!unit) return 'flat';
        const normalized = unit.toLowerCase();
        const mapping = {
            'lb': 'per_lb', 'lbs': 'per_lb', 'pound': 'per_lb',
            'oz': 'per_oz', 'ounce': 'per_oz',
            'kg': 'per_kg', 'kilogram': 'per_kg',
            'g': 'per_g', 'gram': 'per_g', 'grams': 'per_g',
            'item': 'per_item', 'items': 'per_item', 'each': 'per_item', 'ea': 'per_item'
        };
        return mapping[normalized] || 'flat';
    }

    // Normalize store name to title case (e.g., "h mart" -> "H Mart")
    normalizeStoreName(store) {
        if (!store) return null;
        return store.trim().replace(/\b\w/g, c => c.toUpperCase());
    }

    // Get price unit suffix for display (e.g., per_lb -> /lb)
    getPriceUnitSuffix(priceUnit) {
        const suffixes = {
            'flat': '', 'per_lb': '/lb', 'per_oz': '/oz',
            'per_kg': '/kg', 'per_g': '/g', 'per_item': '/ea'
        };
        return suffixes[priceUnit] || '';
    }

    // Get price unit label for chart axis (e.g., per_lb -> $/lb)
    getPriceUnitLabel(priceUnit) {
        const labels = {
            'flat': '$', 'per_lb': '$/lb', 'per_oz': '$/oz',
            'per_kg': '$/kg', 'per_g': '$/g', 'per_item': '$/ea'
        };
        return labels[priceUnit] || '$';
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
            'liter': 'l', 'liters': 'l', 'litre': 'l', 'litres': 'l',
            // Count unit aliases - all normalize to 'items'
            'item': 'items', 'piece': 'items', 'pieces': 'items',
            'stalk': 'items', 'stalks': 'items',
            'unit': 'items', 'units': 'items',
            'each': 'items', 'ea': 'items',
            'count': 'items', 'ct': 'items',
            'bunch': 'items', 'bunches': 'items',
            'head': 'items', 'heads': 'items',
            'slice': 'items', 'slices': 'items',
            'can': 'items', 'cans': 'items',
            'bag': 'items', 'bags': 'items',
            'box': 'items', 'boxes': 'items',
            'bottle': 'items', 'bottles': 'items',
            'jar': 'items', 'jars': 'items',
            'pack': 'items', 'packs': 'items', 'package': 'items', 'packages': 'items',
            'loaf': 'items', 'loaves': 'items',
            'clove': 'items', 'cloves': 'items',
            'ear': 'items', 'ears': 'items',
            'bulb': 'items', 'bulbs': 'items'
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
            case 'move':
            case 'move-auto':
                this.quickDeductSuggestions.classList.add('hidden');
                this.showMovePreview(parsed);
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
    async executeDelete(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }

        if (this.pendingDeleteId === item.id) {
            // Second Enter - actually delete
            await this.deleteItem(item.id);
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
    async executeSetQty(parsed) {
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

        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });
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
    async executeToggleStaple(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            return;
        }

        await this.updateItem(item.id, { isStaple: !item.isStaple });
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

        // Close scan modal
        const scanModal = document.getElementById('scanModal');
        if (scanModal) scanModal.classList.add('hidden');

        // Reset body overflow
        document.body.style.overflow = '';

        // Clear command bar
        this.clearCommandBar();
    }

    // === SCAN/CAPTURE METHODS (Lazy-loaded Tesseract) ===

    showScanModal() {
        // Get or create scan modal elements
        this.scanModal = document.getElementById('scanModal');
        if (!this.scanModal) {
            console.error('Scan modal not found');
            return;
        }

        // Initialize scan modal event listeners if not already done
        if (!this.scanModalInitialized) {
            this.initializeScanModal();
        }

        this.scanModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.clearCommandBar();
    }

    initializeScanModal() {
        this.scanModalInitialized = true;

        const closeScanBtn = document.getElementById('closeScanModal');
        const scanFileInput = document.getElementById('scanFileInput');
        const scanCameraBtn = document.getElementById('scanCameraBtn');
        const scanUploadBtn = document.getElementById('scanUploadBtn');
        const scanProcessBtn = document.getElementById('scanProcessBtn');
        const scanUseAsRecipe = document.getElementById('scanUseAsRecipe');
        const scanCopyText = document.getElementById('scanCopyText');

        // Close modal
        closeScanBtn.addEventListener('click', () => this.closeScanModal());
        this.scanModal.addEventListener('click', (e) => {
            if (e.target === this.scanModal) this.closeScanModal();
        });

        // Camera button (uses file input with capture attribute)
        scanCameraBtn.addEventListener('click', () => {
            scanFileInput.setAttribute('capture', 'environment');
            scanFileInput.click();
        });

        // Upload button (removes capture to show file picker)
        scanUploadBtn.addEventListener('click', () => {
            scanFileInput.removeAttribute('capture');
            scanFileInput.click();
        });

        // Handle file selection
        scanFileInput.addEventListener('change', (e) => this.handleScanFileSelect(e));

        // Process image button
        scanProcessBtn.addEventListener('click', () => this.processScanImage());

        // Use as recipe button
        scanUseAsRecipe.addEventListener('click', () => this.useScanAsRecipe());

        // Copy text button
        scanCopyText.addEventListener('click', () => this.copyScanText());

        // Use as grocery receipt button
        const scanUseAsGrocery = document.getElementById('scanUseAsGrocery');
        scanUseAsGrocery.addEventListener('click', () => this.useScanAsGrocery());
    }

    closeScanModal() {
        this.scanModal.classList.add('hidden');
        document.body.style.overflow = '';

        // Reset scan modal state
        document.getElementById('scanPreview').classList.add('hidden');
        document.getElementById('scanLoading').classList.add('hidden');
        document.getElementById('scanResults').classList.add('hidden');
        document.getElementById('scanFileInput').value = '';
    }

    handleScanFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const previewImg = document.getElementById('scanPreviewImg');
            previewImg.src = event.target.result;
            document.getElementById('scanPreview').classList.remove('hidden');
            document.getElementById('scanResults').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    async processScanImage() {
        const previewImg = document.getElementById('scanPreviewImg');
        const loadingEl = document.getElementById('scanLoading');
        const loadingText = document.getElementById('scanLoadingText');
        const resultsEl = document.getElementById('scanResults');
        const resultText = document.getElementById('scanResultText');

        // Show loading state
        loadingEl.classList.remove('hidden');
        loadingText.textContent = 'Loading OCR engine...';

        try {
            // Lazy load Tesseract (only loads 3MB on first use)
            const worker = await loadTesseract();

            loadingText.textContent = 'Enhancing image...';
            const processedSrc = await preprocessReceiptImage(previewImg.src);

            loadingText.textContent = 'Processing image...';

            // Perform OCR on the contrast-enhanced, grayscale image
            const result = await worker.recognize(processedSrc);

            // Show results
            loadingEl.classList.add('hidden');
            resultText.value = result.data.text;
            resultsEl.classList.remove('hidden');

        } catch (error) {
            loadingEl.classList.add('hidden');
            alert('OCR failed: ' + error.message);
            console.error('OCR error:', error);
        }
    }

    useScanAsRecipe() {
        const resultText = document.getElementById('scanResultText').value;
        if (!resultText.trim()) {
            alert('No text to use');
            return;
        }

        // Close scan modal
        this.closeScanModal();

        // Open recipe section and paste text
        this.showRecipeSection();
        document.getElementById('recipeText').value = resultText;
    }

    copyScanText() {
        const resultText = document.getElementById('scanResultText');
        resultText.select();
        document.execCommand('copy');

        // Visual feedback
        const copyBtn = document.getElementById('scanCopyText');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    }

    // === GROCERY RECEIPT PARSING METHODS ===

    async useScanAsGrocery() {
        const resultText = document.getElementById('scanResultText').value;
        if (!resultText.trim()) {
            alert('No text to parse');
            return;
        }

        // Load user's previous corrections for smart parsing
        await this.loadCorrections();

        // Detect store from receipt header
        const detectedStore = this.detectStore(resultText);

        // Parse the receipt text
        const parsedItems = this.parseGroceryReceipt(resultText, detectedStore);

        if (parsedItems.length === 0) {
            alert('No grocery items detected. Try adjusting the image or manually copying the text.');
            return;
        }

        // Show review modal
        this.showGroceryReviewModal(parsedItems, detectedStore);
    }

    async loadCorrections() {
        if (this.corrections) return; // Already loaded

        try {
            this.corrections = await API.getCorrections();
        } catch (err) {
            console.error('Failed to load corrections:', err);
            this.corrections = [];
        }
    }

    // Detect store name from first 15 lines of receipt text
    detectStore(text) {
        const lines = text.split('\n').slice(0, 15).join(' ').toUpperCase();
        // Original stores
        if (/SHOPRITE|SHOP-RITE|SHOP RITE/.test(lines)) return 'ShopRite';
        if (/TRADER JOE|TRADER JOE'S|TJ'S/.test(lines)) return "Trader Joe's";
        if (/SUBZI\s*MANDI/.test(lines)) return 'Subzi Mandi';
        if (/H\s*MART|HMART/.test(lines)) return 'H Mart';
        // US chains
        if (/WHOLE\s*FOODS/.test(lines)) return 'Whole Foods';
        if (/COSTCO/.test(lines)) return 'Costco';
        if (/WALMART|WAL-MART|WAL MART/.test(lines)) return 'Walmart';
        if (/TARGET/.test(lines)) return 'Target';
        if (/KROGER/.test(lines)) return 'Kroger';
        if (/SAFEWAY/.test(lines)) return 'Safeway';
        if (/PUBLIX/.test(lines)) return 'Publix';
        if (/\bALDI\b/.test(lines)) return 'Aldi';
        // Indian grocery stores
        if (/PATEL\s*BROTHERS?/.test(lines)) return 'Patel Brothers';
        if (/INDIA\s*BAZAAR/.test(lines)) return 'India Bazaar';
        if (/APNA\s*BAZAAR/.test(lines)) return 'Apna Bazaar';
        if (/RAJA\s*FOODS?/.test(lines)) return 'Raja Foods';
        return null;
    }

    // OCR text normalization - fix common character recognition errors
    normalizeOcrText(text) {
        let normalized = text;

        // Fix common OCR character substitutions in context
        const ocrFixes = [
            // Numbers mistaken for letters (context-aware)
            [/\b0(?=[a-zA-Z])/g, 'O'],           // 0range -> Orange
            [/(?<=[a-zA-Z])0(?=[a-zA-Z])/g, 'o'], // Potat0 -> Potato
            [/\b1(?=[a-zA-Z])/g, 'l'],           // 1emon -> lemon
            [/(?<=[a-zA-Z])1(?=[a-zA-Z])/g, 'l'], // Mi1k -> Milk
            [/\b8(?=[a-zA-Z])/g, 'B'],           // 8anana -> Banana
            [/(?<=[a-zA-Z])8(?=[a-zA-Z])/g, 'B'], // Eg8s -> Eggs (rare)
            [/\b5(?=[a-zA-Z])/g, 'S'],           // 5pinach -> Spinach
            [/(?<=[a-zA-Z])5(?=[a-zA-Z])/g, 's'], // Chee5e -> Cheese

            // Common OCR ligature errors
            [/rn(?=[aeiou])/gi, 'm'],            // Corn -> Corn (cornmeal fix)
            [/\bCORN\b/gi, 'CORN'],              // Preserve CORN
            [/\bcorn\b/gi, 'corn'],              // Preserve corn

            // Double character errors
            [/\|\|/g, 'll'],                     // || -> ll
            [/\|(?=[a-zA-Z])/g, 'l'],            // |emon -> lemon
            [/(?<=[a-zA-Z])\|/g, 'l'],           // Mi|k -> Milk

            // Fix common decimal OCR errors
            [/O\.(\d)/g, '0.$1'],                // O.5 -> 0.5
            [/(\d)\.O/g, '$1.0'],                // 2.O -> 2.0
            [/l\.(\d)/g, '1.$1'],                // l.5 -> 1.5
        ];

        for (const [pattern, replacement] of ocrFixes) {
            normalized = normalized.replace(pattern, replacement);
        }

        // Normalize whitespace
        normalized = normalized.replace(/[\t\r]+/g, ' ');
        normalized = normalized.replace(/  +/g, ' ');

        return normalized;
    }

    // Levenshtein distance for fuzzy matching
    levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    // Calculate similarity score (0-1)
    stringSimilarity(a, b) {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const distance = this.levenshteinDistance(aLower, bLower);
        const maxLen = Math.max(aLower.length, bLower.length);
        if (maxLen === 0) return 1;
        return 1 - (distance / maxLen);
    }

    // Common grocery items dictionary for auto-correction
    getCommonGroceryItems() {
        return [
            // Produce
            'Apple', 'Apples', 'Banana', 'Bananas', 'Orange', 'Oranges', 'Lemon', 'Lemons',
            'Lime', 'Limes', 'Tomato', 'Tomatoes', 'Potato', 'Potatoes', 'Onion', 'Onions',
            'Garlic', 'Lettuce', 'Spinach', 'Carrot', 'Carrots', 'Celery', 'Pepper', 'Peppers',
            'Cucumber', 'Cucumbers', 'Avocado', 'Avocados', 'Strawberry', 'Strawberries',
            'Blueberry', 'Blueberries', 'Grape', 'Grapes', 'Watermelon', 'Cantaloupe',
            'Mango', 'Mangoes', 'Peach', 'Peaches', 'Pear', 'Pears', 'Broccoli', 'Cauliflower',
            'Cabbage', 'Kale', 'Mushroom', 'Mushrooms', 'Zucchini', 'Squash', 'Corn',

            // Dairy
            'Milk', 'Whole Milk', 'Skim Milk', '2% Milk', 'Cheese', 'Cheddar', 'Mozzarella',
            'Parmesan', 'Yogurt', 'Greek Yogurt', 'Butter', 'Cream', 'Sour Cream',
            'Cream Cheese', 'Cottage Cheese', 'Eggs', 'Egg', 'Half and Half',

            // Meat
            'Chicken', 'Chicken Breast', 'Chicken Thighs', 'Ground Beef', 'Beef', 'Steak',
            'Pork', 'Pork Chops', 'Bacon', 'Sausage', 'Turkey', 'Ground Turkey', 'Ham',
            'Salmon', 'Tuna', 'Shrimp', 'Fish', 'Lamb',

            // Bakery
            'Bread', 'White Bread', 'Wheat Bread', 'Bagel', 'Bagels', 'Muffin', 'Muffins',
            'Croissant', 'Rolls', 'Buns', 'Tortilla', 'Tortillas', 'Pita',

            // Pantry
            'Rice', 'White Rice', 'Brown Rice', 'Pasta', 'Spaghetti', 'Flour', 'Sugar',
            'Salt', 'Pepper', 'Olive Oil', 'Vegetable Oil', 'Vinegar', 'Honey', 'Syrup',
            'Peanut Butter', 'Jelly', 'Cereal', 'Oatmeal', 'Beans', 'Black Beans',

            // Beverages
            'Water', 'Juice', 'Orange Juice', 'Apple Juice', 'Coffee', 'Tea', 'Soda',
            'Cola', 'Sprite', 'Wine', 'Beer',

            // Snacks
            'Chips', 'Crackers', 'Pretzels', 'Popcorn', 'Cookies', 'Chocolate', 'Candy',

            // Indian Grocery Items
            // Spices and Masalas
            'Garam Masala', 'Coriander Powder', 'Cumin Powder', 'Turmeric Powder',
            'Chili Powder', 'Kashmiri Chili', 'Red Chili Powder', 'Coriander Seeds',
            'Cumin Seeds', 'Mustard Seeds', 'Fenugreek Seeds', 'Fennel Seeds',
            'Cardamom', 'Cloves', 'Cinnamon Sticks', 'Bay Leaves', 'Asafoetida', 'Hing',
            'Biryani Masala', 'Tandoori Masala', 'Chaat Masala', 'Pav Bhaji Masala',
            'Sambar Powder', 'Rasam Powder', 'Curry Powder', 'Kitchen King Masala',
            'Nihari Masala', 'Sindhi Biryani', 'Tikka Masala',

            // Indian Brands
            'Shan', 'MDH', 'Everest', 'Badshah', 'Catch', 'Eastern', 'Aachi',
            'Deep', 'Haldirams', 'Bikano', 'Swad', 'Laxmi', 'TRS', 'Pataks',

            // Indian Vegetables and Produce
            'Okra', 'Bhindi', 'Karela', 'Bitter Gourd', 'Tindora', 'Parval',
            'Drumstick', 'Methi', 'Fenugreek Leaves', 'Palak', 'Spinach',
            'Coriander Leaves', 'Curry Leaves', 'Ginger', 'Green Chili',

            // Indian Snacks
            'Murukku', 'Bhakarwadi', 'Chakli', 'Bhujia', 'Sev', 'Chivda', 'Mixture',
            'Namkeen', 'Banana Chips', 'Jackfruit Chips', 'Tapioca Chips',
            'Mathri', 'Khakhra', 'Papad',

            // Indian Breads
            'Naan', 'Garlic Naan', 'Roti', 'Chapati', 'Paratha', 'Puri', 'Bhatura',
            'Kulcha', 'Tandoori Roti',

            // Aldi Items
            'Belle Vie', 'Choceur', 'Simply Nature', 'Specially Selected',
            'Mama Cozzis', 'Clancy', 'Millville', 'Fit Active',

            // ShopRite Items
            'Diamond Crystal', 'Kosher Salt', 'Wholesome Pantry', 'Bowl & Basket',
            'Amore', 'Sun Luck', 'Sesame Oil'
        ];
    }

    // Common receipt abbreviations
    getAbbreviationExpansions() {
        return {
            'ORG': 'Organic',
            'BNLS': 'Boneless',
            'SKNLS': 'Skinless',
            'CHKN': 'Chicken',
            'BRST': 'Breast',
            'THGH': 'Thigh',
            'GRN': 'Green',
            'RED': 'Red',
            'YLW': 'Yellow',
            'FRZ': 'Frozen',
            'FRSH': 'Fresh',
            'LG': 'Large',
            'SM': 'Small',
            'MED': 'Medium',
            'WHL': 'Whole',
            'GRD': 'Ground',
            'BF': 'Beef',
            'PRK': 'Pork',
            'TRKY': 'Turkey',
            'VEG': 'Vegetable',
            'FRT': 'Fruit',
            'JCE': 'Juice',
            'BTL': 'Bottle',
            'PKG': 'Package',
            'CT': 'Count',
            'PK': 'Pack',
            'EA': 'Each',
            'LB': 'Pound',
            'OZ': 'Ounce',
            'GAL': 'Gallon',
            'QT': 'Quart',
            'PT': 'Pint',
            'DZ': 'Dozen',
            'HLF': 'Half',
            'FF': 'Fat Free',
            'LF': 'Low Fat',
            'RF': 'Reduced Fat',
            'NS': 'No Salt',
            'LS': 'Low Sodium',
            'GF': 'Gluten Free',
            'NF': 'Non Fat',
            'SS': 'Seedless',
            'SWT': 'Sweet',
            'PEPR': 'Pepper',
            'ONIN': 'Onion',
            'TOMS': 'Tomatoes',
            'POTS': 'Potatoes',
            'CRTS': 'Carrots',
            'BRCL': 'Broccoli',
            'CAUL': 'Cauliflower',
            'SPRTS': 'Sprouts',
            'MUSH': 'Mushrooms',
            'SALM': 'Salmon',
            'SHRMP': 'Shrimp',
            'TUNA': 'Tuna',
            // Spice preparation abbreviations
            'GRND': 'Ground',
            'SMKD': 'Smoked',
            'RSTR': 'Roasted',
            'PWDR': 'Powder',
            'DRYD': 'Dried',
            'CRS': 'Coarse',
            'FN': 'Fine',
            // Store brand codes
            'SRBB': '',
            'LKK': 'Lee Kum Kee',
            'TMA': '',
            // Aldi abbreviations
            'SLTZR': 'Seltzer',
            'SLCD': 'Sliced',
            'BRI': 'Brief',
            'BRIPC': '',
            'CHOP': 'Chop',
            'PURPL': 'Purple',
            'EGGPLNT': 'Eggplant',
            'BRCL': 'Broccoli',
            'VEGE': 'Vegetable',
            // ShopRite abbreviations
            'CHKMT': 'Chop Meat',
            'WHLS': 'Wholesome',
            'PNTRY': 'Pantry',
            'SSME': 'Sesame',
            'BNANA': 'Banana',
            'KOSHEF': 'Kosher',
            // Indian grocery abbreviations
            'RESHMI': 'Reshmi',
            'SINDHI': 'Sindhi',
            'NIHART': 'Nihari',
            'CHILLI': 'Chilli',
            'MURUKK': 'Murukku',
            // Common receipt abbreviations
            'MTN': 'Mutton',
            'CHPS': 'Chips',
            'BRKFST': 'Breakfast',
            'DNNR': 'Dinner',
            'LNCH': 'Lunch'
        };
    }

    // Expand abbreviations in item name
    expandAbbreviations(name) {
        const abbrevs = this.getAbbreviationExpansions();
        let expanded = name;

        for (const [abbrev, full] of Object.entries(abbrevs)) {
            // Match whole word abbreviations (case insensitive)
            const regex = new RegExp(`\\b${abbrev}\\b`, 'gi');
            expanded = expanded.replace(regex, full);
        }

        return expanded;
    }

    // Apply common item corrections using fuzzy matching
    applyCommonItemCorrections(name) {
        const commonItems = this.getCommonGroceryItems();
        const nameLower = name.toLowerCase().trim();

        // First try exact match
        for (const item of commonItems) {
            if (item.toLowerCase() === nameLower) {
                return item;
            }
        }

        // Then try fuzzy match with high threshold
        let bestMatch = null;
        let bestScore = 0;
        const threshold = 0.85;

        for (const item of commonItems) {
            const score = this.stringSimilarity(nameLower, item.toLowerCase());
            if (score > threshold && score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        }

        return bestMatch;
    }

    // Parse fraction strings to decimal
    parseFraction(str) {
        // Unicode fractions
        const unicodeFractions = {
            '½': 0.5, '⅓': 0.333, '⅔': 0.667, '¼': 0.25, '¾': 0.75,
            '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8, '⅙': 0.167,
            '⅚': 0.833, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875
        };

        // Check for unicode fractions
        for (const [frac, val] of Object.entries(unicodeFractions)) {
            if (str.includes(frac)) {
                // Handle "1½" = 1.5
                const match = str.match(new RegExp(`(\\d+)?${frac}`));
                if (match) {
                    const whole = match[1] ? parseInt(match[1]) : 0;
                    return whole + val;
                }
            }
        }

        // Word fractions
        const wordFractions = {
            'half': 0.5, 'quarter': 0.25, 'third': 0.333
        };

        const lower = str.toLowerCase();
        for (const [word, val] of Object.entries(wordFractions)) {
            if (lower.includes(word)) {
                return val;
            }
        }

        return null;
    }

    // Parse word-based quantities
    parseWordQuantity(str) {
        const wordQuantities = {
            'dozen': 12, 'doz': 12,
            'half dozen': 6, 'half doz': 6,
            'pair': 2,
            'single': 1, 'one': 1,
            'two': 2, 'three': 3, 'four': 4, 'five': 5,
            'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
            'couple': 2
        };

        const lower = str.toLowerCase();
        for (const [word, qty] of Object.entries(wordQuantities)) {
            if (lower.includes(word)) {
                return qty;
            }
        }

        // Handle "about X" or "~X" or "approx X"
        const approxMatch = lower.match(/(?:about|approximately|approx|~)\s*(\d+\.?\d*)/);
        if (approxMatch) {
            return parseFloat(approxMatch[1]);
        }

        return null;
    }

    parseGroceryReceipt(text, store) {
        // Pre-process OCR text to fix common recognition errors
        const normalizedText = this.normalizeOcrText(text);
        const lines = normalizedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const items = [];

        // Common receipt patterns
        const pricePattern = /\$?\d+\.\d{2}\s*(?:FA|EL|F|T)?$/i;  // Allow price suffixes (FA=Aldi, EL=Subzi Mandi, F/T=tax indicators)
        const qtyPricePattern = /^(\d+\.?\d*)\s*[@x]\s*\$?(\d+\.\d{2})/i;
        const leadingQtyPattern = /^(\d+\.?\d*)\s+(.+)/;
        const weightPattern = /(\d+\.?\d*)\s*(lb|lbs|oz|kg|g)\b/i;
        const fractionQtyPattern = /^(\d*[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])\s+(.+)/;
        // Weight @ price/unit format: "1.37 lb @ $2.49/lb"
        const weightAtPricePattern = /(\d+\.?\d*)\s*(lb|lbs|oz|kg|g)\s*[@at]+\s*\$?(\d+\.?\d*)\s*\/\s*(lb|lbs|oz|kg|g)/i;
        // Barcode at start of line (Subzi Mandi format)
        const barcodePattern = /^(\d{10,14})\s+/;

        // Skip patterns (headers, totals, etc.)
        const skipPatterns = [
            /^(subtotal|total|tax|change|cash|credit|debit|visa|mastercard|amex)/i,
            /^(thank|welcome|store|receipt|date|time|transaction|#|phone)/i,
            /^\*+$/,
            /^-+$/,
            /^\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/,  // Dates
            /^\d{1,2}:\d{2}/,  // Times
            /^[\d\s\-\(\)]+$/,  // Just numbers (phone, card numbers)

            // Address patterns - street addresses
            /^\d+\s+(n\.?|s\.?|e\.?|w\.?|north|south|east|west)?\s*[a-z]+\s+(st\.?|street|ave\.?|avenue|rd\.?|road|blvd\.?|boulevard|dr\.?|drive|ln\.?|lane|way|ct\.?|court|pl\.?|place|pkwy\.?|parkway|hwy\.?|highway)\b/i,
            // Route/highway address lines (e.g., "Route 46 Pint", "Rt. 9 North")
            /^(route|rt\.?)\s+\d+/i,
            // City, State ZIP patterns (e.g., "Edison, NJ 08817" or "SPRINGFIELD NJ 07081")
            /^[a-z\s]+,?\s*[a-z]{2}\s*\d{5}(-\d{4})?$/i,
            // City, State without ZIP (e.g., "Totowa , Nj : 2" or "Totowa, NJ")
            /^[a-z][a-z\s]{2,20},\s*[a-z]{2}\s*(:\s*\d+)?\s*$/i,
            // Phone patterns (various formats)
            /^\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}$/,
            /^tel:?\s*\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}/i,
            // Store name lines (store name alone, optionally with trailing colon/punctuation)
            /^(aldi|shoprite|shop-rite|trader joe'?s?|h\s*mart|whole\s*foods|costco|walmart|wal-mart|target|kroger|safeway|publix|subzi\s*mandi|patel\s*brothers?|india\s*bazaar|apna\s*bazaar|raja\s*foods?)\s*[:#]?\s*$/i,
            // Common receipt header/footer lines
            /^(manager|cashier|clerk|customer\s*copy|merchant\s*copy|retain\s*this)/i,
            /^(open|closed|hours?:?|mon|tue|wed|thu|fri|sat|sun)/i,
            /^(member|loyalty|rewards?|points?|savings?|coupon)/i
        ];

        // Store-specific skip patterns
        if (store === 'ShopRite') {
            skipPatterns.push(
                /^(SC|MC|WT)\s*\/\s*\d+/i,    // SC/123456 department/item codes
                /^on sale you saved/i,
                /^you saved/i,
                /^sale\s+\d/i,
                /^SRBB\s+/i,                    // ShopRite brand code lines
                /valued customer/i,
                /terminal:\s*\d+/i,
                /operator:\s*\d+/i,
                /^purchase:/i
            );
        } else if (store === 'H Mart') {
            skipPatterns.push(
                /^WT\s+\d+/i,                  // WT weight codes
                /^regular price/i,
                /^you saved/i
            );
        } else if (store === 'Subzi Mandi') {
            skipPatterns.push(
                /^\d{13}\s/,                   // Leading 13-digit barcodes
                /\bEL\s*$/i,                   // "EL" suffix lines
                /^receipt\s*[:#]/i,
                /^store:\s*/i,
                /^terminal:\s*/i,
                /total tendered/i,
                /^credit\s+card/i
            );
        } else if (store === 'Aldi') {
            skipPatterns.push(
                /^store\s*#?\d+/i,             // Store #172
                /your cashier/i,
                /^ref\/seq/i,                   // Ref/Seq #
                /^trace\s*#/i,
                /^auth\s*#/i,
                /^aid\s+[a-f0-9]+/i,           // AID codes
                /^tad\s+[a-f0-9]+/i,           // TAD codes
                /^tsi\s+[a-f0-9]+/i,           // TSI codes
                /^arc\s+\d+/i,
                /entrymode/i,
                /^\+*approved\+*$/i,
                /^b-taxable/i,
                /^a-taxable/i,
                /pin\s+t/i,                    // PIN T... lines
                /sign up for/i,
                /sneak peek/i,
                /weekly ad/i,
                /www\.aldi/i,
                /help\.aldi/i,
                /^\d{3}\/\d{3}\/\d{3}\/\d{3}/, // 460/172/003/012 format
                // Additional Aldi patterns
                /^aldi\s*(foods?|inc\.?|stores?)?$/i,  // Store name variants
                /aldi\s*find/i,                 // ALDI Find items header
                /^everyday\s*low/i,             // Marketing slogans
                /^save\s*more/i,
                /^find\s*us\s*(on|at)/i,        // Social media
                /^(facebook|twitter|instagram)/i,
                /^app\s*store/i,
                /^google\s*play/i,
                /^download\s*(our|the)\s*app/i,
                /^scan\s*(to|for)/i,            // QR code prompts
                /^visit\s*(us|aldi)/i,
                /^survey/i,
                /^tell\s*us/i,
                /^chip\s*read/i,                // Payment method info
                /^contactless/i,
                /^debit\s*(card)?$/i,
                /^balance/i
            );
        }

        for (const line of lines) {
            // Skip non-item lines
            if (skipPatterns.some(p => p.test(line))) continue;
            if (line.length < 2) continue;

            let itemName = line;
            let quantity = 1;
            let unit = 'items';
            let price = null;

            // Remove barcode from start of line (Subzi Mandi format)
            const barcodeMatch = itemName.match(barcodePattern);
            if (barcodeMatch) {
                itemName = itemName.replace(barcodePattern, '').trim();
            }

            // Check for weight @ price/unit format first (e.g., "1.37 lb @ $2.49/lb")
            const weightAtPriceMatch = itemName.match(weightAtPricePattern);
            if (weightAtPriceMatch) {
                quantity = parseFloat(weightAtPriceMatch[1]);
                unit = this.normalizeUnit(weightAtPriceMatch[2]);
                // Remove the weight @ price portion from the name
                itemName = itemName.replace(weightAtPricePattern, '').trim();
            }

            // Extract price from end (handles FA, EL, F, T suffixes)
            const priceMatch = line.match(pricePattern);
            if (priceMatch) {
                // Extract just the numeric portion
                const priceStr = priceMatch[0].replace(/[^0-9.]/g, '');
                price = parseFloat(priceStr);
                itemName = itemName.replace(pricePattern, '').trim();
            }

            // Check for quantity x price format (e.g., "2 @ $3.99")
            const qtyPriceMatch = itemName.match(qtyPricePattern);
            if (qtyPriceMatch) {
                quantity = parseFloat(qtyPriceMatch[1]);
                itemName = itemName.replace(qtyPricePattern, '').trim();
            }

            // Check for fraction quantities (e.g., "½ cup", "1½ lbs")
            const fractionQtyMatch = itemName.match(fractionQtyPattern);
            if (fractionQtyMatch) {
                const fracVal = this.parseFraction(fractionQtyMatch[1]);
                if (fracVal !== null) {
                    quantity = fracVal;
                    itemName = fractionQtyMatch[2].trim();
                }
            }

            // Check for word quantities (e.g., "dozen eggs", "half gallon")
            const wordQty = this.parseWordQuantity(itemName);
            if (wordQty !== null) {
                quantity = wordQty;
                // Remove the word quantity from the name
                itemName = itemName.replace(/\b(dozen|doz|half dozen|half doz|pair|single|one|two|three|four|five|six|seven|eight|nine|ten|couple|about|approximately|approx|~)\s*\d*\s*/gi, '').trim();
            }

            // Check for leading quantity (e.g., "2 Bananas")
            const leadingQtyMatch = itemName.match(leadingQtyPattern);
            if (leadingQtyMatch && !itemName.match(/^\d+\.?\d*\s*(oz|lb|kg|g)\b/i)) {
                quantity = parseFloat(leadingQtyMatch[1]);
                itemName = leadingQtyMatch[2].trim();
            }

            // Check for weight (e.g., "2.5 lbs")
            const weightMatch = itemName.match(weightPattern);
            if (weightMatch) {
                quantity = parseFloat(weightMatch[1]);
                unit = this.normalizeUnit(weightMatch[2]);
                itemName = itemName.replace(weightPattern, '').trim();
            }

            // Expand abbreviations (BNLS CHKN BRST -> Boneless Chicken Breast)
            itemName = this.expandAbbreviations(itemName);

            // Clean up item name
            itemName = this.cleanGroceryItemName(itemName);

            if (!itemName || itemName.length < 2) continue;

            // Apply any learned corrections (with fuzzy matching)
            const correction = this.findCorrection(itemName);
            let finalName = itemName;
            let wasAutoCorrect = false;

            if (correction) {
                finalName = correction.correctedName;
                quantity = correction.correctedQuantity || quantity;
                unit = correction.correctedUnit || unit;
                wasAutoCorrect = true;
            } else {
                // Try common item dictionary correction
                const commonCorrection = this.applyCommonItemCorrections(itemName);
                if (commonCorrection) {
                    finalName = commonCorrection;
                    wasAutoCorrect = true;
                } else {
                    finalName = this.capitalizeWords(itemName);
                }
            }

            items.push({
                originalText: line,
                name: finalName,
                quantity: quantity,
                unit: unit,
                category: correction?.correctedCategory || this.guessCategory(finalName),
                price: price,
                wasAutoCorrect: wasAutoCorrect,
                boughtFrom: store || null
            });
        }

        return items;
    }

    cleanGroceryItemName(name) {
        // Remove common receipt artifacts
        return name
            .replace(/\s+/g, ' ')                    // Normalize whitespace
            .replace(/^[\d\s\.\-]+/, '')             // Remove leading numbers/dots
            .replace(/[#\*]+$/, '')                  // Remove trailing symbols
            .replace(/\s*F$/, '')                    // Remove tax indicator "F"
            .replace(/\s*T$/, '')                    // Remove taxable indicator
            .replace(/\s*(FA|EL)\s*$/i, '')          // Remove Aldi/Subzi Mandi suffixes
            .replace(/\s*=EA\s*$/i, '')              // Remove =EA suffix
            .replace(/\s*-EA\s*$/i, '')              // Remove -EA suffix
            .replace(/\([^)]*\)$/, '')               // Remove trailing parenthetical
            .replace(/^\s*ORG\s+/i, 'Organic ')      // Expand ORG abbreviation
            .replace(/\s*PC$/i, '')                  // Remove PC suffix (ShopRite)
            .replace(/\s*BRIPC$/i, '')               // Remove BRIPC suffix (ShopRite)
            .replace(/\s*\d+G$/i, '')                // Remove weight suffix like 150G
            .replace(/\s*\d+OZ$/i, '')               // Remove weight suffix like 6OZ
            .replace(/\bBN\d+/gi, '')                // Remove BN... codes (Subzi Mandi)
            .replace(/\bRR\d+/gi, '')                // Remove RR... codes
            .trim();
    }

    findCorrection(text) {
        if (!this.corrections || this.corrections.length === 0) return null;

        const normalized = text.toLowerCase().trim();

        // Exact match first (highest priority)
        let match = this.corrections.find(c =>
            c.originalText.toLowerCase() === normalized
        );

        if (match) return match;

        // Fuzzy match using Levenshtein distance
        // Find the best match above 80% similarity, weighted by use_count
        let bestMatch = null;
        let bestScore = 0;
        const similarityThreshold = 0.80;

        for (const correction of this.corrections) {
            const orig = correction.originalText.toLowerCase();
            const similarity = this.stringSimilarity(normalized, orig);

            if (similarity >= similarityThreshold) {
                // Weight by use_count (more frequently used corrections preferred)
                const weightedScore = similarity * (1 + Math.log10(1 + (correction.useCount || 1)));

                if (weightedScore > bestScore) {
                    bestScore = weightedScore;
                    bestMatch = correction;
                }
            }
        }

        return bestMatch;
    }

    guessCategory(itemName) {
        const name = itemName.toLowerCase();

        const categoryPatterns = {
            'produce': /\b(apple|banana|orange|lemon|lime|tomato|potato|onion|garlic|lettuce|spinach|carrot|celery|pepper|cucumber|avocado|berry|berries|grape|melon|mango|peach|pear|plum|broccoli|cauliflower|cabbage|kale|mushroom|zucchini|squash|corn|bean|pea|organic|fresh|fruit|vegetable|produce|okra|bhindi|karela|bitter gourd|tindora|parval|drumstick|palak|eggplant|coriander leaf|curry leaf|green chili|red onion|yellow onion)\b/i,
            'dairy': /\b(milk|cheese|yogurt|butter|cream|egg|eggs|cottage|sour cream|half|cheddar|mozzarella|parmesan)\b/i,
            'meat': /\b(chicken|beef|pork|turkey|bacon|sausage|ham|steak|ground|meat|lamb|fish|salmon|tuna|shrimp|seafood)\b/i,
            'bakery': /\b(bread|bagel|muffin|croissant|roll|bun|cake|cookie|pastry|donut|pie|tortilla|naan|roti|chapati|paratha|puri|bhatura|kulcha|pita|loaf)\b/i,
            'frozen': /\b(frozen|ice cream|pizza|fries|nugget|popsicle)\b/i,
            'beverages': /\b(water|juice|soda|coffee|tea|wine|beer|drink|cola|sprite|pepsi|coke)\b/i,
            'spice': /\b(spice|spices|cumin|turmeric|paprika|cinnamon|oregano|thyme|basil|rosemary|sage|coriander|cardamom|clove|cloves|nutmeg|ginger|chili powder|cayenne|allspice|anise|bay leaf|bay leaves|dill|fennel|fenugreek|garlic powder|onion powder|mustard seed|peppercorn|saffron|tarragon|wasabi|sumac|za.atar|seasoning|seasoning blend|rub|masala|biryani|nihari|garam|tandoori|tikka|curry|chaat|sambar|rasam|shan|mdh|everest|badshah|catch|eastern|aachi|kitchen king|pav bhaji|chole|paneer|methi|ajwain|asafoetida|hing|jeera|amchur|chilli|mirch|haldi|dhania|kalonji|nigella|kasuri|kashmiri)\b/i,
            'pantry': /\b(rice|pasta|cereal|flour|sugar|oil|sauce|soup|can|canned|spice|salt|pepper|vinegar|honey|syrup|peanut|almond|nut)\b/i,
            'snacks': /\b(chip|chips|cracker|pretzel|popcorn|candy|chocolate|snack|bar|granola|murukku|chakli|bhakarwadi|bhujia|mixture|namkeen|mathri|shakarpara|sev|chivda|farsan|khakhra|papad|fryums|banana chips|jackfruit chips|tapioca chips|plantain chips)\b/i,
            'condiments': /\b(ketchup|mustard|mayo|mayonnaise|dressing|relish|salsa|hot sauce)\b/i,
            'cleaning': /\b(soap|detergent|cleaner|bleach|sponge|paper towel|tissue|trash bag|dishwasher)\b/i,
            'personal': /\b(shampoo|conditioner|toothpaste|deodorant|lotion|razor|band-aid|medicine|vitamin)\b/i
        };

        for (const [category, pattern] of Object.entries(categoryPatterns)) {
            if (pattern.test(name)) {
                return category;
            }
        }

        return 'other';
    }

    showGroceryReviewModal(items, store) {
        this.parsedGroceryItems = items;
        this.currentParsedStore = store;

        // Initialize modal if needed
        if (!this.groceryReviewModalInitialized) {
            this.initializeGroceryReviewModal();
        }

        // Set store dropdown value
        const storeSelect = document.getElementById('groceryStoreSelect');
        const storeCustom = document.getElementById('groceryStoreCustom');
        if (storeSelect) {
            // Check if detected store is in the dropdown options
            const options = Array.from(storeSelect.options).map(o => o.value);
            if (store && options.includes(store)) {
                storeSelect.value = store;
                storeCustom.classList.add('hidden');
            } else if (store) {
                // Store detected but not in list - use custom
                storeSelect.value = 'custom';
                storeCustom.value = store;
                storeCustom.classList.remove('hidden');
            } else {
                storeSelect.value = '';
                storeCustom.value = '';
                storeCustom.classList.add('hidden');
            }

            // Handle custom store selection
            storeSelect.onchange = () => {
                if (storeSelect.value === 'custom') {
                    storeCustom.classList.remove('hidden');
                    storeCustom.focus();
                } else {
                    storeCustom.classList.add('hidden');
                    storeCustom.value = '';
                }
            };
        }

        // Populate items
        const listEl = document.getElementById('groceryItemsList');
        listEl.innerHTML = items.map((item, idx) => this.renderGroceryItemRow(item, idx)).join('');

        // Add input event listeners for tracking changes
        listEl.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('change', () => this.markGroceryItemCorrected(el));
        });

        // Show modal
        const modal = document.getElementById('groceryReviewModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Close scan modal
        this.closeScanModal();
    }

    renderGroceryItemRow(item, idx) {
        const unitOptions = ['items', 'lbs', 'oz', 'kg', 'g', 'gal', 'L', 'ml', 'cups', 'pcs', 'bags', 'boxes', 'cans', 'bottles', 'jars', 'bunches'];
        const categoryOptions = ['produce', 'dairy', 'meat', 'bakery', 'frozen', 'beverages', 'pantry', 'snacks', 'condiments', 'cleaning', 'personal', 'other'];

        return `
            <div class="grocery-item-row${item.wasAutoCorrect ? ' corrected' : ''}" data-idx="${idx}">
                <input type="checkbox" class="grocery-item-checkbox" checked>
                <input type="text" class="grocery-item-name" value="${this.escapeHtml(item.name)}" data-field="name">
                <input type="number" class="grocery-item-qty" value="${item.quantity}" min="0" step="0.1" data-field="quantity">
                <select class="grocery-item-unit" data-field="unit">
                    ${unitOptions.map(u => `<option value="${u}"${u === item.unit ? ' selected' : ''}>${u}</option>`).join('')}
                </select>
                <select class="grocery-item-category" data-field="category">
                    ${categoryOptions.map(c => `<option value="${c}"${c === item.category ? ' selected' : ''}>${c}</option>`).join('')}
                </select>
                <button class="grocery-item-remove" onclick="app.removeGroceryItem(${idx})">×</button>
                ${item.originalText !== item.name ? `<div class="grocery-item-original">Original: "${this.escapeHtml(item.originalText)}"</div>` : ''}
            </div>
        `;
    }

    markGroceryItemCorrected(el) {
        const row = el.closest('.grocery-item-row');
        const idx = parseInt(row.dataset.idx);
        const field = el.dataset.field;

        if (field && this.parsedGroceryItems[idx]) {
            const newValue = field === 'quantity' ? parseFloat(el.value) : el.value;
            this.parsedGroceryItems[idx][field] = newValue;
            this.parsedGroceryItems[idx].wasEdited = true;
            row.classList.add('corrected');
        }
    }

    removeGroceryItem(idx) {
        const row = document.querySelector(`.grocery-item-row[data-idx="${idx}"]`);
        if (row) {
            row.remove();
            this.parsedGroceryItems[idx] = null;
        }
    }

    initializeGroceryReviewModal() {
        this.groceryReviewModalInitialized = true;

        const modal = document.getElementById('groceryReviewModal');
        const closeBtn = document.getElementById('closeGroceryReview');
        const addBtn = document.getElementById('groceryAddSelected');
        const cancelBtn = document.getElementById('groceryCancel');

        closeBtn.addEventListener('click', () => this.closeGroceryReviewModal());
        cancelBtn.addEventListener('click', () => this.closeGroceryReviewModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeGroceryReviewModal();
        });

        addBtn.addEventListener('click', () => this.addGroceryItemsToInventory());
    }

    closeGroceryReviewModal() {
        const modal = document.getElementById('groceryReviewModal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.parsedGroceryItems = null;
    }

    async addGroceryItemsToInventory() {
        const rows = document.querySelectorAll('.grocery-item-row');
        const itemsToAdd = [];
        const correctionsToSave = [];

        // Get selected store from dropdown
        const storeSelect = document.getElementById('groceryStoreSelect');
        const storeCustom = document.getElementById('groceryStoreCustom');
        let selectedStore = null;
        if (storeSelect) {
            if (storeSelect.value === 'custom') {
                selectedStore = storeCustom.value.trim() || null;
            } else {
                selectedStore = storeSelect.value || null;
            }
        }

        rows.forEach((row, idx) => {
            const checkbox = row.querySelector('.grocery-item-checkbox');
            if (!checkbox.checked) return;

            const item = this.parsedGroceryItems[idx];
            if (!item) return;

            // Get current values from form
            const name = row.querySelector('.grocery-item-name').value.trim();
            const quantity = parseFloat(row.querySelector('.grocery-item-qty').value) || 1;
            const unit = row.querySelector('.grocery-item-unit').value;
            const category = row.querySelector('.grocery-item-category').value;

            itemsToAdd.push({
                name,
                quantity,
                unit,
                category,
                price: item.price || null,
                bought_from: selectedStore
            });

            // If user edited this item, save correction for learning
            if (item.wasEdited || name !== item.originalText) {
                correctionsToSave.push({
                    originalText: item.originalText,
                    correctedName: name,
                    correctedQuantity: quantity,
                    correctedUnit: unit,
                    correctedCategory: category
                });
            }
        });

        if (itemsToAdd.length === 0) {
            alert('No items selected');
            return;
        }

        const addBtn = document.getElementById('groceryAddSelected');
        addBtn.disabled = true;
        addBtn.textContent = 'Adding...';

        try {
            // Save corrections first (non-blocking)
            if (correctionsToSave.length > 0) {
                API.saveCorrections(correctionsToSave).catch(err =>
                    console.error('Failed to save corrections:', err)
                );
                // Update local cache
                if (this.corrections) {
                    this.corrections = [...this.corrections, ...correctionsToSave];
                }
            }

            // Add items to inventory (update existing or create new)
            let added = 0;
            let updated = 0;

            for (const item of itemsToAdd) {
                // Check if item already exists
                const existing = this.inventory.find(i =>
                    i.name.toLowerCase() === item.name.toLowerCase() &&
                    i.unit === item.unit
                );

                if (existing) {
                    // Update quantity and track price changes
                    const newQty = existing.quantity + item.quantity;
                    const updateData = { ...existing, quantity: newQty };

                    // Track price change if new price provided
                    if (item.price !== null) {
                        updateData.previous_price = existing.last_price || null;
                        updateData.last_price = item.price;
                    }

                    await this.updateItem(existing.id, updateData);
                    updated++;
                } else {
                    // Add new item with price
                    const itemWithPrice = { ...item };
                    if (item.price !== null) {
                        itemWithPrice.last_price = item.price;
                    }
                    await this.addItem(itemWithPrice);
                    added++;
                }
            }

            this.closeGroceryReviewModal();
            this.render();

            // Show success message
            const msg = [];
            if (added > 0) msg.push(`${added} new item${added > 1 ? 's' : ''} added`);
            if (updated > 0) msg.push(`${updated} item${updated > 1 ? 's' : ''} updated`);
            alert(msg.join(', '));

        } catch (err) {
            console.error('Failed to add grocery items:', err);
            alert('Failed to add items: ' + err.message);
        } finally {
            addBtn.disabled = false;
            addBtn.textContent = 'Add Selected to Inventory';
        }
    }

    // === END GROCERY RECEIPT METHODS ===

    // === END SCAN/CAPTURE METHODS ===

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

        // Update or inject brand row
        let brandRow = document.getElementById('detailsBrandRow');
        if (!brandRow) {
            brandRow = document.createElement('div');
            brandRow.id = 'detailsBrandRow';
            brandRow.className = 'detail-row';
            brandRow.innerHTML = '<span class="detail-label">Brand:</span><span id="detailsBrand" class="detail-value"></span>';
            document.querySelector('#itemDetailsModal .details-grid').prepend(brandRow);
        }
        document.getElementById('detailsBrand').textContent = item.brand || '-';

        // Update price row
        let priceRow = document.getElementById('detailsPriceRow');
        if (!priceRow) {
            priceRow = document.createElement('div');
            priceRow.id = 'detailsPriceRow';
            priceRow.className = 'detail-row';
            priceRow.innerHTML = '<span class="detail-label">Price:</span><span id="detailsPrice" class="detail-value"></span>';
            document.querySelector('#itemDetailsModal .details-grid').appendChild(priceRow);
        }
        const detailsPriceUnit = item.price_unit || 'flat';
        const detailsUnitSuffix = this.getPriceUnitSuffix(detailsPriceUnit);
        document.getElementById('detailsPrice').textContent = item.last_price != null ? `$${parseFloat(item.last_price).toFixed(2)}${detailsUnitSuffix}` : '-';

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

    // Show price history modal for an item
    async showPriceHistory(query) {
        const item = this.findInventoryMatch(query);
        if (!item) {
            alert(`Item "${query}" not found in inventory`);
            return;
        }

        document.getElementById('priceHistoryTitle').textContent = `Price History: ${item.name}`;
        const noDataEl = document.getElementById('priceHistoryNoData');
        const tableWrapper = document.getElementById('priceHistoryTable');
        const tableBody = document.getElementById('priceHistoryTableBody');
        const canvas = document.getElementById('priceHistoryChart');

        // Show modal first
        this.priceHistoryModal.classList.remove('hidden');
        this.clearCommandBar();

        try {
            const history = await API.getPriceHistory(item.id);

            // Destroy previous chart if any
            if (this.priceHistoryChart) {
                this.priceHistoryChart.destroy();
                this.priceHistoryChart = null;
            }

            if (!history || history.length === 0) {
                noDataEl.classList.remove('hidden');
                canvas.classList.add('hidden');
                tableWrapper.classList.add('hidden');
                return;
            }

            noDataEl.classList.add('hidden');
            canvas.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');

            // Store history for click handler
            this.currentPriceHistory = history;

            // Determine dominant price unit for axis label
            const dominantUnit = this.getDominantPriceUnit(history);
            const unitLabel = this.getPriceUnitLabel(dominantUnit);
            const unitSuffix = this.getPriceUnitSuffix(dominantUnit);

            // Build chart data
            const labels = history.map(r => {
                const d = new Date(r.recorded_at);
                return d.toLocaleDateString();
            });
            const prices = history.map(r => parseFloat(r.price));

            this.priceHistoryChart = new Chart(canvas, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: `Price (${unitLabel})`,
                        data: prices,
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.15)',
                        borderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => {
                                    const record = history[ctx.dataIndex];
                                    const recUnitSuffix = this.getPriceUnitSuffix(record.price_unit || 'flat');
                                    let label = `$${ctx.parsed.y.toFixed(2)}${recUnitSuffix}`;
                                    if (record.store) label += ` @ ${record.store}`;
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: `Price (${unitLabel})`
                            },
                            ticks: {
                                callback: val => `$${val.toFixed(2)}`
                            }
                        }
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const record = history[index];
                            this.showPricePointDetails(record);
                        }
                    }
                }
            });

            // Calculate min and max prices for highlighting
            const pricesForHighlight = history.map(r => parseFloat(r.price));
            const minPrice = Math.min(...pricesForHighlight);
            const maxPrice = Math.max(...pricesForHighlight);

            // Populate table (newest first)
            tableBody.innerHTML = [...history].reverse().map(r => {
                const d = new Date(r.recorded_at);
                const recUnitSuffix = this.getPriceUnitSuffix(r.price_unit || 'flat');
                const priceVal = parseFloat(r.price);
                let rowClass = '';
                if (priceVal === minPrice && minPrice !== maxPrice) rowClass = 'price-lowest';
                else if (priceVal === maxPrice && minPrice !== maxPrice) rowClass = 'price-highest';
                return `<tr class="${rowClass}" style="cursor: pointer;" onclick="app.showPricePointDetails(app.currentPriceHistory.find(h => h.id === ${r.id}))">
                    <td>${d.toLocaleDateString()}</td>
                    <td>${r.store ? this.escapeHtml(r.store) : '-'}</td>
                    <td>$${priceVal.toFixed(2)}${recUnitSuffix}</td>
                </tr>`;
            }).join('');

        } catch (err) {
            console.error('Failed to load price history:', err);
            noDataEl.textContent = 'Failed to load price history.';
            noDataEl.classList.remove('hidden');
            canvas.classList.add('hidden');
            tableWrapper.classList.add('hidden');
        }
    }

    hidePriceHistory() {
        if (this.priceHistoryModal) {
            this.priceHistoryModal.classList.add('hidden');
        }
        if (this.priceHistoryChart) {
            this.priceHistoryChart.destroy();
            this.priceHistoryChart = null;
        }
    }

    // Get dominant price unit from history (most common)
    getDominantPriceUnit(history) {
        const counts = {};
        history.forEach(r => {
            const unit = r.price_unit || 'flat';
            counts[unit] = (counts[unit] || 0) + 1;
        });
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sorted[0]?.[0] || 'flat';
    }

    // Show price point detail popup
    showPricePointDetails(record) {
        if (!record) return;

        const popup = document.getElementById('pricePointPopup');
        const dateEl = document.getElementById('pricePointDate');
        const priceEl = document.getElementById('pricePointPrice');
        const storeInput = document.getElementById('pricePointStore');

        const d = new Date(record.recorded_at);
        const unitSuffix = this.getPriceUnitSuffix(record.price_unit || 'flat');

        dateEl.textContent = d.toLocaleDateString();
        priceEl.textContent = `$${parseFloat(record.price).toFixed(2)}${unitSuffix}`;
        storeInput.value = record.store || '';

        // Store current record for saving
        this.currentPricePointRecord = record;

        popup.classList.remove('hidden');
    }

    // Hide price point popup
    hidePricePointPopup() {
        const popup = document.getElementById('pricePointPopup');
        if (popup) popup.classList.add('hidden');
        this.currentPricePointRecord = null;
    }

    // Save price point store update
    async savePricePointStore() {
        if (!this.currentPricePointRecord) return;

        const storeInput = document.getElementById('pricePointStore');
        const newStore = this.normalizeStoreName(storeInput.value.trim()) || null;

        try {
            await API.updatePriceHistory(this.currentPricePointRecord.id, { store: newStore });

            // Update local record
            this.currentPricePointRecord.store = newStore;

            // Refresh the table if visible
            if (this.currentPriceHistory) {
                const record = this.currentPriceHistory.find(r => r.id === this.currentPricePointRecord.id);
                if (record) record.store = newStore;

                // Re-render table
                const tableBody = document.getElementById('priceHistoryTableBody');
                if (tableBody) {
                    const pricesForHighlight = this.currentPriceHistory.map(r => parseFloat(r.price));
                    const minPrice = Math.min(...pricesForHighlight);
                    const maxPrice = Math.max(...pricesForHighlight);
                    tableBody.innerHTML = [...this.currentPriceHistory].reverse().map(r => {
                        const d = new Date(r.recorded_at);
                        const recUnitSuffix = this.getPriceUnitSuffix(r.price_unit || 'flat');
                        const priceVal = parseFloat(r.price);
                        let rowClass = '';
                        if (priceVal === minPrice && minPrice !== maxPrice) rowClass = 'price-lowest';
                        else if (priceVal === maxPrice && minPrice !== maxPrice) rowClass = 'price-highest';
                        return `<tr class="${rowClass}" style="cursor: pointer;" onclick="app.showPricePointDetails(app.currentPriceHistory.find(h => h.id === ${r.id}))">
                            <td>${d.toLocaleDateString()}</td>
                            <td>${r.store ? this.escapeHtml(r.store) : '-'}</td>
                            <td>$${priceVal.toFixed(2)}${recUnitSuffix}</td>
                        </tr>`;
                    }).join('');
                }
            }

            this.hidePricePointPopup();
        } catch (err) {
            console.error('Failed to update price history store:', err);
            alert('Failed to save store. Please try again.');
        }
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

    // Close any open modal when Escape key is pressed
    closeAnyOpenModal() {
        // Check each modal and close the first one that's open
        // Price history modal
        if (this.priceHistoryModal && !this.priceHistoryModal.classList.contains('hidden')) {
            this.hidePriceHistory();
            return;
        }

        // Item details modal
        if (this.itemDetailsModal && !this.itemDetailsModal.classList.contains('hidden')) {
            this.hideItemDetails();
            return;
        }

        // Filter modal
        if (this.filterModal && !this.filterModal.classList.contains('hidden')) {
            this.hideFilterModal();
            return;
        }

        // Scan modal
        if (this.scanModal && !this.scanModal.classList.contains('hidden')) {
            this.closeScanModal();
            return;
        }

        // Grocery review modal
        const groceryModal = document.getElementById('groceryReviewModal');
        if (groceryModal && !groceryModal.classList.contains('hidden')) {
            this.closeGroceryReviewModal();
            return;
        }
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
        const dropdown = document.getElementById(`overflow-${itemId}`);
        if (dropdown) {
            const wasOpen = !dropdown.classList.contains('hidden');
            this.closeAllOverflowMenus();
            if (wasOpen) {
                // Was already open, just close it (already done above)
                return;
            }
            dropdown.classList.remove('hidden');
            // Add class to parent item for z-index fix
            dropdown.closest('.inventory-item')?.classList.add('menu-open');
            // Use requestAnimationFrame to ensure the current click event completes
            requestAnimationFrame(() => {
                document.addEventListener('click', this.handleOverflowClickOutside);
            });
        }
    }

    closeAllOverflowMenus() {
        document.querySelectorAll('.overflow-dropdown').forEach(dropdown => {
            dropdown.classList.add('hidden');
            dropdown.closest('.inventory-item')?.classList.remove('menu-open');
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
        } else if (item) {
            // Has amount but no unit - show preview using item's stored unit
            const amount = this.parseAmountString(parsed.amount);
            const isDeduct = parsed.action === 'deduct-partial';
            const newQty = isDeduct
                ? Math.max(0, item.quantity - amount)
                : item.quantity + amount;
            const roundedNew = Math.round(newQty * 100) / 100;
            const roundedAmount = Math.round(amount * 100) / 100;
            const sign = isDeduct ? '-' : '+';

            this.quickDeductPreview.innerHTML = `
                <span class="preview-item">${this.escapeHtml(item.name)}:</span>
                <span class="preview-calc">${item.quantity} ${item.unit} → ${roundedNew} ${item.unit}</span>
                <span class="preview-deduct">(${sign}${roundedAmount} ${item.unit})</span>
                <span class="preview-hint">— Press Enter or add unit</span>
            `;
        } else {
            // Item not found
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Item "${this.escapeHtml(parsed.itemQuery)}" not found</span>`;
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
        // Use debounced enhanced suggestions for snappy feel
        this.debouncedShowSuggestions(query);
    }

    showItemSuggestionsEnhanced(query) {
        // Rebuild index if needed (after inventory changes)
        if (!this.searchIndex) {
            this.rebuildSearchIndex();
        }

        // Search with fuzzy matching
        let results = SuggestionEngine.search(query, this.searchIndex, { limit: 8 });

        // Boost recently used items
        results = SuggestionEngine.boostRecent(results);

        if (results.length === 0) {
            // Show "add new" option when no matches
            // Strip leading "+" and whitespace from query to get clean item name
            const cleanName = query.replace(/^\+\s*/, '');
            const detected = this.detectIngredientInfo(cleanName);
            const categoryHint = detected ? ` as ${CATEGORY_NAMES[detected.category] || detected.category}` : '';

            this.quickDeductSuggestions.innerHTML = `
                <div class="suggestion-item suggestion-add-new" data-action="add-new" data-name="${this.escapeHtml(cleanName)}">
                    <span class="suggestion-icon">+</span>
                    <span class="suggestion-name">Add "<mark>${this.escapeHtml(cleanName)}</mark>"${categoryHint}</span>
                    <span class="suggestion-hint">Enter amount to add</span>
                </div>
            `;
            this.quickDeductSuggestions.classList.remove('hidden');
            return;
        }

        this.highlightedSuggestionIndex = -1;
        // Store both inventory items and suggestion metadata
        this.currentSuggestions = results.map(r => r.type === 'inventory' ? r.data : r);

        this.quickDeductSuggestions.innerHTML = results.map((result, idx) => {
            if (result.type === 'inventory') {
                // Item in user's inventory
                const item = result.data;
                const locationText = item.location ? LOCATION_NAMES[item.location] || item.location : '';
                return `
                    <div class="suggestion-item" data-id="${item.id}" data-index="${idx}">
                        <span class="suggestion-name">${result.matchedName}</span>
                        <span class="suggestion-qty">${item.quantity} ${item.unit}</span>
                        ${locationText ? `<span class="suggestion-loc">${locationText}</span>` : ''}
                    </div>
                `;
            } else if (result.type === 'known') {
                // Known ingredient not in inventory
                const info = result.data;
                const categoryName = CATEGORY_NAMES[info.category] || info.category;
                return `
                    <div class="suggestion-item suggestion-known" data-action="add-known" data-name="${this.escapeHtml(result.name)}" data-index="${idx}">
                        <span class="suggestion-icon">+</span>
                        <span class="suggestion-name">${result.matchedName}</span>
                        <span class="suggestion-category">${categoryName}</span>
                        <span class="suggestion-hint">Add to inventory</span>
                    </div>
                `;
            } else {
                // Density-only ingredient
                return `
                    <div class="suggestion-item suggestion-density" data-action="add-known" data-name="${this.escapeHtml(result.name)}" data-index="${idx}">
                        <span class="suggestion-icon">+</span>
                        <span class="suggestion-name">${result.matchedName}</span>
                        <span class="suggestion-hint">Add to inventory</span>
                    </div>
                `;
            }
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

    showMovePreview(parsed) {
        const { itemQuery, amount, unit, fromLocation, toLocation } = parsed;

        let sourceItem, fromLoc;
        if (parsed.action === 'move') {
            sourceItem = this.findItemInLocation(itemQuery, fromLocation);
            fromLoc = fromLocation;
        } else {
            // move-auto: find item in any location except destination
            sourceItem = this.findItemWithQuantity(itemQuery, 0, toLocation);
            fromLoc = sourceItem ? sourceItem.location : null;
        }

        if (!sourceItem) {
            const locText = fromLocation ? ` in ${LOCATION_NAMES[fromLocation] || fromLocation}` : '';
            this.quickDeductPreview.innerHTML = `<span class="preview-error">No "${this.escapeHtml(itemQuery)}" found${locText}</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        // Convert units if needed
        const convertedAmount = this.convertQuantity(amount, unit, sourceItem.unit, sourceItem.name);
        if (convertedAmount === null) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Cannot convert ${unit} to ${sourceItem.unit}</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        // Check quantity
        if (sourceItem.quantity < convertedAmount) {
            this.quickDeductPreview.innerHTML = `<span class="preview-error">Only ${sourceItem.quantity} ${sourceItem.unit} available</span>`;
            this.quickDeductPreview.classList.remove('hidden');
            return;
        }

        // Calculate new expiration
        const newExp = this.calculateMoveExpiration(sourceItem.category, fromLoc, toLocation);
        const days = Math.ceil((new Date(newExp) - new Date()) / (1000 * 60 * 60 * 24));

        const fromName = LOCATION_NAMES[fromLoc] || fromLoc;
        const toName = LOCATION_NAMES[toLocation] || toLocation;

        this.quickDeductPreview.innerHTML = `
            <span class="preview-item">Move ${amount}${unit} ${this.escapeHtml(sourceItem.name)}:</span>
            <span class="preview-calc">${fromName} → ${toName}</span>
            <span class="preview-hint">(exp: ${days} days) — Enter</span>
        `;
        this.quickDeductPreview.classList.remove('hidden');
    }

    selectSuggestion(id) {
        const item = this.getItem(id);
        if (!item) return;

        // Track usage for smart suggestions
        SuggestionEngine.trackUsage(item.name);

        // Fill the input with item name and a space+dash ready for amount
        this.quickDeductInput.value = item.name + ' -';
        this.quickDeductSuggestions.classList.add('hidden');
        this.quickDeductInput.focus();
    }

    selectKnownIngredient(name) {
        // Track usage for smart suggestions
        SuggestionEngine.trackUsage(name);

        // Pre-fill with add syntax
        this.quickDeductInput.value = '+' + name + ' ';
        this.quickDeductSuggestions.classList.add('hidden');
        this.quickDeductInput.focus();
        // Trigger input handler to show preview
        this.handleQuickDeductInput();
    }

    selectSuggestionElement(el) {
        const action = el.dataset.action;
        const id = el.dataset.id;
        const name = el.dataset.name;

        if (action === 'add-new' || action === 'add-known') {
            this.selectKnownIngredient(name);
        } else if (id) {
            this.selectSuggestion(id);
        }
    }

    handleQuickDeductKeydown(e) {
        const suggestions = this.quickDeductSuggestions.querySelectorAll('.suggestion-item');

        if (e.key === 'Enter') {
            e.preventDefault();
            // Only select suggestion if user explicitly navigated with arrow keys
            if (this.highlightedSuggestionIndex >= 0 && suggestions[this.highlightedSuggestionIndex]) {
                this.selectSuggestionElement(suggestions[this.highlightedSuggestionIndex]);
            } else {
                // Execute the command as typed
                this.quickDeductSuggestions.classList.add('hidden');
                this.executeQuickDeduct();
            }
        } else if (e.key === 'Tab' && !e.shiftKey) {
            // Tab selects first suggestion if dropdown is open
            if (!this.quickDeductSuggestions.classList.contains('hidden') && suggestions.length > 0) {
                e.preventDefault();
                this.selectSuggestionElement(suggestions[0]);
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
        } else if (parsed.action === 'show-scan') {
            this.showScanModal();
        } else if (parsed.action === 'view') {
            this.showItemDetails(parsed.itemQuery);
        } else if (parsed.action === 'show-price-history') {
            this.showPriceHistory(parsed.itemQuery);
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
        } else if (parsed.action === 'deduct-partial') {
            // Execute deduct using item's stored unit
            this.executeDeductPartial(parsed);
        } else if (parsed.action === 'restock-partial') {
            // Execute restock using item's stored unit
            this.executeRestockPartial(parsed);
        } else if (parsed.action === 'move') {
            this.executeMove(parsed);
        } else if (parsed.action === 'move-auto') {
            this.executeMoveAuto(parsed);
        } else if (parsed.action === 'show-packages') {
            this.showPackagesModal();
        } else if (parsed.action === 'execute-package') {
            this.executePackageByName(parsed.packageName);
        } else if (parsed.action === 'create-package') {
            this.showPackagesModal(parsed.packageName);
        } else if (parsed.action === 'adhoc-deduct') {
            this.executeAdhocDeduct(parsed.itemsString);
        } else if (parsed.action === 'save-and-execute') {
            this.executeSaveAndExecutePackage(parsed.packageName, parsed.itemsString);
        }
    }

    async executeDeduct(parsed) {
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
        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    async executeRestock(parsed) {
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
        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    async executeDeductPartial(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            alert(`Item "${parsed.itemQuery}" not found in inventory`);
            return;
        }

        // Use the item's stored unit for the amount
        const amount = this.parseAmountString(parsed.amount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const newQty = Math.max(0, item.quantity - amount);
        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    async executeRestockPartial(parsed) {
        const item = this.findInventoryMatch(parsed.itemQuery);
        if (!item) {
            alert(`Item "${parsed.itemQuery}" not found. Use +name to add new items.`);
            return;
        }

        // Use the item's stored unit for the amount
        const amount = this.parseAmountString(parsed.amount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const newQty = item.quantity + amount;
        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

        this.clearCommandBar();
        this.render();
    }

    async executeMove(parsed) {
        const { itemQuery, amount, unit, fromLocation, toLocation } = parsed;

        // Find source item in the specified location
        const sourceItem = this.findItemInLocation(itemQuery, fromLocation);
        if (!sourceItem) {
            alert(`No "${itemQuery}" found in ${LOCATION_NAMES[fromLocation] || fromLocation}`);
            return;
        }

        // Convert units if needed
        const convertedAmount = this.convertQuantity(amount, unit, sourceItem.unit, sourceItem.name);
        if (convertedAmount === null) {
            alert(`Cannot convert ${unit} to ${sourceItem.unit}`);
            return;
        }

        // Check sufficient quantity
        if (sourceItem.quantity < convertedAmount) {
            alert(`Only ${sourceItem.quantity} ${sourceItem.unit} available in ${LOCATION_NAMES[fromLocation]}`);
            return;
        }

        // Calculate new expiration for destination
        const newExpiration = this.calculateMoveExpiration(
            sourceItem.category,
            fromLocation,
            toLocation
        );

        // Find or create destination item
        let destItem = this.findItemInLocation(sourceItem.name, toLocation);

        if (destItem) {
            // Add to existing destination item, use earlier expiration date
            const earlierExpiration = destItem.expirationDate && destItem.expirationDate < newExpiration
                ? destItem.expirationDate
                : newExpiration;

            await this.updateItem(destItem.id, {
                quantity: Math.round((destItem.quantity + convertedAmount) * 100) / 100,
                expirationDate: earlierExpiration
            });
        } else {
            // Create new item in destination location
            await this.addItem({
                name: sourceItem.name,
                quantity: convertedAmount,
                unit: sourceItem.unit,
                category: sourceItem.category,
                location: toLocation,
                threshold: sourceItem.threshold,
                expirationDate: newExpiration,
                isStaple: sourceItem.isStaple,
                brand: sourceItem.brand
            });
        }

        // Deduct from source
        const newSourceQty = Math.round((sourceItem.quantity - convertedAmount) * 100) / 100;
        if (newSourceQty <= 0) {
            // Remove source item if empty
            await this.deleteItem(sourceItem.id, 'Moved to ' + toLocation);
        } else {
            await this.updateItem(sourceItem.id, { quantity: newSourceQty });
        }

        this.clearCommandBar();
        this.render();
    }

    async executeMoveAuto(parsed) {
        const { itemQuery, toLocation } = parsed;

        // Find source item (auto-detect from any location except destination)
        const sourceItem = this.findItemWithQuantity(itemQuery, 0, toLocation);
        if (!sourceItem) {
            alert(`No "${itemQuery}" found in inventory to move`);
            return;
        }

        // Delegate to full move with detected source
        await this.executeMove({
            ...parsed,
            fromLocation: sourceItem.location
        });
    }

    async executeAddNew(parsed) {
        const unit = this.normalizeUnitShortcut(parsed.unit);

        // Auto-detect category and location from database
        const detected = this.detectIngredientInfo(parsed.name);

        // Use explicit overrides (@location, #category) or detected values or defaults
        const category = parsed.category || (detected ? detected.category : 'other');
        const location = parsed.location || (detected ? detected.location : '');

        await this.addItem({
            name: parsed.name,
            quantity: parsed.amount,
            unit: unit,
            category: category,
            location: location,
            threshold: parsed.threshold, // Will use default 20% if null
            last_price: parsed.price,
            price_unit: parsed.priceUnit || 'flat',
            boughtFrom: parsed.store
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

    async confirmExpandedDeduct() {
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
        await this.updateItem(item.id, { quantity: Math.round(newQty * 100) / 100 });

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

    // === PACKAGE/GROUP DEDUCTION METHODS ===

    showPackagesModal(prefillName = null) {
        this.packagesModal = document.getElementById('packagesModal');
        if (!this.packagesModal) {
            console.error('Packages modal not found');
            return;
        }

        if (!this.packagesModalInitialized) {
            this.initializePackagesModal();
        }

        this.loadPackages();
        this.packagesModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.clearCommandBar();

        // If prefill name provided, show create form
        if (prefillName) {
            this.showPackageForm(prefillName);
        }
    }

    initializePackagesModal() {
        this.packagesModalInitialized = true;

        const closeBtn = document.getElementById('closePackagesModal');
        const createBtn = document.getElementById('createPackageBtn');
        const packageForm = document.getElementById('packageForm');
        const cancelFormBtn = document.getElementById('cancelPackageForm');
        const addItemBtn = document.getElementById('addPackageItemBtn');

        closeBtn.addEventListener('click', () => this.closePackagesModal());
        this.packagesModal.addEventListener('click', (e) => {
            if (e.target === this.packagesModal) this.closePackagesModal();
        });

        createBtn.addEventListener('click', () => this.showPackageForm());
        cancelFormBtn.addEventListener('click', () => this.hidePackageForm());
        addItemBtn.addEventListener('click', () => this.addPackageItemRow());

        packageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePackage();
        });
    }

    closePackagesModal() {
        if (this.packagesModal) {
            this.packagesModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    async loadPackages() {
        const listContainer = document.getElementById('packagesList');
        try {
            const packages = await API.getPackages();
            this.renderPackagesList(packages, listContainer);
        } catch (err) {
            listContainer.innerHTML = `<p class="error-message">Failed to load packages: ${err.message}</p>`;
        }
    }

    renderPackagesList(packages, container) {
        if (packages.length === 0) {
            container.innerHTML = '<p class="empty-message">No packages yet. Create one to get started!</p>';
            return;
        }

        container.innerHTML = packages.map(pkg => `
            <div class="package-card" data-id="${pkg.id}">
                <div class="package-header">
                    <h3 class="package-name">${this.escapeHtml(pkg.name)}</h3>
                    <span class="package-item-count">${pkg.itemCount} items</span>
                </div>
                ${pkg.description ? `<p class="package-description">${this.escapeHtml(pkg.description)}</p>` : ''}
                ${pkg.lastExecuted ? `<p class="package-last-used">Last used: ${this.formatDate(pkg.lastExecuted)}</p>` : ''}
                <div class="package-actions">
                    <button class="btn btn-primary btn-sm execute-package-btn" data-id="${pkg.id}">Execute</button>
                    <button class="btn btn-secondary btn-sm edit-package-btn" data-id="${pkg.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-package-btn" data-id="${pkg.id}">Delete</button>
                </div>
            </div>
        `).join('');

        // Bind event listeners
        container.querySelectorAll('.execute-package-btn').forEach(btn => {
            btn.addEventListener('click', () => this.executePackage(btn.dataset.id));
        });
        container.querySelectorAll('.edit-package-btn').forEach(btn => {
            btn.addEventListener('click', () => this.editPackage(btn.dataset.id));
        });
        container.querySelectorAll('.delete-package-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deletePackage(btn.dataset.id));
        });
    }

    showPackageForm(prefillName = null) {
        const formSection = document.getElementById('packageFormSection');
        const nameInput = document.getElementById('packageName');
        const descInput = document.getElementById('packageDescription');
        const itemsContainer = document.getElementById('packageItemsContainer');
        const formTitle = document.getElementById('packageFormTitle');

        formSection.classList.remove('hidden');
        formTitle.textContent = this.editingPackageId ? 'Edit Package' : 'Create Package';

        if (!this.editingPackageId) {
            nameInput.value = prefillName || '';
            descInput.value = '';
            itemsContainer.innerHTML = '';
            this.addPackageItemRow();
        }

        nameInput.focus();
    }

    hidePackageForm() {
        const formSection = document.getElementById('packageFormSection');
        formSection.classList.add('hidden');
        this.editingPackageId = null;
    }

    addPackageItemRow(itemName = '', quantity = '', unit = 'tsp') {
        const container = document.getElementById('packageItemsContainer');
        const row = document.createElement('div');
        row.className = 'package-item-row';
        row.innerHTML = `
            <input type="text" class="pkg-item-name" placeholder="Item name" value="${this.escapeHtml(itemName)}" required>
            <input type="number" class="pkg-item-qty" placeholder="Qty" value="${quantity}" step="0.01" min="0" required>
            <select class="pkg-item-unit">
                <option value="tsp" ${unit === 'tsp' ? 'selected' : ''}>tsp</option>
                <option value="tbsp" ${unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                <option value="cup" ${unit === 'cup' ? 'selected' : ''}>cup</option>
                <option value="g" ${unit === 'g' ? 'selected' : ''}>g</option>
                <option value="oz" ${unit === 'oz' ? 'selected' : ''}>oz</option>
                <option value="ml" ${unit === 'ml' ? 'selected' : ''}>ml</option>
                <option value="items" ${unit === 'items' ? 'selected' : ''}>items</option>
            </select>
            <button type="button" class="btn btn-danger btn-sm remove-item-btn">X</button>
        `;

        row.querySelector('.remove-item-btn').addEventListener('click', () => {
            row.remove();
        });

        container.appendChild(row);
    }

    async savePackage() {
        const nameInput = document.getElementById('packageName');
        const descInput = document.getElementById('packageDescription');
        const itemRows = document.querySelectorAll('.package-item-row');

        const name = nameInput.value.trim();
        const description = descInput.value.trim();
        const items = [];

        itemRows.forEach(row => {
            const itemName = row.querySelector('.pkg-item-name').value.trim();
            const quantity = parseFloat(row.querySelector('.pkg-item-qty').value);
            const unit = row.querySelector('.pkg-item-unit').value;

            if (itemName && !isNaN(quantity) && quantity > 0) {
                items.push({ itemName, quantity, unit });
            }
        });

        if (!name) {
            alert('Package name is required');
            return;
        }

        if (items.length === 0) {
            alert('At least one item is required');
            return;
        }

        try {
            if (this.editingPackageId) {
                await API.updatePackage(this.editingPackageId, { name, description, items });
            } else {
                await API.createPackage({ name, description, items });
            }
            this.hidePackageForm();
            this.loadPackages();
        } catch (err) {
            alert('Error saving package: ' + err.message);
        }
    }

    async editPackage(id) {
        try {
            const pkg = await API.getPackage(id);
            this.editingPackageId = id;

            document.getElementById('packageName').value = pkg.name;
            document.getElementById('packageDescription').value = pkg.description || '';

            const container = document.getElementById('packageItemsContainer');
            container.innerHTML = '';

            pkg.items.forEach(item => {
                this.addPackageItemRow(item.itemName, item.quantity, item.unit);
            });

            this.showPackageForm();
        } catch (err) {
            alert('Error loading package: ' + err.message);
        }
    }

    async deletePackage(id) {
        if (!confirm('Are you sure you want to delete this package?')) {
            return;
        }

        try {
            await API.deletePackage(id);
            this.loadPackages();
        } catch (err) {
            alert('Error deleting package: ' + err.message);
        }
    }

    async executePackage(id) {
        try {
            const result = await API.executePackage(id, { skipMissing: false, skipInsufficient: false });

            if (result.success) {
                const summary = result.results
                    .filter(r => r.status === 'completed')
                    .map(r => `${r.inventoryItemName}: ${r.beforeQuantity} -> ${r.afterQuantity} ${r.unit}`)
                    .join('\n');

                alert(`Package "${result.packageName}" executed!\n\n${summary}`);
                this.closePackagesModal();
                await this.loadInventory();
                this.render();
            }
        } catch (err) {
            alert('Error executing package: ' + err.message);
        }
    }

    async executePackageByName(packageName) {
        try {
            const pkg = await API.getPackageByName(packageName);
            await this.executePackage(pkg.id);
        } catch (err) {
            if (err.message.includes('not found')) {
                alert(`Package "${packageName}" not found. Type "group" to see all packages.`);
            } else {
                alert('Error executing package: ' + err.message);
            }
        }
    }

    parseAdhocItems(itemsString) {
        return itemsString.split(',').map(part => {
            const match = part.trim().match(/^(.+?)\s+(\d*\.?\d+)\s*([a-zA-Z]+)?$/);
            if (match) {
                return {
                    itemName: match[1].trim(),
                    quantity: parseFloat(match[2]),
                    unit: match[3] ? this.normalizeUnitShortcut(match[3]) : 'items'
                };
            }
            return null;
        }).filter(Boolean);
    }

    async executeAdhocDeduct(itemsString) {
        const items = this.parseAdhocItems(itemsString);

        if (items.length === 0) {
            alert('Could not parse items. Use format: "item1 amount unit, item2 amount unit"');
            return;
        }

        try {
            const result = await API.executeAdhocDeduction(items);

            if (result.success) {
                const summary = result.results
                    .filter(r => r.status === 'completed')
                    .map(r => `${r.inventoryItemName}: ${r.beforeQuantity} -> ${r.afterQuantity} ${r.unit}`)
                    .join('\n');

                alert(`Deduction complete!\n\n${summary}`);
                this.clearCommandBar();
                await this.loadInventory();
                this.render();
            }
        } catch (err) {
            alert('Error executing deduction: ' + err.message);
        }
    }

    async executeSaveAndExecutePackage(packageName, itemsString) {
        const items = this.parseAdhocItems(itemsString);

        if (items.length === 0) {
            alert('Could not parse items. Use format: "item1 amount unit, item2 amount unit"');
            return;
        }

        try {
            // Create the package
            const pkg = await API.createPackage({
                name: packageName,
                description: `Created via command line`,
                items
            });

            // Execute the package
            await this.executePackage(pkg.id);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AuthManager.init();
});

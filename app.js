// Spice Inventory Tracker - Main Application

class SpiceInventory {
    constructor() {
        this.storageKey = 'spiceInventory';
        this.inventory = this.loadInventory();
        this.editingId = null;

        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('spiceForm');
        this.formTitle = document.getElementById('formTitle');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.editIdInput = document.getElementById('editId');
        this.nameInput = document.getElementById('name');
        this.quantityInput = document.getElementById('quantity');
        this.unitSelect = document.getElementById('unit');
        this.thresholdInput = document.getElementById('threshold');
        this.categorySelect = document.getElementById('category');
        this.notesInput = document.getElementById('notes');

        // Search elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResult = document.getElementById('searchResult');

        // Inventory elements
        this.inventoryList = document.getElementById('inventoryList');
        this.filterCategory = document.getElementById('filterCategory');
        this.sortBy = document.getElementById('sortBy');

        // Alerts elements
        this.alertsSection = document.getElementById('alertsSection');
        this.alertsList = document.getElementById('alertsList');

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

        // Store parsed data
        this.parsedRecipeData = null;
    }

    bindEvents() {
        // Form events
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());

        // Search events
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSearch();
            }
        });

        // Filter and sort events
        this.filterCategory.addEventListener('change', () => this.render());
        this.sortBy.addEventListener('change', () => this.render());

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
    }

    // Local Storage Operations
    loadInventory() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveInventory() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.inventory));
    }

    // CRUD Operations
    addItem(item) {
        const newItem = {
            id: Date.now().toString(),
            name: item.name.trim(),
            quantity: parseFloat(item.quantity),
            unit: item.unit,
            threshold: item.threshold ? parseFloat(item.threshold) : 0,
            category: item.category,
            notes: item.notes.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.inventory.push(newItem);
        this.saveInventory();
        return newItem;
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
            notes: this.notesInput.value
        };

        if (this.editingId) {
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
        this.notesInput.value = item.notes || '';

        // Scroll to form
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    cancelEdit() {
        this.editingId = null;
        this.formTitle.textContent = 'Add New Item';
        this.submitBtn.textContent = 'Add Item';
        this.cancelBtn.classList.add('hidden');
        this.form.reset();
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
        const lowStockItems = this.getLowStockItems();

        if (lowStockItems.length === 0) {
            this.alertsSection.classList.add('hidden');
            return;
        }

        this.alertsSection.classList.remove('hidden');
        this.alertsList.innerHTML = lowStockItems.map(item => `
            <div class="alert-item">
                <span class="item-name">${this.escapeHtml(item.name)}</span>
                <span class="item-status">
                    ${item.quantity} ${item.unit} (threshold: ${item.threshold})
                </span>
            </div>
        `).join('');
    }

    renderInventory() {
        let items = [...this.inventory];

        // Filter by category
        const categoryFilter = this.filterCategory.value;
        if (categoryFilter !== 'all') {
            items = items.filter(item => item.category === categoryFilter);
        }

        // Sort items
        const sortOption = this.sortBy.value;
        items.sort((a, b) => {
            switch (sortOption) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'quantity':
                    return a.quantity - b.quantity;
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'updated':
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                default:
                    return 0;
            }
        });

        if (items.length === 0) {
            this.inventoryList.innerHTML = `
                <div class="empty-state">
                    <p>${this.inventory.length === 0 ? 'Your inventory is empty. Add your first item above!' : 'No items match the selected filter.'}</p>
                </div>
            `;
            return;
        }

        this.inventoryList.innerHTML = items.map(item => {
            const isLowStock = item.threshold > 0 && item.quantity <= item.threshold;
            return `
                <div class="inventory-item ${isLowStock ? 'low-stock' : ''}" data-id="${item.id}">
                    <div class="item-info">
                        <h3>${this.escapeHtml(item.name)}</h3>
                        <div class="meta">
                            <span class="category-badge">${this.formatCategory(item.category)}</span>
                            ${item.notes ? `<span>${this.escapeHtml(item.notes)}</span>` : ''}
                        </div>
                    </div>
                    <div class="item-quantity">
                        <div class="amount">${item.quantity}</div>
                        <div class="unit">${item.unit}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn-update-qty" onclick="app.showQuickUpdate('${item.id}')">Update Qty</button>
                        <button class="btn-edit" onclick="app.startEdit('${item.id}')">Edit</button>
                        <button class="btn-delete" onclick="app.confirmDelete('${item.id}')">Delete</button>
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
                const convertedQty = this.convertQuantity(ing.quantity, ing.unit, match.unit);
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

    convertQuantity(amount, fromUnit, toUnit) {
        if (fromUnit === toUnit) return amount;

        // Conversion table (to a common base where possible)
        const conversions = {
            // Volume conversions (base: tsp)
            'tsp': { tsp: 1, tbsp: 1/3, cups: 1/48, oz: 1/6, ml: 5 },
            'tbsp': { tsp: 3, tbsp: 1, cups: 1/16, oz: 0.5, ml: 15 },
            'cups': { tsp: 48, tbsp: 16, cups: 1, oz: 8, ml: 240 },
            'oz': { tsp: 6, tbsp: 2, cups: 0.125, oz: 1, ml: 30 },

            // Weight conversions (base: g)
            'g': { g: 1, kg: 0.001, oz: 0.035, lbs: 0.0022 },
            'kg': { g: 1000, kg: 1, oz: 35.274, lbs: 2.205 },
            'lbs': { g: 453.6, kg: 0.4536, oz: 16, lbs: 1 },

            // Items (no conversion possible to other units)
            'items': { items: 1 }
        };

        const fromConv = conversions[fromUnit];
        const toConv = conversions[toUnit];

        if (!fromConv || !toConv) return amount; // Unknown units, assume same
        if (fromConv[toUnit] !== undefined) {
            return Math.round(amount * fromConv[toUnit] * 100) / 100;
        }

        // Can't convert between volume and weight or to items
        return null;
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
    }

    // Utility functions
    formatCategory(category) {
        const categories = {
            spice: 'Spice',
            herb: 'Herb',
            seasoning: 'Seasoning',
            oil: 'Oil/Vinegar',
            grain: 'Grain/Flour',
            other: 'Other'
        };
        return categories[category] || category;
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

// Initialize the application
const app = new SpiceInventory();

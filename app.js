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

        // Sync elements
        this.syncStatus = document.getElementById('syncStatus');
        this.exportDataBtn = document.getElementById('exportDataBtn');
        this.importDataBtn = document.getElementById('importDataBtn');
        this.exportView = document.getElementById('exportView');
        this.importView = document.getElementById('importView');
        this.exportCode = document.getElementById('exportCode');
        this.syncCodeInput = document.getElementById('syncCode');
        this.copyCodeBtn = document.getElementById('copyCodeBtn');
        this.closeExportBtn = document.getElementById('closeExportBtn');
        this.confirmImportBtn = document.getElementById('confirmImportBtn');
        this.closeImportBtn = document.getElementById('closeImportBtn');
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

        // Sync events
        this.exportDataBtn.addEventListener('click', () => this.showExportView());
        this.importDataBtn.addEventListener('click', () => this.showImportView());
        this.copyCodeBtn.addEventListener('click', () => this.copyExportCode());
        this.closeExportBtn.addEventListener('click', () => this.closeExportView());
        this.confirmImportBtn.addEventListener('click', () => this.handleImport());
        this.closeImportBtn.addEventListener('click', () => this.closeImportView());
    }

    // Encryption utilities using Web Crypto API
    async deriveKey(password, salt) {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async hashPassword(password) {
        const enc = new TextEncoder();
        const hash = await crypto.subtle.digest('SHA-256', enc.encode(password));
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async encrypt(data, password) {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            enc.encode(JSON.stringify(data))
        );

        // Combine salt + iv + encrypted data
        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);

        return btoa(String.fromCharCode(...combined));
    }

    async decrypt(encryptedBase64, password) {
        try {
            const combined = new Uint8Array(
                atob(encryptedBase64).split('').map(c => c.charCodeAt(0))
            );

            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const encrypted = combined.slice(28);

            const key = await this.deriveKey(password, salt);

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encrypted
            );

            const dec = new TextDecoder();
            return JSON.parse(dec.decode(decrypted));
        } catch (e) {
            return null;
        }
    }

    // Export/Import for cross-device sync
    async showExportView() {
        const password = prompt('Enter a password to encrypt your data:');
        if (!password || password.length < 4) {
            alert('Password must be at least 4 characters');
            return;
        }

        try {
            const encryptedData = await this.encrypt(this.inventory, password);
            const exportData = {
                v: 1,
                data: encryptedData,
                exportedAt: new Date().toISOString(),
                itemCount: this.inventory.length
            };

            const exportCode = btoa(JSON.stringify(exportData));

            this.exportCode.value = exportCode;
            this.exportView.classList.remove('hidden');
            this.importView.classList.add('hidden');
            this.syncStatus.textContent = `Exported ${this.inventory.length} items`;
        } catch (e) {
            console.error('Export error:', e);
            alert('Error creating export. Please try again.');
        }
    }

    async copyExportCode() {
        try {
            await navigator.clipboard.writeText(this.exportCode.value);
            this.copyCodeBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyCodeBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        } catch (e) {
            // Fallback for mobile
            this.exportCode.select();
            document.execCommand('copy');
            this.copyCodeBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyCodeBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        }
    }

    closeExportView() {
        this.exportView.classList.add('hidden');
        this.exportCode.value = '';
        this.syncStatus.textContent = '';
    }

    showImportView() {
        this.syncCodeInput.value = '';
        this.importView.classList.remove('hidden');
        this.exportView.classList.add('hidden');
        this.syncCodeInput.focus();
    }

    closeImportView() {
        this.importView.classList.add('hidden');
        this.syncCodeInput.value = '';
    }

    async handleImport() {
        const code = this.syncCodeInput.value.trim();
        if (!code) {
            alert('Please paste a sync code first');
            return;
        }

        const password = prompt('Enter the password used when exporting:');
        if (!password) {
            return;
        }

        try {
            const exportData = JSON.parse(atob(code));

            if (!exportData.data) {
                throw new Error('Invalid sync code format');
            }

            const decrypted = await this.decrypt(exportData.data, password);

            if (decrypted) {
                const itemCount = decrypted.length;
                const exportDate = exportData.exportedAt ? new Date(exportData.exportedAt).toLocaleString() : 'unknown date';
                const confirmMsg = `Found ${itemCount} items exported on ${exportDate}.\n\nThis will replace your current inventory (${this.inventory.length} items). Continue?`;

                if (confirm(confirmMsg)) {
                    this.inventory = decrypted;
                    this.saveInventory();
                    this.render();
                    this.closeImportView();
                    this.syncStatus.textContent = `Imported ${itemCount} items successfully!`;
                    setTimeout(() => {
                        this.syncStatus.textContent = '';
                    }, 3000);
                }
            } else {
                alert('Could not decrypt data. Check your password and try again.');
            }
        } catch (e) {
            console.error('Import error:', e);
            alert('Invalid sync code. Please check and try again.');
        }
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
            'ml': 0.2029  // 1 ml ≈ 0.2 tsp
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

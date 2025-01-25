import React, { useState, useEffect } from 'react';

function InventoryApp() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByQuantity, setSortByQuantity] = useState('asc'); 

  useEffect(() => {
    // Fetch initial data from a local storage or an API (replace with your actual data source)
    const storedItems = localStorage.getItem('inventoryItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever items change
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (newItemName && newItemCategory && newItemQuantity) {
      const newItem = {
        id: Date.now(),
        name: newItemName,
        category: newItemCategory,
        quantity: parseInt(newItemQuantity),
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemCategory('');
      setNewItemQuantity('');
    }
  };

  const handleEditItem = (id, updatedItem) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSortChange = () => {
    setSortByQuantity(sortByQuantity === 'asc' ? 'desc' : 'asc');
  };

  const filteredItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items;

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortByQuantity === 'asc') {
      return a.quantity - b.quantity;
    } else {
      return b.quantity - a.quantity;
    }
  });

  return (
    <div>
      <h1>Inventory Management</h1>

      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <select value={filterCategory} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {/* Add unique category options dynamically */}
        {Array.from(new Set(items.map((item) => item.category))).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button onClick={handleSortChange}>
        Sort by Quantity ({sortByQuantity})
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td
                style={{
                  color: item.quantity < 10 ? 'red' : 'black', // Highlight low stock
                }}
              >
                {item.quantity}
              </td>
              <td>
                {/* Implement edit and delete functionality here */}
                <button
                  onClick={() => {
                    // Handle edit logic
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryApp;
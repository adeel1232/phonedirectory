import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // NEW STATE

  const handleAdd = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone) {
      alert("Check all fields");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert("Phone number should be in numbers only.");
      return;
    }

    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    const newItem = { fullName, phone };

    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = newItem;
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, newItem]);
    }

    setFirstName('');
    setLastName('');
    setPhone('');
  };

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    });
    setData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // TOGGLE ORDER
  };

  const handleEdit = (index) => {
    const item = data[index];
    const [firstName, lastName] = item.fullName.split(' ');
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(item.phone);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h2 className="title">Phone Directory</h2>
      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="+92 3030303030"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setPhone(value);
          }}
          maxLength="11"
          required
        />
        <button type="submit">{editIndex !== null ? 'Update Contact' : 'Add Contact'}</button>
        <button type="button" onClick={handleSort} className="sort-btn">
          Sort ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
      </form>

      <h3 className="list-title">Your List</h3>
      <ul className="user-list">
        {data.map((item, index) => (
          <li key={index}>
            {item.fullName} - {item.phone} - Great!.
            <button className="edit-buttton" onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


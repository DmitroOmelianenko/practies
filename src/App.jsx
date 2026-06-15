import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost } from "./salaryApi";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchPosts();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAdd() {
    if (amount === "" || date === "") return;
    const payload = { price: Number(amount), date, description: desc };
    try {
      const created = await createPost(payload);
      setItems((s) => [created, ...s]);
      setAmount("");
      setDate("");
      setDesc("");
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePost(id);
      setItems((s) => s.filter((it) => it.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  const filtered = items.filter((it) => {
    if (!filterMonth) return true;
    const yearMonth = it.date ? it.date.slice(0, 7) : "";
    return yearMonth === filterMonth;
  });

  const total = filtered.reduce((sum, it) => sum + Number(it.price || 0), 0);

  return (
    <div className="container">
      <h1 className="title">Калькулятор зарплат</h1>

      <div className="layout">
        <div className="panel form-panel">
          <div className="field">
            <label>Сума зарплати</label>
            <input
              className="input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Сума зарплати"
            />
          </div>

          <div className="field">
            <label>Дата</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Примітки</label>
            <input
              className="input"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Примітки"
            />
          </div>

          <div className="actions">
            <button className="btn" onClick={handleAdd}>Додати</button>
          </div>
        </div>

        <div className="panel history-panel">
          <div className="filter">
            <label>Фільтр (рік-місяць)</label>
            <div className="filter-row">
              <input
                className="input"
                type="month"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
              <button className="btn" onClick={() => setFilterMonth("")}>Скинути</button>
            </div>
          </div>

          <h2 className="history-title">Історія зарплат <span className="total">сума: {total} грн</span></h2>

          <div className="history">
            {filtered.length === 0 && <div className="empty">Немає записів</div>}
            {filtered.map((it) => (
              <div key={it.id} className="item">
                <div className="item-top">
                  <strong className="price">{it.price}</strong>
                  <span className="date">{it.date}</span>
                </div>
                <div className="desc">{it.description}</div>
                <div className="item-actions">
                  <button className="btn btn-danger" onClick={() => handleDelete(it.id)}>Видалити</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
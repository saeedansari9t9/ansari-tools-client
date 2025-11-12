import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Trash2,
  DollarSign,
  Calendar,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../services/api";

export default function AddExpensesPage() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: today,
    note: "",
    category: "other",
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(0);

  // 🧮 Filter Expenses Function
  useEffect(() => {
    let filtered = [...expenses];

    if (filterCategory) {
      filtered = filtered.filter(
        (e) => e.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    if (filterDate) {
      filtered = filtered.filter((e) => e.date.slice(0, 10) === filterDate);
    }

    if (filterMonth) {
      const month = new Date(filterMonth).getMonth();
      filtered = filtered.filter((e) => new Date(e.date).getMonth() === month);
    }

    setFilteredExpenses(filtered);
    const totalAmt = filtered.reduce((sum, e) => sum + e.amount, 0);
    setFilteredTotal(totalAmt);
  }, [expenses, filterCategory, filterDate, filterMonth]);

  // Fetch all expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/expenses`);
      const data = await res.json();
      setExpenses(data);
      const totalAmount = data.reduce((sum, e) => sum + e.amount, 0);
      setTotal(totalAmount);
    } catch (error) {
      console.error("DeleteExpense Error:", error);
      toast.error("Failed to load expenses");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.title || !form.amount || !form.date) {
        return toast.error("Title, amount & date are required");
      }

      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          amount: Number(form.amount),
          date: form.date,
          note: form.note,
          category: form.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to save expense");

      toast.success("Expense added successfully");
      setForm({ title: "", amount: "", date: today, note: "" });
      fetchExpenses();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await fetch(`${API_BASE_URL}/expenses/${id}`, { method: "DELETE" });
      toast.success("Expense deleted");
      fetchExpenses();
    } catch (error) {
      console.error("DeleteExpense Error:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <button
            onClick={() => navigate("/admin")}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            💸 Expense Tracker
          </h1>
        </div>

        <div className="text-right bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow">
          <span className="font-semibold text-base sm:text-lg">Total:</span>{" "}
          <span className="font-bold text-lg sm:text-xl">
            {total.toLocaleString()} PKR
          </span>
        </div>
      </div>

      {/* Add Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-6 mb-6 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              <FileText className="w-4 h-4 inline mr-1 text-gray-500" />
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Dinner with friends"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Dining Out">Dining Out</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Balance & Packages">Balance & Packages</option>
              <option value="Extra Purchasing">Extra Purchasing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              <DollarSign className="w-4 h-4 inline mr-1 text-gray-500" />
              Amount (PKR) *
            </label>
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="2500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              <Calendar className="w-4 h-4 inline mr-1 text-gray-500" />
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Note */}
          <div className="lg:col-span-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Note
            </label>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="BBQ Tonight with friends"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-white font-medium transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Add Expense
              </>
            )}
          </button>
        </div>
      </form>

      {/* 🔍 Filters Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Filter by Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Dining Out">Dining Out</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Balance & Packages">Balance & Packages</option>
              <option value="Extra Purchasing">Extra Purchasing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Filter by Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Month */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="text-right mt-3">
          <button
            onClick={() => {
              setFilterCategory("");
              setFilterDate("");
              setFilterMonth("");
            }}
            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 text-sm font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-15 sm:px-4 py-2 sm:py-3 text-left">Title</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Category</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Amount</th>
              <th className="px-10 sm:px-4 py-2 sm:py-3 text-left">Date</th>
              <th className="px-10 sm:px-4 py-2 sm:py-3 text-left">Note</th>
              <th className="px-15 sm:px-4 py-2 sm:py-3 text-left">
                CreatedAt
              </th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp) => (
                <tr
                  key={exp._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-3 sm:px-4 py-2">{exp.title}</td>
                  <td className="px-4 py-2">{exp.category}</td>
                  <td className="px-3 sm:px-4 py-2 font-semibold text-blue-700">
                    {exp.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    {new Date(exp.date)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/ /g, "-")}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-600">
                    {exp.note || "-"}
                  </td>
                  <td className="px-4 py-2">
                    {" "}
                    {new Date(exp.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No expenses added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Footer Totals Section */}
      <div className="mt-4 w-full bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch justify-between text-sm sm:text-base text-gray-800 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
            <span className="text-gray-500 font-medium">Total Entries :</span>
            <span className="font-semibold ml-2">{expenses.length}</span>
          </div>

          <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
            <span className="text-gray-500 font-medium">Total Amount :</span>
            <span className="font-semibold text-blue-700 ml-2">
              {filteredTotal.toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

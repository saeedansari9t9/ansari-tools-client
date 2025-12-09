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
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // 🧮 Filter Expenses Function
  useEffect(() => {
    let filtered = [...expenses];

    // 🔍 Search by title, category, and notes
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchLower) ||
        e.category.toLowerCase().includes(searchLower) ||
        (e.note && e.note.toLowerCase().includes(searchLower))
      );
    }

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

    // Calculate total
    const totalAmt = filtered.reduce((sum, e) => sum + e.amount, 0);
    setFilteredTotal(totalAmt);

    // Apply pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedExpenses = filtered.slice(startIndex, endIndex);

    setFilteredExpenses(paginatedExpenses);
    
    // Reset to page 1 if current page is beyond total pages
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [expenses, searchTerm, filterCategory, filterDate, filterMonth, currentPage, itemsPerPage]);

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
      if (!form.title || !form.amount || !form.date || !form.category) {
        return toast.error("Title, amount, date & category are required");
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
      setForm({ title: "", amount: "", date: today, note: "", category: "" });
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
  className="bg-white rounded-lg shadow-md border border-gray-100 p-3 mb-4 space-y-3"
>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

    {/* Title */}
    <div>
      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
        <FileText className="w-3.5 h-3.5 inline mr-1 text-gray-500" />
        Title *
      </label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-[12px] focus:ring-1 focus:ring-blue-500"
        placeholder="Dinner with friends"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
        Category *
      </label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-[12px] focus:ring-1 focus:ring-blue-500"
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
      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
        <DollarSign className="w-3.5 h-3.5 inline mr-1 text-gray-500" />
        Amount (PKR) *
      </label>
      <input
        type="number"
        name="amount"
        min="0"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-[12px] focus:ring-1 focus:ring-blue-500"
        placeholder="2500"
        required
      />
    </div>

    {/* Date */}
    <div>
      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
        <Calendar className="w-3.5 h-3.5 inline mr-1 text-gray-500" />
        Date *
      </label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-[12px] focus:ring-1 focus:ring-blue-500"
        required
      />
    </div>

    {/* Note */}
    <div className="lg:col-span-2">
      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
        Note
      </label>
      <input
        type="text"
        name="note"
        value={form.note}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-[12px] focus:ring-1 focus:ring-blue-500"
        placeholder="BBQ Tonight with friends"
      />
    </div>
  </div>

  {/* Button */}
  <div className="flex justify-end">
    <button
      type="submit"
      disabled={loading}
      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-white text-[13px] font-medium transition ${
        loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Saving...
        </>
      ) : (
        <>
          <PlusCircle className="w-3.5 h-3.5" />
          Add
        </>
      )}
    </button>
  </div>
</form>


      <div className="flex items-center justify-between mb-4">
        {/* 🔍 Search Input */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by title, category, or notes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
          />
        </div>

        {/* ⚙️ Filter Icon Button */}
        <div className="relative inline-block ml-3">
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {/* HeroIcons or FontAwesome icon optional — using SVG here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9m-15 6h15m-12 6h12"
              />
            </svg>
          </button>

          {/* Popup Here */}
          {showFilterModal && (
            <div
              className="
      absolute 
      right-0 
      top-10 
      w-52              /* even smaller width */
      sm:w-60           /* small even on desktop */
      bg-white 
      rounded-lg        /* smaller border-radius */
      shadow-lg 
      border 
      border-gray-200 
      p-2.5             /* very small padding */
      z-50 
      animate-fadeIn
    "
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-1.5">
                <h2 className="text-xs font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                >
                  &times;
                </button>
              </div>

              {/* Category */}
              <div className="mb-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="
          w-full 
          border border-gray-300 
          rounded-md 
          px-2 py-1.5 
          text-[11px]
        "
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

              {/* Date */}
              <div className="mb-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  Date
                </label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="
          w-full 
          border border-gray-300 
          rounded-md 
          text-center py-1.5 
          text-[11px]
        "
                />
              </div>

              {/* Month */}
              <div className="mb-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  Month
                </label>
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="
          w-full 
          border border-gray-300 
          rounded-md 
          py-1.5 
          text-[11px] text-center
        "
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-1">
                <button
                  onClick={() => {
                    setFilterCategory("");
                    setFilterDate("");
                    setFilterMonth("");
                    setCurrentPage(1);
                  }}
                  className="
          px-2 py-1 
          bg-gray-200 hover:bg-gray-300 
          rounded 
          text-[11px] 
          text-gray-700
        "
                >
                  Reset
                </button>

                <button
                  onClick={() => {
                    setShowFilterModal(false);
                    setCurrentPage(1);
                  }}
                  className="
          px-2 py-1 
          bg-blue-600 hover:bg-blue-700 
          text-white 
          rounded 
          text-[11px]
        "
                >
                  Apply
                </button>
              </div>
            </div>
          )}
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

      {/* Pagination */}
      {(() => {
        const totalFiltered = expenses.filter((e) => {
          let match = true;
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            match = match && (
              e.title.toLowerCase().includes(searchLower) ||
              e.category.toLowerCase().includes(searchLower) ||
              (e.note && e.note.toLowerCase().includes(searchLower))
            );
          }
          if (filterCategory) {
            match = match && e.category.toLowerCase() === filterCategory.toLowerCase();
          }
          if (filterDate) {
            match = match && e.date.slice(0, 10) === filterDate;
          }
          if (filterMonth) {
            const month = new Date(filterMonth).getMonth();
            match = match && new Date(e.date).getMonth() === month;
          }
          return match;
        });
        const totalPages = Math.ceil(totalFiltered.length / itemsPerPage);
        
        if (totalPages > 1) {
          return (
            <div className="mt-4 bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          );
        }
        return null;
      })()}

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

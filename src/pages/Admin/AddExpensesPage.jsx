import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Trash2,
  DollarSign,
  Calendar,
  FileText,
  ArrowLeft,
  RefreshCw,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../services/api";

const EXPENSE_CATEGORIES = [
  "Food & Drinks",
  "Saturday Night",
  "Innovative Network",
  "Travel",
  "Shopping",
  "Dining Out",
  "Entertainment",
  "Balance & Packages",
  "Extra Purchasing",
  "Other"
];

export default function AddExpensesPage() {
  const navigate = useNavigate();
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  // Form State
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: today,
    note: "",
    note: "",
    category: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Data State
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filter State
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'monthly' | 'custom'
  const [categoryFilter, setCategoryFilter] = useState("");
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [startDate, setStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch all expenses once
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/expenses`);
      const data = await res.json();
      // Sort by date descending
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);


  // Derived Data (Filtered Expenses & Totals)
  const { filteredExpenses, totalFilteredAmount } = useMemo(() => {
    let filtered = [...expenses];
    let start, end;

    if (filterMode === "monthly") {
      start = new Date(Date.UTC(year, month - 1, 1));
      end = new Date(Date.UTC(year, month, 1)); // Start of next month (exclusive)
    } else {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    }

    // 0. Category Filter
    if (categoryFilter) {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    // 1. Date Filter
    filtered = filtered.filter((e) => {
      if (filterMode === "all") return true;

      const d = new Date(e.date);
      if (filterMode === "monthly") {
        return d >= start && d < end;
      } else {
        return d >= start && d <= end;
      }
    });

    // 2. Search Filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((e) =>
        e.title?.toLowerCase().includes(searchLower) ||
        e.category?.toLowerCase().includes(searchLower) ||
        e.note?.toLowerCase().includes(searchLower)
      );
    }

    const total = filtered.reduce((sum, e) => sum + (e.amount || 0), 0);

    return { filteredExpenses: filtered, totalFilteredAmount: total };
  }, [expenses, filterMode, categoryFilter, year, month, startDate, endDate, searchTerm]);


  // Pagination Logic
  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExpenses, currentPage]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  // Handlers
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

      setSaving(true);
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
      setShowAddModal(false);
      fetchExpenses(); // Reload list
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
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
      console.error("Delete Error:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6">
      {/* Header */}
      {/* Header */}
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/admin")}
            className="p-1.5 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            💸 Expense Tracker
          </h1>
        </div>


      </div>


      {/* Add Button */}
      {/* Moved to Header area or Separate Button */}

      {/* Modal Overlay */}
      {
        showAddModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Add New Expense</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="e.g. Server Hosting"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                      required
                    >
                      <option value="">Select Category</option>
                      {EXPENSE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Amount (PKR) *</label>
                    <input
                      type="number"
                      name="amount"
                      min="0"
                      step="0.01"
                      value={form.amount}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>

                  {/* Note */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Note</label>
                    <textarea
                      rows="2"
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition resize-none"
                      placeholder="Optional details..."
                    ></textarea>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white text-sm font-medium transition shadow-md ${saving
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        Save Expense
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* 📊 Filters & Report Section */}
      {/* 📊 Filters & Report Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 mb-4">
        {/* Row 1: Toggles & Refresh */}
        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 p-0.5 rounded-lg">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${filterMode === "all" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode("monthly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${filterMode === "monthly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setFilterMode("custom")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${filterMode === "custom" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Custom
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-medium transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Add New
          </button>
        </div>

        {/* Row 2: Date Inputs */}
        {/* Categories + Date Filter Row */}
        <div className={`grid gap-3 ${filterMode === "all" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"}`}>
          {/* Category Dropdown (Always Visible) */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:ring-1 focus:ring-blue-400 text-xs transition"
            >
              <option value="">All Categories</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date Inputs (Conditional) */}
          {filterMode !== "all" && (
            <>
              {filterMode === "monthly" ? (
                <>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Month
                    </label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:ring-1 focus:ring-blue-400 text-xs transition"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Year
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:ring-1 focus:ring-blue-400 text-xs transition"
                    >
                      {[2025, 2026, 2027].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Start
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:ring-1 focus:ring-blue-400 text-xs transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      End
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:ring-1 focus:ring-blue-400 text-xs transition"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

      </div>

      {/* Row 3: Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex flex-col justify-between">
          <p className="text-xs text-gray-500">
            Expenses ({filterMode === 'all' ? 'All' : filterMode === 'monthly' ? new Date(0, month - 1).toLocaleString('default', { month: 'short' }) : 'Range'})
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xl font-bold text-gray-800">{filteredExpenses.length}</p>
            <div className="p-1.5 bg-blue-50 rounded-full">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex flex-col justify-between">
          <p className="text-xs text-gray-500">Total Amount</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xl font-bold text-red-600">{totalFilteredAmount.toLocaleString()}</p>
            <div className="p-1.5 bg-red-50 rounded-full">
              <DollarSign className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Expense Table with Search */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-base font-semibold text-gray-800">
            List
          </h2>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search title, category, or note..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 pl-9 pr-8 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 text-sm transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium">Title</th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium">Category</th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium">Amount</th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium">Date</th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium">Note</th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.length > 0 ? (
                paginatedExpenses.map((exp) => (
                  <tr
                    key={exp._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-800">{exp.title}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 font-semibold text-red-600">
                      {exp.amount.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      {new Date(exp.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-500 truncate max-w-xs">{exp.note || "-"}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-right">
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-gray-400 hover:text-red-600 transition p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500 font-medium"
                  >
                    {loading ? "Loading..." : "No expenses found matching filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {
          totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
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
          )
        }
      </div >
    </div >
  );
}

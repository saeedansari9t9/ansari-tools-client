import React, { useEffect, useMemo, useState } from "react";
import ApiService, { API_BASE_URL } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, RefreshCw, Search, CheckCircle, XCircle, Calendar } from "lucide-react";
import { toast } from "react-toastify";

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center animate-pulse">
    <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
    <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
  </div>
);

const SkeletonTableRow = () => (
  <tr className="border-b border-gray-100 animate-pulse">
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div></td>
  </tr>
);

export default function SalesDashboardPage() {
  const navigate = useNavigate();
  const now = new Date();

  // Basic View State
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("date"); // 'date' | 'all' | 'monthly' | 'custom'

  // 'date' mode specific state
  const [data, setData] = useState({
    items: [],
    totalSalesAmount: 0,
    totalProfit: 0,
    totalOrders: 0,
    date: null,
  });
  const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10));
  const [productFilter, setProductFilter] = useState("");

  // Common Shared State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 20;

  // 'all' / 'monthly' / 'custom' mode specific state
  const [allSales, setAllSales] = useState([]);
  const [allSalesLoading, setAllSalesLoading] = useState(false);

  // Filters for 'monthly' / 'custom'
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [startDate, setStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
  );

  // Derived Summary for 'monthly' / 'custom'
  const [filteredPeriodSales, setFilteredPeriodSales] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalMonthlySales: 0,
    totalMonthlyProfit: 0,
    series: [],
  });
  const [tableView, setTableView] = useState("daywise"); // 'daywise' or 'products'

  const productOptions = [
    'Canva Pro 6 Month',
    'Canva Pro 1 Year',
    'CapCut Pro',
    'ChatGPT Semi Private',
    'Grammarly',
    'Quillbot',
    'Gemini Pro Plan',
    'Gemini Ultra Plan',
    'Turnitin Student',
    'Turnitin Instructor',
    'Envato Elements',
    'MS Office 365',
    'Adobe CC',
    'Stealth Writer',
    'Skillshare',
    'Udemy',
    'LinkedIn Learning',
    'Cousera Plus',
    'Leonardo AI',
    'Hix AI',
    'Perplexity AI',
    'Jasper AI',
    'Semrush',
    'Moz',
    'Ubersuggest',
    'Nord VPN',
    'Placeit',
    'Storyblocks',
    'Canva Admin Panel',
    'Student Plan',
    'Blogging Plan',
    'Agency Plan',
  ];

  // delete one sale item from day's record
  const handleDeleteItem = async (index) => {
    if (!window.confirm("Are you sure you want to delete this sale item?"))
      return;

    try {
      const saleItem = data.items[index];
      if (!saleItem._id) {
        throw new Error("Sale ID not found");
      }

      await ApiService.deleteSale(saleItem._id);
      toast.success("Sale deleted successfully!");
      await loadForDate(selectedDate);
    } catch (err) {
      toast.error(err?.message || "Failed to delete sale");
    }
  };

  // edit one sale item inline
  const handleEditItem = (item) => {
    setEditingId(item._id);
    setEditForm({
      productName: item.productName,
      sellingPrice: item.sellingPrice,
      costPrice: item.costPrice,
    });
  };

  const handleUpdate = async (id) => {
    try {
      if (!editForm.productName || !editForm.sellingPrice || !editForm.costPrice) {
        toast.error("Please fill all fields");
        return;
      }

      await ApiService.updateSale(id, {
        productName: editForm.productName,
        sellingPrice: Number(editForm.sellingPrice),
        costPrice: Number(editForm.costPrice),
        date: selectedDate,
      });
      toast.success("Sale updated successfully!");
      setEditingId(null);
      await loadForDate(selectedDate);
    } catch (err) {
      toast.error(err?.message || "Failed to update sale");
    }
  };

  const loadForDate = async (d) => {
    setLoading(true);
    try {
      const res = await ApiService.getSalesByDate(d);
      setData({
        items: res.items || [],
        totalSalesAmount: res.totalSalesAmount || 0,
        totalProfit: res.totalProfit || 0,
        totalOrders: (res.items || []).length,
        date: d,
      });
    } catch (e) {
      console.error(e);
      setData({
        items: [],
        totalSalesAmount: 0,
        totalProfit: 0,
        totalOrders: 0,
        date: d,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === "date") {
      loadForDate(selectedDate);
    } else {
      loadAllSales();
    }
  }, [selectedDate, viewMode]);

  useEffect(() => {
    // Only process period grouping if we are in monthly or custom modes
    if ((viewMode !== "monthly" && viewMode !== "custom") || !allSales.length) return;

    let start, end;
    let filtered = [];

    if (viewMode === "monthly") {
      start = new Date(Date.UTC(year, month - 1, 1));
      end = new Date(Date.UTC(year, month, 1));
    } else {
      // Custom Range
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // Start of day

      end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of day
    }

    // Filter Sales
    filtered = allSales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });

    setFilteredPeriodSales(filtered);
    setCurrentPage(1);

    // Calculate Summary
    const totalSales = filtered.reduce((sum, s) => sum + (s.sellingPrice || 0), 0);
    const totalProfit = filtered.reduce((sum, s) => sum + (s.profit || 0), 0);

    // Calculate Series for Chart (Group by Day)
    const seriesMap = {};
    filtered.forEach(sale => {
      const dateKey = new Date(sale.date).toISOString().split('T')[0];
      if (!seriesMap[dateKey]) {
        seriesMap[dateKey] = { date: dateKey, totalOrders: 0, totalSalesAmount: 0, totalProfit: 0 };
      }
      seriesMap[dateKey].totalOrders += 1;
      seriesMap[dateKey].totalSalesAmount += (sale.sellingPrice || 0);
      seriesMap[dateKey].totalProfit += (sale.profit || 0);
    });

    // Convert map to sorted array
    const series = Object.values(seriesMap).sort((a, b) => new Date(a.date) - new Date(b.date));

    setSummaryData({
      totalMonthlySales: totalSales,
      totalMonthlyProfit: totalProfit,
      series: series
    });

  }, [allSales, viewMode, year, month, startDate, endDate]);

  const maxValue = useMemo(() => {
    return (
      summaryData.series.reduce(
        (m, d) => Math.max(m, d.totalSalesAmount, d.totalProfit),
        0
      ) || 1
    );
  }, [summaryData.series]);

  const loadAllSales = async () => {
    setAllSalesLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/sales`);
      if (!response.ok) throw new Error('Failed to fetch sales');
      const sales = await response.json();
      setAllSales(sales);
    } catch (error) {
      console.error('Error loading all sales:', error);
      setAllSales([]);
    } finally {
      setAllSalesLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (!productFilter) return data.items;
    return data.items.filter(
      (it) =>
        (it.productName || "").toLowerCase() === productFilter.toLowerCase()
    );
  }, [data.items, productFilter]);

  const totals = useMemo(() => {
    return filteredItems.reduce(
      (acc, it) => {
        acc.selling += Number(it.sellingPrice || 0);
        acc.cost += Number(it.costPrice || 0);
        acc.profit += Number(it.profit || 0);
        return acc;
      },
      { selling: 0, cost: 0, profit: 0 }
    );
  }, [filteredItems]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Sales Dashboard
        </h1>
      </div>

      {/* Quick Actions / View Modes */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-5 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setViewMode("date");
            setSelectedDate(new Date().toISOString().slice(0, 10));
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "date"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            }`}
        >
          Today
        </button>
        <button
          onClick={() => setViewMode("monthly")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "monthly"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            }`}
        >
          Monthly Summary
        </button>
        <button
          onClick={() => setViewMode("custom")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "custom"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            }`}
        >
          Custom Date Range
        </button>
        <button
          onClick={() => {
            setViewMode("all");
            setSearchTerm("");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "all"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            }`}
        >
          Total Sales
        </button>
      </div>

      {/* Filters */}
      {viewMode === "date" ? (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md text-center py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-600 mb-1">
              Product
            </label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
            >
              <option value="">All</option>
              {productOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Link
              to="/admin/sales/add"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 mr-2 py-2 rounded-md w-full sm:w-auto text-sm font-medium transition"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              Add Sale
            </Link>
            <button
              onClick={() => loadForDate(selectedDate)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm font-medium transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      ) : viewMode === "monthly" || viewMode === "custom" ? (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {viewMode === "monthly" ? (
            <>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
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
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-5 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or date..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
          <Link
            to="/admin/sales/add"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Add Sale
          </Link>
          <button
            onClick={loadAllSales}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      )}

      {/* Summary Cards */}
      {viewMode === "date" ? (
        loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
                Total Sales
              </div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                {(productFilter ? totals.selling : data.totalSalesAmount).toFixed(
                  2
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
                Total Profit
              </div>
              <div className="text-lg sm:text-xl font-semibold text-green-600">
                {(productFilter ? totals.profit : data.totalProfit).toFixed(2)}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
                Total Orders
              </div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                {productFilter ? filteredItems.length : data.totalOrders}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
                Date
              </div>
              <div className="text-lg sm:text-xl font-semibold text-blue-600">
                {new Date(selectedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        )
      ) : viewMode === "monthly" || viewMode === "custom" ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
                Total Sales {viewMode === 'monthly' ? '(Month)' : '(Range)'}
              </div>
              <div className="text-lg sm:text-2xl font-semibold text-gray-800">
                {Number(summaryData.totalMonthlySales).toFixed(2)}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
              <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
                Total Profit {viewMode === 'monthly' ? '(Month)' : '(Range)'}
              </div>
              <div className="text-lg sm:text-2xl font-semibold text-green-600">
                {Number(summaryData.totalMonthlyProfit).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium text-gray-700">
                Revenue Over Time (<span className="text-blue-500">Sales</span> vs <span className="text-green-500">Profit</span>)
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              {summaryData.series.length > 0 ? (
                <div
                  className="flex items-end gap-2 pb-2"
                  style={{ minWidth: summaryData.series.length * 30 + "px" }} // Dynamic width
                >
                  {summaryData.series.map((d, i) => {
                    const hSales = (d.totalSalesAmount / maxValue) * 140;
                    const hProfit = (d.totalProfit / maxValue) * 140;
                    const displayDate = new Date(d.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' });
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center transition-transform hover:scale-105"
                        style={{ width: 30 }}
                      >
                        <div className="flex items-end gap-1" style={{ height: 150 }}>
                          <div
                            title={`Date: ${d.date}\nSales: ${d.totalSalesAmount}`}
                            className="bg-blue-500 w-3 rounded-t-sm"
                            style={{ height: `${hSales}px` }}
                          />
                          <div
                            title={`Date: ${d.date}\nProfit: ${d.totalProfit}`}
                            className="bg-green-500 w-3 rounded-t-sm"
                            style={{ height: `${hProfit}px` }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-600 mt-1 whitespace-nowrap -rotate-45 sm:rotate-0 origin-top-left">{displayDate}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
                  No chart data for this period
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
              Total Sales
            </div>
            <div className="text-lg sm:text-xl font-semibold text-gray-800">
              {allSales
                .filter((sale) => {
                  if (!searchTerm) return true;
                  const search = searchTerm.toLowerCase();
                  return (
                    sale.productName?.toLowerCase().includes(search) ||
                    new Date(sale.date).toLocaleDateString().includes(search)
                  );
                })
                .reduce((sum, s) => sum + (s.sellingPrice || 0), 0)
                .toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
              Total Profit
            </div>
            <div className="text-lg sm:text-xl font-semibold text-green-600">
              {allSales
                .filter((sale) => {
                  if (!searchTerm) return true;
                  const search = searchTerm.toLowerCase();
                  return (
                    sale.productName?.toLowerCase().includes(search) ||
                    new Date(sale.date).toLocaleDateString().includes(search)
                  );
                })
                .reduce((sum, s) => sum + (s.profit || 0), 0)
                .toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
              Total Orders
            </div>
            <div className="text-lg sm:text-xl font-semibold text-gray-800">
              {allSales.filter((sale) => {
                if (!searchTerm) return true;
                const search = searchTerm.toLowerCase();
                return (
                  sale.productName?.toLowerCase().includes(search) ||
                  new Date(sale.date).toLocaleDateString().includes(search)
                );
              }).length}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5">
              All Time
            </div>
            <div className="text-lg sm:text-xl font-semibold text-blue-600">
              {allSales.length} Sales
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {viewMode === "date" ? (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Selling
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Cost
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Profit
                </th>
                <th className="px-4 py-2 text-center text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonTableRow key={i} />)
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500 text-sm"
                  >
                    No sales added for this date.
                  </td>
                </tr>
              ) : (
                filteredItems.map((it, idx) => {
                  const isEditing = editingId === it._id;
                  const profit = isEditing
                    ? Number(editForm.sellingPrice || 0) - Number(editForm.costPrice || 0)
                    : Number(it.profit || 0);

                  return (
                    <tr
                      key={it._id || idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <select
                            value={editForm.productName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, productName: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select product</option>
                            {productOptions.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-800">{it.productName}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editForm.sellingPrice || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, sellingPrice: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {Number(it.sellingPrice).toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editForm.costPrice || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, costPrice: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {Number(it.costPrice).toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-green-600 font-medium">
                        {profit.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleUpdate(it._id)}
                                className="text-green-600 hover:text-green-700 p-1"
                                title="Save"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditForm({});
                                }}
                                className="text-red-600 hover:text-red-700 p-1"
                                title="Cancel"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditItem(it)}
                                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium border border-blue-100 bg-blue-50 px-2 py-1 rounded transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteItem(idx)}
                                className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium border border-red-100 bg-red-50 px-2 py-1 rounded transition"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : viewMode === "monthly" || viewMode === "custom" ? (
        <>
          {/* Table Toggle Buttons */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => setTableView("daywise")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${tableView === "daywise"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                }`}
            >
              Day-wise Summary
            </button>
            <button
              onClick={() => setTableView("products")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${tableView === "products"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                }`}
            >
              Product Sales List
            </button>
          </div>

          {/* Day-wise Summary Table */}
          {tableView === "daywise" && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Day-wise Summary
                </h2>
              </div>
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Total Orders
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Total Sales
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Total Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.series.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No sales data found for this period.
                      </td>
                    </tr>
                  ) : (
                    summaryData.series.map((d, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2 text-gray-800">
                          {new Date(d.date).toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {d.totalOrders}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {Number(d.totalSalesAmount).toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-green-600 font-medium">
                          {Number(d.totalProfit).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* All Products Table for Period */}
          {tableView === "products" && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto mb-6">
              <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Product Sales List
                </h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 text-sm"
                  />
                </div>
              </div>
              {allSalesLoading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading data...</p>
                </div>
              ) : (
                <>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">
                          Product Name
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">
                          Selling Price
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">
                          Cost Price
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const searchedSales = filteredPeriodSales.filter((sale) => {
                          if (!searchTerm) return true;
                          const search = searchTerm.toLowerCase();
                          return sale.productName?.toLowerCase().includes(search);
                        });

                        const startIndex = (currentPage - 1) * itemsPerPage;
                        const endIndex = startIndex + itemsPerPage;
                        const paginatedSales = searchedSales.slice(
                          startIndex,
                          endIndex
                        );

                        if (paginatedSales.length === 0) {
                          return (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center py-6 text-gray-500 text-sm"
                              >
                                {searchTerm
                                  ? "No products found matching your search."
                                  : "No products found for this period."}
                              </td>
                            </tr>
                          );
                        }

                        return paginatedSales.map((sale) => (
                          <tr
                            key={sale._id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                          >
                            <td className="px-4 py-2 text-gray-800 font-medium">
                              {sale.productName}
                            </td>
                            <td className="px-4 py-2 text-gray-800">
                              {new Date(sale.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                              {Number(sale.sellingPrice || 0).toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                              {Number(sale.costPrice || 0).toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-green-600 font-medium">
                              {Number(sale.profit || 0).toFixed(2)}
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {(() => {
                    const searchedSales = filteredPeriodSales.filter((sale) => {
                      if (!searchTerm) return true;
                      const search = searchTerm.toLowerCase();
                      return sale.productName?.toLowerCase().includes(search);
                    });
                    const totalPages = Math.ceil(
                      searchedSales.length / itemsPerPage
                    );

                    if (totalPages > 1) {
                      return (
                        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                          <div className="text-sm text-gray-700">
                            Page <span className="font-medium">{currentPage}</span>{" "}
                            of <span className="font-medium">{totalPages}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={currentPage === 1}
                              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  Math.min(prev + 1, totalPages)
                                )
                              }
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
                </>
              )}
            </div>
          )}
        </>
      ) : (
        (() => {
          const filteredSales = allSales.filter((sale) => {
            if (!searchTerm) return true;
            const search = searchTerm.toLowerCase();
            return (
              sale.productName?.toLowerCase().includes(search) ||
              new Date(sale.date).toLocaleDateString().includes(search)
            );
          });

          const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedSales = filteredSales.slice(startIndex, endIndex);

          return (
            <>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Selling
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Cost
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSalesLoading ? (
                      [...Array(5)].map((_, i) => <SkeletonTableRow key={i} />)
                    ) : paginatedSales.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-6 text-center text-gray-500 text-sm"
                        >
                          {searchTerm
                            ? "No sales found matching your search."
                            : "No sales found."}
                        </td>
                      </tr>
                    ) : (
                      paginatedSales.map((sale) => (
                        <tr
                          key={sale._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-2 text-gray-700">
                            {new Date(sale.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {sale.productName}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {Number(sale.sellingPrice || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {Number(sale.costPrice || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-green-600 font-medium">
                            {Number(sale.profit || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })()
      )}

      {/* Totals Footer - modern responsive strip with colons */}
      {viewMode === "date" && (
        loading ? (
          <div className="mt-4 w-full bg-white border border-gray-100 shadow-sm rounded-xl p-4 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
          </div>
        ) : (
          <div className="mt-4 w-full bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-stretch justify-between text-sm sm:text-base text-gray-800 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              <div className="flex-1 flex justify-between sm:justify-center px-4 py-2">
                <span className="text-gray-500">Items :</span>
                <span className="font-semibold ml-2">{filteredItems.length}</span>
              </div>

              <div className="flex-1 flex justify-between sm:justify-center px-4 py-2">
                <span className="text-gray-500">Cost Total :</span>
                <span className="font-semibold text-blue-700 ml-2">
                  {totals.cost.toFixed(2)}
                </span>
              </div>

              <div className="flex-1 flex justify-between sm:justify-center px-4 py-2">
                <span className="text-gray-500">Selling Total :</span>
                <span className="font-semibold text-indigo-600 ml-2">
                  {totals.selling.toFixed(2)}
                </span>
              </div>

              <div className="flex-1 flex justify-between sm:justify-center px-4 py-2">
                <span className="text-gray-500">Profit Total :</span>
                <span className="font-semibold text-green-600 ml-2">
                  {totals.profit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import ApiService, { API_BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Search, Calendar } from "lucide-react";

export default function MonthlySalesSummaryPage() {
  const navigate = useNavigate();
  const now = new Date();

  // Filter State
  const [filterMode, setFilterMode] = useState("monthly"); // 'monthly' | 'custom'
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [startDate, setStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
  );

  const [loading, setLoading] = useState(false);
  const [allSalesData, setAllSalesData] = useState([]); // Store all raw sales

  // Derived Data
  const [filteredSales, setFilteredSales] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalMonthlySales: 0,
    totalMonthlyProfit: 0,
    series: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableView, setTableView] = useState("daywise"); // 'daywise' or 'products'
  const itemsPerPage = 20;

  // Load ALL sales once
  const loadSales = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/sales`);
      if (!response.ok) throw new Error("Failed to fetch sales");
      const allSales = await response.json();

      // Sort by date (newest first)
      allSales.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllSalesData(allSales);
    } catch (error) {
      console.error("Error loading sales:", error);
      setAllSalesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  // Filter Logic and Summary Calculation
  useEffect(() => {
    if (!allSalesData.length) return;

    let start, end;
    let filtered = [];

    if (filterMode === "monthly") {
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
    filtered = allSalesData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });

    setFilteredSales(filtered);
    setCurrentPage(1);

    // Calculate Summary
    const totalSales = filtered.reduce((sum, s) => sum + (s.sellingPrice || 0), 0);
    const totalProfit = filtered.reduce((sum, s) => sum + (s.profit || 0), 0);

    // Calculate Series for Chart (Group by Day)
    const seriesMap = {};
    filtered.forEach(sale => {
      const dateKey = new Date(sale.date).toISOString().split('T')[0];
      if (!seriesMap[dateKey]) {
        seriesMap[dateKey] = { date: dateKey, totalSalesAmount: 0, totalProfit: 0 };
      }
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

  }, [allSalesData, filterMode, year, month, startDate, endDate]);


  const maxValue = useMemo(() => {
    return (
      summaryData.series.reduce(
        (m, d) => Math.max(m, d.totalSalesAmount, d.totalProfit),
        0
      ) || 1
    );
  }, [summaryData.series]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Sales Summary Report
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4 border-b border-gray-100 pb-4">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilterMode("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${filterMode === "monthly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Monthly View
            </button>
            <button
              onClick={() => setFilterMode("custom")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${filterMode === "custom" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Custom Date Range
            </button>
          </div>

          <div className="flex items-center justify-end w-full sm:w-auto">
            <button
              disabled={loading}
              onClick={loadSales}
              className={`flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filterMode === "monthly" ? (
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
                  {[ 2025, 2026, 2027].map((y) => (
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
          <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
            Total Sales {filterMode === 'monthly' ? '(Month)' : '(Range)'}
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-800">
            {Number(summaryData.totalMonthlySales).toFixed(2)}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
          <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
            Total Profit {filterMode === 'monthly' ? '(Month)' : '(Range)'}
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-green-600">
            {Number(summaryData.totalMonthlyProfit).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Chart */}
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
                    colSpan="3"
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

      {/* All Products Table */}
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
          {loading ? (
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
                    const searchedSales = filteredSales.filter((sale) => {
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
                const searchedSales = filteredSales.filter((sale) => {
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

      {/* Summary Footer */}
      {tableView === "products" && filteredSales.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch justify-between text-sm sm:text-base text-gray-800 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
              <span className="text-gray-500 font-medium">
                Total Products :
              </span>
              <span className="font-semibold ml-2">
                {
                  filteredSales.filter((sale) => {
                    if (!searchTerm) return true;
                    const search = searchTerm.toLowerCase();
                    return sale.productName?.toLowerCase().includes(search);
                  }).length
                }
              </span>
            </div>
            <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
              <span className="text-gray-500 font-medium">Total Sales :</span>
              <span className="font-semibold text-blue-700 ml-2">
                {filteredSales
                  .filter((sale) => {
                    if (!searchTerm) return true;
                    const search = searchTerm.toLowerCase();
                    return sale.productName?.toLowerCase().includes(search);
                  })
                  .reduce((sum, s) => sum + (s.sellingPrice || 0), 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
              <span className="text-gray-500 font-medium">Total Profit :</span>
              <span className="font-semibold text-green-600 ml-2">
                {filteredSales
                  .filter((sale) => {
                    if (!searchTerm) return true;
                    const search = searchTerm.toLowerCase();
                    return sale.productName?.toLowerCase().includes(search);
                  })
                  .reduce((sum, s) => sum + (s.profit || 0), 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

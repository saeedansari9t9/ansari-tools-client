import React, { useEffect, useMemo, useState } from "react";
import ApiService, { API_BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Search } from "lucide-react";

export default function MonthlySalesSummaryPage() {
  const navigate = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getUTCFullYear());
  const [month, setMonth] = useState(now.getUTCMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalMonthlySales: 0,
    totalMonthlyProfit: 0,
    avgDailySales: 0,
    series: [],
  });
  const [allProductsSales, setAllProductsSales] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableView, setTableView] = useState("daywise"); // 'daywise' or 'products'
  const itemsPerPage = 20;

  const load = async () => {
    setLoading(true);
    try {
      const res = await ApiService.getMonthlySummary({ year, month });
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadAllProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/sales`);
      if (!response.ok) throw new Error("Failed to fetch sales");
      const allSales = await response.json();

      // Filter sales for selected month and year
      const monthStart = new Date(Date.UTC(year, month - 1, 1));
      const monthEnd = new Date(Date.UTC(year, month, 1));

      const monthlySales = allSales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= monthStart && saleDate < monthEnd;
      });

      // Sort by date (newest first)
      monthlySales.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAllProductsSales(monthlySales);
    } catch (error) {
      console.error("Error loading products:", error);
      setAllProductsSales([]);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const maxValue = useMemo(() => {
    return (
      data.series.reduce(
        (m, d) => Math.max(m, d.totalSalesAmount, d.totalProfit),
        0
      ) || 1
    );
  }, [data.series]);

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
          Monthly Sales Summary
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs sm:text-sm text-gray-600 mb-1">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
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
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 text-sm transition"
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            disabled={loading}
            onClick={load}
            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
          <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
            Total Monthly Sales
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-800">
            {Number(data.totalMonthlySales).toFixed(2)}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 sm:p-4 text-center">
          <div className="text-[11px] sm:text-sm text-gray-500 mb-0.5">
            Total Monthly Profit
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-green-600">
            {Number(data.totalMonthlyProfit).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6">
        <div className="text-sm font-medium mb-3 text-gray-700">
          Day-wise Revenue (<span className="text-blue-500">blue</span>) &
          Profit (<span className="text-green-500">green</span>)
        </div>
        <div className="w-full overflow-x-auto">
          <div
            className="flex items-end gap-2 pb-2"
            style={{ minWidth: "650px" }}
          >
            {data.series.map((d, i) => {
              const hSales = (d.totalSalesAmount / maxValue) * 140;
              const hProfit = (d.totalProfit / maxValue) * 140;
              const day = new Date(d.date).getUTCDate();
              return (
                <div
                  key={i}
                  className="flex flex-col items-center transition-transform hover:scale-105"
                  style={{ width: 20 }}
                >
                  <div className="flex items-end gap-1" style={{ height: 150 }}>
                    <div
                      title={`Sales: ${d.totalSalesAmount}`}
                      className="bg-blue-500 w-2 rounded-t-sm"
                      style={{ height: `${hSales}px` }}
                    />
                    <div
                      title={`Profit: ${d.totalProfit}`}
                      className="bg-green-500 w-2 rounded-t-sm"
                      style={{ height: `${hProfit}px` }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1">{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Toggle Buttons */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setTableView("daywise")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            tableView === "daywise"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-50 hover:bg-gray-100 text-gray-800"
          }`}
        >
          Day-wise Summary
        </button>
        <button
          onClick={() => setTableView("products")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            tableView === "products"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-50 hover:bg-gray-100 text-gray-800"
          }`}
        >
          All Products Sales
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
              {data.series.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No data available for this month.
                  </td>
                </tr>
              ) : (
                data.series.map((d, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-gray-800">
                      {new Date(d.date).toLocaleDateString("en-GB")}
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
              All Products Sales
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
          {productsLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
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
                    const filteredSales = allProductsSales.filter((sale) => {
                      if (!searchTerm) return true;
                      const search = searchTerm.toLowerCase();
                      return sale.productName?.toLowerCase().includes(search);
                    });

                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const paginatedSales = filteredSales.slice(
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
                              : "No products found for this month."}
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
                const filteredSales = allProductsSales.filter((sale) => {
                  if (!searchTerm) return true;
                  const search = searchTerm.toLowerCase();
                  return sale.productName?.toLowerCase().includes(search);
                });
                const totalPages = Math.ceil(
                  filteredSales.length / itemsPerPage
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
      {tableView === "products" && allProductsSales.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch justify-between text-sm sm:text-base text-gray-800 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex-1 flex justify-between sm:justify-center px-4 py-3">
              <span className="text-gray-500 font-medium">
                Total Products :
              </span>
              <span className="font-semibold ml-2">
                {
                  allProductsSales.filter((sale) => {
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
                {allProductsSales
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
                {allProductsSales
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

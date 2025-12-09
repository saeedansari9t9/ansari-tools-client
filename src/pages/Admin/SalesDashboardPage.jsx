import React, { useEffect, useMemo, useState } from "react";
import ApiService, { API_BASE_URL } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, RefreshCw, Search, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function SalesDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    items: [],
    totalSalesAmount: 0,
    totalProfit: 0,
    totalOrders: 0,
    date: null,
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [productFilter, setProductFilter] = useState("");
  const [viewMode, setViewMode] = useState("date"); // 'date' or 'all'
  const [allSales, setAllSales] = useState([]);
  const [allSalesLoading, setAllSalesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 20;

  const productOptions = [
    'Canva Pro 6 Month',
    'Canva Pro 1 Year',
    'CapCut Pro',
    'ChatGPT Semi Private',
    'Grammarly',
    'Quillbot',
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

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading sales data...
      </div>
    );

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

      {/* Quick Actions */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-5 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setViewMode("date");
            setSelectedDate(new Date().toISOString().slice(0, 10));
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            viewMode === "date"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-50 hover:bg-gray-100 text-gray-800"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => navigate("/admin/sales/monthly")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Monthly Summary
        </button>
        <button
          onClick={() => {
            setViewMode("all");
            setSearchTerm("");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            viewMode === "all"
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
              {filteredItems.length === 0 ? (
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
                {allSalesLoading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading all sales...</p>
                  </div>
                ) : (
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
                      {paginatedSales.length === 0 ? (
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
                )}
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
      )}
    </div>
  );
}

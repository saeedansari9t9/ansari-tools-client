import React, { useEffect, useMemo, useState } from "react";
import ApiService from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";

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

  const productOptions = [
    "Canva Pro 6 Month",
    "Canva Pro 1 Year",
    "ChatGPT Semi Private",
    "Semrush",
    "Moz",
    "Ubersuggest",
    "Turnitin Student",
    "Turnitin Instructor",
    "Envato Elements",
    "Placeit",
    "Storyblocks",
  ];

  // delete one sale item from day's record
  const handleDeleteItem = async (index) => {
    if (!window.confirm("Are you sure you want to delete this sale item?"))
      return;

    try {
      const updatedItems = [...data.items];
      updatedItems.splice(index, 1);

      await ApiService.updateSale(data._id, {
        date: selectedDate,
        items: updatedItems,
      });
      alert("Deleted successfully!");
      await loadForDate(selectedDate);
    } catch (err) {
      alert(err?.message || "Failed to delete");
    }
  };

  // edit one sale item inline
  const handleEditItem = async (index) => {
    const current = data.items[index];
    const productName = prompt("Product name:", current.productName);
    if (productName === null) return;
    const sellingPrice = prompt("Selling price:", current.sellingPrice);
    if (sellingPrice === null) return;
    const costPrice = prompt("Cost price:", current.costPrice);
    if (costPrice === null) return;

    try {
      const updatedItems = [...data.items];
      updatedItems[index] = {
        ...current,
        productName,
        sellingPrice: Number(sellingPrice),
        costPrice: Number(costPrice),
        profit: Number(sellingPrice) - Number(costPrice),
      };

      await ApiService.updateSale(data._id, {
        date: selectedDate,
        items: updatedItems,
      });
      alert("Updated successfully!");
      await loadForDate(selectedDate);
    } catch (err) {
      alert(err?.message || "Failed to update");
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
    loadForDate(selectedDate);
  }, [selectedDate]);

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
          onClick={() => setSelectedDate(new Date().toISOString().slice(0, 10))}
          className="bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Today
        </button>
        <button
          onClick={() => navigate("/admin/sales/monthly")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Monthly Summary
        </button>
      </div>

      {/* Filters */}
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

      {/* Summary Cards */}
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

      {/* Table */}
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
              filteredItems.map((it, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-gray-800">{it.productName}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {Number(it.sellingPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {Number(it.costPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    {Number(it.profit).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditItem(idx)}
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium border border-blue-100 bg-blue-50 px-2 py-1 rounded transition"
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteItem(idx)}
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium border border-red-100 bg-red-50 px-2 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Totals Footer - modern responsive strip with colons */}
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
    </div>
  );
}

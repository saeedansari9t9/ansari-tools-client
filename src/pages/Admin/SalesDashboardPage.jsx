import React, { useEffect, useMemo, useState } from 'react';
import ApiService from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SalesDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: [], totalSalesAmount: 0, totalProfit: 0, totalOrders: 0, date: null });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const productOptions = [
    'Canva Pro 6 Month',
    'Canva Pro 1 Year',
    'ChatGPT Semi Private',
    'Semrush',
    'Moz',
    'Ubersuggest',
    'Turnitin Student',
    'Turnitin Instructor',
    'Envato Elements',
    'Placeit',
    'Storyblocks',
  ];
  const [productFilter, setProductFilter] = useState('');

  const loadForDate = async (d) => {
    setLoading(true);
    try {
      const res = await ApiService.getSalesByDate(d);
      // res is combined summary from backend
      setData({
        items: res.items || [],
        totalSalesAmount: res.totalSalesAmount || 0,
        totalProfit: res.totalProfit || 0,
        totalOrders: (res.items || []).length,
        date: d,
      });
    } catch (e) {
      console.error(e);
      // If not found (404), show empty
      setData({ items: [], totalSalesAmount: 0, totalProfit: 0, totalOrders: 0, date: d });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForDate(selectedDate);
  }, [selectedDate]);

  const filteredItems = useMemo(() => {
    if (!productFilter) return data.items;
    return data.items.filter((it) => (it.productName || '').toLowerCase() === productFilter.toLowerCase());
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedDate(new Date().toISOString().slice(0, 10))}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 text-sm"
        >
          Today
        </button>
        <button
          onClick={() => navigate('/admin/sales/monthly')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          Monthly Summary
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Product</label>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="border rounded px-3 py-2 w-full">
            <option value="">All</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={() => loadForDate(selectedDate)} className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto">Refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Sales Amount</div>
          <div className="text-2xl font-bold">{(productFilter ? totals.selling : data.totalSalesAmount).toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Profit</div>
          <div className="text-2xl font-bold text-green-600">{(productFilter ? totals.profit : data.totalProfit).toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-2xl font-bold">{(productFilter ? filteredItems.length : data.totalOrders)}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Product</th>
              <th className="px-4 py-2 text-left text-sm">Selling</th>
              <th className="px-4 py-2 text-left text-sm">Cost</th>
              <th className="px-4 py-2 text-left text-sm">Profit</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">No sales added for today.</td>
              </tr>
            ) : (
              filteredItems.map((it, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{it.productName}</td>
                  <td className="px-4 py-2">{Number(it.sellingPrice).toFixed(2)}</td>
                  <td className="px-4 py-2">{Number(it.costPrice).toFixed(2)}</td>
                  <td className="px-4 py-2">{Number(it.profit).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Totals footer */}
      <div className="mt-4 bg-white rounded-lg shadow p-4 text-sm">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div>Items: <strong>{filteredItems.length}</strong></div>
          <div>Cost Total: <strong>{totals.cost.toFixed(2)}</strong></div>
          <div>Selling Total: <strong>{totals.selling.toFixed(2)}</strong></div>
          <div>Profit Total: <strong>{totals.profit.toFixed(2)}</strong></div>
        </div>
      </div>
    </div>
  );
}



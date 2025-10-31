import React, { useEffect, useMemo, useState } from 'react';
import ApiService from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

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

  useEffect(() => {
    load();
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
                {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
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
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            {loading ? 'Loading...' : 'Refresh'}
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
          Day-wise Revenue (<span className="text-blue-500">blue</span>) & Profit (
          <span className="text-green-500">green</span>)
        </div>
        <div className="w-full overflow-x-auto">
          <div
            className="flex items-end gap-2 pb-2"
            style={{ minWidth: '650px' }}
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

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
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
                    {new Date(d.date).toLocaleDateString('en-GB')}
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
    </div>
  );
}

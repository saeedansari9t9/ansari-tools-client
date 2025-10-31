import React, { useEffect, useMemo, useState } from 'react';
import ApiService from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MonthlySalesSummaryPage() {
  const navigate = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getUTCFullYear());
  const [month, setMonth] = useState(now.getUTCMonth() + 1); // 1-12
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ totalMonthlySales: 0, totalMonthlyProfit: 0, avgDailySales: 0, series: [] });

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
    return data.series.reduce((m, d) => Math.max(m, d.totalSalesAmount, d.totalProfit), 0) || 1;
  }, [data.series]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">Monthly Sales Summary</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Month</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="border rounded px-3 py-2 w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en-US', { month: 'long' })}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Year</label>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="flex items-end">
          <button disabled={loading} onClick={load} className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto">{loading ? 'Loading...' : 'Refresh'}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Monthly Sales</div>
          <div className="text-2xl font-bold">{Number(data.totalMonthlySales).toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Monthly Profit</div>
          <div className="text-2xl font-bold text-green-600">{Number(data.totalMonthlyProfit).toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Avg Daily Sales</div>
          <div className="text-2xl font-bold">{Number(data.avgDailySales).toFixed(2)}</div>
        </div>
      </div>

      {/* Simple bar chart using divs */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="text-sm font-medium mb-2">Day-wise Revenue (blue) and Profit (green)</div>
        <div className="w-full overflow-x-auto">
          <div className="flex items-end gap-2" style={{ minWidth: '800px' }}>
            {data.series.map((d, i) => {
              const hSales = (d.totalSalesAmount / maxValue) * 140;
              const hProfit = (d.totalProfit / maxValue) * 140;
              const day = new Date(d.date).getUTCDate();
              return (
                <div key={i} className="flex flex-col items-center" style={{ width: 20 }}>
                  <div className="flex items-end gap-1" style={{ height: 150 }}>
                    <div title={`Sales: ${d.totalSalesAmount}`} className="bg-blue-500 w-2" style={{ height: `${hSales}px` }} />
                    <div title={`Profit: ${d.totalProfit}`} className="bg-green-500 w-2" style={{ height: `${hProfit}px` }} />
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1">{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Date</th>
              <th className="px-4 py-2 text-left text-sm">Total Sales</th>
              <th className="px-4 py-2 text-left text-sm">Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {data.series.map((d, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{new Date(d.date).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-2">{Number(d.totalSalesAmount).toFixed(2)}</td>
                <td className="px-4 py-2">{Number(d.totalProfit).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



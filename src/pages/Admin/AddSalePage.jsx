import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Save, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ApiService from '../../services/api';

export default function AddSalePage() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();
  const [date, setDate] = useState(todayIso);
  const [items, setItems] = useState([
    { productName: '', sellingPrice: 0, costPrice: 0 },
  ]);

  const [loading, setLoading] = useState(false);
  
  const productOptions = [
    'Canva Pro 6 Month',
    'Canva Pro 1 Year',
    'CapCut Pro',
    'ChatGPT Semi Private',
    'Cousera Plus',
    'Grammarly',
    'Semrush',
    'Moz',
    'Ubersuggest',
    'Turnitin Student',
    'Turnitin Instructor',
    'Envato Elements',
    'Placeit',
    'Student Plan',
    'Blogging Plan',
    'Agency Plan',
    'Storyblocks',
  ];

  const totals = useMemo(() => {
    const summary = items.reduce(
      (acc, it) => {
        const sp = Number(it.sellingPrice || 0);
        const cp = Number(it.costPrice || 0);
        acc.totalSalesAmount += sp;
        acc.totalProfit += sp - cp;
        return acc;
      },
      { totalSalesAmount: 0, totalProfit: 0 }
    );
    return summary;
  }, [items]);

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, [field]: value } : it))
    );
  };

  const handleSave = async () => {
    try {
      if (!date) return toast.error('Please select a date');
  
      const cleaned = items.filter(it => it.productName.trim() !== '');
      if (cleaned.length === 0) return toast.error('Add at least one product');
  
      const sale = cleaned[0];
      const payload = {
        date,
        productName: sale.productName,
        sellingPrice: Number(sale.sellingPrice),
        costPrice: Number(sale.costPrice),
        profit: Number(sale.sellingPrice) - Number(sale.costPrice),
      };
  
      console.log('🟢 Payload being sent to API:', payload);
  
      setLoading(true); // ✅ start spinner
      await ApiService.createOrUpdateSale(payload);
      toast.success('Sale saved successfully');
      navigate('/admin/sales');
    } catch (e) {
      toast.error(e?.message || 'Failed to save sale');
    } finally {
      setLoading(false); // ✅ stop spinner even on error
    }
  };
  
  

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/sales")}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Sale
        </h1>
      </div>

      {/* Date Picker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Sale Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-25 py-2 text-left text-gray-700 font-medium">
                Product
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                Cost
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                Selling
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const sp = Number(it.sellingPrice || 0);
              const cp = Number(it.costPrice || 0);
              const profit = sp - cp;
              return (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <select
                      value={it.productName}
                      onChange={(e) =>
                        updateItem(idx, 'productName', e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-400 transition"
                    >
                      <option value="">Select product</option>
                      {productOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.costPrice}
                      onChange={(e) =>
                        updateItem(idx, 'costPrice', e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-24 sm:w-28 focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.sellingPrice}
                      onChange={(e) =>
                        updateItem(idx, 'sellingPrice', e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-24 sm:w-28 focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-800 font-medium">
                    {profit.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/*Total Calculations */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
        <div className="text-sm text-gray-700">
          <span className="mr-4">
            Total Sales:{' '}
            <strong className="text-gray-900">
              {totals.totalSalesAmount.toFixed(2)}
            </strong>
          </span>
          <span>
            Total Profit:{' '}
            <strong className="text-green-600">
              {totals.totalProfit.toFixed(2)}
            </strong>
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
      <button
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium text-white shadow-sm transition w-full sm:w-auto
            ${
              loading
                ? 'bg-blue-400 cursor-not-allowed opacity-80'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Sale</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

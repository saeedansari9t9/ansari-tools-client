import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ApiService from '../../services/api';

export default function AddSalePage() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();
  const [date, setDate] = useState(todayIso);
  const [items, setItems] = useState([
    { productName: '', sellingPrice: 0, costPrice: 0 },
  ]);

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

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      { productName: '', sellingPrice: 0, costPrice: 0 },
    ]);
  };

  const removeRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (!date) return toast.error('Please select a date');
      const cleaned = items
        .filter((it) => (it.productName || '').trim() !== '')
        .map((it) => ({
          productName: it.productName.trim(),
          sellingPrice: Number(it.sellingPrice),
          costPrice: Number(it.costPrice),
        }));
      if (cleaned.length === 0) return toast.error('Add at least one product');

      await ApiService.createOrUpdateSale({ date, items: cleaned });
      toast.success('Sale saved successfully');
      navigate('/admin/sales');
    } catch (e) {
      console.error(e);
      toast.error(e?.message || 'Failed to save sale');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
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
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
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
              <th className="px-4 py-2 text-right text-gray-700 font-medium">
                Action
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
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => removeRow(idx)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Row + Totals */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
        <button
          onClick={addRow}
          className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md transition text-sm font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </button>
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition w-full sm:w-auto"
        >
          Save Sale
        </button>
      </div>
    </div>
  );
}

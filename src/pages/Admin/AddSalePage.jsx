import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
        acc.totalProfit += (sp - cp);
        return acc;
      },
      { totalSalesAmount: 0, totalProfit: 0 }
    );
    return summary;
  }, [items]);

  const updateItem = (index, field, value) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  };

  const addRow = () => {
    setItems((prev) => [...prev, { productName: '', sellingPrice: 0, costPrice: 0 }]);
  };

  const removeRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      // Validate minimal required fields
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
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">Add Sale</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Product Name</th>
              <th className="px-4 py-2 text-left text-sm">Cost</th>
              <th className="px-4 py-2 text-left text-sm">Selling</th>
              <th className="px-4 py-2 text-left text-sm">Profit</th>
              <th className="px-4 py-2 text-right text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const sp = Number(it.sellingPrice || 0);
              const cp = Number(it.costPrice || 0);
              const profit = (sp - cp);
              return (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">
                    <select
                      value={it.productName}
                      onChange={(e) => updateItem(idx, 'productName', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select product</option>
                      {productOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.costPrice}
                      onChange={(e) => updateItem(idx, 'costPrice', e.target.value)}
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.sellingPrice}
                      onChange={(e) => updateItem(idx, 'sellingPrice', e.target.value)}
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">{profit.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => removeRow(idx)} className="text-red-600 text-sm">Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={addRow} className="bg-gray-100 px-4 py-2 rounded">Add Row</button>
        <div className="text-sm">
          <span className="mr-4">Total Sales: <strong>{totals.totalSalesAmount.toFixed(2)}</strong></span>
          <span>Total Profit: <strong>{totals.totalProfit.toFixed(2)}</strong></span>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
      </div>
    </div>
  );
}



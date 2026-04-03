import React from 'react';

export default function AdminDashboard() {
  // Data dummy agar tabel tidak kosong saat di-screenshot
  const transactions = [
    { id: 'GGS-VAL-001', target: 'RiotUser#SEA', product: '1000 VP', price: '108.500', status: 'Pending' },
    { id: 'GGS-ML-082', target: '12345678(2021)', product: '257 Diamonds', price: '62.000', status: 'Success' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-slate-900 text-gray-300 p-6 flex flex-col">
        <h1 className="text-2xl font-black text-white mb-10 tracking-tighter">
          GGS <span className="text-blue-500">ADMIN</span>
        </h1>
        
        <nav className="flex-1 space-y-2 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
             <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white font-bold">
             <span>Laporan Transaksi</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
             <span>Atur Produk (SKU)</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer text-yellow-500">
             <span>Koneksi API (Digiflazz)</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
             <span>Tiket Deposit</span>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <p className="text-xs text-gray-500">Logged in as:</p>
          <p className="text-sm font-medium text-white">Developer_Kingsstore</p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b p-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold italic">Monitoring Transaksi Real-time</h2>
          <div className="flex gap-4 items-center">
            {/* <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">API: Connected</span> */}
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">GG</div>
          </div>
        </header>

        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-sm text-gray-500 font-medium">Sukses Hari Ini</p>
              <h3 className="text-3xl font-bold">128</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <p className="text-sm text-gray-500 font-medium">Pending/Proses</p>
              <h3 className="text-3xl font-bold">5</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
              <p className="text-sm text-gray-500 font-medium">Gagal/Error</p>
              <h3 className="text-3xl font-bold">0</h3>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold">Daftar Penjualan Terakhir</h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">Lihat Semua</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500 font-bold">
                <tr>
                  <th className="p-4">Trx ID</th>
                  <th className="p-4">Tujuan (ID/User)</th>
                  <th className="p-4">Produk</th>
                  <th className="p-4">Harga Modal</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-blue-600">{trx.id}</td>
                    <td className="p-4 font-medium">{trx.target}</td>
                    <td className="p-4">{trx.product}</td>
                    <td className="p-4">Rp {trx.price}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        trx.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
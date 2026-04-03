// Contoh UI Dashboard Sederhana (Tailwind)
export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">GGS Admin</h1>
        <nav className="space-y-4">
          <div className="opacity-50">Dashboard</div>
          <div className="font-bold border-l-4 border-blue-500 pl-2">Laporan Transaksi</div>
          <div className="opacity-50">Atur Produk</div>
          <div className="opacity-50">Koneksi API</div>
          <div className="opacity-50">Tiket Deposit</div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Laporan Transaksi Prabayar</h2>
          <div className="flex gap-4">
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded">Sukses: 0</span>
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded">Gagal: 0</span>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded">Pending: 0</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center text-gray-400 border-dashed border-2">
          Belum ada data transaksi untuk hari ini.
        </div>
      </div>
    </div>
  );
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVipaymentSign } from '@/lib/vipayment';

export async function GET() {
  try {
    const sign = generateVipaymentSign();

    // TEMBAK KE ENDPOINT KHUSUS GAME
    const response = await fetch('https://vip-reseller.co.id/api/game-feature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        key: process.env.VIPAYMENT_API_KEY!,
        sign: sign,
        type: 'services'
      }),
    });

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data)) {
      return NextResponse.json({
        error: "Data tidak ditemukan atau format salah",
        detail: result
      }, { status: 500 });
    }

    let savedCount = 0;

    for (const item of result.data) {
      // 1. SATPAM DATA: Kita longgarkan sedikit. 
      // Yang penting ada 'code' (buat ID) dan 'name' (buat nama barang).
      if (!item.code || !item.name) {
        console.log("⚠️ Data beneran rusak (no code/name):", item.name || "Tanpa Nama");
        continue;
      }

      // 2. FALLBACK BRAND: Jika brand kosong, pakai category. Jika category kosong, pakai 'Lain-lain'.
      const rawBrand = item.brand || item.category || "General";
      const brandName = String(rawBrand).trim();
      const brandSlug = brandName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      // Ambil harga basic
      const cost = item.price?.basic || 0;
      if (cost === 0) continue;

      // 3. Sinkronisasi Kategori
      const category = await prisma.category.upsert({
        where: { slug: brandSlug },
        update: { name: brandName },
        create: {
          name: brandName,
          slug: brandSlug,
        },
      });

      // 4. Sinkronisasi Produk
      await prisma.product.upsert({
        where: { skuCode: String(item.code) },
        update: {
          name: item.name,
          priceCost: cost,
          priceSell: Math.ceil(cost * 1.05),
          isAvailable: item.status !== 'non-active' && item.status !== 'empty',
          supplierName: 'vipayment'
        },
        create: {
          skuCode: String(item.code),
          name: item.name,
          priceCost: cost,
          priceSell: Math.ceil(cost * 1.05),
          categoryId: category.id,
          isAvailable: true,
          supplierName: 'vipayment'
        },
      });

      console.log(`✅ Berhasil Simpan: [${brandName}] ${item.name}`);
      savedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Mantap, Bro! ${savedCount} produk game dari VIP Reseller berhasil masuk.`
    });

  } catch (error: any) {
    console.error("Error Sync:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
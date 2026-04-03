import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSignature } from '@/lib/digiflazz';

export async function GET() {
  try {
    const sign = generateSignature('pricelist'); // 'pricelist' adalah syarat dari Digiflazz

    const response = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'prepaid', // Kita ambil produk top-up (ML, Valorant, dll)
        username: process.env.DIGIFLAZZ_USERNAME,
        sign: sign
      }),
    });

    const result = await response.json();

    if (!result.data) {
      return NextResponse.json({ error: "Gagal ambil data", detail: result }, { status: 500 });
    }

    // Filter hanya produk kategori 'Games'
    const games = result.data.filter((item: any) => item.category === 'Games');

    for (const item of games) {
      // 1. Buat Kategori (Misal: Mobile Legends) jika belum ada
      const category = await prisma.category.upsert({
        where: { slug: item.brand.toLowerCase().replace(/ /g, '-') },
        update: {},
        create: {
          name: item.brand,
          slug: item.brand.toLowerCase().replace(/ /g, '-'),
        },
      });

      // 2. Simpan atau Update Produk (Upsert)
      await prisma.product.upsert({
        where: { skuCode: item.buyer_sku_code },
        update: {
          priceCost: item.price,
          priceSell: Math.ceil(item.price * 1.05), // Contoh: Ambil untung 5%
          isAvailable: item.buyer_product_status && item.seller_product_status,
        },
        create: {
          skuCode: item.buyer_sku_code,
          name: item.product_name,
          priceCost: item.price,
          priceSell: Math.ceil(item.price * 1.05), // Pembulatan ke atas
          categoryId: category.id,
          isAvailable: true,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil sinkronisasi ${games.length} produk!` 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
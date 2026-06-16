import { createClient } from '@libsql/client';
async function main() {
  const c = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const rs = await c.execute(
    `SELECT DISTINCT url FROM media_files WHERE url LIKE '%img.gozhumeng.com%' ORDER BY url`
  );
  const allUrls: string[] = rs.rows.map((r) => r['url'] as string);
  const allNames: string[] = allUrls.map((u) => u.replace('https://img.gozhumeng.com/', ''));
  
  // Manual map: static name -> R2 file that exists
  const MAP: Record<string, string> = {};
  
  // Helper: find latest by timestamp
  function findLatest(partial: string): string {
    const matches = allNames.filter((n) => n.includes(partial));
    if (matches.length === 0) return '';
    matches.sort();
    return matches[matches.length - 1];
  }
  
  // --- imageSlotsData.ts ---
  MAP['hero_bg'] = findLatest('sample-display-showroom') || '##MISSING##';
  MAP['vanguard_video'] = findLatest('production-facility-capability.mp4') || '##MISSING##';
  MAP['hub_video_poster'] = findLatest('entrance-facility.webp') || '##MISSING##';
  MAP['hub_video'] = findLatest('qc-inspection.mp4') || '##MISSING##';
  MAP['gallery_1'] = findLatest('printing-machine-scaled') || findLatest('printing-machine.webp') || '##MISSING##';
  MAP['gallery_2'] = findLatest('Warehouse_Global') || '##MISSING##';
  MAP['gallery_3'] = findLatest('Logistics_High-Volume') || '##MISSING##';
  MAP['gallery_4'] = findLatest('Team_Behind') || '##MISSING##';
  MAP['products_cat_0'] = findLatest('food-beverage-honey-coffee') || findLatest('food-beverage-honey-coffee') || '##MISSING##';
  MAP['products_cat_1'] = findLatest('cosmetic-personal-care') || '##MISSING##';
  MAP['products_cat_2'] = findLatest('industrial-logistics') || '##MISSING##';
  MAP['products_cat_3'] = findLatest('eco-friendly-bpa-free') || '##MISSING##';
  MAP['products_cat_4'] = findLatest('luxury-gold-foil') || '##MISSING##';
  MAP['certifications_img'] = findLatest('certifications-iso-fda') || '##MISSING##';
  MAP['logistics_intro_img'] = findLatest('Logistics_High-Volume') || '##MISSING##';
  
  // --- productsData.ts items ---
  MAP['food-main'] = findLatest('food-beverage-honey-coffee') || '##MISSING##';
  MAP['food-honey'] = findLatest('honey-jar-labels-custom') || '##MISSING##';
  MAP['food-jam'] = findLatest('waterproof-jam-sauce') || '##MISSING##';
  MAP['food-wine'] = findLatest('premium-wine-beverage') || '##MISSING##';
  MAP['food-canning'] = findLatest('canning-pickle-jar') || '##MISSING##';
  MAP['food-mason'] = findLatest('mason-jar-labels-food') || '##MISSING##';
  
  MAP['cosmetic-main'] = findLatest('cosmetic-personal-care') || findLatest('cosmetic-personal-care') || '##MISSING##';
  MAP['cosmetic-skin'] = findLatest('skin-care-cream') || '##MISSING##';
  MAP['cosmetic-oil'] = findLatest('oil-proof-essential') || '##MISSING##';
  MAP['cosmetic-shampoo'] = findLatest('shampoo-body-wash') || '##MISSING##';
  MAP['cosmetic-perfume'] = findLatest('perfume-bottle-labels-premium') || '##MISSING##';
  MAP['cosmetic-lip'] = findLatest('lip-balm-stickers') || '##MISSING##';
  
  MAP['industrial-main'] = findLatest('industrial-logistics') || '##MISSING##';
  MAP['industrial-shipping'] = findLatest('direct-thermal-shipping') || '##MISSING##';
  MAP['industrial-barcode'] = findLatest('barcode-inventory-roll-stickers.jpg') || findLatest('barcode-inventory-roll') || '##MISSING##';
  MAP['industrial-thankyou'] = findLatest('wholesale-thank-you') || '##MISSING##';
  MAP['industrial-security'] = findLatest('tamper-evident-seal') || '##MISSING##';
  MAP['industrial-thermal'] = findLatest('high-speed-logistics-rolls') || '##MISSING##';
  
  MAP['eco-main'] = findLatest('eco-friendly-bpa-free') || '##MISSING##';
  MAP['eco-freezer'] = findLatest('freezer-labels-cold') || findLatest('freezer-labels-cold') || '##MISSING##';
  MAP['eco-vinyl'] = findLatest('waterproof-oil-proof-industrial') || '##MISSING##';
  MAP['eco-hightemp'] = findLatest('high-temperature-resistant') || '##MISSING##';
  MAP['eco-adhesion'] = findLatest('strong-adhesive-labels') || '##MISSING##';
  MAP['eco-solvent'] = findLatest('chemical-solvent-resistant') || '##MISSING##';
  
  MAP['luxury-main'] = findLatest('luxury-gold-foil') || '##MISSING##';
  MAP['luxury-gold'] = findLatest('gold-foil-stamped') || '##MISSING##';
  MAP['luxury-embossed'] = findLatest('3d-embossed-textured') || findLatest('3d-embossed-textured') || '##MISSING##';
  MAP['luxury-clear'] = findLatest('clear-no-label-look') || '##MISSING##';
  MAP['luxury-kraft'] = findLatest('rustic-brown-kraft') || '##MISSING##';
  MAP['luxury-spotuv'] = findLatest('spot-uv-gloss-matte') || '##MISSING##';

  for (const [key, value] of Object.entries(MAP)) {
    if (value.startsWith('##')) {
      console.log(`${key}: NOT FOUND`);
    } else {
      console.log(`${key}: https://img.gozhumeng.com/${value}`);
    }
  }
  c.close();
}
main().catch(e => { console.error(e); process.exit(1); });
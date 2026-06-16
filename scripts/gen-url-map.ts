/**
 * Generate URL mapping: static filenames → R2 filename (latest version).
 * Finds the most recent upload for each static image name.
 */
import { createClient } from '@libsql/client';

// Static images used by productsData.ts and imageSlotsData.ts (without time prefix)
const NEEDED_FILES = [
  // imageSlotsData.ts
  'zhixin-paper-custom-label-rolls-sample-display-showroom.webp',
  'zhixin-paper-label-factory-production-facility-capability.mp4',
  'zhixin-paper-label-factory-entrance-facility.webp',
  'zxpapers-automated-label-manufacturing-and-qc-inspection.mp4',
  'zhixin-paper-high-speed-multi-color-label-printing-machine-scaled.webp',
  'Large-Scale-Inventory-Efficient-Warehouse-for-Global-Supply-Chain-Stability.jpg',
  'Reliable-Global-Shipping-Bulk-Logistics-for-High-Volume-Label-Orders.webp',
  'The-Professional-Team-Behind-Zhixin-Paper-ZXPapers-Label-Manufacturing.webp',
  'zhixin-paper-food-beverage-honey-coffee-jar-labels.webp',
  'zhixin-paper-cosmetic-personal-care-labels-alcohol-wipes.webp',
  'zhixin-paper-industrial-logistics-colored-thermal-roll-labels.webp',
  'zhixin-paper-eco-friendly-bpa-free-fsc-certified-labels.webp',
  'zhixin-paper-luxury-gold-foil-thank-you-custom-labels.webp',
  'zhixin-paper-factory-certifications-iso-fda-fsc-sgs.webp',
  // productsData.ts (subset - name variations exist)
  'honey-jar-labels-custom-gold-foil.webp',
  'waterproof-jam-sauce-jar-stickers.webp',
  'premium-wine-beverage-bottle-labels.webp',
  'canning-pickle-jar-labels-food-grade.webp',
  'mason-jar-labels-food-grade-stickers.webp',
  'luxury-skin-care-cream-jar-labels.webp',
  'oill-proof-essential-oil-bottle-labels.webp',
  'shampoo-body-wash-bottle-labels.webp',
  'perfume-bottle-labels-premium-finish.webp',
  'cosmetic-jar-labels-lip-balm-stickers.webp',
  'direct-thermal-shipping-labels-rolls.webp',
  'barcode-inventory-roll-stickers.jpg',
  'wholesale-thank-you-labels-bulk-rolls.webp',
  'tamper-evident-seal-labels-packaging.webp',
  'freezer-labels-cold-storage-minus-20.webp',
  'waterproof-oil-proof-industrial-labels.webp',
  'high-temperature-resistant-labels.webp',
  'strong-adhesive-labels-rough-surfaces.webp',
  'chemical-solvent-resistant-labels.webp',
  'gold-foil-stamped-metallic-labels.webp',
  '3d-embossed-textured-paper-labels.jpg',
  'clear-no-label-look-pet-stickers.webp',
  'rustic-brown-kraft-paper-labels-eco-friendly.webp',
  'spot-uv-gloss-matte-finish-labels.webp',
  'barcode-inventory-roll-stickers-scaled.webp',
  'direct-thermal-labels-high-speed-logistics-rolls.webp',
  'zhixin-paper-food-beverage-honey-coffee-jar-labels.webp',
  'zhixin-paper-cosmetic-personal-care-labels-alcohol-wipes.webp',
  'zhixin-paper-industrial-logistics-colored-thermal-roll-labels.webp',
  'zhixin-paper-luxury-gold-foil-thank-you-custom-labels.webp',
  'zhixin-paper-factory-certifications-iso-fda-fsc-sgs.webp',
];
async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const c = createClient({ url, authToken });
  const rs = await c.execute('SELECT url FROM media_files ORDER BY url');
  const allR2Files: string[] = rs.rows.map(r => (r['url'] as string).replace('https://img.gozhumeng.com/', ''));

  // For each NEEDED file, find the R2 file that ends with it
  for (const needed of NEEDED_FILES) {
    // Try normalized: replace space-like chars
    const matching = allR2Files.filter(f => f.endsWith(needed));
    if (matching.length > 0) {
      // Pick the last one (latest timestamp)
      const chosen = matching[matching.length - 1];
      console.log(`https://img.gozhumeng.com/${chosen}`);
    } else {
      console.log(`# NOT FOUND: ${needed}`);
    }
  }
  c.close();
}
main().catch(e => { console.error(e); process.exit(1); });
import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('src/lib/productsData.ts', 'utf-8');

// Manual mapping: static filename -> R2 filename (latest version from Turso)
const MAP: Record<string, string> = {
  'R2PLACEHOLDER_zhixin-paper-food-beverage-honey-coffee-jar-labels.webp': 'https://img.gozhumeng.com/1781514521495-zhixin-paper-food-beverage-honey-coffee-jar-labels.webp',
  'R2PLACEHOLDER_zhixin-paper-cosmetic-personal-care-labels-alcohol-wipes.webp': 'https://img.gozhumeng.com/1781514501979-zhixin-paper-cosmetic-personal-care-labels-alcohol-wipes.webp',
  'R2PLACEHOLDER_zhixin-paper-industrial-logistics-colored-thermal-roll-labels.webp': 'https://img.gozhumeng.com/1781514534172-zhixin-paper-industrial-logistics-colored-thermal-roll-labels.webp',
  'R2PLACEHOLDER_zhixin-paper-eco-friendly-bpa-free-fsc-certified-labels.webp': 'https://img.gozhumeng.com/1781514507808-zhixin-paper-eco-friendly-bpa-free-fsc-certified-labels.webp',
  'R2PLACEHOLDER_zhixin-paper-luxury-gold-foil-thank-you-custom-labels.webp': 'https://img.gozhumeng.com/1781514545415-zhixin-paper-luxury-gold-foil-thank-you-custom-labels.webp',
  // Food & Beverage
  'R2PLACEHOLDER_honey-jar-labels-custom-gold-foil.webp': 'https://img.gozhumeng.com/1781514351209-honey-jar-labels-custom-gold-foil.webp',
  'R2PLACEHOLDER_waterproof-jam-sauce-jar-stickers.webp': 'https://img.gozhumeng.com/1781514471480-waterproof-jam-sauce-jar-stickers.webp',
  'R2PLACEHOLDER_premium-wine-beverage-bottle-labels.webp': 'https://img.gozhumeng.com/1781514395053-premium-wine-beverage-bottle-labels.webp',
  'R2PLACEHOLDER_canning-pickle-jar-labels-food-grade.webp': 'https://img.gozhumeng.com/1781514294501-canning-pickle-jar-labels-food-grade.webp',
  'R2PLACEHOLDER_mason-jar-labels-food-grade-stickers.webp': 'https://img.gozhumeng.com/1781514368796-mason-jar-labels-food-grade-stickers.webp',
  // Personal Care
  'R2PLACEHOLDER_luxury-skin-care-cream-jar-labels.webp': 'https://img.gozhumeng.com/1781514362171-luxury-skin-care-cream-jar-labels.webp',
  'R2PLACEHOLDER_oil-proof-essential-oil-bottle-labels.webp': 'https://img.gozhumeng.com/1781514373633-oil-proof-essential-oil-bottle-labels.webp',
  'R2PLACEHOLDER_shampoo-body-wash-bottle-labels.webp': 'https://img.gozhumeng.com/1781514434890-shampoo-body-wash-bottle-labels.webp',
  'R2PLACEHOLDER_perfume-bottle-labels-premium-finish.webp': 'https://img.gozhumeng.com/1781514381685-perfume-bottle-labels-premium-finish.webp',
  'R2PLACEHOLDER_cosmetic-jar-labels-lip-balm-stickers.webp': 'https://img.gozhumeng.com/1781514313109-cosmetic-jar-labels-lip-balm-stickers.webp',
  // Industrial
  'R2PLACEHOLDER_dirct-thermal-shipping-labels-rolls.webp': 'https://img.gozhumeng.com/1781514328625-direct-thermal-shipping-labels-rolls.webp',
  'R2PLACEHOLDER_barcode-inventory-roll-stickers-scaled.webp': 'https://img.gozhumeng.com/1781514288218-barcode-inventory-roll-stickers.jpg',
  'R2PLACEHOLDER_wholesale-thank-you-labels-bulk-rolls.webp': 'https://img.gozhumeng.com/1781514484663-wholesale-thank-you-labels-bulk-rolls.webp',
  'R2PLACEHOLDER_tamper-evident-seal-labels-packaging.webp': 'https://img.gozhumeng.com/1781514453940-tamper-evident-seal-labels-packaging.webp',
  'R2PLACEHOLDER_direct-thermal-labels-high-speed-logistics-rolls.webp': 'https://img.gozhumeng.com/1781593137523-direct-thermal-labels-high-speed-logistics-rolls.webp',  // Safety & Eco
  'R2PLACEHOLDER_freezer-labels-cold-storage-minus-20.webp': 'https://img.gozhumeng.com/1781514333688-freezer-labels-cold-storage-minus-20.webp',
  'R2PLACEHOLDER_waterproof-oil-proof-industrial-labels.webp': 'https://img.gozhumeng.com/1781514477385-waterproof-oil-proof-industrial-labels.webp',
  'R2PLACEHOLDER_high-temperature-resistant-labels.webp': 'https://img.gozhumeng.com/1781514346320-high-temperature-resistant-labels.webp',
  'R2PLACEHOLDER_strong-adhesive-labels-rough-surfaces.webp': 'https://img.gozhumeng.com/1781514449220-strong-adhesive-labels-rough-surfaces.webp',
  'R2PLACEHOLDER_chemical-solvent-resistant-labels.webp': 'https://img.gozhumeng.com/1781514300707-chemical-solvent-resistant-labels.webp',
  // Luxury
  'R2PLACEHOLDER_gold-foil-stamped-metallic-labels.webp': 'https://img.gozhumeng.com/1781514340002-gold-foil-stamped-metallic-labels.webp',
  'R2PLACEHOLDER_3d-embossed-textured-paper-labels.webp': 'https://img.gozhumeng.com/1781593706781-3d-embossed-textured-paper-labels.jpg',
  'R2PLACEHOLDER_clear-no-label-look-pet-stickers.webp': 'https://img.gozhumeng.com/1781514304992-clear-no-label-look-pet-stickers.webp',
  'R2PLACEHOLDER_rustic-brown-kraft-paper-labels-eco-friendly.webp': 'https://img.gozhumeng.com/1781514416936-rustic-brown-kraft-paper-labels-eco-friendly.webp',
  'R2PLACEHOLDER_spot-uv-gloss-matte-finish-labels.webp': 'https://img.gozhumeng.com/1781514441161-spot-uv-gloss-matte-finish-labels.webp',
};

let result = content;
let count = 0;
for (const [placeholder, url] of Object.entries(MAP)) {
  if (result.includes(placeholder)) {
    result = result.replaceAll(placeholder, url);
    count++;
  }
}
writeFileSync('src/lib/productsData.ts', result, 'utf-8');
console.log(`Replaced ${count} placeholders.`);
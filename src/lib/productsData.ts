export interface ProductItem {
  title: string;
  desc: string;
  longDesc: string;
  img: string;
}

export interface ProductCategory {
  category: string;
  tagline: string;
  mainImg: string;
  items: ProductItem[];
}

export const DEFAULT_PRODUCTS: ProductCategory[] = [
  {
    category: "Food & Beverage Jars",
    tagline: "High-Stability Solutions for FDA Compliance",
    mainImg: "https://img.gozhumeng.com/1781514521495-zhixin-paper-food-beverage-honey-coffee-jar-labels.webp",
    items: [
      { title: "Honey Jar Labels", desc: "Food-safe adhesives for honey jars.", longDesc: `Craft
Multi-color flexographic printing on coated paper or BOPP film with precision rotary die-cutting (+/-0.15mm). Optional hot foil stamping in gold or silver with gloss/matte varnish overcoat.

Function
Food-safe permanent acrylic adhesive bonds firmly to glass jars in humid conditions. Odorless, non-toxic, and FDA 21 CFR 175.105 compliant. Labels stay wrinkle-free from filling line to shelf.

Specifications
- Material: Coated art paper (80gsm) or white BOPP film (50 micron)
- Adhesive: Permanent acrylic, food-grade
- Temperature: -5 C to +60 C
- Certifications: FDA, ISO 9001, FSC`, img: "https://img.gozhumeng.com/1781514351209-honey-jar-labels-custom-gold-foil.webp" },
      { title: "Jam & Sauce Labels", desc: "Moisture-resistant for refrigeration.", longDesc: `Craft
8-color UV flexo printing with water-resistant thermal laminate on coated paper or PP film. Sealed barrier prevents ink bleed and peeling during refrigeration.

Function
Survives months of cold storage and freeze-thaw cycling. Condensation-proof for jars moving between temperatures. Ideal for jams, sauces, and ready-to-eat spreads.

Specifications
- Material: Coated paper + waterproof laminate, or white PP film
- Adhesive: Freezer-grade acrylic (-20 C to +80 C)
- Printing: UV flexography, up to 8 colors
- Certifications: FDA, BPA-free, FSC`, img: "https://img.gozhumeng.com/1781514471480-waterproof-jam-sauce-jar-stickers.webp" },
      { title: "Wine Labels", desc: "Textured papers for ice buckets.", longDesc: `Craft
Premium uncoated textured papers (estate laid, cotton felt, linen-weave) with letterpress or embossing. Gold/silver/copper foil hot stamping with moisture-barrier topcoat.

Function
Maintains elegance under harsh serving conditions. Water-resistant barrier prevents peeling during 2+ hours of ice bucket submersion. Compatible with hand and automated application.

Specifications
- Material: Estate laid / cotton felt / linen-weave (90-120gsm)
- Adhesive: Permanent acrylic, ice-water resistant
- Techniques: Foil stamping, embossing, letterpress
- Certifications: FSC, ISO 9001`, img: "https://img.gozhumeng.com/1781514395053-premium-wine-beverage-bottle-labels.webp" },
      { title: "Canning Labels", desc: "Food-grade security for pickles.", longDesc: `Craft
Coated paper or synthetic substrate with heat-resistant laminate. Precision rotary die-cut (0.1mm tolerance). Cross-linked adhesive system for hot-fill and pasteurization processes.

Function
Withstands hot-fill up to 90 C, steam retort sterilization, and acidic environments. Resists edge-lift from brine, vinegar, and oil. Keeps brand presentation intact from production to pantry.

Specifications
- Material: Coated paper (80gsm) or white BOPP (50 micron)
- Adhesive: Heat-resistant cross-linked acrylic
- Temperature: -10 C to +90 C (hot-fill rated)
- Certifications: FDA 21 CFR 175.105, FSC`, img: "https://img.gozhumeng.com/1781514294501-canning-pickle-jar-labels-food-grade.webp" },
      { title: "Mason Jar Stickers", desc: "Artisanal stickers for storage.", longDesc: `Craft
Premium matte or kraft paper with soy-based inks. Custom die-cut shapes (circles, ovals, hexagons) via laser or rotary tooling. Writable matte topcoat for hand-labeling. Kiss-cut on rolls or sheets.

Function
Bonds to glass, threaded metal lids, and BPA-free plastic caps. Removable adhesive option for clean repositioning. Ideal for canning, pantry organization, wedding favors, and farm-stand products.

Specifications
- Material: Matte art paper, kraft paper, or writable stock
- Adhesive: Removable or permanent acrylic
- Shapes: Custom die-cut (circle, oval, hex, arch)
- Certifications: FDA, FSC, soy-ink printed`, img: "https://img.gozhumeng.com/1781514368796-mason-jar-labels-food-grade-stickers.webp" }
    ]
  },
  {
    category: "Personal Care & Health",
    tagline: "Aesthetic Integrity meets Durability",
    mainImg: "https://img.gozhumeng.com/1781514501979-zhixin-paper-cosmetic-personal-care-labels-alcohol-wipes.webp",
    items: [
      { title: "Skin Care Labels", desc: "Luxury soft-touch finishes.", longDesc: `Craft
UV flexographic or digital HP Indigo on matte art paper, pearlescent film, or white BOPP. Soft-touch velvet laminate creates a suede-like texture. Optional hot foil, raised spot UV, and sculptured embossing.

Function
Elevates unboxing experience while resisting fingerprints and oil smudges. Adheres to glass jars, acrylic bottles, airless pumps, and tubes even in humid bathroom conditions.

Specifications
- Material: Matte art paper / pearlescent BOPP / white PP (50-80 micron)
- Adhesive: Permanent acrylic, cosmetic-grade
- Finish: Soft-touch velvet laminate, optional foil/spot UV
- Certifications: REACH, RoHS`, img: "https://img.gozhumeng.com/1781514362171-luxury-skin-care-cream-jar-labels.webp" },
      { title: "Essential Oil Tags", desc: "100% oil-proof synthetic material.", longDesc: `Craft
Oil-proof white PP/PET composite film with UV-curable inks. Specially formulated oil-tolerant acrylic adhesive maintains bond after direct contact with undiluted essential oils.

Function
Unlike paper labels that disintegrate from oil drips, our film prevents staining and delamination. Stays pristine on 5ml to 100ml dropper bottles and roller vials throughout the product shelf life.

Specifications
- Material: Oil-proof white PP/PET composite film (50 micron)
- Adhesive: Oil-tolerant permanent acrylic
- Oil Resistance: 168+ hours direct contact, no degradation
- Certifications: REACH, RoHS, BPA-free`, img: "https://img.gozhumeng.com/1781514373633-oil-proof-essential-oil-bottle-labels.webp" },
      { title: "Shampoo Labels", desc: "Flexible PE for squeeze bottles.", longDesc: `Craft
Reverse-printed conformable PE film by UV flexography. Ink layer sandwiched between film and adhesive for 100% waterproofing. PE engineered for high elasticity with stretch and recovery.

Function
Flexes with the bottle when squeezed - no wrinkling or peeling. Up to 200% elastic stretch. Perfect for body wash, conditioner, lotion, and gel packaging in shower environments.

Specifications
- Material: Conformable white/clear PE film (80-100 micron)
- Adhesive: Waterproof permanent acrylic
- Elasticity: Up to 200% stretch and recovery
- Certifications: REACH, RoHS, BPA-free`, img: "https://img.gozhumeng.com/1781514434890-shampoo-body-wash-bottle-labels.webp" },
      { title: "Perfume Labels", desc: "Invisible no-label look on glass.", longDesc: `Craft
Ultra-transparent PET film with crystal-clear adhesive eliminating haze on glass. Reverse-print UV flexography with flood white backing creates floating graphics with no visible label edge.

Function
Premium "no-label" aesthetic where only the design is visible. Bonds to curved, faceted, and cylindrical glass bottles. No yellowing or edge lift after years of shelf display.

Specifications
- Material: Ultra-clear PET film (36-50 micron)
- Adhesive: Crystal-clear permanent acrylic (90%+ light transmission)
- Printing: Reverse-print + flood white, up to 8 colors
- Certifications: REACH, RoHS`, img: "https://img.gozhumeng.com/1781514381685-perfume-bottle-labels-premium-finish.webp" },
      { title: "Lip Balm Stickers", desc: "Micro-die-cut for tiny tubes.", longDesc: `Craft
High-precision rotary die-cutting with +/-0.1mm tolerance for labels as small as 15mm x 40mm. Flexible white BOPP with soft-touch or gloss laminate. Kiss-cut for easy peeling.

Function
Wraps 360 degrees around tubes as narrow as 12mm diameter with perfect edge alignment. Flexible film conforms to curves without lifting. Stays put through pocket friction.

Specifications
- Material: Flexible white BOPP (50 micron)
- Adhesive: Permanent acrylic, clean-removable option
- Cutting Tolerance: +/-0.1mm, kiss-cut
- Minimal Size: 15mm x 40mm
- Certifications: FDA, REACH, BPA-free`, img: "https://img.gozhumeng.com/1781514313109-cosmetic-jar-labels-lip-balm-stickers.webp" }
    ]
  },
  {
    category: "Industrial & Logistics",
    tagline: "High-Speed Efficiency Rolls",
    mainImg: "https://img.gozhumeng.com/1781514534172-zhixin-paper-industrial-logistics-colored-thermal-roll-labels.webp",
    items: [
      { title: "Shipping Labels", desc: "Direct thermal for 100% scan rates.", longDesc: `Craft
High-sensitivity direct thermal paper with chemical coating that darkens precisely under heat - no ink or ribbon needed. Cleanroom slot-die coating for uniform response. Precision slit with controlled tension winding.

Function
Optimized for Zebra, SATO, TSC, and Honeywell printers at up to 12 ips. 100% first-pass scan rates with ANSI Grade A/B verification. Gap, black mark, or continuous sensor formats.

Specifications
- Material: Direct thermal paper (70-80gsm)
- Image Durability: 5+ years dark storage, 1+ year indoor
- Core Size: 25mm, 40mm, 76mm (1in, 1.5in, 3in)
- Roll OD: Up to 250mm (10in)
- Certifications: BPA-free, RoHS`, img: "https://img.gozhumeng.com/1781514328625-direct-thermal-shipping-labels-rolls.webp" },
      { title: "Barcode Stickers", desc: "High-contrast for inventory tracking.", longDesc: `Craft
Semi-gloss or matte coated paper with resin-enhanced thermal transfer ribbon. 80+ brightness white point for razor-sharp barcode edges. Also available as direct thermal.

Function
ANSI Grade A barcodes for instant scanning at extended distances. Resistant to smudging, abrasion, and light moisture. Built for conveyor systems and warehouse handling.

Specifications
- Material: Semi-gloss coated paper (70gsm) or white PP
- Printing: Thermal transfer (resin ribbon) or direct thermal
- Contrast: Over 90% ANSI barcode contrast signal (BCS)
- Adhesive: Permanent acrylic or rubber-based
- Certifications: RoHS, BPA-free (thermal options)`, img: "https://img.gozhumeng.com/1781514288218-barcode-inventory-roll-stickers.jpg" },
      { title: "Thank You Rolls", desc: "Branded stickers for e-commerce.", longDesc: `Craft
Full-color UV flexo on gloss art paper or white BOPP (up to 8 colors). Custom die-cut shapes (circles, hearts, logo contours). Gloss or matte over-laminate. Wound on 76mm (3in) cores.

Function
Adds brand personality to every shipment at packing speed. Optimized for high-throughput e-commerce lines - one sticker every 2-3 seconds. Builds loyalty and encourages social sharing.

Specifications
- Material: Gloss art paper / white BOPP (50-80 micron)
- Adhesive: Permanent acrylic
- Shapes: Custom die-cut (circle, heart, logo contour)
- Roll Core: 76mm (3in), up to 250mm OD
- Certifications: FSC (paper), BPA-free`, img: "https://img.gozhumeng.com/1781514484663-wholesale-thank-you-labels-bulk-rolls.webp" },
      { title: "Security Seals", desc: "Tamper-evident box security.", longDesc: `Craft
Multi-layer voiding film with custom security pattern printing. Frangible VOID layer permanently activates on attempted removal - leaves visible tamper evidence on both label and substrate. Optional UV-fluorescent fibers.

Function
Irreversible tamper evidence for high-value shipments, pharmaceutical distribution, and electronics packaging. Serialization supports chain-of-custody tracking and audit compliance.

Specifications
- Material: Multi-layer voiding PET or vinyl film
- Tamper Evidence: Permanent VOID pattern on both surfaces
- Customization: Serial numbers, barcodes, QR codes, holographic
- Adhesive: Ultra-high-tack permanent, destroys on removal
- Certifications: ISO 9001, RoHS`, img: "https://img.gozhumeng.com/1781514453940-tamper-evident-seal-labels-packaging.webp" },
      { title: "Thermal Labels", desc: "Fast-print rolls for barcode and shipping systems.", longDesc: `Craft
High-sensitivity direct thermal face stock engineered for stable, ribbon-free printing. Clean slit edges and balanced winding tension help maintain smooth dispensing on automatic labeling and logistics printing lines. Optional top-coated construction improves resistance to scratching, smudging, and light moisture exposure.

Function
Supports high-speed label output for shipping labels, barcode stickers, warehouse identification, carton tracking, and inventory control. Produces dark, readable images with strong scan performance, helping reduce print interruptions and improve workflow efficiency across retail and industrial environments.

Specifications
- Material: Direct thermal paper or synthetic thermal facestock
- Printing: Direct thermal, no ribbon required
- Surface: Standard or top-coated thermal finish
- Core Size: 25mm / 40mm / 76mm
- Roll OD: Customized for desktop and industrial printers
- Use Cases: Shipping, warehousing, inventory, barcode, express logistics
- Certifications: BPA-free options, RoHS, ISO 9001`, img: "https://img.gozhumeng.com/1781593137523-direct-thermal-labels-high-speed-logistics-rolls.webp" }
    ]
  },
  {
    category: "Safety & Eco-Certified",
    tagline: "Compliance First Sustainability",
    mainImg: "https://img.gozhumeng.com/1781514507808-zhixin-paper-eco-friendly-bpa-free-fsc-certified-labels.webp",
    items: [
      { title: "Freezer Labels", desc: "Bond instantly to frozen plastic.", longDesc: `Craft
Cryogenic-grade white BOPP or polyester film with sub-zero acrylic adhesive system. Low-Tg polymer formulation stays flexible where standard adhesives crystallize. Moisture-barrier overcoat prevents ice crystal damage.

Function
Bonds aggressively to frozen glass, plastic, and metal at -40 C without pre-warming. No surface preparation needed. Ideal for frozen foods, biomedical samples, and cold-chain logistics.

Specifications
- Material: White BOPP or polyester film (50-80 micron)
- Adhesive: Cryogenic acrylic, bonds at -20 C to -40 C
- Service Temperature: -40 C to +80 C
- Certifications: FDA (indirect food contact), BPA-free`, img: "https://img.gozhumeng.com/1781514333688-freezer-labels-cold-storage-minus-20.webp" },
      { title: "Industrial Vinyl", desc: "Heavy-duty equipment shields.", longDesc: `Craft
Cast or calendered PVC vinyl (80-120 micron) with UV-curable or solvent-based inks. UV-absorbing clear laminate provides 3-7 years outdoor weatherability. Custom die-cut shapes up to 600mm wide.

Function
Permanent identification for equipment, machinery, and vehicles exposed to sun, rain, oil, and chemicals. Conforms to riveted and curved metal. Withstands power-washing and fuel splash.

Specifications
- Material: Cast/calendered PVC vinyl (80-120 micron)
- Adhesive: High-tack permanent acrylic
- Outdoor Life: 3-7 years UV resistance
- Temperature: -30 C to +100 C
- Certifications: RoHS, UL recognized (optional)`, img: "https://img.gozhumeng.com/1781514477385-waterproof-oil-proof-industrial-labels.webp" },
      { title: "High-Temp Labels", desc: "Heat stable for PCB tracking.", longDesc: `Craft
Polyimide (Kapton) film with high-temp acrylic or silicone adhesive. Thermal transfer with specialized resin ribbon curing at elevated temperatures. Anti-static treatment prevents ESD damage.

Function
Maintains stability through solder reflow (260 C+), wave soldering, and powder coating bake cycles. Used for PCB serial tracking, automotive under-hood labeling, and aerospace traceability.

Specifications
- Material: Polyimide (Kapton) film (25-50 micron)
- Adhesive: Silicone or high-temp acrylic
- Temperature: -40 C to +260 C continuous, +300 C peak
- ESD: Anti-static treated (optional)
- Certifications: UL recognized, RoHS, halogen-free`, img: "https://img.gozhumeng.com/1781514346320-high-temperature-resistant-labels.webp" },
      { title: "Strong Adhesion", desc: "Designed for rough metal textures.", longDesc: `Craft
Heavy-coat (30-40 g/m2) high-tack rubber-based or modified acrylic adhesive via slot-die coating. Flows into microscopic surface roughness. Conformable PE or vinyl face stock molds to irregular contours.

Function
Fills surface irregularities at the microscopic level, creating mechanical interlock on sand-cast metals, diamond-plate aluminum, powder coating, HDPE drums, and woven polypropylene bags.

Specifications
- Material: Conformable PE or PVC vinyl (80-150 micron)
- Adhesive: High-tack rubber or modified acrylic (30-40 g/m2)
- Substrates: Rough metal, textured plastic, PP, PE, powder coat
- Temperature: -20 C to +120 C
- Certifications: RoHS, REACH`, img: "https://img.gozhumeng.com/1781514449220-strong-adhesive-labels-rough-surfaces.webp" },
      { title: "Solvent Resistant", desc: "Lab-grade drum resistance.", longDesc: `Craft
Chemically inert polyester (PET) film with UV-cured or resin inks. Cross-linked UV-cured varnish topcoat creates molecular barrier. Cross-linked acrylic adhesive resists hydrocarbons, alcohols, acids, and alkalis.

Function
Maintains full adhesion and legibility after prolonged immersion in IPA, acetone, xylene, MEK, diesel fuel, and lab reagents. Essential for chemical drums, labware, and industrial fluid containers.

Specifications
- Material: Chemically inert PET film (50-100 micron)
- Adhesive: Cross-linked acrylic, solvent-resistant
- Chemical Resistance: IPA, acetone, MEK, fuels, pH 2-12
- Temperature: -20 C to +120 C
- Certifications: BS 5609 (marine chemical drum), GHS compliant`, img: "https://img.gozhumeng.com/1781514300707-chemical-solvent-resistant-labels.webp" }
    ]
  },
  {
    category: "Luxury & Custom Craft",
    tagline: "Premium Visual Differentiation",
    mainImg: "https://img.gozhumeng.com/1781514545415-zhixin-paper-luxury-gold-foil-thank-you-custom-labels.webp",
    items: [
      { title: "Gold Foil Stamp", desc: "3D metallic finish for luxury.", longDesc: `Craft
Heated brass or magnesium die transfers metallic foil under controlled temperature (110-150 C), pressure (2-5 tons), and dwell. 24K gold, silver, copper, rose gold, and holographic foils. True 3D debossed metallic surface at 0.1-0.3mm depth.

Function
Communicates luxury and prestige beyond flat metallic ink. Tactile reflective surface grabs attention on crowded shelves. Ideal for premium spirits, cosmetics, and high-end packaging.

Specifications
- Process: Hot stamping with brass/magnesium die
- Foil Types: Gold, silver, copper, rose gold, holographic
- Depth: 0.1-0.3mm 3D deboss
- Substrates: Coated paper, uncoated textured, BOPP, PET
- Certifications: ISO 9001, FSC (paper)`, img: "https://img.gozhumeng.com/1781514340002-gold-foil-stamped-metallic-labels.webp" },
      { title: "3D Embossed Tags", desc: "Raised tactile depth for wine branding.", longDesc: `Craft
Matched male-female die set under high pressure (5-15 tons) compresses and raises paper fibers into permanent relief without ink. Multi-level depth from subtle blind emboss to sculptured over 1mm. Premium papers (120-350gsm).

Function
Adds tactile third dimension consumers instinctively associate with quality. Preferred for wineries, craft spirits, and premium gift packaging. Permanent effect cannot be smudged or scratched.

Specifications
- Process: Blind emboss, registered, or multi-level sculptured
- Die: Matched brass or magnesium male-female set
- Depth: 0.15-1.2mm relief
- Paper: Uncoated, cotton, textured (120-350gsm)
- Certifications: ISO 9001, FSC`, img: "https://img.gozhumeng.com/1781593706781-3d-embossed-textured-paper-labels.jpg" },
      { title: "Clear PET Labels", desc: "Seamless look for glass jars.", longDesc: `Craft
Reverse-printed ultra-transparent PET film with white backing, CMYK, and spot colors in one pass. Ink encapsulated between film and adhesive - 100% scratch-proof and waterproof. Crystal-clear adhesive over 90% light transmission.

Function
"No-label look" where only graphics are visible on glass. Zero visible edges or residue. Product color becomes part of the design. Perfect for premium jars, apothecary bottles, and candle vessels.

Specifications
- Material: Ultra-transparent PET film (36-50 micron)
- Adhesive: Crystal-clear acrylic (90%+ light transmission)
- Printing: Reverse-print UV flexography, up to 8 colors + white
- Certifications: FDA (indirect food contact), REACH`, img: "https://img.gozhumeng.com/1781514304992-clear-no-label-look-pet-stickers.webp" },
      { title: "Kraft Paper Labels", desc: "Recycled fibers for organic feel.", longDesc: `Craft
FSC-certified unbleached kraft paper (80-150gsm) with soy-based or vegetable-based inks. Natural brown fiber texture preserved - no bleaching. Light-touch flexography with biodegradable matte varnish or raw finish.

Function
Instantly signals natural, organic, and handcrafted values. Ideal for organic foods, craft beverages, eco-friendly cosmetics, and sustainable brands. Pairs with twine, cork, and amber glass packaging.

Specifications
- Material: Unbleached kraft paper (80-150gsm), FSC-certified
- Inks: Soy-based or vegetable-based, low-VOC
- Finish: Raw uncoated, matte varnish, or biodegradable laminate
- Adhesive: Permanent or removable acrylic
- Certifications: FSC, compostable adhesive option, soy-ink certified`, img: "https://img.gozhumeng.com/1781514416936-rustic-brown-kraft-paper-labels-eco-friendly.webp" },
      { title: "Spot UV Finish", desc: "Contrast pop for luxury boxes.", longDesc: `Craft
Two-stage process: matte laminate base, then high-gloss UV-curable varnish applied via screen printing or digital spot UV at +/-0.2mm registration. UV varnish instantly cured to create raised, glass-like gloss layer.

Function
Powerful matte-gloss contrast draws the eye to key brand elements. Gloss areas float above the surface for a multi-texture experience. Effective for luxury boxes, book covers, and premium product labels.

Specifications
- Process: Matte base + registered spot UV varnish
- Registration: +/-0.2mm precision
- Contrast: High-gloss UV (80+ GU) on matte (5-15 GU)
- Thickness: 20-80 micron raised UV layer
- Certifications: ISO 9001, low-VOC UV varnish`, img: "https://img.gozhumeng.com/1781514441161-spot-uv-gloss-matte-finish-labels.webp" }
    ]
  }
];

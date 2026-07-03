export const PRODUCT_LIBRARY = {
  project_name: "Proven Portal",
  product_library: [
    {
      product: "Revive+",
      tagline: "Regenerative biocomplex",
      indications: "Addresses acne scars, dark circles, and hair loss using exosomes and PDRN.",
      slug: "revive-plus"
    },
    {
      product: "Hair Complex+",
      tagline: "Hair regrowth support",
      indications: "Injectable treatment for androgenic alopecia or telogen effluvium using stem cells and growth factors.",
      slug: "hair-complex-plus"
    },
    {
      product: "Skin Enhancer+",
      tagline: "Skin texture improvement",
      indications: "Skin booster with hyaluronic acid to provide hydration and refine texture.",
      slug: "skin-enhancer-plus"
    },
    {
      product: "Pink Secret+",
      tagline: "PEPTIDE-MODULATED SKIN REGENERATION",
      indications: "Specialized skin regeneration.",
      slug: "pink-secret-plus"
    }
  ]
};

export type Product = typeof PRODUCT_LIBRARY.product_library[0];

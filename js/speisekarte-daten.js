/* =========================================================
   speisekarte-daten.js – DIE Speisekarte
   Das ist die einzige Datei, in der Gerichte und Preise stehen.
   Die deutsche und die englische Seite lesen beide von hier.

   So ist ein Gericht aufgebaut:
   {
     nr: "M21",                         Nummer wie auf der gedruckten Karte
     name: "Sake",                      Name (gleich in beiden Sprachen)
     de: "Lachs", en: "salmon",         kurze Beschreibung
     allergene: "B",                    Kürzel aus der Allergen-Liste (leer lassen, wenn keine)
     preis: 5.50,                       Preis in Euro, mit Punkt statt Komma!
     scharf: true,                      optional: zeigt "scharf" an
     vegetarisch: true                  optional: zeigt "vegetarisch" an
   }
   Gibt es das Gericht in mehreren Varianten (Lachs, Hähnchen …),
   steht statt "preis" eine Liste "varianten". Jede Variante wird
   mit der kleinen Hilfsfunktion v(...) geschrieben, siehe unten.

   Übertragen von der gedruckten Karte (Stand Oktober 2026).
   Offensichtliche Tippfehler sind korrigiert (z. B. "Genellen" → "Garnelen").
   ========================================================= */

/* Hilfsfunktion für eine Variante, damit jede in eine Zeile passt:
   v("A", "Lachs", "salmon", 5.90, "B")
     Buchstabe wie auf der Karte, deutsch, englisch, Preis, Allergene (optional) */
function v(buchstabe, de, en, preis, allergene, extra) {
  return Object.assign({ buchstabe, de, en, preis, allergene: allergene || "" }, extra);
}

/* Die gleichen drei Varianten gibt es bei mehreren Suppen */
const SUPPEN_VARIANTEN = [
  v("A", "Lachs", "salmon", 5.90, "B"),
  v("B", "Hähnchen", "chicken", 5.40),
  v("C", "Garnelen", "shrimps", 5.90, "C")
];

/* Die gleichen sieben Varianten gibt es bei den Currys 301–303 */
const CURRY_VARIANTEN = [
  v("A", "gebackener Lachs", "baked salmon", 18.90, "B"),
  v("B", "gebackener Thunfisch", "baked tuna", 19.90, "B"),
  v("C", "gebackenes Hähnchen", "baked chicken", 15.90),
  v("D", "gebackene Entenbrust", "baked duck breast", 18.90),
  v("E", "Rindfleisch", "beef", 16.90),
  v("F", "Hähnchen", "chicken", 14.40),
  v("G", "knusprige Ente", "crispy duck", 16.90, "I")
];

/* Varianten E, F, G bei den gebratenen Nudel- und Reisgerichten */
const PFANNE_VARIANTEN = [
  v("E", "gebratenes Rindfleisch", "stir-fried beef", 16.90),
  v("F", "gebratenes Hähnchen", "stir-fried chicken", 15.90),
  v("G", "knusprige Ente", "crispy duck", 16.90)
];
const UDON_VARIANTEN = [
  v("E", "gebratenes Rindfleisch", "stir-fried beef", 17.90),
  v("F", "gebratenes Hähnchen", "stir-fried chicken", 15.90),
  v("G", "knusprige Ente", "crispy duck", 16.90)
];

/* Vegetarische Hauptgerichte: vegetarisches Huhn oder Bio-Tofu */
function vegetarischeVarianten(preisHuhn, preisTofu) {
  return [
    v("A", "vegetarisches Huhn", "vegetarian chicken", preisHuhn, "I"),
    v("B", "Bio-Tofu", "organic tofu", preisTofu, "M")
  ];
}

window.SPEISEKARTE = [
  /* ---------------- SUPPEN ---------------- */
  {
    titel: { de: "Suppen", en: "Soups" },
    gerichte: [
      {
        nr: "1", name: "Udon Suppe",
        de: "mit Udon-Nudeln, Pilzen und Gemüse",
        en: "with udon noodles, mushrooms and vegetables",
        varianten: SUPPEN_VARIANTEN
      },
      {
        nr: "2", name: "Kokos Suppe", scharf: true, allergene: "O",
        de: "mit Kokosmilch, Zitronengras, Pilzen und Gemüse",
        en: "with coconut milk, lemongrass, mushrooms and vegetables",
        varianten: SUPPEN_VARIANTEN
      },
      {
        nr: "3", name: "Miso Suppe",
        de: "Sojabohnenpaste mit Seetang und Lauchzwiebeln",
        en: "soybean paste with seaweed and scallions",
        varianten: [
          v("A", "Lachs", "salmon", 5.90, "B"),
          v("B", "Tofu", "tofu", 5.40, "M", { vegetarisch: true })
        ]
      },
      {
        nr: "5", name: "Tom Yum Suppe", allergene: "D, P",
        de: "pikant, mit Zitronengras, frischem Gemüse, Tom-Yum-Paste, Zitronenblättern und Limettensaft",
        en: "spicy, with lemongrass, fresh vegetables, tom yum paste, lemon leaves and lime juice",
        varianten: SUPPEN_VARIANTEN
      },
      {
        nr: "6", name: "Wakame", vegetarisch: true, allergene: "F",
        de: "Seetangsalat", en: "seaweed salad",
        preis: 5.50
      }
    ]
  },

  /* ---------------- VORSPEISEN ---------------- */
  {
    titel: { de: "Vorspeisen", en: "Starters" },
    gerichte: [
      {
        nr: "7", name: "Mango Mix", allergene: "O",
        de: "mit Mango, Karotten, Salat und Tomaten",
        en: "with mango, carrot, salad and tomato",
        varianten: [
          v("A", "Tofu", "tofu", 11.50, "M", { vegetarisch: true }),
          v("B", "Hähnchen", "chicken", 12.90),
          v("C", "Garnelen", "shrimps", 14.50, "C")
        ]
      },
      {
        nr: "8", name: "Salmon Wakame", allergene: "A, B, D, F",
        de: "flambierter Lachs auf Wakame-Salat mit Avocado, Tobiko und spezieller Sauce",
        en: "flambéed salmon on wakame salad with avocado, tobiko and special sauce",
        preis: 10.90
      },
      {
        nr: "9", name: "Dumplings", menge: { de: "3 Stück", en: "3 pieces" }, allergene: "C, F",
        de: "gedämpfte Teigtaschen mit Garnelen und Sojasoße",
        en: "steamed dumplings with shrimps and soy sauce",
        preis: 4.90
      },
      {
        nr: "10", name: "Edamame", vegetarisch: true, allergene: "M",
        de: "japanische Sojabohnen", en: "Japanese soybeans",
        preis: 4.90
      },
      {
        nr: "11", name: "Sommerrollen", menge: { de: "2 Stück", en: "2 pieces" }, allergene: "F, O",
        de: "frische Reispapierrollen", en: "fresh rice paper rolls",
        varianten: [
          v("A", "Hähnchen", "chicken", 5.50),
          v("B", "Garnelen", "shrimps", 5.50, "C"),
          v("C", "Tofu", "tofu", 5.00, "M", { vegetarisch: true }),
          v("D", "Avocado", "avocado", 5.00, "", { vegetarisch: true })
        ]
      },
      {
        nr: "12", name: "Nem Viet Nam", menge: { de: "2 Stück", en: "2 pieces" }, allergene: "A, I, O",
        de: "spezielle Frühlingsrollen mit Limetten-Fischsauce",
        en: "special spring rolls with lime fish sauce",
        preis: 6.90
      },
      {
        nr: "15", name: "Gyoza", menge: { de: "3 Stück", en: "3 pieces" }, allergene: "F",
        de: "frittierte Teigtaschen mit Hähnchen und Gemüse, dazu Süß-sauer-Soße",
        en: "deep-fried chicken and vegetable dumplings with sweet and sour sauce",
        preis: 4.90
      },
      {
        nr: "16", name: "Vegetarische Gyoza", menge: { de: "3 Stück", en: "3 pieces" }, vegetarisch: true, allergene: "F",
        de: "frittierte vegetarische Teigtaschen mit Süß-sauer-Soße",
        en: "fried vegetarian dumplings with sweet and sour sauce",
        preis: 4.90
      },
      {
        nr: "17", name: "Ga Sa Te", menge: { de: "2 Stück", en: "2 pieces" }, allergene: "F, I, M",
        de: "marinierte Hähnchen-Satéspieße mit Teriyaki-Sauce und Sesam",
        en: "marinated chicken satay skewers with teriyaki sauce and sesame",
        preis: 6.90
      },
      {
        nr: "18", name: "Feuerlachs", allergene: "B, F",
        de: "flambierter Lachs im Sesam-Pfeffer-Mantel mit Teriyaki-Sauce",
        en: "flambéed salmon in a sesame-pepper coating with teriyaki sauce",
        preis: 12.90
      },
      {
        nr: "19", name: "Feuertuna", allergene: "B, F",
        de: "flambierter Thunfisch im Sesam-Pfeffer-Mantel mit Teriyaki-Sauce",
        en: "flambéed tuna in a sesame-pepper coating with teriyaki sauce",
        preis: 13.90
      },
      {
        nr: "20", name: "Ebi Tempura", menge: { de: "5 Stück", en: "5 pieces" }, allergene: "A, C, F, I",
        de: "gebackene Garnelen im knusprigen Tempurateig auf Salat, mit Teriyaki- und Mayo-Sauce",
        en: "crispy prawns in tempura batter on salad, with teriyaki and mayo sauce",
        preis: 6.90
      },
      {
        nr: "21", name: "Frühlingsrollen", menge: { de: "6 Stück", en: "6 pieces" }, vegetarisch: true,
        de: "knusprige Reispapierrollen mit Süß-sauer-Soße",
        en: "crispy rice paper rolls with sweet and sour sauce",
        preis: 4.90
      },
      {
        nr: "22", name: "Anh Em Tapas",
        de: "eine Auswahl verschiedener Vorspeisen",
        en: "a selection of different starters",
        varianten: [
          v("A", "für 2 Personen", "for 2 people", 18.90),
          v("B", "für 3 Personen", "for 3 people", 24.90)
        ]
      },
      {
        nr: "23", name: "Anh Em Tapas vegetarisch", vegetarisch: true,
        de: "eine Auswahl verschiedener vegetarischer Vorspeisen",
        en: "a selection of different vegetarian starters",
        varianten: [
          v("C", "für 2 Personen", "for 2 people", 17.90),
          v("D", "für 3 Personen", "for 3 people", 22.90)
        ]
      },
      {
        nr: "24", name: "Jakobsmuscheln", allergene: "C, F, M",
        de: "gegrillte Jakobsmuscheln mit Teriyaki-Sauce und Sesam",
        en: "grilled scallops with teriyaki sauce and sesame",
        preis: 7.90
      },
      { nr: "25", name: "Pommes", de: "", en: "French fries", preis: 5.00 },
      { nr: "26", name: "Süßkartoffel-Pommes", de: "", en: "sweet potato fries", preis: 5.00 }
    ]
  },

  /* ---------------- BOWLS ---------------- */
  {
    titel: { de: "Bowls", en: "Bowls" },
    hinweis: {
      de: "mit Sushi-Reis, dazu Mango-Curry- oder Curry-Sauce (Allergene der Saucen: D, O)",
      en: "with sushi rice and mango curry or curry sauce (sauce allergens: D, O)"
    },
    gerichte: [
      {
        nr: "101", name: "Veggie Bowl", vegetarisch: true, allergene: "F, I, M",
        de: "Avocado, Salat, Wakame, Gurke, Mango, Karotte, Brokkoli, Tofu und Teriyaki-Sauce",
        en: "avocado, salad, wakame, cucumber, mango, carrot, broccoli, tofu and teriyaki sauce",
        preis: 13.50
      },
      {
        nr: "102", name: "Sake Bowl", allergene: "F, I, M",
        de: "Lachs, Avocado, Salat, Wakame, Gurke, Mango, Karotte, Brokkoli und Teriyaki-Sauce",
        en: "salmon, avocado, salad, wakame, cucumber, mango, carrot, broccoli and teriyaki sauce",
        preis: 15.50
      },
      {
        nr: "103", name: "Salmon Bowl", allergene: "F, I, M",
        de: "gebackener Lachs, Avocado, Salat, Wakame, Gurke, Mango, Karotte, Brokkoli und Teriyaki-Sauce",
        en: "baked salmon, avocado, salad, wakame, cucumber, mango, carrot, broccoli and teriyaki sauce",
        preis: 16.50
      },
      {
        nr: "104", name: "Aal Bowl", allergene: "1, 2, 4, F, I, M",
        de: "gegrillter Aal, Avocado, Salat, Wakame, Gurke, Mango, Karotte, Brokkoli und Teriyaki-Sauce",
        en: "grilled eel, avocado, salad, wakame, cucumber, mango, carrot, broccoli and teriyaki sauce",
        preis: 16.90
      }
    ]
  },

  /* ---------------- VEGETARISCH ---------------- */
  {
    titel: { de: "Vegetarisch", en: "Vegetarian" },
    gerichte: [
      {
        nr: "201", name: "Mango Curry", vegetarisch: true, scharf: true, allergene: "D, F, O",
        de: "Curry mit Mangopüree, Kokosmilch, frischem Gemüse und Sesam, dazu Salat und Reis",
        en: "curry with mango purée, coconut milk, fresh vegetables and sesame, with salad and rice",
        varianten: vegetarischeVarianten(16.90, 14.90)
      },
      {
        nr: "202", name: "Rotes Curry", vegetarisch: true, scharf: true, allergene: "D, F, O",
        de: "cremiges Curry mit frischem Gemüse und Sesam, dazu Salat und Reis",
        en: "creamy curry with fresh vegetables and sesame, with salad and rice",
        varianten: vegetarischeVarianten(16.90, 14.90)
      },
      {
        nr: "203", name: "Duc Tho Erdnuss", vegetarisch: true, allergene: "D, F, H",
        de: "cremige Erdnusssauce mit frischem Gemüse und Sesam, dazu Salat und Reis",
        en: "creamy peanut sauce with fresh vegetables and sesame, with salad and rice",
        varianten: vegetarischeVarianten(16.90, 14.90)
      },
      {
        nr: "204", name: "Viet Nam Style", vegetarisch: true, allergene: "F, M, O, 4",
        de: "Soja-Balsamico-Sauce mit frischem Gemüse, Sesam, Pak Choi und Spargel, dazu Salat und Reis",
        en: "soy balsamic sauce with fresh vegetables, sesame, pak choi and asparagus, with salad and rice",
        varianten: vegetarischeVarianten(16.90, 14.90)
      },
      {
        nr: "205", name: "Pho Xao", vegetarisch: true, allergene: "I, O",
        de: "gebratene Reisbandnudeln mit Eiern, hausgemachter Sauce, frischem Gemüse und Röstzwiebeln",
        en: "fried flat rice noodles with eggs, homemade sauce, fresh vegetables and roasted onions",
        varianten: vegetarischeVarianten(16.90, 14.90)
      },
      {
        nr: "206", name: "Curry Udon", vegetarisch: true, allergene: "D, I, O",
        de: "Udon-Nudeln in cremigem Curry mit Kokosmilch und frischem Gemüse",
        en: "udon noodles in a creamy curry with coconut milk and fresh vegetables",
        varianten: vegetarischeVarianten(17.90, 15.90)
      },
      {
        nr: "207", name: "Terry Udon", vegetarisch: true, allergene: "I, M",
        de: "gebratene Udon-Nudeln mit Zwiebeln, frischem Gemüse und Nori",
        en: "stir-fried udon noodles with onions, fresh vegetables and nori",
        varianten: vegetarischeVarianten(17.90, 15.90)
      },
      {
        nr: "208", name: "Noi Bai", vegetarisch: true, allergene: "A, I, M",
        de: "„fliegende Nudeln“ mit frischem Gemüse, Salat und Erdnusssauce",
        en: "“flying noodles” with fresh vegetables, salad and peanut sauce",
        varianten: vegetarischeVarianten(16.90, 14.90)
      }
    ]
  },

  /* ---------------- VIETNAMESISCHE KÜCHE ---------------- */
  {
    titel: { de: "Vietnamesische Küche", en: "Vietnamese kitchen" },
    gerichte: [
      {
        nr: "301", name: "Mango Curry", scharf: true, allergene: "D, F, O",
        de: "Curry mit Mangopüree, Kokosmilch, frischem Gemüse und Sesam, dazu Salat und Reis",
        en: "curry with mango purée, coconut milk, fresh vegetables and sesame, with salad and rice",
        varianten: CURRY_VARIANTEN
      },
      {
        nr: "302", name: "Rotes Curry", scharf: true, allergene: "D, F, O",
        de: "cremiges Curry mit frischem Gemüse, Kokosmilch und Sesam, dazu Reis",
        en: "creamy curry with fresh vegetables, coconut milk and sesame, with rice",
        varianten: CURRY_VARIANTEN
      },
      {
        nr: "303", name: "Duc Tho Erdnuss", allergene: "D, F, H",
        de: "cremige Erdnusssauce mit frischem Gemüse und Sesam, dazu Salat und Reis",
        en: "creamy peanut sauce with fresh vegetables and sesame, with salad and rice",
        varianten: CURRY_VARIANTEN
      },
      {
        nr: "304", name: "Viet Nam Style", allergene: "F, M, O, 4",
        de: "Soja-Balsamico-Sauce mit frischem Gemüse, Sesam, Pak Choi und Spargel, dazu Salat und Reis",
        en: "soy balsamic sauce with fresh vegetables, sesame, pak choi and asparagus, with salad and rice",
        varianten: [
          v("A", "gebackener Lachs", "baked salmon", 18.90, "B"),
          v("B", "gebackener Thunfisch", "baked tuna", 19.90, "B"),
          v("C", "gebackenes Hähnchen", "baked chicken", 15.90),
          v("D", "gebackene Entenbrust", "baked duck breast", 18.90),
          v("G", "knusprige Ente", "crispy duck", 16.90, "I")
        ]
      },
      {
        nr: "305", name: "Bun Ha Tinh", allergene: "H, M, O",
        de: "Reisfadennudeln mit Knoblauch, dazu knackiger Salat mit Limetten-Kräuter-Dressing",
        en: "rice vermicelli with garlic and a crunchy salad with lime and herb dressing",
        varianten: [
          v("E", "gebratenes Rindfleisch", "stir-fried beef", 16.90),
          v("F", "gebratenes Hähnchen", "stir-fried chicken", 15.90)
        ]
      },
      {
        nr: "306", name: "Pho Xao", allergene: "A, C, I",
        de: "gebratene Reisbandnudeln mit Eiern, hausgemachter Sauce, frischem Gemüse und Röstzwiebeln",
        en: "fried flat rice noodles with eggs, homemade sauce, fresh vegetables and roasted onions",
        varianten: PFANNE_VARIANTEN
      },
      {
        nr: "307", name: "My Xao", allergene: "A, D, I",
        de: "gebratene Nudeln mit Eiern, frischem Gemüse, Salat und Mayonnaise",
        en: "fried noodles with eggs, fresh vegetables, salad and mayonnaise",
        varianten: PFANNE_VARIANTEN
      },
      {
        nr: "308", name: "Com Chien", allergene: "A",
        de: "gebratener Reis mit Eiern, frischem Gemüse, Salat und Mayonnaise",
        en: "fried rice with eggs, fresh vegetables, salad and mayonnaise",
        varianten: PFANNE_VARIANTEN
      },
      {
        nr: "309", name: "Noi Bai", allergene: "D, H, I",
        de: "„fliegende Nudeln“ mit frischem Gemüse, Salat und Erdnusssauce",
        en: "“flying noodles” with fresh vegetables, salad and peanut sauce",
        varianten: [
          v("C", "gebackenes Hähnchen", "baked chicken", 16.90),
          v("D", "gebackene Entenbrust", "baked duck breast", 18.90),
          v("G", "knusprige Ente", "crispy duck", 16.90),
          v("T", "knusprige Garnelen", "crispy shrimps", 17.90, "C, I")
        ]
      },
      {
        nr: "310", name: "Pho Nam Dinh", allergene: "O, P",
        de: "traditionelle Reisbandnudelsuppe mit kräftiger, aromatischer Rinderbrühe, Frühlingszwiebeln, Koriander und Sojasprossen",
        en: "traditional rice noodle soup with a rich, aromatic beef broth, spring onions, coriander and bean sprouts",
        varianten: [
          v("A", "Hähnchen", "chicken", 15.90),
          v("B", "Bio-Tofu", "organic tofu", 13.90, "M"),
          v("C", "Rindfleisch", "beef", 16.90)
        ]
      },
      {
        nr: "311", name: "Curry Udon", allergene: "D, I, O",
        de: "Udon-Nudeln in cremigem Curry mit Kokosmilch und frischem Gemüse",
        en: "udon noodles in a creamy curry with coconut milk and fresh vegetables",
        varianten: UDON_VARIANTEN
      },
      {
        nr: "312", name: "Terry Udon", allergene: "I, M",
        de: "gebratene Udon-Nudeln mit Zwiebeln, frischem Gemüse und Nori",
        en: "stir-fried udon noodles with onions, fresh vegetables and nori",
        varianten: UDON_VARIANTEN
      }
    ]
  },

  /* ---------------- SUSHI ---------------- */
  {
    titel: { de: "Maki", en: "Maki" },
    hinweis: { de: "6 Stück", en: "6 pieces" },
    gerichte: [
      { nr: "M21", name: "Sake", allergene: "B", de: "Lachs", en: "salmon", preis: 5.50 },
      { nr: "M22", name: "Tekka", allergene: "B", de: "Thunfisch", en: "tuna", preis: 5.50 },
      { nr: "M23", name: "Chicken", allergene: "I", de: "Hähnchen", en: "chicken", preis: 5.50 },
      { nr: "M24", name: "Ebi Maki", allergene: "C, D", de: "gekochte Garnelen mit Gurke und Frischkäse", en: "cooked shrimps with cucumber and cream cheese", preis: 5.50 },
      { nr: "M25", name: "Fried Ebi", allergene: "C, D, I", de: "gebratene Garnelen", en: "fried shrimps", preis: 5.90 },
      { nr: "M26", name: "Cali Maki", allergene: "1, 2, 4", de: "Surimi und Gurke", en: "surimi and cucumber", preis: 5.50 },
      { nr: "M27", name: "Salmon Skin", allergene: "B, I", de: "gebratene Lachshaut", en: "fried salmon skin", preis: 4.90 },
      { nr: "M28", name: "Avo Maki", vegetarisch: true, de: "Avocado", en: "avocado", preis: 5.50 },
      { nr: "M29", name: "Kappa", vegetarisch: true, de: "Gurke", en: "cucumber", preis: 4.90 },
      { nr: "M30", name: "Mango Maki", vegetarisch: true, de: "Mango", en: "mango", preis: 4.90 }
    ]
  },
  {
    titel: { de: "Nigiri", en: "Nigiri" },
    hinweis: { de: "2 Stück", en: "2 pieces" },
    gerichte: [
      { nr: "A1", name: "Sake", allergene: "B", de: "Lachs", en: "salmon", preis: 4.50 },
      { nr: "A2", name: "Maguro", allergene: "B", de: "Thunfisch", en: "tuna", preis: 4.50 },
      { nr: "A3", name: "Ebi", allergene: "C", de: "Garnelen", en: "shrimp", preis: 4.50 },
      { nr: "A4", name: "Kani", allergene: "1, 2, 4", de: "Surimi", en: "surimi", preis: 4.50 },
      { nr: "A5", name: "Hotategai", allergene: "N", de: "Jakobsmuscheln", en: "scallops", preis: 5.90 },
      { nr: "A6", name: "Unagi", allergene: "1, 2, 4", de: "gegrillter Aal", en: "grilled eel", preis: 4.50 },
      { nr: "A7", name: "Inari", allergene: "M", vegetarisch: true, de: "frittierte Tofutasche", en: "fried tofu pouch", preis: 4.50 },
      { nr: "A8", name: "Avocado", vegetarisch: true, de: "Avocado", en: "avocado", preis: 4.50 },
      { nr: "A9", name: "Sake Tatar", scharf: true, allergene: "2, 3, 4, B", de: "Lachs, scharf", en: "spicy salmon", preis: 5.90 },
      { nr: "A10", name: "Tekka Tatar", scharf: true, allergene: "2, 3, 4, B", de: "Thunfisch, scharf", en: "spicy tuna", preis: 5.90 }
    ]
  },
  {
    titel: { de: "Aburi Nigiri", en: "Aburi nigiri" },
    hinweis: { de: "2 Stück, kurz flambiert", en: "2 pieces, lightly flame-seared" },
    gerichte: [
      { nr: "A15", name: "Sake Aburi", allergene: "B", de: "flambierter Lachs, Tobiko und Sauce", en: "flambéed salmon, tobiko and sauce", preis: 4.90 },
      { nr: "A16", name: "Maguro Aburi", allergene: "B", de: "flambierter Thunfisch, Tobiko und Sauce", en: "flambéed tuna, tobiko and sauce", preis: 4.90 },
      { nr: "A17", name: "Hotate Aburi", allergene: "N", de: "flambierte Jakobsmuscheln, Tobiko und Sauce", en: "flambéed scallops, tobiko and sauce", preis: 6.50 }
    ]
  },
  {
    titel: { de: "Inside-Out-Rolls", en: "Inside-out rolls" },
    hinweis: { de: "8 Stück", en: "8 pieces" },
    gerichte: [
      { nr: "B31", name: "Alaska I.O.", allergene: "B, D", de: "Lachs, Gurke, Frischkäse und Tobiko", en: "salmon, cucumber, cream cheese and tobiko", preis: 10.90 },
      { nr: "B32", name: "Maguro I.O.", allergene: "B, D", de: "Thunfisch, Gurke, Frischkäse und Tobiko", en: "tuna, cucumber, cream cheese and tobiko", preis: 10.90 },
      { nr: "B33", name: "Chicken I.O.", allergene: "F, I", de: "Hähnchen, Gurke, Mango, Sesam und Sauce", en: "chicken, cucumber, mango, sesame and sauce", preis: 9.50 },
      { nr: "B34", name: "Ebi I.O.", allergene: "C, D", de: "gekochte Garnelen mit Gurke, Avocado, Frischkäse und Tobiko", en: "cooked shrimps with cucumber, avocado, cream cheese and tobiko", preis: 10.50 },
      { nr: "B35", name: "Ebi Tempura I.O.", allergene: "C, F, I", de: "gebratene Garnelen mit Gurke, Sesam und Sauce", en: "fried shrimps with cucumber, sesame and sauce", preis: 10.90 },
      { nr: "B36", name: "California I.O.", allergene: "1, 2, 4, F", de: "gebratenes Surimi mit Gurke, Sesam und Sauce", en: "fried surimi with cucumber, sesame and sauce", preis: 9.50 },
      { nr: "B37", name: "Salmon Skin I.O.", allergene: "B, F, I", de: "gebratene Lachshaut mit Gurke, Sesam und Sauce", en: "fried salmon skin with cucumber, sesame and sauce", preis: 8.90 },
      { nr: "B38", name: "Cooked Tuna I.O.", allergene: "B, F", de: "gebratener Thunfisch mit Gurke, Sesam und Sauce", en: "fried tuna with cucumber, sesame and sauce", preis: 10.90 },
      { nr: "B39", name: "Unagi I.O.", allergene: "1, 2, 4, F", de: "gegrillter Aal mit Gurke, Sesam und Sauce", en: "grilled eel with cucumber, sesame and sauce", preis: 11.90 }
    ]
  },
  {
    titel: { de: "Vegetarische Rolls", en: "Vegetarian rolls" },
    hinweis: { de: "8 Stück", en: "8 pieces" },
    gerichte: [
      { nr: "B64", name: "Buddha Roll", vegetarisch: true, allergene: "D, F", de: "Gurke, Avocado, Spargel, Frischkäse und Sesam, mit Tofu umwickelt", en: "cucumber, avocado, asparagus, cream cheese and sesame, wrapped in tofu", preis: 9.90 },
      { nr: "B65", name: "Mountain Roll", vegetarisch: true, allergene: "A, D", de: "Tempura-Lauch, Chili-Mayo und Paprika, mit Avocado umwickelt", en: "tempura leek, chili mayo and bell pepper, wrapped in avocado", preis: 9.90 },
      { nr: "B66", name: "Veggie Roll", vegetarisch: true, allergene: "F, I", de: "Avocado im Tempuramantel, Gurke, Mango und Sesam", en: "avocado in tempura batter, cucumber, mango and sesame", preis: 8.90 },
      { nr: "B67", name: "Bamboo Roll", vegetarisch: true, allergene: "D, F", de: "Spargel, Rucola, Frischkäse und Sesam", en: "asparagus, arugula, cream cheese and sesame", preis: 8.90 },
      { nr: "B68", name: "Cloud Roll", vegetarisch: true, allergene: "D, F", de: "Rucola, Avocado, Frischkäse und Sesam", en: "arugula, avocado, cream cheese and sesame", preis: 8.90 },
      { nr: "B69", name: "Yellow Roll", vegetarisch: true, allergene: "D, I", de: "Gurke, Avocado und Frischkäse, mit Reispapier und Mango umwickelt", en: "cucumber, avocado and cream cheese, wrapped in rice paper and mango", preis: 9.90 }
    ]
  },
  {
    titel: { de: "Tempura-Rolls", en: "Tempura rolls" },
    hinweis: {
      de: "10 Stück. Alle Crunchy-Rolls kommen mit Rettich, Wakame, Sesam, Sauce und Mayonnaise.",
      en: "10 pieces. All crunchy rolls come with radish, wakame, sesame, sauce and mayo."
    },
    gerichte: [
      { nr: "C50", name: "Salmon Crunchy", allergene: "B, D, I", de: "Lachs, Gurke, Avocado und Frischkäse", en: "salmon, cucumber, avocado and cream cheese", preis: 15.90 },
      { nr: "C51", name: "Tuna Crunchy", allergene: "B, D, I", de: "Thunfisch, Gurke, Avocado und Frischkäse", en: "tuna, cucumber, avocado and cream cheese", preis: 15.90 },
      { nr: "C52", name: "Chicken Crunchy", allergene: "D, I", de: "Hähnchen, Gurke, Avocado und Frischkäse", en: "chicken, cucumber, avocado and cream cheese", preis: 15.90 },
      { nr: "C54", name: "Chicken Mango", allergene: "D, I", de: "Hähnchen, Mango, Paprika und Frischkäse", en: "chicken, mango, bell pepper and cream cheese", preis: 15.90 },
      { nr: "C55", name: "Chicken Asparagus", allergene: "D, I", de: "Hähnchen, Spargel, Gurke und Frischkäse", en: "chicken, asparagus, cucumber and cream cheese", preis: 15.90 },
      { nr: "C56", name: "Ebi Crunchy", allergene: "C, D", de: "gekochte Garnelen mit Gurke, Mango, Avocado und Frischkäse", en: "cooked shrimps with cucumber, mango, avocado and cream cheese", preis: 15.90 },
      { nr: "C57", name: "Unagi Crunchy", allergene: "1, 2, 4, D", de: "Aal, Rucola, Gurke, Avocado und Frischkäse", en: "eel, arugula, cucumber, avocado and cream cheese", preis: 16.90 },
      { nr: "C58", name: "Veggie Crunchy", vegetarisch: true, de: "Gurke, Avocado, Spargel und Mango", en: "cucumber, avocado, asparagus and mango", preis: 14.90 },
      { nr: "C59", name: "Rucola Crunchy", vegetarisch: true, de: "Rucola, Gurke, Avocado und Paprika", en: "arugula, cucumber, avocado and bell pepper", preis: 14.90 }
    ]
  },
  {
    titel: { de: "Anh Em Special Rolls", en: "Anh Em special rolls" },
    hinweis: { de: "8 Stück", en: "8 pieces" },
    gerichte: [
      { nr: "D81", name: "Salmon Volcano", allergene: "2, 3, 4, B, D", de: "Lachs, Gurke, Avocado, Frischkäse und Tobiko, oben Lachstatar", en: "salmon, cucumber, avocado, cream cheese and tobiko, salmon tartare on top", preis: 14.90 },
      { nr: "D82", name: "Tuna Lava", allergene: "2, 3, 4, B, D", de: "Thunfisch, Gurke, Avocado, Frischkäse und Tobiko, oben Thunfischtatar", en: "tuna, cucumber, avocado, cream cheese and tobiko, tuna tartare on top", preis: 15.90 },
      { nr: "D83", name: "Green Grassland", allergene: "D, I", de: "Hähnchen, Gurke, Mango, Frischkäse und Sauce, oben Avocado", en: "chicken, cucumber, mango, cream cheese and sauce, avocado on top", preis: 14.50 },
      { nr: "D84", name: "Crispy Tiger", allergene: "B, C, D, I", de: "Garnelen im Tempuramantel, Mango, Avocado, Tobiko und Frischkäse, mit Feuerlachs umwickelt", en: "shrimps in tempura batter, mango, avocado, tobiko and cream cheese, wrapped in flamed salmon", preis: 16.90 },
      { nr: "D85", name: "Ocean Tuna", allergene: "B, C, D, I", de: "Garnelen im Tempuramantel, Mango, Avocado, Tobiko und Frischkäse, mit Feuerthunfisch umwickelt", en: "shrimps in tempura batter, mango, avocado, tobiko and cream cheese, wrapped in flamed tuna", preis: 16.90 },
      { nr: "D86", name: "Crispy Crab", allergene: "1, 2, 4, B, D, F", de: "Lachs, Mango, Avocado, Frischkäse, Sauce und Sesam, oben Surimi", en: "salmon, mango, avocado, cream cheese, sauce and sesame, surimi on top", preis: 16.90 },
      { nr: "D87", name: "Mama Ebi", allergene: "B, C, D, I", de: "gebratene Lachshaut, Mango, Avocado, Frischkäse, Sesam und Sauce, mit Großgarnelen umwickelt", en: "fried salmon skin, mango, avocado, cream cheese, sesame and sauce, wrapped in king prawns", preis: 15.90 },
      { nr: "D88", name: "Sea Dragon", allergene: "1, 2, 4, B, D", de: "gegrillter Aal, Gurke, Avocado, Frischkäse und Tobiko, mit Lachs umwickelt", en: "grilled eel, cucumber, avocado, cream cheese and tobiko, wrapped in salmon", preis: 17.90 },
      { nr: "D89", name: "Anh Em Special", allergene: "B, I", de: "Avocado im Tempuramantel, Gurke, Mango und Tobiko, oben Lachs", en: "avocado in tempura batter, cucumber, mango and tobiko, salmon on top", preis: 15.90 },
      { nr: "D90", name: "Sun and Moon", allergene: "B, D", de: "Lachs, Thunfisch, Gurke, Mango, Frischkäse und Tobiko, mit Avocado umwickelt", en: "salmon, tuna, cucumber, mango, cream cheese and tobiko, wrapped in avocado", preis: 15.90 },
      { nr: "D95", name: "Futo Niji", menge: { de: "5 Stück", en: "5 pieces" }, allergene: "B", de: "gefüllt mit Lachs, Thunfisch, Mango, Avocado, Gurke und Tobiko", en: "filled with salmon, tuna, mango, avocado, cucumber and tobiko", preis: 11.50 },
      { nr: "D96", name: "Freestyle", allergene: "1, 2, 4, B, C, D, F, I, M, N", de: "die Kreativität unseres Sushi-Meisters", en: "the creativity of our sushi master", preis: 16.90 }
    ]
  },
  {
    titel: { de: "Sashimi", en: "Sashimi" },
    hinweis: { de: "Alle Fische werden frisch zubereitet.", en: "All fish is freshly prepared." },
    gerichte: [
      { nr: "S71", name: "Sake Sashimi", menge: { de: "8 Stück", en: "8 pieces" }, allergene: "B, F", de: "Lachs auf Rettich und Wakame", en: "salmon on radish and seaweed", preis: 17.90 },
      { nr: "S72", name: "Maguro Sashimi", menge: { de: "8 Stück", en: "8 pieces" }, allergene: "B, F", de: "Thunfisch auf Rettich und Wakame", en: "tuna on radish and seaweed", preis: 19.90 },
      { nr: "S75", name: "Sashimi Mix", menge: { de: "12 Stück", en: "12 pieces" }, allergene: "B, C, F, N", de: "Lachs, Thunfisch, Jakobsmuscheln und Garnelen auf Rettich und Wakame", en: "salmon, tuna, scallops and prawns on radish and seaweed", preis: 21.90 }
    ]
  },
  {
    titel: { de: "Sushi-Sets", en: "Sushi sets" },
    gerichte: [
      { nr: "M1", name: "Maki Mix", allergene: "B", de: "6 Sake Maki, 6 Tekka Maki, 6 Avo Maki", en: "6 sake maki, 6 tekka maki, 6 avo maki", preis: 14.50 },
      { nr: "M2", name: "Sake Mix", allergene: "B", de: "6 Sake Maki, 6 Sake Nigiri", en: "6 sake maki, 6 sake nigiri", preis: 14.50 },
      { nr: "M3", name: "Maguro Mix", allergene: "B", de: "6 Tekka Maki, 6 Maguro Nigiri", en: "6 tekka maki, 6 maguro nigiri", preis: 15.90 },
      { nr: "M4", name: "Crispy Rocket", allergene: "B, D, I", de: "10 Salmon Crunchy, 4 Nigiri", en: "10 salmon crunchy, 4 nigiri", preis: 18.90 },
      { nr: "M5", name: "Suzuki Mix", allergene: "B, C, D, I", de: "8 Crispy Tiger, 4 Nigiri", en: "8 crispy tiger, 4 nigiri", preis: 20.90 },
      { nr: "M6", name: "Salmon King", allergene: "2, 3, 4, B, D", de: "2 Sake Nigiri, 6 Sake Maki, 8 Salmon Volcano", en: "2 sake nigiri, 6 sake maki, 8 salmon volcano", preis: 21.90 },
      { nr: "M7", name: "Tuna King", allergene: "B", de: "2 Maguro Nigiri, 6 Tekka Maki, 8 Tuna Lava", en: "2 maguro nigiri, 6 tekka maki, 8 tuna lava", preis: 22.90 },
      { nr: "M8", name: "Love Meal", menge: { de: "für 2 Personen", en: "for 2 people" }, allergene: "1, 2, 4, B, D, F, I", de: "8 Sake Sashimi, 10 Chicken Crunchy, 8 California I.O., 6 Tekka Maki, 6 Kappa Maki, mit Rettich und Wakame", en: "8 sake sashimi, 10 chicken crunchy, 8 california I.O., 6 tekka maki, 6 kappa maki, with radish and wakame", preis: 50.50 }
    ]
  },
  {
    titel: { de: "Sushi-Platten", en: "Sushi platters" },
    gerichte: [
      { nr: "M9", name: "Anh Em for 2", menge: { de: "für 2 Personen", en: "for 2 people" }, allergene: "B, D, F, I", de: "4 Nigiri, 8 Freestyle Special Roll, 10 Salmon Crunchy, 6 Kappa Maki, 6 Sake Maki, mit Rettich und Wakame", en: "4 nigiri, 8 freestyle special roll, 10 salmon crunchy, 6 kappa maki, 6 sake maki, with radish and wakame", preis: 50.50 },
      { nr: "M10", name: "Anh Em for 3", menge: { de: "für 3 Personen", en: "for 3 people" }, allergene: "B, D, F, I", de: "6 Nigiri, 10 Tuna Crunchy, 8 Freestyle Special Roll, 8 Alaska I.O., 6 Sake Maki, 6 Kappa Maki, 6 Tekka Maki, mit Rettich und Wakame", en: "6 nigiri, 10 tuna crunchy, 8 freestyle special roll, 8 alaska I.O., 6 sake maki, 6 kappa maki, 6 tekka maki, with radish and wakame", preis: 69.90 },
      { nr: "M11", name: "Rainy Day", vegetarisch: true, allergene: "B, D, F", de: "2 Nigiri, 6 Avo Maki, 8 Bamboo Roll", en: "2 nigiri, 6 avo maki, 8 bamboo roll", preis: 17.50 },
      { nr: "M12", name: "Veggie Set", vegetarisch: true, allergene: "D, F", de: "6 Kappa Maki, 6 Avo Maki, 8 Cloud Roll, 8 Buddha Roll, mit Rettich und Wakame", en: "6 kappa maki, 6 avo maki, 8 cloud roll, 8 buddha roll, with radish and wakame", preis: 26.90 },
      { nr: "M14", name: "Anh Em Veggie", menge: { de: "für 2 Personen", en: "for 2 people" }, vegetarisch: true, allergene: "A, D, F", de: "4 Nigiri, 6 Kappa Maki, 6 Avo Maki, 8 Mountain Roll, 10 Veggie Crunchy, mit Rettich und Wakame", en: "4 nigiri, 6 kappa maki, 6 avo maki, 8 mountain roll, 10 veggie crunchy, with radish and wakame", preis: 40.90 }
    ]
  },

  /* ---------------- DESSERTS ---------------- */
  {
    titel: { de: "Desserts", en: "Desserts" },
    gerichte: [
      { nr: "401", name: "Mochi Eis", menge: { de: "3 Stück", en: "3 pieces" }, allergene: "D", de: "", en: "mochi ice cream", preis: 6.90 },
      { nr: "402", name: "Mochi", menge: { de: "3 Stück", en: "3 pieces" }, allergene: "A, D, F, H, I, M", de: "Reiskuchen mit cremiger Füllung", en: "rice cakes with a cream filling", preis: 6.90 },
      { nr: "403", name: "Sesambällchen", allergene: "F, I", de: "4 hausgemachte Sesambällchen, gefüllt mit Bohnenpaste und Honig", en: "4 homemade sesame balls filled with bean paste and honey", preis: 5.50 },
      { nr: "404", name: "Gebackene Banane", allergene: "F, I", de: "hausgemacht, mit Honig", en: "homemade fried banana with honey", preis: 4.00 },
      { nr: "405", name: "Sua Chua Nep Cam", allergene: "D, H, I", de: "schwarzer Klebreis mit Naturjoghurt und aromatischer Kokosmilch", en: "black sticky rice with natural yoghurt and fragrant coconut milk", preis: 5.90 }
    ]
  },

  /* ---------------- GETRÄNKE ----------------
     Getränke ohne Nummer haben einfach kein "nr".
     Bei Größen (0,2 l / 0,4 l) bleibt der Buchstabe leer: v("", …) */
  {
    titel: { de: "Hausgemachte Limonaden", en: "Homemade lemonades" },
    hinweis: { de: "Fruchtsaft-Limonade, 0,5 l", en: "fruit juice lemonade, 0.5 l" },
    gerichte: [
      { nr: "610", name: "Ginger", de: "frischer Ingwer, Limettenscheiben, Maracujasaft und Soda", en: "fresh ginger, lime slices, passion fruit juice and soda", preis: 6.90 },
      { nr: "611", name: "Lemon Grass", de: "frisches Zitronengras, Limettenscheiben, Maracujasaft und Soda", en: "fresh lemongrass, lime slices, passion fruit juice and soda", preis: 6.90 },
      { nr: "612", name: "Basil", de: "Thai-Basilikum, Limettenscheiben, Cranberrysaft und Soda", en: "Thai basil, lime slices, cranberry juice and soda", preis: 6.90 },
      { nr: "613", name: "Mint", de: "Minze, Limettenscheiben, Maracuja-Cranberry-Saft und Soda", en: "mint, lime slices, passion fruit and cranberry juice, soda", preis: 6.90 },
      { nr: "614", name: "Jasmine-Lime", de: "frische Limetten, Jasmintee, Rohrzucker und Eiswürfel", en: "fresh lime, jasmine tea, cane sugar and ice cubes", preis: 6.90 },
      { nr: "615", name: "Cucumber Lime", de: "frische Limetten, Limettenscheiben, Gurkensaft, Rohrzucker und Eiswürfel", en: "fresh lime, lime slices, cucumber juice, cane sugar and ice cubes", preis: 6.90 }
    ]
  },
  {
    titel: { de: "Säfte, Lassis & Shakes", en: "Juices, lassis & shakes" },
    gerichte: [
      {
        name: "Fruchtsäfte",
        de: "Orange, Apfel, Ananas, Rhabarber, Maracuja, Johannisbeere, Mangonektar oder Lychee",
        en: "orange, apple, pineapple, rhubarb, passion fruit, currant, mango nectar or lychee",
        varianten: [v("", "0,2 l", "0.2 l", 2.50), v("", "0,4 l", "0.4 l", 4.00)]
      },
      {
        name: "Fruchtsaftschorlen",
        de: "", en: "fruit juice spritzers",
        varianten: [v("", "0,2 l", "0.2 l", 3.00), v("", "0,4 l", "0.4 l", 4.30)]
      },
      { nr: "600", name: "Mango Lassi", menge: { de: "0,3 l", en: "0.3 l" }, allergene: "D", de: "frische Mango, Mangofruchtmark, Naturjoghurt und Milch", en: "fresh mango, mango pulp, natural yoghurt and milk", preis: 7.90 },
      { nr: "601", name: "Kokos-Limette", menge: { de: "0,3 l", en: "0.3 l" }, allergene: "D", de: "Limetten, Naturjoghurt und Kokosmilch", en: "lime, natural yoghurt and coconut milk", preis: 7.90 },
      { nr: "602", name: "Apfel-Minze", menge: { de: "0,3 l", en: "0.3 l" }, de: "Apfelsaft, Apfelstücke und frische Minze", en: "apple juice, apple pieces and fresh mint", preis: 7.90 },
      { nr: "603", name: "Ananas-Minze", menge: { de: "0,3 l", en: "0.3 l" }, de: "Ananassaft, Ananasstücke und frische Minze", en: "pineapple juice, pineapple pieces and fresh mint", preis: 7.90 }
    ]
  },
  {
    titel: { de: "Cocktails & Aperitifs", en: "Cocktails & aperitifs" },
    gerichte: [
      { nr: "630", name: "Mojito", de: "Bacardi Rum, Limettensaft, Minze, Rohrzucker und Sodawasser", en: "Bacardi rum, lime juice, mint, cane sugar and soda water", preis: 8.00 },
      { nr: "631", name: "Anh Em Mojito", de: "vietnamesischer Reisschnaps, Limettensaft, Minze, Rohrzucker und Sodawasser", en: "Vietnamese rice spirit, lime juice, mint, cane sugar and soda water", preis: 8.00 },
      { nr: "632", name: "Singapore Sling", de: "Gin, Cherry Brandy, Grenadine, Limettensaft und Fernet Branca", en: "gin, cherry brandy, grenadine, lime juice and Fernet Branca", preis: 8.00 },
      { nr: "633", name: "Long Island Ice Tea", allergene: "1, 10", de: "Tequila, Wodka, Rum, Gin und Cola", en: "tequila, vodka, rum, gin and cola", preis: 8.00 },
      { nr: "634", name: "Anh Em Mule", de: "Wodka, Ingwer, Limetten und Ingwersirup", en: "vodka, ginger, lime and ginger syrup", preis: 8.00 },
      { nr: "635", name: "Prosecco", menge: { de: "0,1 l", en: "0.1 l" }, de: "", en: "", preis: 3.50 },
      { nr: "636", name: "Hugo", menge: { de: "0,2 l", en: "0.2 l" }, de: "", en: "", preis: 6.00 }
    ]
  },
  {
    titel: { de: "Wein", en: "Wine" },
    gerichte: [
      { name: "Silvaner", de: "Weißwein", en: "white wine", varianten: [v("", "0,2 l", "0.2 l", 6.00), v("", "0,75 l", "0.75 l", 19.50)] },
      { name: "Freschello Bianco", de: "Weißwein", en: "white wine", varianten: [v("", "0,2 l", "0.2 l", 5.00), v("", "0,75 l", "0.75 l", 16.50)] },
      { name: "Lugana", de: "Weißwein", en: "white wine", varianten: [v("", "0,2 l", "0.2 l", 7.00), v("", "0,75 l", "0.75 l", 22.50)] },
      { name: "Roche Mazet", de: "Rotwein", en: "red wine", varianten: [v("", "0,2 l", "0.2 l", 6.00), v("", "0,75 l", "0.75 l", 19.50)] },
      { name: "Brave Italian Growers", de: "Rotwein", en: "red wine", varianten: [v("", "0,2 l", "0.2 l", 6.00), v("", "0,75 l", "0.75 l", 19.50)] },
      { name: "Freschello Italia", de: "Rosé", en: "rosé", varianten: [v("", "0,2 l", "0.2 l", 6.00), v("", "0,75 l", "0.75 l", 19.50)] }
    ]
  },
  {
    titel: { de: "Bier", en: "Beer" },
    gerichte: [
      { name: "Vom Fass", de: "", en: "draught beer", varianten: [v("", "0,3 l", "0.3 l", 3.50), v("", "0,5 l", "0.5 l", 5.50)] },
      { name: "Bayreuther Hell", de: "", en: "", preis: 4.00 },
      { name: "Maisel's Weisse", de: "", en: "", preis: 4.00 },
      { name: "Maisel's Weisse alkoholfrei", de: "", en: "alcohol-free", preis: 4.00 },
      { name: "Bayreuther Zwick'l", de: "", en: "", preis: 4.00 },
      { name: "Radler", de: "", en: "shandy", preis: 4.00 },
      { name: "Pils", de: "", en: "", preis: 4.00 },
      { name: "Cola-Weizen", de: "", en: "wheat beer with cola", preis: 4.00 },
      { name: "Saigon Bier", menge: { de: "0,33 l", en: "0.33 l" }, de: "aus Vietnam", en: "from Vietnam", preis: 4.90 },
      { name: "Kopfüber-Bier", menge: { de: "0,5 l", en: "0.5 l" }, de: "„Upside down“: asiatisches Bier mit Sprite, Ananas und Cranberrysaft", en: "“upside down”: Asian beer with Sprite, pineapple and cranberry juice", preis: 6.90 }
    ]
  }
];

/* Gruppen: welche Kategorien unter welcher Zwischenüberschrift stehen.
   Die Namen müssen genau wie oben bei titel.de geschrieben sein. */
window.SPEISEKARTE_GRUPPEN = [
  {
    titel: { de: "Küche", en: "Kitchen" },
    kategorien: ["Suppen", "Vorspeisen", "Bowls", "Vegetarisch", "Vietnamesische Küche"]
  },
  {
    titel: { de: "Sushi", en: "Sushi" },
    kategorien: ["Maki", "Nigiri", "Aburi Nigiri", "Inside-Out-Rolls", "Vegetarische Rolls",
                 "Tempura-Rolls", "Anh Em Special Rolls", "Sashimi", "Sushi-Sets", "Sushi-Platten"]
  },
  { titel: { de: "Desserts", en: "Desserts" }, kategorien: ["Desserts"] },
  {
    titel: { de: "Getränke", en: "Drinks" },
    getraenke: true, // der Vegetarisch-Filter gilt hier nicht
    kategorien: ["Hausgemachte Limonaden", "Säfte, Lassis & Shakes", "Cocktails & Aperitifs", "Wein", "Bier"]
  }
];

/* Allergene (Buchstaben) und Zusatzstoffe (Zahlen), wie auf der gedruckten Karte.
   Werden unter der Speisekarte als Legende angezeigt. */
window.ALLERGENE = {
  A: { de: "Eier", en: "eggs" },
  B: { de: "Fisch", en: "fish" },
  C: { de: "Krebstiere (Schalentiere)", en: "crustaceans (shellfish)" },
  D: { de: "Milch", en: "milk" },
  E: { de: "Sellerie", en: "celery" },
  F: { de: "Sesam", en: "sesame" },
  G: { de: "Sulfite", en: "sulphites" },
  H: { de: "Erdnüsse", en: "peanuts" },
  I: { de: "Gluten", en: "gluten" },
  J: { de: "Lupinen", en: "lupin" },
  K: { de: "Schalenfrüchte (Nüsse)", en: "tree nuts" },
  L: { de: "Senf", en: "mustard" },
  M: { de: "Soja", en: "soy" },
  N: { de: "Weichtiere", en: "molluscs" },
  O: { de: "Fischsoße", en: "fish sauce" },
  P: { de: "Hühnerbrühe", en: "chicken broth" }
};
window.ZUSATZSTOFFE = {
  1: { de: "mit Farbstoff", en: "with colouring" },
  2: { de: "mit Konservierungsstoff", en: "with preservatives" },
  3: { de: "mit Antioxidationsmittel", en: "with antioxidant" },
  4: { de: "mit Geschmacksverstärker", en: "with flavour enhancer" },
  5: { de: "geschwefelt", en: "sulphurated" },
  6: { de: "geschwärzt", en: "blackened" },
  7: { de: "mit Phosphat", en: "with phosphate" },
  8: { de: "mit Milcheiweiß", en: "with milk protein" },
  9: { de: "koffeinhaltig", en: "contains caffeine" },
  10: { de: "chininhaltig", en: "contains quinine" },
  11: { de: "mit Süßungsmitteln", en: "with sweeteners" },
  12: { de: "enthält eine Phenylalaninquelle", en: "contains a source of phenylalanine" },
  13: { de: "gewachst", en: "waxed" },
  14: { de: "mit Nitritpökelsalz", en: "with nitrite curing salt" },
  15: { de: "mit Taurin", en: "with taurine" },
  16: { de: "mit Tartrazin", en: "with tartrazine" }
};

const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Category = require("./models/Category");
const Floor = require("./models/Floor");
const Shop = require("./models/Shop");
const Product = require("./models/Product");
const Offer = require("./models/Offer");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Floor.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Offer.deleteMany({});
    console.log("Existing data cleared.");

    // Create Admin User
    const admin = await User.create({
      name: "Admin User",
      email: "admin@supermall.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin user created:", admin.email);

    // Create Categories
    const categories = await Category.create([
      { name: "Electronics", icon: "📱", description: "Latest gadgets and electronics", order: 1 },
      { name: "Fashion", icon: "👗", description: "Trendy clothing and accessories", order: 2 },
      { name: "Food & Dining", icon: "🍕", description: "Restaurants and food courts", order: 3 },
      { name: "Sports & Fitness", icon: "⚽", description: "Sports equipment and gear", order: 4 },
      { name: "Home & Living", icon: "🏠", description: "Home decor and furniture", order: 5 },
      { name: "Beauty & Health", icon: "💄", description: "Beauty products and wellness", order: 6 },
      { name: "Books & Stationery", icon: "📚", description: "Books, office supplies", order: 7 },
      { name: "Jewelry", icon: "💎", description: "Fine jewelry and watches", order: 8 },
    ]);
    console.log(`${categories.length} categories created.`);

    // Create Floors
    const floors = await Floor.create([
      { name: "Ground Floor", number: 0, description: "Main entrance, Food Court, Information Desk" },
      { name: "First Floor", number: 1, description: "Fashion, Beauty, Jewelry stores" },
      { name: "Second Floor", number: 2, description: "Electronics, Home & Living" },
      { name: "Third Floor", number: 3, description: "Entertainment, Sports, Cinema" },
    ]);
    console.log(`${floors.length} floors created.`);

    // Create Shops
    const shops = await Shop.create([
      {
        name: "TechZone",
        description: "Your one-stop destination for the latest smartphones, laptops, and gaming gear.",
        category: categories[0]._id,
        floor: floors[2]._id,
        location: "Unit A-201",
        shopNumber: "201",
        contactPhone: "+91 98765 43210",
        contactEmail: "techzone@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.5,
        totalRatings: 256,
      },
      {
        name: "Fashion Hub",
        description: "Premium fashion brands for men, women, and kids. Latest trends at best prices.",
        category: categories[1]._id,
        floor: floors[1]._id,
        location: "Unit B-101",
        shopNumber: "101",
        contactPhone: "+91 98765 43211",
        contactEmail: "fashionhub@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.3,
        totalRatings: 189,
      },
      {
        name: "Pizza Paradise",
        description: "Authentic Italian pizzas made fresh with premium ingredients.",
        category: categories[2]._id,
        floor: floors[0]._id,
        location: "Food Court - FC01",
        shopNumber: "FC01",
        contactPhone: "+91 98765 43212",
        contactEmail: "pizza@supermall.com",
        openingTime: "11:00",
        closingTime: "22:00",
        rating: 4.7,
        totalRatings: 423,
      },
      {
        name: "SportsMart",
        description: "Complete sports equipment and fitness gear from top brands.",
        category: categories[3]._id,
        floor: floors[3]._id,
        location: "Unit C-301",
        shopNumber: "301",
        contactPhone: "+91 98765 43213",
        contactEmail: "sports@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.4,
        totalRatings: 167,
      },
      {
        name: "Home Elegance",
        description: "Elegant home decor, furniture, and lifestyle products.",
        category: categories[4]._id,
        floor: floors[2]._id,
        location: "Unit A-202",
        shopNumber: "202",
        contactPhone: "+91 98765 43214",
        contactEmail: "homeelegance@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.2,
        totalRatings: 134,
      },
      {
        name: "Glow Beauty",
        description: "Premium cosmetics, skincare, and beauty treatments.",
        category: categories[5]._id,
        floor: floors[1]._id,
        location: "Unit B-102",
        shopNumber: "102",
        contactPhone: "+91 98765 43215",
        contactEmail: "glowbeauty@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.6,
        totalRatings: 298,
      },
      {
        name: "Book World",
        description: "Vast collection of books, stationery, and educational supplies.",
        category: categories[6]._id,
        floor: floors[0]._id,
        location: "Unit A-001",
        shopNumber: "001",
        contactPhone: "+91 98765 43216",
        contactEmail: "bookworld@supermall.com",
        openingTime: "10:00",
        closingTime: "20:00",
        rating: 4.8,
        totalRatings: 512,
      },
      {
        name: "Jewels & Time",
        description: "Exquisite jewelry and luxury watches from renowned brands.",
        category: categories[7]._id,
        floor: floors[1]._id,
        location: "Unit B-103",
        shopNumber: "103",
        contactPhone: "+91 98765 43217",
        contactEmail: "jewels@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.9,
        totalRatings: 87,
      },
      {
        name: "Urban Outfitters",
        description: "Modern street wear and accessories for the youth.",
        category: categories[1]._id,
        floor: floors[1]._id,
        location: "Unit B-105",
        shopNumber: "105",
        contactPhone: "+91 98765 43220",
        contactEmail: "urban@supermall.com",
        openingTime: "10:00",
        closingTime: "22:00",
        rating: 4.1,
        totalRatings: 112,
      },
      {
        name: "Gadget Garage",
        description: "Repairs and accessories for all your tech gadgets.",
        category: categories[0]._id,
        floor: floors[2]._id,
        location: "Unit A-205",
        shopNumber: "205",
        contactPhone: "+91 98765 43221",
        contactEmail: "repair@supermall.com",
        openingTime: "11:00",
        closingTime: "20:00",
        rating: 4.0,
        totalRatings: 85,
      },
      {
        name: "Burger King",
        description: "Flame-grilled burgers and fast food favorites.",
        category: categories[2]._id,
        floor: floors[0]._id,
        location: "Food Court - FC05",
        shopNumber: "FC05",
        contactPhone: "+91 98765 43222",
        contactEmail: "bk@supermall.com",
        openingTime: "10:00",
        closingTime: "23:00",
        rating: 4.5,
        totalRatings: 543,
      },
      {
        name: "Fitness First",
        description: "Premium gym equipment and supplements store.",
        category: categories[3]._id,
        floor: floors[3]._id,
        location: "Unit C-305",
        shopNumber: "305",
        contactPhone: "+91 98765 43223",
        contactEmail: "fitness@supermall.com",
        openingTime: "08:00",
        closingTime: "22:00",
        rating: 4.6,
        totalRatings: 92,
      },
      {
        name: "Cozy Corner",
        description: "Comfortable bedding, cushions and home textiles.",
        category: categories[4]._id,
        floor: floors[2]._id,
        location: "Unit A-206",
        shopNumber: "206",
        contactPhone: "+91 98765 43224",
        contactEmail: "cozy@supermall.com",
        openingTime: "10:00",
        closingTime: "21:00",
        rating: 4.3,
        totalRatings: 67,
      },
      {
        name: "ElectroWorld",
        description: "Premium home entertainment systems and high-end appliances.",
        category: categories[0]._id,
        floor: floors[2]._id,
        location: "Unit A-210",
        shopNumber: "210",
        contactPhone: "+91 98765 43225",
        contactEmail: "electroworld@supermall.com",
        openingTime: "10:00",
        closingTime: "21:30",
        rating: 4.8,
        totalRatings: 142,
      },
    ]);
    console.log(`${shops.length} shops created.`);

    // Create Offers
    const offers = await Offer.create([
      {
        title: "New Year Electronics Sale",
        description: "Up to 40% off on all electronics!",
        discountType: "percentage",
        discountValue: 40,
        shop: shops[0]._id,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-01-31"),
        minPurchaseAmount: 5000,
        maxDiscountAmount: 10000,
      },
      {
        title: "Fashion Fiesta",
        description: "Flat 50% off on winter collection!",
        discountType: "percentage",
        discountValue: 50,
        shop: shops[1]._id,
        startDate: new Date("2026-01-10"),
        endDate: new Date("2026-02-28"),
        minPurchaseAmount: 2000,
        maxDiscountAmount: 5000,
      },
      {
        title: "Buy 1 Get 1 Free",
        description: "On all pizzas every Tuesday!",
        discountType: "percentage",
        discountValue: 50,
        shop: shops[2]._id,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-12-31"),
        minPurchaseAmount: 500,
      },
      {
        title: "Sports Season Sale",
        description: "Get ₹1000 off on sports equipment!",
        discountType: "fixed",
        discountValue: 1000,
        shop: shops[3]._id,
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-02-15"),
        minPurchaseAmount: 3000,
      },
      {
        title: "End of Season Sale",
        description: "Clearance sale on all denim wear!",
        discountType: "percentage",
        discountValue: 60,
        shop: shops[8]._id,
        startDate: new Date("2026-01-20"),
        endDate: new Date("2026-02-20"),
        minPurchaseAmount: 1500,
      },
      {
        title: "Whopper Wednesday",
        description: "Get a free Whopper on orders above ₹500",
        discountType: "percentage",
        discountValue: 100,
        shop: shops[10]._id,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-12-31"),
        minPurchaseAmount: 500,
        maxDiscountAmount: 200,
      },
    ]);
    console.log(`${offers.length} offers created.`);

    // Create Products
    const products = await Product.create([
      {
        name: "iPhone 15 Pro Max",
        description: "Latest Apple flagship with titanium design and A17 Pro chip.",
        price: 149900,
        originalPrice: 159900,
        category: categories[0]._id,
        shop: shops[0]._id,
        brand: "Apple",
        stock: 25,
        rating: 4.8,
        totalRatings: 156,
        hasOffer: true,
        offer: offers[0]._id,
        specifications: new Map([
          ["Display", "6.7-inch Super Retina XDR"],
          ["Processor", "A17 Pro Bionic"],
          ["Camera", "48MP Triple Camera"],
          ["Storage", "256GB"],
        ]),
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description: "AI-powered smartphone with titanium frame and S Pen.",
        price: 134999,
        originalPrice: 144999,
        category: categories[0]._id,
        shop: shops[0]._id,
        brand: "Samsung",
        stock: 30,
        rating: 4.7,
        totalRatings: 203,
        hasOffer: true,
        offer: offers[0]._id,
        specifications: new Map([
          ["Display", "6.8-inch Dynamic AMOLED"],
          ["Processor", "Snapdragon 8 Gen 3"],
          ["Camera", "200MP Quad Camera"],
          ["Storage", "256GB"],
        ]),
      },
      {
        name: "MacBook Pro 16-inch",
        description: "Powerful laptop for professionals with M3 Pro chip.",
        price: 249900,
        originalPrice: 269900,
        category: categories[0]._id,
        shop: shops[0]._id,
        brand: "Apple",
        stock: 15,
        rating: 4.9,
        totalRatings: 89,
        hasOffer: true,
        offer: offers[0]._id,
        specifications: new Map([
          ["Display", "16.2-inch Liquid Retina XDR"],
          ["Processor", "Apple M3 Pro"],
          ["RAM", "18GB"],
          ["Storage", "512GB SSD"],
        ]),
      },
      {
        name: "Premium Winter Jacket",
        description: "Stylish and warm winter jacket with water-resistant fabric.",
        price: 4999,
        originalPrice: 9999,
        category: categories[1]._id,
        shop: shops[1]._id,
        brand: "WinterWear",
        stock: 50,
        rating: 4.5,
        totalRatings: 78,
        hasOffer: true,
        offer: offers[1]._id,
        specifications: new Map([
          ["Material", "Polyester with Down Fill"],
          ["Sizes", "S, M, L, XL, XXL"],
          ["Colors", "Black, Navy, Olive"],
        ]),
      },
      {
        name: "Designer Silk Saree",
        description: "Handwoven pure silk saree with intricate zari work.",
        price: 12999,
        originalPrice: 25999,
        category: categories[1]._id,
        shop: shops[1]._id,
        brand: "Ethnic Elegance",
        stock: 20,
        rating: 4.8,
        totalRatings: 45,
        hasOffer: true,
        offer: offers[1]._id,
        specifications: new Map([
          ["Material", "Pure Kanchipuram Silk"],
          ["Length", "6.3 meters"],
          ["Blouse Piece", "Included"],
        ]),
      },
      {
        name: "Margherita Pizza",
        description: "Classic Italian pizza with fresh mozzarella and basil.",
        price: 299,
        originalPrice: 349,
        category: categories[2]._id,
        shop: shops[2]._id,
        brand: "Pizza Paradise",
        stock: 100,
        rating: 4.6,
        totalRatings: 234,
        hasOffer: true,
        offer: offers[2]._id,
        specifications: new Map([
          ["Size", "Medium (10 inch)"],
          ["Crust", "Thin Crust / Hand Tossed"],
          ["Toppings", "Mozzarella, Basil, Tomato Sauce"],
        ]),
      },
      {
        name: "Professional Cricket Bat",
        description: "Grade A English willow cricket bat for professionals.",
        price: 8999,
        originalPrice: 11999,
        category: categories[3]._id,
        shop: shops[3]._id,
        brand: "SportsPro",
        stock: 25,
        rating: 4.7,
        totalRatings: 67,
        hasOffer: true,
        offer: offers[3]._id,
        specifications: new Map([
          ["Material", "Grade A English Willow"],
          ["Weight", "1150-1200 grams"],
          ["Handle", "Singapore Cane"],
        ]),
      },
      {
        name: "Premium Running Shoes",
        description: "Lightweight running shoes with advanced cushioning.",
        price: 6999,
        originalPrice: 8999,
        category: categories[3]._id,
        shop: shops[3]._id,
        brand: "Nike",
        stock: 40,
        rating: 4.5,
        totalRatings: 123,
        hasOffer: true,
        offer: offers[3]._id,
        specifications: new Map([
          ["Upper", "Mesh Breathable"],
          ["Sole", "Rubber with Air Cushion"],
          ["Sizes", "6-12 UK"],
        ]),
      },
      {
        name: "Modern Sofa Set",
        description: "3-seater premium fabric sofa with wooden frame.",
        price: 45999,
        originalPrice: 59999,
        category: categories[4]._id,
        shop: shops[4]._id,
        brand: "Home Elegance",
        stock: 10,
        rating: 4.4,
        totalRatings: 34,
        specifications: new Map([
          ["Material", "Premium Fabric + Solid Wood"],
          ["Seating", "3+1+1 Seater"],
          ["Color", "Grey / Beige / Brown"],
        ]),
      },
      {
        name: "Premium Skincare Set",
        description: "Complete skincare routine with cleanser, toner, and moisturizer.",
        price: 2999,
        originalPrice: 4999,
        category: categories[5]._id,
        shop: shops[5]._id,
        brand: "GlowUp",
        stock: 60,
        rating: 4.6,
        totalRatings: 189,
        specifications: new Map([
          ["Includes", "Cleanser, Toner, Serum, Moisturizer"],
          ["Skin Type", "All Skin Types"],
          ["Quantity", "4 x 100ml"],
        ]),
      },
      {
        name: "Bestseller Novel Collection",
        description: "Set of 5 international bestseller novels.",
        price: 1499,
        originalPrice: 2499,
        category: categories[6]._id,
        shop: shops[6]._id,
        brand: "Book World",
        stock: 100,
        rating: 4.8,
        totalRatings: 276,
        specifications: new Map([
          ["Books", "5 Bestseller Novels"],
          ["Format", "Paperback"],
          ["Language", "English"],
        ]),
      },
      {
        name: "Diamond Solitaire Ring",
        description: "Elegant 1 carat diamond solitaire in 18k white gold.",
        price: 89999,
        originalPrice: 99999,
        category: categories[7]._id,
        shop: shops[7]._id,
        brand: "Jewels & Time",
        stock: 5,
        rating: 4.9,
        totalRatings: 23,
        specifications: new Map([
          ["Diamond", "1 Carat, VS1, G Color"],
          ["Metal", "18K White Gold"],
          ["Certification", "IGI Certified"],
        ]),
      },
      {
        name: "Slim Fit Ripped Jeans",
        description: "Trendy slim fit jeans with stylish rips.",
        price: 2499,
        originalPrice: 4999,
        category: categories[1]._id,
        shop: shops[8]._id,
        brand: "Urban Outfitters",
        stock: 80,
        rating: 4.3,
        totalRatings: 56,
        hasOffer: true,
        offer: offers[4]._id,
        specifications: new Map([
          ["Material", "Denim"],
          ["Fit", "Slim Fit"],
          ["Color", "Light Blue"],
        ]),
      },
      {
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for all Qi-enabled devices.",
        price: 1999,
        originalPrice: 2999,
        category: categories[0]._id,
        shop: shops[9]._id,
        brand: "TechGuard",
        stock: 45,
        rating: 4.2,
        totalRatings: 32,
        specifications: new Map([
          ["Output", "15W"],
          ["Compatibility", "Qi-Enabled Devices"],
          ["Color", "Black"],
        ]),
      },
      {
        name: "Chicken Whopper",
        description: "Signature flame-grilled chicken burger.",
        price: 199,
        originalPrice: 249,
        category: categories[2]._id,
        shop: shops[10]._id,
        brand: "Burger King",
        stock: 200,
        rating: 4.7,
        totalRatings: 890,
        hasOffer: true,
        offer: offers[5]._id,
        specifications: new Map([
          ["Size", "Regular"],
          ["Calories", "600 kcal"],
          ["Type", "Non-Veg"],
        ]),
      },
      {
        name: "Whey Protein Isolate",
        description: "Premium whey protein isolate for muscle recovery.",
        price: 5499,
        originalPrice: 6999,
        category: categories[3]._id,
        shop: shops[11]._id,
        brand: "Optimum Nutrition",
        stock: 35,
        rating: 4.8,
        totalRatings: 145,
        specifications: new Map([
          ["Weight", "5 lbs"],
          ["Flavor", "Double Rich Chocolate"],
          ["Servings", "74"],
        ]),
      },
      {
        name: "Memory Foam Pillow",
        description: "Ergonomic memory foam pillow for neck support.",
        price: 1499,
        originalPrice: 2499,
        category: categories[4]._id,
        shop: shops[12]._id,
        brand: "SleepWell",
        stock: 60,
        rating: 4.5,
        totalRatings: 98,
        specifications: new Map([
          ["Material", "Memory Foam"],
          ["Cover", "Washable Cotton"],
          ["Size", "Standard"],
        ]),
      },
      {
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones.",
        price: 29990,
        originalPrice: 34990,
        category: categories[0]._id,
        shop: shops[13]._id,
        brand: "Sony",
        stock: 15,
        rating: 4.9,
        totalRatings: 320,
        specifications: new Map([
          ["Type", "Over-ear"],
          ["Battery", "30 hours"],
          ["Charging", "USB-C Fast Charge"],
        ]),
      },
      {
        name: "iPad Pro 12.9-inch",
        description: "Brilliant Liquid Retina XDR display and M2 chip.",
        price: 112900,
        originalPrice: 119900,
        category: categories[0]._id,
        shop: shops[13]._id,
        brand: "Apple",
        stock: 12,
        rating: 4.8,
        totalRatings: 85,
        specifications: new Map([
          ["Display", "Liquid Retina XDR"],
          ["Processor", "Apple M2"],
          ["Storage", "128GB"],
        ]),
      },
      {
        name: "Dell XPS 15",
        description: "Stunning 4K OLED display and powerful performance for creators.",
        price: 185000,
        originalPrice: 195000,
        category: categories[0]._id,
        shop: shops[13]._id,
        brand: "Dell",
        stock: 8,
        rating: 4.7,
        totalRatings: 42,
        specifications: new Map([
          ["Processor", "Intel Core i9"],
          ["RAM", "32GB"],
          ["Graphics", "NVIDIA RTX 4060"],
        ]),
      },
      {
        name: "PlayStation 5",
        description: "Lightning-fast loading with an ultra-high-speed SSD.",
        price: 54990,
        originalPrice: 54990,
        category: categories[0]._id,
        shop: shops[13]._id,
        brand: "Sony",
        stock: 20,
        rating: 4.9,
        totalRatings: 1240,
        specifications: new Map([
          ["CPU", "Custom 8-core AMD Zen 2"],
          ["GPU", "AMD Radeon RDNA 2"],
          ["Storage", "825GB SSD"],
        ]),
      },
    ]);
    console.log(`${products.length} products created.`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📌 Admin Credentials:");
    console.log("   Email: admin@supermall.com");
    console.log("   Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

const checkAndCreateAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin account already exists.");
      return;
    }

    await User.create({
      name: "Admin User",
      email: "admin@supermall.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin account created successfully.");
    console.log("Email: admin@supermall.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error checking/creating admin:", error);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { seedData, checkAndCreateAdmin };

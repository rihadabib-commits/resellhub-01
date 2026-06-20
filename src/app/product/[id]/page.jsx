export default async function ProductDetails({ params }) {
  const { id } = await params;

  const products = [
    {
      id: 1,
      title: "Ergo-Vertical Wireless Mouse",
      category: "TECH",
      price: "$85.00",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    },
    {
      id: 2,
      title: "Studio Pro ANC Headphones",
      category: "AUDIO",
      price: "$210.00",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
  ];
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-slate-800 mt-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="font-semibold">{product.rating}</span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mt-6">
            {product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Premium quality product with modern design, excellent performance,
            and long-lasting durability. Perfect for professionals and everyday
            users.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
              Add To Cart
            </button>

            <button className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

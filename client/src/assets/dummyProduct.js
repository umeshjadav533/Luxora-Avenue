const userOrders = {
  user: {
    id: "U1001",
    name: "Umesh Jadav",
    phone: "9876543210",
    email: "umesh@gmail.com"
  },
  orders: [
    {
      orderId: "ORD2001",
      items: [
        {
          id: 1,
          title: "Men Printed T-Shirt",
          brand: "Roadster",
          size: "M",
          price: 499,
          quantity: 2,
          image: "https://example.com/tshirt.jpg"
        }
      ],
      payment: { method: "UPI", status: "Paid" },
      priceDetails: { total: 938 },
      orderStatus: "Delivered"
    },
    {
      orderId: "ORD2004",
      items: [
        {
          id: 4,
          title: "Wireless Headphones",
          brand: "Boat",
          price: 1499,
          quantity: 1
        }
      ],
      payment: { method: "Cash on Delivery", status: "Pending" },
      orderStatus: "On the Way"
    },
    {
      orderId: "ORD2002",
      items: [
        {
          id: 2,
          title: "Slim Fit Jeans",
          brand: "Levis",
          size: "32",
          price: 1299,
          quantity: 1
        }
      ],
      payment: { method: "Cash on Delivery", status: "Pending" },
      orderStatus: "Cancelled"
    },
    {
      orderId: "ORD2003",
      items: [
        {
          id: 3,
          title: "Running Shoes",
          brand: "Puma",
          size: "9",
          price: 1999,
          quantity: 1
        }
      ],
      payment: { method: "Cash", status: "Refunded" },
      orderStatus: "Returned"
    }
  ]
};

export default userOrders;

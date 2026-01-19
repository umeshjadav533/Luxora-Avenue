import { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import { Squircle } from "lucide-react";

const OrderPage = () => {
  const { currency, userOrders } = useContext(StoreContext);
  const [statusFilter, setStatusFilter] = useState([]);
  const [search, setSearch] = useState("");

  const orders = userOrders?.orders || []; // safe fallback

  const filteredOrders = orders.filter((order) => {
    const matchStatus =
      statusFilter.length === 0 || statusFilter.includes(order.orderStatus);

    const matchSearch =
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      userOrders.user?.name?.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const handleStatusChange = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  console.log(filteredOrders);
  return (
    <>
      <div className="mt-[80px] h-full p-6 grid grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="col-span-1 bg-white rounded-2xl shadow-md p-5">
          <h3 className="mb-4 text-lg font-semibold">Order Status</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {["On the Way", "Delivered", "Cancelled", "Returned"].map(
              (status) => (
                <li key={status}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      onChange={() => handleStatusChange(status)}
                    />
                    <span>{status}</span>
                  </label>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Orders List */}
        <div className="col-span-3 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>

          {/* Search bar */}
          <div className="flex w-full mb-4">
            <input
              type="text"
              placeholder="Search Your orders here"
              className="p-2 border border-slate-300 outline-none rounded-md w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Order List */}
          <ul className="flex flex-col gap-3 mt-4">
            {filteredOrders.map((order) => (
              <li
                key={order.orderId}
                className="grid grid-cols-3 gap-4 items-center p-3 border-2 border-slate-400">
                {/* Product */}
                <div className="grid grid-cols-2 gap-2 items-center">
                  <Link to={`/product/${order.items[0].id}`}>
                    <img
                      src={order.items[0].image}
                      className="w-20 h-20 object-cover"
                    />
                  </Link>
                  <ul className="text-sm font-medium">
                    <li>
                      <span className="text-slate-500">ORDERID:</span> 
                      <b>{order.orderId}</b>
                    </li>
                    <li>{order.items[0].title}</li>
                  </ul>
                </div>

                {/* Price */}
                <span className="font-semibold text-center">
                  {currency}
                  {order.items[0].price}
                </span>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    {order.orderStatus === "Delivered" && (
                      <>
                        <Squircle className="fill-green-500 stroke-none w-3 h-3" />
                        <span>{order.deliveryDate}</span>
                      </>
                    )}

                    {order.orderStatus === "On the Way" && (
                      <>
                        <Squircle className="fill-yellow-500 stroke-none w-3 h-3" />
                        <span>{order.expectedDelivery}</span>
                      </>
                    )}

                    {order.orderStatus === "Cancelled" && (
                      <>
                        <Squircle className="fill-red-500 stroke-none w-3 h-3" />
                        <span>{order.cancelledDate}</span>
                      </>
                    )}

                    {order.orderStatus === "Returned" && (
                      <>
                        <Squircle className="fill-blue-500 stroke-none w-3 h-3" />
                        <span>{order.returnDate}</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs">
                    {order.orderStatus === "Delivered" && (
                      <span className="text-green-600">
                        Your item has been delivered
                      </span>
                    )}
                    {order.orderStatus === "On the Way" && (
                      <span className="text-yellow-600">
                        Your item is on the way
                      </span>
                    )}
                    {order.orderStatus === "Cancelled" && (
                      <span className="text-red-600">
                        Your order has been cancelled
                      </span>
                    )}
                    {order.orderStatus === "Returned" && (
                      <span className="text-blue-600">
                        Your item has been returned
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

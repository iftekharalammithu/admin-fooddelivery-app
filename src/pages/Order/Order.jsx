import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../admin_assets/assets";
const Order = ({ url }) => {
  const [order, setorder] = useState([]);

  const fatchallorder = async () => {
    try {
      const response = await axios.get(url + "api/order/list");
      if (response.data.success) {
        setorder(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const statushandler = async (event, orderid) => {
    try {
      const response = await axios.post(url + "api/order/status", {
        orderid,
        status: event.target.value,
      });
      if (response.data.success) {
        await fatchallorder();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fatchallorder();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    " ," +
                    order.address.state +
                    " ," +
                    order.address.country +
                    " ," +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Item:{order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={order.status}
              onChange={(event) => statushandler(event, order._id)}
              className="order-item-select"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

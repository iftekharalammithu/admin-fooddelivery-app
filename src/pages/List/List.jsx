import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setlist] = useState();

  const fatchlist = async () => {
    try {
      const response = await axios.get(`${url}api/food/list`);
      // console.log(url);
      if (response.data.success) {
        setlist(response.data.data);
      } else {
        toast.error("Error To Get Data");
      }
    } catch (error) {
      toast.error("Server Not Responding !");
    }
  };

  const removeitem = async (foodid) => {
    const response = await axios.delete(`${url}api/food/remove`, {
      data: { id: foodid },
    });
    await fatchlist();
    if (response.data.success) {
      toast.success("Item Delete Successfully!");
    } else {
      toast.error("Error!!");
    }
  };

  useEffect(() => {
    fatchlist();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="all-food-list">All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list ? (
          list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img src={`${url}image/${item.image} `} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeitem(item._id)} className="cursor">
                  X
                </p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default List;

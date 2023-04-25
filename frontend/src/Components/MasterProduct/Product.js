import React, { useEffect, useState } from "react";
import { Text, Modal, Card } from "@nextui-org/react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import SearchProduct from "./SearchProduct";
import { Button } from "@material-ui/core";
import AddProduct from "./AddProduct/AddProduct";

const Product = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [category, selectedcat] = useState("Snacks");

  const selectedCategory = (selCat) => {
    selectedcat(selCat);
  };
  console.log(category);

  const filteredProducts = products.filter((cat) => cat.Category === category);

  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const isDeleted = query.get("delete");

  useEffect(() => {
    axios
      .get("http://localhost:3030/product")
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/product");
  }, [isDeleted, isAdded]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/product/${id}`)
      .then((response) => {
        console.log("Resource deleted successfully");
        // remove deleted resource from state
      })
      .catch((error) => {
        console.log("Error deleting resource: " + error);
      });
    navigate("/product?delete=true");
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end align-items-end mb-3">
          <div className="col-3">
            <SearchProduct selectedCategory={selectedCategory} />
          </div>
          <div className="">
            <AddProduct />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            isHoverable
            variant="bordered"
            css={{ mw: "400px", mr: "20px", mb: "20px" }}
          >
            <Card.Body>
              <div style={{ display: "flex", "flex-direction": "row" }}>
                <Text className="pro-id">Product ID: </Text>
                <Text style={{ display: "inline" }}>{product.id}</Text>
              </div>
              <div style={{ display: "flex", "flex-direction": "row" }}>
                <Text className="pro-id">Name: </Text>
                <Text>{product.ItemName} </Text>
              </div>

              <Text className="pro-id">Brand: </Text>
              <Text>{product.Supplier}</Text>
              <Text className="pro-id">Amount:</Text>
              <Text> ${product.Amount}</Text>
              <div key={product.id}>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
            <Outlet />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Product;

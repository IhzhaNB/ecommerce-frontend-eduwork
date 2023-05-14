import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
// import { addToCart } from "../../features/cartSlice";

const Order = () => {
  const params = useParams();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );

        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [params.id]);

  return (
    <StyledOrders>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <OrdersContainer>
            <h2>Order Details</h2>
            <p>
              Delivery status:
              {order.delivery_status === "pending" ? (
                <Pending>Pending</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>Dispatched</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>Delivered</Delivered>
              ) : (
                "error"
              )}
            </p>

            <h3>Ordered Products</h3>
            <Items>
              {order.products?.map((product, index) => {
                <Item key={index}>
                  <span>{product.description}</span>
                  <span>{product.quantity}</span>
                  <span>
                    {"$" + (product.amount_total / 100).toLocaleString()}
                  </span>
                </Item>;
              })}
            </Items>
            <div>
              <h3>Total Price</h3>
              <p>{"$" + (order.total / 100).toLocaleString()}</p>
            </div>
            <div>
              <h3>Shipping Details</h3>
              <p>Customer: {order.shipping?.name}</p>
              <p>City: {order.shipping?.address.city}</p>
              <p>Email: {order.shipping?.email}</p>
            </div>
          </OrdersContainer>
        </>
      )}
    </StyledOrders>
  );
};

export default Order;

const StyledOrders = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  p {
    display: flex;
  }
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.div`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

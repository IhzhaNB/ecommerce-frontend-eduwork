import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { productsDelete } from "../../../features/productsSlice";
import EditProduct from "../EditProduct";

export default function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        image: item.image.url,
        name: item.name,
        desc: item.desc,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.image} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "desc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/product/${params.row.id}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
    // console.log("deleting");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(114, 224, 40);
`;

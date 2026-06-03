import API from "./api";

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await API.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(
    `/products/${id}`
  );

  return response.data;
};

export const uploadProductImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await API.post(
    "/products/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
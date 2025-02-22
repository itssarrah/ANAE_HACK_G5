// src/api.js

const apiUrl = "http://127.0.0.1:5000/api";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error uploading file.");
  }
};

export const generateEmbeddings = async () => {
  try {
    const response = await fetch(`${apiUrl}/generate_embeddings`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error generating embeddings.");
  }
};

export const loadCleanedEmbeddings = async () => {
  try {
    const response = await fetch(`${apiUrl}/load_cleaned_embeddings`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error loading cleaned embeddings.");
  }
};

export const filterCommercialActivities = async () => {
  try {
    const response = await fetch(`${apiUrl}/filter_commercial_activities`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error filtering commercial activities.");
  }
};

export const filterUnmatchedActivities = async () => {
  try {
    const response = await fetch(`${apiUrl}/filter_unmatched_activities`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error filtering unmatched activities.");
  }
};

export const cluster = async () => {
  try {
    const response = await fetch(`${apiUrl}/cluster`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error clustering activities.");
  }
};

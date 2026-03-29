export const uploadImageToCloudinary = async (imageFile) => {

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "shopper_img_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dueaa41z7/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
};
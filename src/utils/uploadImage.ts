import { uploadFile } from "../api";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await uploadFile(formData);
  return res;
}

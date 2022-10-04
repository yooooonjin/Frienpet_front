import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/dyw8drzjh/image/upload';

export const onUpload = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file[0]);
  formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY!);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!
  );
  const result = await axios.post(url, formData);
  return result;
};

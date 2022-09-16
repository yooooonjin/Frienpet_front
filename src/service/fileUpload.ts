import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/dyw8drzjh/image/upload';

export const onUpload = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file[0]);
  formData.append('api_key', '673969612791577');
  formData.append('upload_preset', 'sdlwmuh7');
  const result = await axios.post(url, formData);
  return result;
};

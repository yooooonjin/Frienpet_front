import React, { ChangeEvent, useCallback, useState } from 'react';
import { onUpload } from '../service/fileUpload';

type ReturnTypes<T> = [
  T,
  (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void,
  () => void
];

const useInput = <T>(initialForm: T): ReturnTypes<T> => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(
    async (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      let { name, value } = e.target;

      switch (name) {
        case 'photo': //이미지 url 업로드
          const { files } = e.target as HTMLInputElement;
          const result = await onUpload(files);
          value = result.data.url;
          break;
      }
      setForm((form) => ({ ...form, [name]: value }));
    },
    []
  );

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useInput;

'use client';

import { Button } from 'node_modules/@material-tailwind/react';
import { uploadFile } from 'actions/storageActions';
import { useRef } from 'react';
import { queryClient } from 'config/ReactQueryClientProvider';
import { useMutation } from '@tanstack/react-query';

export default function FileDragDropZone() {
  const fileRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const file = fileRef.current.files?.[0];
        console.log(file);
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const result = await uploadImageMutation.mutateAsync(formData);
          console.log(result);
        }
      }}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center"
    >
      <input ref={fileRef} type="file" className="" />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <Button loading={uploadImageMutation.isPending} type="submit">
        파일 업로드
      </Button>
    </form>
  );
}

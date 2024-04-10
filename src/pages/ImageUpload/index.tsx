import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";

export default function ImageUpload(props) {
  const { value, onChange } = props;
  const [img, setImg] = useState(value || "");

  console.log(img, props);

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = async () => {
    const file = inputRef.current?.files?.[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImg(e.target?.result);
    };
    fileReader.readAsDataURL(file!);
    const res = await uploadImage(file!);
    onChange(res.data);
  };

  useEffect(() => {
    setImg(value);
  }, [value]);

  return (
    <div className="image-upload-wrapper">
      {img ? (
        <div className="preview-wrapper">
          <img src={img} alt="" className="preview-image" />
        </div>
      ) : (
        <div className="upload-wrapper">
          <input type="file" onChange={onInputChange} ref={inputRef} />
        </div>
      )}
    </div>
  );
}

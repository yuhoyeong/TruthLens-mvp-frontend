import { useState } from "react";
import Field from "@/components/Legal/Fields";
import Textarea from "@/components/Legal/Textarea";
import Button from "@/components/Button";
import ImagePreview from "@/components/Dashboard/ImagePreview";

export default function Form() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const isFormValid = [company, name, email, phone, detail].every(
    (value) => value.trim().length > 0,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <div>
      <section className="bg-white border border-neutral-90 rounded-xl p-8">
        <h2 className="text-headline-2 text-neutral-10 mb-8">상담 신청</h2>

        <form className="space-y-6">
          <Field
            company={company}
            name={name}
            email={email}
            phone={phone}
            onCompanyChange={setCompany}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
          />

          <Textarea value={detail} onChange={setDetail} />

          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700"
            >
              이미지 업로드
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
            />
            {image && <ImagePreview file={image} />}
          </div>
        </form>
      </section>

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        className="mt-8 bg-neutral-98 text-neutral-60 border-neutral-90 rounded-xl"
        disabled={!isFormValid}
      >
        상담 신청하기
      </Button>
    </div>
  );
}

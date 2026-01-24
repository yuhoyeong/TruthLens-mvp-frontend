import { useState } from "react";
import Field from "@/components/Legal/Fields";
import Textarea from "@/components/Legal/Textarea";
import Button from "@/components/Button";

export default function Form() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");

  const isFormVaild = [company, name, email, phone, detail].every(
    (value) => value.trim().length > 0,
  );

  return (
    <div>
      <section className="bg-white border border-neutral-90 rounded-xl p-8">
        <h2 className="text-headline-2 text-neutral-10 mb-8">상담 신청</h2>

        <form className="space-y-6">
          {/* input fields */}
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

          {/* detail field */}
          <Textarea value={detail} onChange={setDetail} />
        </form>
      </section>

      {/* Submit Button */}
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        className="mt-8 bg-neutral-98 text-neutral-60 border-neutral-90 rounded-xl"
        disabled={!isFormVaild}
      >
        상담 신청하기
      </Button>
    </div>
  );
}
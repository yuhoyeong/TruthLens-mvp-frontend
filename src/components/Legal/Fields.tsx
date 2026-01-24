import Input from "@/components/Legal/Input";

type FieldProps = {
  company: string;
  name: string;
  email: string;
  phone: string;
  onCompanyChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}

export default function Field({
  company, 
  name, 
  email, 
  phone, 
  onCompanyChange, 
  onNameChange, 
  onEmailChange,
  onPhoneChange
}: FieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="text-label-1-n text-neutral-10 block mb-2">
          회사명 <span className="text-error text-red-500">*</span>
        </label>
        <Input placeholder="회사명을 입력해주세요." value={company} onChange={(e) => onCompanyChange(e.target.value)} />
      </div>
      <div>
        <label className="text-label-1-n text-neutral-10 block mb-2">
          담당자 성함 <span className="text-error text-red-500">*</span>
        </label>
        <Input placeholder="담당자 성함을 입력해주세요." value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        <label className="text-label-1-n text-neutral-10 block mb-2">
          이메일 <span className="text-error text-red-500">*</span>
        </label>
        <Input type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => onEmailChange(e.target.value)} />
      </div>
      <div>
        <label className="text-label-1-n text-neutral-10 block mb-2">
          연락처 <span className="text-error text-red-500">*</span>
        </label>
        <Input type="tel" placeholder="연락처를 입력해주세요." value={phone} onChange={(e) => onPhoneChange(e.target.value)} />
      </div>
    </div>
  );
}
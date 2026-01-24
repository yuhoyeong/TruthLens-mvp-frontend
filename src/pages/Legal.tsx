import Button from "@/components/Button";
import Input from "@/components/Legal/Input";
import { useState } from "react";

export default function Legal() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");

  const isFormVaild =
    company.trim() &&
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    detail.trim();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-heading-1 text-neutral-10">법률 상담소</h1>
        <p className="text-body-1-r text-neutral-50 mt-2">
          AI 생성 콘텐츠 관련 법적 분쟁에 대해 전문 변호사와 상담하세요.
        </p>
      </header>

      <section className="bg-white border border-neutral-90 rounded-xl p-8">
        <h2 className="text-headline-2 text-neutral-10 mb-8">상담 신청</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-label-1-n text-neutral-10 block mb-2">
                회사명 <span className="text-error text-red-500">*</span>
              </label>
              <Input placeholder="회사명을 입력해주세요." value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="text-label-1-n text-neutral-10 block mb-2">
                담당자 성함 <span className="text-error text-red-500">*</span>
              </label>
              <Input placeholder="담당자 성함을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-label-1-n text-neutral-10 block mb-2">
                이메일 <span className="text-error text-red-500">*</span>
              </label>
              <Input type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-label-1-n text-neutral-10 block mb-2">
                연락처 <span className="text-error text-red-500">*</span>
              </label>
              <Input type="tel" placeholder="연락처를 입력해주세요." value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-label-1-n text-neutral-10 block mb-2">
              상담 내용 <span className="text-error text-red-500">*</span>
            </label>
            <textarea
              className="w-full text-label-2 text-neutral-10 placeholder:text-neutral-60 outline-none bg-white rounded-2xl border border-neutral-90 p-4 min-h-[180px] resize-none"
              placeholder="상담이 필요한 사안에 대해 간략하게 설명해주세요. (분석 결과, 발생한 문제 상황 등)" value={detail} onChange={(e) => setDetail(e.target.value)}
            />
          </div>
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

import Form from "@/components/Legal/Form";

export default function Legal() {

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      {/* header */}
      <header className="mb-10">
        <h1 className="text-heading-1 text-neutral-10">법률 상담소</h1>
        <p className="text-body-1-r text-neutral-50 mt-2">
          AI 생성 콘텐츠 관련 법적 분쟁에 대해 전문 변호사와 상담하세요.
        </p>
      </header>

      {/* input form */}
      <Form />
    </div>
  );
}

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Textarea({ value, onChange }: TextareaProps) {
  return (
    <div>
      <label className="text-label-1-n text-neutral-10 block mb-2">
        상담 내용 <span className="text-error text-red-500">*</span>
      </label>
      <textarea
        className="w-full text-label-2 text-neutral-10 placeholder:text-neutral-60 outline-none bg-white rounded-2xl border border-neutral-90 p-4 min-h-[180px] resize-none"
        placeholder="상담이 필요한 사안에 대해 간략하게 설명해주세요. (분석 결과, 발생한 문제 상황 등)" value={value} onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
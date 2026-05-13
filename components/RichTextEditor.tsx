"use client";

import dynamic from "next/dynamic";

const CkeditorField = dynamic(() => import("./CkeditorField"), {
  ssr: false,
  loading: () => (
    <div className="min-h-40 rounded-md border border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
      Loading editor...
    </div>
  ),
});

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  return <CkeditorField value={value} onChange={onChange} />;
}

"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  Underline,
} from "ckeditor5";

type CkeditorFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CkeditorField({
  value,
  onChange,
}: CkeditorFieldProps) {
  return (
    <div className="ckeditor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Heading,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Link,
            List,
          ],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "undo",
            "redo",
          ],
        }}
        onChange={(_, editor) => onChange(editor.getData())}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { API_URL } from "../config/api";

// Essential Styles
import "ckeditor5/ckeditor5.css";

import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Code,
  BlockQuote,
  Essentials,
  Heading,
  Image,
  ImageToolbar,
  ImageUpload,
  ImageCaption,
  ImageStyle,
  ImageResize,
  Link,
  List,
  TodoList,
  Paragraph,
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
  FileRepository,
  CodeBlock,
  HorizontalLine,
  Indent,
  IndentBlock,
  Alignment,
  Font,
  MediaEmbed,
  Highlight,
  RemoveFormat,
} from "ckeditor5";

import type { Editor } from "ckeditor5";

function CustomUploadAdapterPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: { file: Promise<File | null> }) => {
    return {
      upload: async () => {
        const file = await loader.file;
        if (!file) {
          throw new Error("No file provided");
        }
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");
        const data = await response.json();

        return { default: data.url };
      },
      abort: () => {},
    };
  };
}

type TextEditorProps = {
  onChangeContent: (content: string) => void;
  fetchedContent: string | undefined;
};

export default function TextEditor({ onChangeContent, fetchedContent }: TextEditorProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (fetchedContent !== undefined) {
      setContent(fetchedContent);
    }
  }, [fetchedContent]);
  return (
    <div className="text-editor-container">
      <div className="ck-content">
        <CKEditor
          editor={ClassicEditor}
          config={{
            licenseKey: "GPL",

            plugins: [
              // Core Logic
              Essentials,
              Autoformat,
              Paragraph,
              Heading,

              // Text Formatting
              Bold,
              Italic,
              Underline,
              Strikethrough,
              Subscript,
              Superscript,
              RemoveFormat,

              // Typography & Colors
              Font,
              Highlight,
              Alignment,

              // Block Elements
              List,
              TodoList,
              BlockQuote,
              Code,
              CodeBlock,
              HorizontalLine,
              Indent,
              IndentBlock,

              // Media & Links
              Link,
              MediaEmbed,
              Table,
              TableToolbar,
              TableCellProperties,
              TableProperties,

              // Image Handling
              Image,
              ImageToolbar,
              ImageUpload,
              ImageCaption,
              ImageStyle,
              ImageResize,
              FileRepository,
            ],

            extraPlugins: [CustomUploadAdapterPlugin],

            toolbar: {
              items: [
                "heading",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "highlight",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "subscript",
                "superscript",
                "code",
                "removeFormat",
                "|",
                "alignment",
                "|",
                "bulletedList",
                "numberedList",
                "todoList",
                "outdent",
                "indent",
                "|",
                "link",
                "imageUpload",
                "mediaEmbed",
                "insertTable",
                "blockQuote",
                "codeBlock",
                "horizontalLine",
                "|",
                "undo",
                "redo",
              ],
              shouldNotGroupWhenFull: true,
            },

            table: {
              contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableProperties",
                "tableCellProperties",
              ],
            },

            image: {
              toolbar: [
                "imageStyle:inline",
                "imageStyle:block",
                "imageStyle:side",
                "|",
                "toggleImageCaption",
                "imageTextAlternative",
              ],
            },

            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h2",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h3",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h4",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
          }}
          data={content}
          onChange={(_, editor) => {
            const data = editor.getData();
            onChangeContent(data);
            setContent(data);
          }}
        />
      </div>
    </div>
  );
}

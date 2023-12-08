import {
  useState,
  useMemo,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./custom_quill_editor.css";
import { uploadImg } from "@/utils/uploadImg";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: ImageResize } = await import(
      "quill-image-resize-module-react"
    );
    RQ.Quill.register("modules/imageResize", ImageResize);
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <div>에디터 불러오는중...</div> }
);

interface IEditor {
  placeholder: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function Editor({ content, setContent, placeholder }: IEditor) {
  const quillRef = useRef<any>();

  useEffect(() => {
    if (quillRef && quillRef.current) {
      console.log(quillRef.current.editor);
      //   editor.on('text-change', function(delta, source) {
      //   editorContainer.style.height = editor.root.ownerDocument.body.scrollHeight + 'px';
      // });)
    }
  }, []);

  const imageHandler = () => {
    console.log("이미지 버튼 클릭해서 이미지 넣기");
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();

    // 이미지 업로드해서 이미지 가져와야함
    input.onchange = async (event: any) => {
      const file: File = event?.target?.files[0];
      const data = await uploadImg(file);

      // 에디터 객체 가져오기
      const editor = quillRef.current.getEditor();
      // 현재 데이터 커서 위치 가져오기
      const range = editor.getSelection();
      // 가져온 위치(editor.insertEmbed)에 이미지 삽입, 세번째 파라미터에 넣어주면된다.
      editor.insertEmbed(range.index, "image", data.url);
    };
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  return (
    <ReactQuill
      className="editor_wrap"
      forwardedRef={quillRef}
      placeholder={placeholder}
      modules={{ ...modules }}
      formats={formats}
      theme="snow"
      value={content}
      onChange={setContent}
    />
  );
}

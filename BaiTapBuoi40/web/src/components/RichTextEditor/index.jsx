import { useEffect, useRef } from "react";
import FormatBoldOutlined from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlined from "@mui/icons-material/FormatItalicOutlined";
import FormatUnderlinedOutlined from "@mui/icons-material/FormatUnderlinedOutlined";
import TitleOutlined from "@mui/icons-material/TitleOutlined";
import FormatListBulletedOutlined from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import LinkOutlined from "@mui/icons-material/LinkOutlined";
import FormatClearOutlined from "@mui/icons-material/FormatClearOutlined";

import styles from "./RichTextEditor.module.css";

// Chỉ dùng các lệnh sinh ra đúng những thẻ backend cho phép
// (backend/utils/sanitize.py: p, br, strong, b, em, i, u, h3, ul, ol, li, a).
// Lệnh nào tạo ra style/class đều bị strip khi lưu nên không đưa vào đây.
const TOOLS = [
    { command: "bold", label: "Đậm", Icon: FormatBoldOutlined },
    { command: "italic", label: "Nghiêng", Icon: FormatItalicOutlined },
    { command: "underline", label: "Gạch chân", Icon: FormatUnderlinedOutlined },
    { command: "formatBlock", value: "<h3>", label: "Tiêu đề", Icon: TitleOutlined },
    { command: "insertUnorderedList", label: "Danh sách chấm", Icon: FormatListBulletedOutlined },
    { command: "insertOrderedList", label: "Danh sách số", Icon: FormatListNumberedOutlined },
    { command: "createLink", label: "Chèn liên kết", Icon: LinkOutlined },
    { command: "removeFormat", label: "Xoá định dạng", Icon: FormatClearOutlined },
];

function RichTextEditor({ id, value, onChange, placeholder }) {
    const editorRef = useRef(null);

    // Chỉ ghi vào DOM khi nội dung thực sự khác. Set innerHTML ở mỗi lần render
    // sẽ đẩy con trỏ về đầu sau từng ký tự vừa gõ.
    useEffect(() => {
        const editor = editorRef.current;
        if (editor && value !== editor.innerHTML) {
            editor.innerHTML = value ?? "";
        }
    }, [value]);

    function emitChange() {
        onChange(editorRef.current?.innerHTML ?? "");
    }

    function runCommand(tool) {
        editorRef.current?.focus();

        if (tool.command === "createLink") {
            const url = window.prompt("Nhập liên kết (bắt đầu bằng http:// hoặc https://)");
            if (!url) return;
            document.execCommand("createLink", false, url);
        } else {
            document.execCommand(tool.command, false, tool.value);
        }

        emitChange();
    }

    // Dán từ Word hay trang web khác kéo theo style/class mà backend strip hết,
    // ra kết quả khó đoán — nên chỉ nhận phần chữ thuần.
    function handlePaste(event) {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
        emitChange();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>
                {TOOLS.map((tool) => (
                    <button
                        key={tool.command + (tool.value ?? "")}
                        type="button"
                        className={styles.toolButton}
                        title={tool.label}
                        aria-label={tool.label}
                        // Giữ focus lại cho vùng soạn thảo: mất focus thì
                        // execCommand không còn vùng chọn để tác động.
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand(tool)}
                    >
                        <tool.Icon className={styles.toolIcon} />
                    </button>
                ))}
            </div>

            <div
                id={id}
                ref={editorRef}
                className={styles.editor}
                contentEditable
                suppressContentEditableWarning
                role="textbox"
                aria-multiline="true"
                data-placeholder={placeholder}
                onInput={emitChange}
                onBlur={emitChange}
                onPaste={handlePaste}
            />
        </div>
    );
}

export default RichTextEditor;

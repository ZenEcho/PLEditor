
// function handleChange() {
//     const editor = tinymce.get('editor');
//     const textContent = localStorage.editorMode === 'default' ? editor.getContent() : marked.parse(editor.getContent({ format: 'text' }));
//     localStorage.setItem("previewHTML", textContent);
// }


document.addEventListener("DOMContentLoaded", () => {


    const openNewPreviewCheckbox = document.getElementById("openNewPreview");
    const previewUpdateCheckbox = document.getElementById("previewUpdate");
    // 初始化复选框状态
    const loadCheckboxState = () => {
        const { openNewPreview, previewUpdate } = localStorage;
        openNewPreviewCheckbox.checked = openNewPreview === "true";
        previewUpdateCheckbox.checked = previewUpdate === "true";
    };


    // 保存复选框状态到 localStorage
    const saveCheckboxState = (checkbox, key) => {
        tinymce.get('editor').execCommand("mceNewWindowPreview")
        loadCheckboxState();
    };

    // 添加复选框的 change 事件监听器
    openNewPreviewCheckbox.addEventListener("change", () => {
        saveCheckboxState(openNewPreviewCheckbox, "openNewPreview");
    });

    previewUpdateCheckbox.addEventListener("change", () => {
        saveCheckboxState(previewUpdateCheckbox, "previewUpdate");
    });
    document.getElementById("popup-icon").addEventListener("mouseover", () => {
        document.getElementById("popup-item").style.display = "block";
        document.getElementById("popup-icon").classList.add("active");
        loadCheckboxState();
    });
    document.getElementById("popup-item").addEventListener("mouseleave", () => {
        document.getElementById("popup-item").style.display = "none";
        document.getElementById("popup-icon").classList.remove("active");
    });
    // 加载并保存状态
    loadCheckboxState();
});

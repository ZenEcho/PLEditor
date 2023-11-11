if (!localStorage.editorMode) {
    localStorage.editorMode = "markdown"
}

document.addEventListener("DOMContentLoaded", function () {
    let tinymceConfig = {
        selector: '#editor',
        min_height: 500,
        max_height: 700,
        language: 'zh-Hans',
        menu: {
            file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview newwindowpreview fullscreen | showcomments' },
            insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
            table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
        },
        draggable_modal: true,
        plugins: 'newwindowpreview quickbars formatpainter preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount emoticons autosave  autoresize',
        content_css: "resource/css/content.css",
        toolbar: [
            "code restoredraft undo redo |bold italic underline strikethrough hr insertdatetime removeformat |link image media |indent outdent alignjustify align lineheight bullist numlist|charmap emoticons  preview",
            "forecolor backcolor formatpainter fontsize blocks fontfamily",
        ],
        quickbars_selection_toolbar: 'bold italic formatpainter forecolor backcolor align| blockquote link table',
        quickbars_insert_toolbar: '',
        contextmenu: "underline strikethrough hr fontsize emoticons removeformat  tabledelete table preview",
        font_size_formats: '11px 12px 14px 16px 18px 20px 24px 26px 28px 36px 48px 56px 72px',
        formats: {
            pre: { block: 'pre', classes: 'language-markup' },
            code: { inline: 'code' }
        },
        setup: function (editor) {
            editor.on('change', function (e) {
                tinymce.activeEditor.save();
            });
        },
        branding: false,
        font_family_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
    }
    let editorMode = localStorage.editorMode
    function initTiny(Config, callback) {
        tinymce.init({
            ...Config,
            setup: function (editor) {
                editor.on('init', function () {
                    if (typeof callback === 'function') {
                        callback(editor);
                    }
                });
            }
        });
    }

    function destroyTiny() {
        if (tinymce.activeEditor) {
            tinymce.activeEditor.destroy();
        }
    }

    document.querySelectorAll(".toggle-switch-button").forEach(function (e) {
        e.addEventListener('click', function () {
            let value = e.getAttribute('value');
            localStorage.editorMode = value;
            switchToggle(value)
        });
    });
    switchToggle(editorMode)
    function switchToggle(value) {
        let slider = document.getElementById('slider');
        if (value === 'default') {
            slider.style.left = '0';
            destroyTiny();
            tinymceConfig.text_patterns = [
                { start: '*', end: '*', format: 'italic' },
                { start: '**', end: '**', format: 'bold' },
                { start: '`', end: '`', format: ['pre', 'code'] },
                { start: '#', format: 'h1' },
                { start: '##', format: 'h2' },
                { start: '###', format: 'h3' },
                { start: '####', format: 'h4' },
                { start: '#####', format: 'h5' },
                { start: '######', format: 'h6' },
                { start: '---', replacement: '<hr/>' },
                { start: '1. ', cmd: 'InsertOrderedList' },
                { start: '* ', cmd: 'InsertUnorderedList' },
                { start: '- ', cmd: 'InsertUnorderedList' },
                { start: "> ", cmd: "mceBlockQuote" },

            ];
            initTiny(tinymceConfig, () => {
                // previewUpdateLoading()
            });
        } else {
            slider.style.left = 'calc(100% - 50%)';
            destroyTiny();
            tinymceConfig.text_patterns = false;
            initTiny(tinymceConfig, () => {
                // previewUpdateLoading()
            });
        }
    }

    // 延迟1秒运行代码

});

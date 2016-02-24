var BiblioTagDialog = {
	preInit : function() {
		var url;

		tinyMCEPopup.requireLangPack();

	},

	init : function(ed) {
		var f = document.forms[0], nl = f.elements, ed = tinyMCEPopup.editor, dom = ed.dom, n = ed.selection.getNode();

		tinyMCEPopup.resizeToInnerSize();
		TinyMCE_EditableSelects.init();

	},

	insert : function() {
		var ed = tinyMCEPopup.editor, t = this, f = document.forms[0];

		if (f.citekey.value === '') {
			tinyMCEPopup.close();
			return;
		}

		t.insertAndClose();
	},

	insertAndClose : function() {
		var ed = tinyMCEPopup.editor, f = document.forms[0], nl = f.elements, v, args = {}, el, tagname;

		tinyMCEPopup.restoreSelection();

		// Fixes crash in Safari
		if (tinymce.isWebKit)
			ed.getWin().focus();
		el = ed.selection.getNode();
		if (f.inline.value=="1") {
			tagname = "ibib";
		} else {
			tagname = "bib";
		}
		ed.execCommand('mceInsertContent', false, "["+tagname+"]"+f.citekey.value+"[/"+tagname+"]", {skip_undo : 1});
		ed.undoManager.add();
	

		tinyMCEPopup.editor.execCommand('mceRepaint');
		tinyMCEPopup.editor.focus();
		tinyMCEPopup.close();
	},



};

BiblioTagDialog.preInit();
tinyMCEPopup.onInit.add(BiblioTagDialog.init, BiblioTagDialog);

<!--
var wedFolderManager =
{
		MaxFolderCount  : null,
		ObjTable		: null,
		ObjLayer		: null,
		ObjNameText		: null,	
		ObjListForm		: null,
		Init			: function ()
		{
			this.MaxFolderCount = 5;
			this.ObjTable  = $('#folderList');
			this.ObjNameText  = $('#folderName');
			this.ObjListForm = $('#folderListForm');
		}, 
		
		ADD				: function ()
		{
			var folderName = this.ObjNameText.val();
			
			if(folderName.length == 0) {
				alert('추가할 견적서 폴더명을 입력해 주세요');
				this.ObjNameText.focus();
				return;
			}
			
			this.InsertRow('', folderName);
		},
		
		InsertRow		: function (folderSeq,folderName)
		{
			var sElement = '<li class="modify">';
			sElement += '<label for="estimateItem1"><input type="text" name="aFolderName[]" value="'+ folderName +'" readonly="readonly" /></label>';
			sElement += '<p class="posRight"><span class="dui-lib-button-set01 duiBtnType2">';
			sElement += '<button type="button" onclick="wedFolderManager.MODIFY(this);">수정</button>';
			sElement += '</span><span class="dui-lib-button-set01 duiBtnType2">';
			sElement += '<button type="button" onclick="wedFolderManager.DELETE(this);">삭제</button></span></p>';
			sElement += '<p class="posRight modifyButton"><span class="dui-lib-button-set01 duiBtnType2">';
			sElement += '<button type="button" onclick="wedFolderManager.MODIFY(this);">수정</button></span>';
			sElement += '<span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedFolderManager.DELETE(this);">삭제</button>';
			sElement += '</span></p>';
			sElement += '<input type="hidden" name="aFolderSeq[]" value="'+ folderSeq +'" /></li>';
			this.ObjTable.append(sElement);
			this.ObjNameText.val('');
		},
	
		DELETE			: function (oObj)
		{
				$(oObj).parents('li').remove();
		},
		
		MODIFY			: function (oObj)
		{
			this.ObjTable.children('li').removeClass('modify');
			var oOrtherText = this.ObjTable.children('li').children('label')
				.children('input:text')	
				.each(function(i) {
				$(this).attr("readonly", true);
			});
			
			
			var oParent = $(oObj).parents('li');
			var oText = oParent.children('label').children('input:text');
			oText.removeAttr("readonly");
			oParent.addClass('modify');
		},
		
		SUBMIT			: function ()
		{
			if(!confirm("변경된 내용을 저장 하시겠습니까?"))
				return;
			$.post('wedFolderSave.php', this.ObjListForm.serialize(), 
					function(data) {
						
						if(data == "ok"){
							alert('저장 되었습니다.')
							$("div.manageButton").removeClass("popopen");
							$('.saveEstimateButton').parent().parent().removeClass("saveopen");
							location.reload();
						}else{
							alert(data);
						}
					}
			)
		}
}
//-->
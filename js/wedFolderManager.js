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
				alert('�߰��� ������ �������� �Է��� �ּ���');
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
			sElement += '<button type="button" onclick="wedFolderManager.MODIFY(this);">����</button>';
			sElement += '</span><span class="dui-lib-button-set01 duiBtnType2">';
			sElement += '<button type="button" onclick="wedFolderManager.DELETE(this);">����</button></span></p>';
			sElement += '<p class="posRight modifyButton"><span class="dui-lib-button-set01 duiBtnType2">';
			sElement += '<button type="button" onclick="wedFolderManager.MODIFY(this);">����</button></span>';
			sElement += '<span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedFolderManager.DELETE(this);">����</button>';
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
			if(!confirm("����� ������ ���� �Ͻðڽ��ϱ�?"))
				return;
			$.post('wedFolderSave.php', this.ObjListForm.serialize(), 
					function(data) {
						
						if(data == "ok"){
							alert('���� �Ǿ����ϴ�.')
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
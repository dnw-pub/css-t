<!--
var NewProductList =
{
	NewProdCount: 0,
	delay		: 3800,
	lock		: false,
	curProd		: 0,
	run			: null,
	lay_obj		: '',
	arr_name	: '',

	init		: function (delay,obj)
	{
		this.arr_name		= MAIN_newProduct.prodList;
		this.NewProdCount	= this.arr_name.length - 1;

		if(delay>0) this.delay	= delay;
		this.lay_obj			= obj;
	},

	drawProduct	: function (idx)
	{
		var lay		= document.getElementById(this.lay_obj);
		var pcode	= parseInt(this.arr_name[idx].prodCode);
		var img		= new Image();
		var html	= '';
		var prodImg = this.arr_name[idx].prodImg_M;
		var pname	= this.arr_name[idx].prodName;
		var link	= this.arr_name[idx].prodURL;
		var price	= this.arr_name[idx].minPrice;

		/*
		if(	this.arr_name[idx].cateC1 == 860 ||
			this.arr_name[idx].cateC1 == 861 ||
			this.arr_name[idx].cateC1 == 862 ||
			this.arr_name[idx].cateC1 == 863 ||
			this.arr_name[idx].cateC1 == 864 ||
			this.arr_name[idx].cateC1 == 842)
		{
			link = "javascript:comright_new("+this.arr_name[idx].cateC1+","+this.arr_name[idx].cateC2+","+pcode+")";
		}
		else
		{
			link = "javascript:ProdView("+this.arr_name[idx].cateC1+","+this.arr_name[idx].cateC2+","+this.arr_name[idx].cateC3+","+this.arr_name[idx].cateC14+","+pcode+")";
		}
		prodImg += "http://img.danawa.com/prod_img/middle/group_" + ( Math.floor(pcode/500)); //한그룹 당 500번 단위별로 이미지가 저장됨
		prodImg +=  "/" + pcode + "_1.jpg";
		*/
		img.src = prodImg;

		if(price == '0')
		{
			price = '가격비교예정';
		}
		else
		{
			price = commaNum(price) + '원';
		}

		html += '<table width="178" border="0" cellspacing="0" cellpadding="0">\n';
		html += '<tr><td width="178" height="164" align="center" valign="middle"><a href="'+link+'"><img src="'+img.src+'" width="160" height="160" border="0"></a></td></tr>\n';
		html += '<tr><td background="http://img.danawa.com/new/main/bg_newpro02.gif" align="center" height="23" style="padding-top:3;"><a href="'+link+'" class="tit_ff">'+strcut_fix(pname,23,"...")+'</a></td></tr>\n';
		html += '<tr><td class="list_price" align="center" style="padding:6 0 4 0"><img src="http://img.danawa.com/new/main/btn_lowest.gif" align="absmiddle" style="margin:0 2 3 0"> '+price+'</td></tr>\n';
		html += '</table>\n';
		lay.innerHTML = html;
	},

	chgProduct	: function (side)
	{
		if(side == 'pre')	this.curProd = this.curProd-1;
		else				this.curProd = this.curProd+1;

		if(this.curProd > this.NewProdCount)	this.curProd = 0;
		if(this.curProd < 0)					this.curProd = this.NewProdCount;

		this.drawProduct(this.curProd);
	},

	slideAuto	: function ()
	{
		if (this.lock == true)
		{
			this.lock = false;
			window.clearInterval(this.run);
		}
		else
		{
			this.lock = true;
			this.run = setInterval("NewProductList.chgProduct('next')", this.delay);
		}
	}
}
//-->
/*
<a href="javascript:NewProductList.chgProduct('pre')">이전상품보기</a>
<a href="javascript:NewProductList.slideAuto()">Auto/Stop</a>
<a href="javascript:NewProductList.chgProduct('next')">다음상품보기</a>
*/
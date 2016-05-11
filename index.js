/*localStorage.setItem('todo','[{"title":"123","done":false},{"title":"123","done":false}]')*/
var text=document.querySelector('.navtext');
//console.log(text);
var btn=document.querySelector('nav .nav-list input[type=button]');
//console.log(btn);
var nowlist=document.querySelector('.now .list');
var nownum=document.querySelector('.now .num');
var conlist=document.querySelector('.con .list');
var connum=document.querySelector('.con .num');
var delall=document.querySelector('.delall');
document.onkeydown=function(e){
    if(e.keyCode==13){
    	if(text.value==''){
		alert("请输入待办事项");
		return;
	}
	var data=getData();
	data.push({title:text.value,done:false});
	text.value="";
	saveData(data);
	rewrite();
    }
}
btn.onclick=function(){
	if(text.value==''){
		alert("请输入待办事项");
		return;
	}
	var data=getData();
	data.push({title:text.value,done:false});
	text.value="";
	saveData(data);
	rewrite();
}
function  getData(){
	var data=JSON.parse(localStorage.getItem('todo'));
	return data||[];
}
function  saveData(data){
	localStorage.setItem('todo',JSON.stringify(data));
}
function changestate(id,state){
	var data=getData();
	data[id].done=state;
	saveData(data);
	rewrite();
}
function changetext(id,text){
	var data=getData();
	if(data[id].title==text){
		return;
	}
	data[id].title=text;
	saveData(data);
	rewrite();
}
function delData(id){
	var data=getData();
	data.splice(id,1);
	saveData(data);
	rewrite();
}
function rewrite(){
	var nstr="";
	var cstr="";
	var nnum=0;
	var cnum=0;
	var data=getData();
	data.forEach(function(o,i){
		if(o.done==false){
			nstr+="<li id="+i+"><div class='tiao'></div><input type='checkbox' onclick=changestate("+i+",true)><div class='cont' contenteditable=true onblur=changetext('+i+',this.innerHTML)>"+o.title+"</div><button onclick=delData("+i+")>×</button></li>";
			nnum++;
		}else{
			cstr+='<li id='+i+'><div class="tiao"></div><input type="checkbox" checked onclick=changestate('+i+',false)><div class="cont" contenteditable=true onblur=changetext('+i+',this.innerHTML)>'+o.title+'</div><button onclick=delData('+i+')>×</button></li>';
			cnum++;
		}
	})
	nowlist.innerHTML=nstr;
	conlist.innerHTML=cstr;
	nownum.innerHTML=nnum;
	connum.innerHTML=cnum;
}
delall.onclick=function(){
	localStorage.clear();
	rewrite();
}
rewrite();



instr="";
function insert(val){
    instr+=val;
    document.querySelector("#screen").innerHTML=instr;
}

function clr(){
    document.querySelector("#screen").innerHTML="";
    instr="";
}

function del(){
    let newval=document.querySelector("#screen").innerHTML;
    let editval=newval.slice(0,newval.length-1);
    document.querySelector("#screen").innerHTML=editval;
    instr=editval;
}

function evalu(){
    let newval=document.querySelector("#screen").innerHTML;
    let res=eval(newval);
    document.querySelector("#screen").innerHTML=res;
}
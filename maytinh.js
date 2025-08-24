function tinh_theo_id(){
    var a=document.getElementById("soA");
    var b=document.getElementById("soB");
    var ketqua=document.getElementById("ketqua");
    var pt=document.getElementById("pheptinh");
    if(a.value==""){
        alert("A rong");
        a.focus();
        return false;
    }
    if(b.value==""){
        alert("B rong");
        b.focus();
        return false;
    }
    var kq;
    switch(pt.value){
        case "cong":
            kq=parseInt(a.value)+parseInt(b.value);
            break;
        case "tru":
            kq=parseInt(a.value)-parseInt(b.value);
            break;
        case "nhan":
            kq=parseInt(a.value)*parseInt(b.value);
            break;
        case "chia":
            kq=parseInt(a.value)/parseInt(b.value);
            break;
        case "chiadu":
            kq=parseInt(a.value)%parseInt(b.value);
            break;
    }
    ketqua.value=kq;
}
function tinh_theo_id_co_tham_so(a,b,pt){
    var ketqua=document.getElementById("ketqua");
    if(a.value==""){
        alert("A rong");
        a.focus();
        return false;
    }
    if(b.value==""){
        alert("B rong");
        b.focus();
        return false;
    }
    var kq;
    switch(pt.value){
        case "cong":
            kq=parseInt(a.value)+parseInt(b.value);
            break;
        case "tru":
            kq=parseInt(a.value)-parseInt(b.value);
            break;
        case "nhan":
            kq=parseInt(a.value)*parseInt(b.value);
            break;
        case "chia":
            kq=parseInt(a.value)/parseInt(b.value);
            break;
        case "chiadu":
            kq=parseInt(a.value)%parseInt(b.value);
            break;
    }
    ketqua.value=kq;
}
function tinh_theo_name(){
    var a=document.maytinh.txtsoA;
    var b=document.maytinh.txtsoB;
    var ketqua=document.maytinh.txtketqua;
    var pt=document.maytinh.txtpheptinh;
    if(a.value==""){
        alert("A rong");
        a.focus();
        return false;
    }
    if(b.value==""){
        alert("B rong");
        b.focus();
        return false;
    }
    var kq;
    switch(pt.value){
        case "cong":
            kq=parseInt(a.value)+parseInt(b.value);
            break;
        case "tru":
            kq=parseInt(a.value)-parseInt(b.value);
            break;
        case "nhan":
            kq=parseInt(a.value)*parseInt(b.value);
            break;
        case "chia":
            kq=parseInt(a.value)/parseInt(b.value);
            break;
        case "chiadu":
            kq=parseInt(a.value)%parseInt(b.value);
            break;
    }
    ketqua.value=kq;
}

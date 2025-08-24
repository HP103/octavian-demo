function cau1(){
    var name=document.frmPhieudatphong.txtHoten;
    var cmnd=document.frmPhieudatphong.txtcmnd;
    if(name.value==""){
        alert("Ho ten khong duoc rong");
        name.focus();
        return false;
    }
    if(cmnd.value==""){
        alert("cmnd khong duoc rong");
        cmnd.focus();
        return false;
    }
    if(isNaN(cmnd.value)){
        alert("cmnd phai la so");
        cmnd.focus();
        return false;
    }
    return true;
}
function cau2(){
    var mg=document.frmPhieudatphong.cboMucgia;
    var an=document.frmPhieudatphong.chkAnsang;
    if(mg.value=="b" || mg.value=="c"){
        an.checked=true;
    }else if(mg.value=="a"){
        an.checked=false;
    }
}
function cau3(){
    var daythue=document.frmPhieudatphong.dateNgaythue;
    var daytra=document.frmPhieudatphong.dateNgaytra;
    var mucgia=document.frmPhieudatphong.cboMucgia;
    var ansang=document.frmPhieudatphong.chkAnsang.checked;
    var giatui=document.frmPhieudatphong.chkGiatui.checked;
    var bao=document.frmPhieudatphong.chkBaobuoisang.checked;
    var kq=document.frmPhieudatphong.txtTienthuephong;
    var cost;
    var dichvu=0;
    switch(mucgia.value){
        case "a":
            cost=150000;
            if(ansang)
                dichvu+=5;
            if(giatui)
                dichvu+=5;
            if(bao)
                dichvu+=5;
        break;
        case "b":
            cost=300000;
            if(giatui)
                dichvu+=5;
            if(bao)
                dichvu+=5;
        break;
        case "c":
            cost=500000;
            if(giatui)
                dichvu+=5;
            if(bao)
                dichvu+=5;
        break;
        
    }
    var day=1;
    var tonggia;
    if(daythue.value>daytra.value){
        alert("Ngay tra phai lon hon ngay thue");
    }else if(daythue.value<daytra.value){
        let date1=new Date(daythue.value);
        let date2=new Date(daytra.value);
        day=(date2-date1)/(1000*60*60*24);
        tonggia=day*cost;
    }else{
        tonggia=day*cost;
    }
    tonggia+=tonggia*dichvu/100;
    kq.value=tonggia;
}
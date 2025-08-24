
function register(user,pass,repass,address){
    if(user.value==""){
        alert("User Name không được để trống");
        user.focus();
        return false;
    }
    if(pass.value==""){
        alert("Password không được để trống");
        pass.focus();
        return false;
    }
    if(repass.value==""){
        alert("Password không được để trống");
        repass.focus();
        return false;
    }else if(pass.value.length<4){
        alert("Password không được dưới 4 kí tự");
        pass.focus();
        return false;
    }
    if(address.value==""){
        alert("Address không được để trống");
        address.focus();
        return false;
    }else if(repass.value!=pass.value){
        alert("Re-Password không giống Password bạn đặt");
        repass.focus();
        return false;
    }
}

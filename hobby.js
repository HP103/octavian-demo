function sothich(){
    var st=document.getElementById("st");
    var kq=document.getElementById("ketqua");
    switch(st.value){
        case "":
            kq.innerHTML=("");
            break;
        case "boiloi":
            kq.innerHTML=
            `
            <input type="radio" name="bl">Boi ech
            <input type="radio" name="bl">Boi lan
            `
            break;
        case "vothuat":
            kq.innerHTML=
            `
            <input type="radio" name="vt">Karate
            <input type="radio" name="vt">Judo
            `
            break;
    }
}
function cauhoi(){
    var nch=document.getElementById("nch");
    var kqnch=document.getElementById("kqnch");
    if(nch.value=="on"){
        kqnch.select();
        kqnch.removeAttribute('readonly');
    }
}
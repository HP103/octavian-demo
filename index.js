function thaydoi(obj){
    let bien1=obj.id;
    let bien2=document.getElementById("center");
    switch (bien1){
        case "tc":
            alert("abc");
            bien2.innerHTML="Day la trang chu";
            bien2.style.border="solid 3px red";
            break;
        case "lh":
            bien2.innerHTML="Day la lien he";
            bien2.style.border="solid 3px red";
            break;
        case "sp":
            bien2.innerHTML=
            `<div class="center-item">
                    <img src="img/SGU-LOGO.png">
                    <div>Ma SP</div>
                    <div>Ten SP</div>
                    <div>Gia</div>
                    <div>
                        <span>Mua</span>
                        <span>Chi tiet</span>
                    </div>
                </div>
                <div class="center-item">
                    <img src="img/SGU-LOGO.png">
                    <div>Ma SP</div>
                    <div>Ten SP</div>
                    <div>Gia</div>
                    <div>
                        <span>Mua</span>
                        <span>Chi tiet</span>
                    </div>
                </div>
                <div class="center-item">
                    <img src="img/SGU-LOGO.png">
                    <div>Ma SP</div>
                    <div>Ten SP</div>
                    <div>Gia</div>
                    <div>
                        <span>Mua</span>
                        <span>Chi tiet</span>
                    </div>
                </div>
                <div class="center-item">
                    <img src="img/SGU-LOGO.png">
                    <div>Ma SP</div>
                    <div>Ten SP</div>
                    <div>Gia</div>
                    <div>
                        <span>Mua</span>
                        <span>Chi tiet</span>
                    </div>
                </div>
                <div class="center-item">
                    <img src="img/SGU-LOGO.png">
                    <div>Ma SP</div>
                    <div>Ten SP</div>
                    <div>Gia</div>
                    <div>
                        <span>Mua</span>
                        <span>Chi tiet</span>
                    </div>
                </div>
            `
            break;
        case "dk":
            document.getElementsByClassName("model")[0].style.display="block";
            break;
        case "x":
            document.getElementsByClassName("model")[0].style.display="none";
            break;
    }
}
var productArray = [
    {productId:10042, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Stan Smith Green', price:2500000},
    {productId:10041, brandid:'nike', img:'img/SGU-LOGO.png', name:'Air max 1 Just do it', price:5700000},
    {productId:10040, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Superstar White Gold', price:2100000},
    {productId:10039, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Stan Smith Leather White', price:3030000},
    {productId:10038, brandid:'gucci', img:'img/SGU-LOGO.png', name:'Gucci Snake Diamond', price:18455000},
    {productId:10037, brandid:'gucci', img:'img/SGU-LOGO.png', name:'Gucci Sneaker Dirty', price:15000000},
    {productId:10036, brandid:'balenciaga',img:'img/SGU-LOGO.png', name:'Balenciaga Speed Trainer Triple Black', price:17050000},
    {productId:10035, brandid:'nike', img:'img/SGU-LOGO.png', name:'Vapormax X OFF WHITE 2018', price:7500000},
    {productId:10034, brandid:'nike', img:'img/SGU-LOGO.png', name:'AIR MAX 270 ALL WHITE', price:4319000},
    {productId:10033, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Human Race China Exclusive Green', price:10375000},
    {productId:10032, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Alpha Bounce Instinct All Black', price:4300000},
    {productId:10031, brandid:'gucci', img:'img/SGU-LOGO.png', name:'Gucci Global Sneaker', price:16050000},
    {productId:10000, brandid:'adidas', img:'img/SGU-LOGO.png', name:'Adidas Yeezy 350 v2 ‘ Oreo ‘ Rep', price:15000000},
    ];
const center=document.querySelector("#center")
const sp=document.querySelector("#sp")
//console.log(center)
sp.addEventListener("click",function(){
    var s="";
    for(i=0;i<productArray.length;i++){
        s=s+`<div class="center-item">
            <img id="myimg" src="${productArray[i].img}" width="100%">
            <div class="hinh">
            <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
            </div>
            <div>Ma SP: "${productArray[i].productId}"</div>
            <div>Tên SP: "${productArray[i].name}"</div>
            <div>Giá SP: "${productArray[i].price}"</div>
            <div>
            <span>Mua</span>
            <span>Chi tiết</span>
            <span onclick="change();">Thực hiện</span>
            </div>
            </div>`
    }
    center.innerHTML=s;
})
//console.log(left)
//Phan trang
let soluongsp1trang=4;
function sotrang(){
    var perpage=Math.ceil(productArray.length/soluongsp1trang);
    var a="";
    for(i=1;i<=perpage;i++){
        a=a+`<div onclick="ham(`+i+`)">`+i+`</div>`;
    }
    document.getElementById("sotrang").innerHTML=a;
}
function ham(num){
   var start=(num-1)*soluongsp1trang;
   var s="";
   var dem=1;
   for(i=start;i<productArray.length;i++){
        s=s+`<div class="center-item">
            <img id="myimg" src="${productArray[i].img}" width="100%">
            <div class="hinh">
            <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
            </div>
            <div>Ma SP: "${productArray[i].productId}"</div>
            <div>Tên SP: "${productArray[i].name}"</div>
            <div>Giá SP: "${productArray[i].price}"</div>
            <div>
            <span>Mua</span>
            <span>Chi tiết</span>
            <span onclick="change();">Thực hiện</span>
            </div>
            </div>`
        if(dem==soluongsp1trang){
            break;
        }else{
            dem++;
        }
   }
   center.innerHTML=s;
}
function taocenter(){
     var s="";
     var dem=1
     for(i=0;i<productArray.length;i++){
         s=s+`<div class="center-item">
             <img id="myimg" src="${productArray[i].img}" width="100%">
             <div class="hinh">
             <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
             </div>
             <div>Ma SP: "${productArray[i].productId}"</div>
             <div>Tên SP: "${productArray[i].name}"</div>
             <div>Giá SP: "${productArray[i].price}"</div>
             <div>
             <span>Mua</span>
             <span>Chi tiết</span>
             <span onclick="change();">Thực hiện</span>
             </div>
             </div>`
        if(dem==soluongsp1trang){
            sotrang();
            center.innerHTML=s;
            break;
        }else{
            dem++;
        }
     }
}
function taoleftmenu(){
    var brand=[
    {brandid:'adidas', brandname:"Giầy adidas"},
    {brandid:'nike', brandname:"Giầy nike"},
    {brandid:'gucci', brandname:"Giầy gucci"},
    {brandid:'balenciaga', brandname:"Giầy balenciaga"},
    ];
    var s="";
    for(i=0;i<brand.length;i++)
    {
        var a='<a href="#"><li id='+ brand[i].brandid +' onclick="hienthisanphamtheotheloai(this);">'+ brand[i].brandname + '</li></a>';
        s+=a;
    }
    //alert(s);
    s='<ul>'+s+'</ul>';
    document.getElementById("left").innerHTML=s;

}
var tmp=[]
function sotrang1(){
    var perpage=Math.ceil(tmp.length/soluongsp1trang);
    var a="";
    console.log(tmp)
    for(i=1;i<=perpage;i++){
        a=a+`<div onclick="hamleft(`+i+`)">`+i+`</div>`;
    }
    document.getElementById("sotrang").innerHTML=a;
}
function hamleft(n){
    var begin=(n-1)*soluongsp1trang;
    var s="";
    var dem=1;
    console.log(tmp);
    for(i=begin;i<tmp.length;i++){
         s=s+`<div class="center-item">
             <img id="myimg" src="${tmp[i].img}" width="100%">
             <div class="hinh">
             <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
             </div>
             <div>Ma SP: "${tmp[i].productId}"</div>
             <div>Tên SP: "${tmp[i].name}"</div>
             <div>Giá SP: "${tmp[i].price}"</div>
             <div>
             <span>Mua</span>
             <span>Chi tiết</span>
             <span onclick="change();">Thực hiện</span>
             </div>
             </div>`;
         if(dem==soluongsp1trang){
             break;
         }else{
             dem++;
         }
    }
    center.innerHTML=s;
 }
function hienthisanphamtheotheloai(obj){
    alert(obj.id);
    var s="";
    var dem=0;
    var dem1=1;
    for(i=0;i<productArray.length;i++){ 
        //console.log(productArray[i].brandid + " - "+ obj.id);
        if(productArray[i].brandid==obj.id){
            tmp[dem]=productArray[i];
            dem++;
            // s=s+`<div class="center-item">
            // <img id="myimg" src="${productArray[i].img}" width="100%">
            // <div class="hinh">
            // <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
            // </div>
            // <div>Ma SP: "${productArray[i].productId}"</div>
            // <div>Tên SP: "${productArray[i].name}"</div>
            // <div>Giá SP: "${productArray[i].price}"</div>
            // <div>
            // <span>Mua</span>
            // <span>Chi tiết</span>
            // <span onclick="change();">Thực hiện</span>
            // </div>
            // </div>`;
        }
    }
    for(i=0;i<tmp.length;i++){
        s=s+`<div class="center-item">
            <img id="myimg" src="${tmp[i].img}" width="100%">
            <div class="hinh">
            <input type="radio" name="radimg" value="hinh1" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh2" onchange="changeimg(this)"><input type="radio" name="radimg" value="hinh3" onchange="changeimg(this)">
            </div>
            <div>Ma SP: "${tmp[i].productId}"</div>
            <div>Tên SP: "${tmp[i].name}"</div>
            <div>Giá SP: "${tmp[i].price}"</div>
            <div>
            <span>Mua</span>
            <span>Chi tiết</span>
            <span onclick="change();">Thực hiện</span>
            </div>
            </div>`;
         if(dem1==soluongsp1trang){
            sotrang1();
            center.innerHTML=s;
            break;
         }else{
             dem1++;
         }
    }
    tmp=[];
    // console.log(tmp)
    // center.innerHTML=s;
}
window.onload=function(e){
    taoleftmenu();
    taocenter();
}

// Slider
let index=0
function rightbtn(){
    var rightbtn=document.getElementsByClassName("fas fa-chevron-right")[0];
    index=index+1
    if(index>3){
        index=0;
    }
    document.getElementsByClassName("slider-content")[0].style.right=index*100+"%";
}
function leftbtn(){
    var leftbtn=document.getElementsByClassName("fas fa-chevron-left")[0];
    index=index-1
    if(index<=0){
        index=3;
    }
    document.getElementsByClassName("slider-content")[0].style.right=index*100+"%";
}
function imgauto(){
    index=index+1;
    if(index>3){
        index=0;
    }
    document.getElementsByClassName("slider-content")[0].style.right=index*100+"%";
}
setInterval(imgauto,4000)

//admin quan li user
if (localStorage.getItem('Userarray')) {
    var Userarray = JSON.parse(localStorage.getItem('Userarray'));
} else {
    var Userarray = [
        
    ];
    // Lưu vào localStorage nếu không có dữ liệu
    localStorage.setItem('Userarray', JSON.stringify(Userarray));
}
console.log(Userarray); // Kiểm tra dữ liệu trong console

function qliuser() {
    document.querySelector("#nguoidung").style.display = "block";
    document.querySelector("#product").style.display = "none";
    document.querySelector("#hanghoa").style.display="none";
    capnhatuser();
}

function capnhatuser() {
    var render = document.getElementById("tableu");
    var table = `<tr>
                    <th>stt</th>
                    <th>userId</th>
                    <th>username</th>
                    <th>password</th>
                    <th>fullname</th>
                    <th>dia chi</th>
                    <th>So dien thoai</th>
                    <th>action</th>
                 </tr>`;

    for (var i = 0; i < Userarray.length; i++) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${Userarray[i].userId}</td>
                    <td>${Userarray[i].username}</td>
                    <td>${Userarray[i].pass}</td>
                    <td>${Userarray[i].fullname}</td>
                    <td>${Userarray[i].diachi}</td>
                    <td>${Userarray[i].sdt}</td>
                    <th>
                    <button onclick="deleteuser(`+Userarray[i].userId+`)">Delete</button>
                    <button onclick="edituser(`+Userarray[i].userId+`)">Edit</button>
                    <button onclick="toggleUserStatus(${Userarray[i].userId})">
                        ${Userarray[i].enable === 1 ? 'Khóa' : 'Unlock'}
                    </button>
                    </th>
                  </tr>`;
    }

    render.innerHTML = table; // Cập nhật bảng HTML
}
//var nguoidung;
function adduser() {
    var user_name = document.getElementById("username-ad").value;
    var user_pass = document.getElementById("pass-ad").value;
    var user_fullname = document.getElementById("name-ad").value;
    var user_dc = document.getElementById("dc-ad").value;
    var user_sdt = document.getElementById("sdt-ad").value;

    // Kiểm tra các trường dữ liệu
    if (user_name == "") {
        alert("Username không được để trống");
        return false;
    }
    if (user_pass == "") {
        alert("Password không được để trống");
        return false;
    }
    if (user_fullname == "") {
        alert("Tên không được để trống");
        return false;
    }
    if (user_dc == "") {
        alert("Địa chỉ không được để trống");
        return false;
    }
    if (user_sdt == "") {
        alert("Số điện thoại không được để trống");
        return false;
    }

    // Kiểm tra trùng số điện thoại
    for (i = 0; i < Userarray.length; i++) {
        // Chỉ kiểm tra trùng số điện thoại với các userId khác nhau
        if (user_sdt == Userarray[i].sdt && Userarray[i].userId != document.getElementById("sdt-ad").getAttribute('data-userId')) {
            alert("Số điện thoại của bạn đã được đăng ký");
            return false;
        }
        if (user_name == Userarray[i].username && Userarray[i].userId != document.getElementById("sdt-ad").getAttribute('data-userId')) {
            alert("Username của bạn đã được đăng ký");
            return false;
        }
    }

    // Tạo hoặc cập nhật người dùng
    var nguoidung = {
        userId: document.getElementById("sdt-ad").getAttribute('data-userId') || Userarray.length + 1,  // Duy trì userId khi chỉnh sửa, tự động tăng khi thêm mới
        username: user_name,
        pass: user_pass,
        fullname: user_fullname,
        diachi: user_dc,
        sdt: user_sdt,
        enable: 1
    };

    let index = Userarray.findIndex((c) => c.userId == nguoidung.userId);
    if (index >= 0) {
        // Cập nhật người dùng
        Userarray.splice(index, 1, nguoidung);
    } else {
        // Thêm người dùng mới
        nguoidung.userId = Userarray.length + 1;  // Tạo ID tự động khi thêm người mới
        Userarray.push(nguoidung);
    }

    localStorage.setItem('Userarray', JSON.stringify(Userarray));  // Lưu vào localStorage
    capnhatuser();  // Cập nhật giao diện
    clearu();  // Làm sạch form
}

function clearu(){
    document.getElementById("username-ad").value="";
    document.getElementById("pass-ad").value="";
    document.getElementById("name-ad").value="";
    document.getElementById("dc-ad").value="";
    document.getElementById("sdt-ad").value="";
}

// Edit user
function edituser(userId) {
    // Tìm người dùng theo userId
    var user = Userarray.find(u => u.userId == userId);

    if (user) {
        // Điền thông tin người dùng vào các ô nhập liệu
        document.getElementById("username-ad").value = user.username;
        document.getElementById("pass-ad").value = user.pass;
        document.getElementById("name-ad").value = user.fullname;
        document.getElementById("dc-ad").value = user.diachi;
        document.getElementById("sdt-ad").value = user.sdt;

        // Thêm một thuộc tính để lưu userId khi chỉnh sửa
        document.getElementById("sdt-ad").setAttribute('data-userId', user.userId);
    }
}

//Clock user
function toggleUserStatus(userId) {
    // Tìm người dùng theo userId
    var user = Userarray.find(u => u.userId == userId);

    if (user) {
        // Thay đổi trạng thái enable
        user.enable = user.enable === 1 ? 0 : 1; // Nếu enable = 1 thì thành 0, nếu enable = 0 thì thành 1

        // Lưu lại vào localStorage
        localStorage.setItem('Userarray', JSON.stringify(Userarray));

        // Cập nhật lại giao diện
        capnhatuser();
    }
}
//Delete user
function deleteuser(x){
    for(i=0;i<Userarray.length;i++){
        if(Userarray[i].userId==x){
            if(confirm("ban co muon xoa tai khoan nay")){
                Userarray.splice(i,1);
            }
            localStorage.setItem('Userarray', JSON.stringify(Userarray));
            capnhatuser();
            break;
        }
    }
}
//Login
var tmpuser=[];
var demtmp=0;
 function login(){
     var username=document.querySelector("#dangnhap #username").value;
     var pass=document.querySelector("#dangnhap #password").value;
     if(username==""){
         alert("User Name không được để trống");
         username.focus();
         return false;
     }
     if(pass==""){
         alert("Password không được để trống");
         pass.focus();
         return false;
     }
     var d=0;
     for(i=0;i<Userarray.length;i++){
         if(Userarray[i].username==username && Userarray[i].pass==pass){
            if(Userarray[i].enable==0){
                alert("Tài khoản của bạn đã bị khóa")
                return false;
            }
             document.getElementById("pageLogin").style.display="none";
             document.getElementById("login").style.display="none";
             document.getElementById("register").style.display="none";
             document.getElementById("user").style.display="block";
             document.getElementsByClassName("ls")[0].style.display="block";
             tmpuser[demtmp]=Userarray[i];
             document.querySelector("#user p").innerHTML=Userarray[i].fullname;
             d++;
         }
     } 
     if(d==0){
        alert("Username or password khong dung")
     }
 }
 
//Mang san pham
var productarray;
if (localStorage.getItem('productarray')) {
    var productarray = JSON.parse(localStorage.getItem('productarray'));
} else {
 productarray=[
    {productId:10042, brandid:'iphone', img:'img/SGU-LOGO.png', name:'Iphone 16 Pro', price:36000000, ram:8, dungluong:256, hdh:'IOS 18'},
    {productId:10041, brandid:'iphone', img:'img/SGU-LOGO.png', name:'Iphone 15', price:25000000, ram:6, dungluong:128, hdh:'IOS 17'},
    {productId:10040, brandid:'samsung', img:'img/SGU-LOGO.png', name:'Samsung Galaxy M55', price:2100000, ram:4, dungluong:256, hdh:'Android'},
    {productId:10039, brandid:'samsung', img:'img/SGU-LOGO.png', name:'Samsung Galaxy S24 Ultra', price:3030000, ram:6, dungluong:256, hdh:'Android'},
    {productId:10038, brandid:'xiaomi', img:'img/SGU-LOGO.png', name:'Xiaomi Redmi 14c', price:1455000, ram:4, dungluong:128, hdh:'MIUI'},
    {productId:10037, brandid:'iphone', img:'img/SGU-LOGO.png', name:'Iphone 13', price:13000000, ram:4, dungluong:128, hdh:'IOS 16'},
    {productId:10036, brandid:'samsung',img:'img/SGU-LOGO.png', name:'Samsung Galaxy Z Fold6', price:41990000, ram:12, dungluong:512, hdh:'Android'},
    {productId:10035, brandid:'xiaomi', img:'img/SGU-LOGO.png', name:'Xiaomi Redmi Note 13 Pro', price:5900000, ram:8, dungluong:256, hdh:'MIUI'},
    {productId:10034, brandid:'iphone', img:'img/SGU-LOGO.png', name:'Iphone 11', price:8500000, ram:4, dungluong:128, hdh:'IOS 13'},
    {productId:10033, brandid:'samsung', img:'img/SGU-LOGO.png', name:'Samsung Galaxy A25', price:5650000, ram:4, dungluong:128, hdh:'Android'},
    {productId:10032, brandid:'xiaomi', img:'img/SGU-LOGO.png', name:'Xiaomi POCO M6', price:3500000, ram:6, dungluong:128, hdh:'MIUI'},
    {productId:10031, brandid:'iphone', img:'img/SGU-LOGO.png', name:'Iphone 14', price:17390000, ram:4, dungluong:256, hdh:'IOS 17'},
    {productId:10000, brandid:'xiaomi', img:'img/SGU-LOGO.png', name:'Xiaomi 14 Ultra 5G', price:29990000, ram:16, dungluong:512, hdh:'MIUI'},
];
}
//admin product
function product(){
    document.querySelector("#product").style.display="block";
    document.querySelector("#nguoidung").style.display="none";
    document.querySelector("#hanghoa").style.display="none";
    capnhatproduct();
}

function capnhatproduct(){
    var render=document.getElementById("tablesp");
    table=`                                    <tr>
                                        <th>Số</th>
                                        <th>Ảnh</th>
                                        <th>Hãng</th>
                                        <th>Mã</th>
                                        <th>Tên</th>
                                        <th>Giá</th>
                                        <th>Ram</th>
                                        <th>Dung luong</th>
                                        <th>He dieu hanh</th>
                                        <th>Action</th>
                                    </tr>`
    for(i=0;i<productarray.length;i++){
     table+=`<tr>
                                <td>`+(i+1)+`</td>
                                <td><img style="width: 40px; src=`+productarray[i].img+` alt=""></td>
                                        <td>`+productarray[i].brandid+`</td>
                                        <td>`+productarray[i].productId+`</td>
                                        <td>`+productarray[i].name+`</td>
                                        <td>`+productarray[i].price+`</td>
                                        <td>`+productarray[i].ram+`</td>
                                        <td>`+productarray[i].dungluong+`</td>
                                        <td>`+productarray[i].hdh+`</td>
                                        <th>
                                        <button onclick="deleteItem(`+productarray[i].productId+`)">Delete</button>
                                        <button onclick="editItem(`+productarray[i].productId+`)">Edit</button>
                                        </th>
                            </tr>`
    }
    render.innerHTML=table
    
}

var item;
function add(){
    var item_img=document.getElementById("img").value;
    var item_hang=document.getElementById("hang").value;
    var item_ma=document.getElementById("ma").value;
    var item_ten=document.getElementById("ten").value;
    var item_gia=document.getElementById("gia").value;
    var item_ram=document.getElementById("ram").value;
    var item_dungluong=document.getElementById("dungluong").value;
    var item_hdh=document.getElementById("hdh").value;
    if(item_img==""){
        alert("Hinh anh khong dc de trong");
        item_img.focus();
        return false;
    }
    if(item_hang==""){
        alert("Hang khong dc de trong");
        item_hang.focus();
        return false;
    }
    if(item_ma==""){
        alert("Ma khong dc de trong");
        item_ma.focus();
        return false;
    }
    if(item_ten==""){
        alert("Ten khong dc de trong");
        item_ten.focus();
        return false;
    }
    if(item_gia==""){
        alert("Gia khong dc de trong");
        item_gia.focus();
        return false;
    }
    if(item_ram==""){
        alert("ram khong dc de trong");
        item_gia.focus();
        return false;
    }
    if(item_dungluong==""){
        alert("dung luong khong dc de trong");
        item_gia.focus();
        return false;
    }
    if(item_hdh==""){
        alert("hdh khong dc de trong");
        item_gia.focus();
        return false;
    }
    item={
        productId:item_ma,
        brandid:item_hang,
        img :item_img,
        name:item_ten,
        price:item_gia,
        ram:item_ram,
        dungluong:item_dungluong,
        hdh:item_hdh
    }
    let index=productarray.findIndex((c)=>c.productId==item.productId)
    if(index>=0){
        productarray.splice(index,1,item);
    }else{
        productarray.push(item);
    }
    localStorage.setItem('productarray',JSON.stringify(productarray));
    capnhatproduct();
    clearhh(); 
}
function clearhh(){
    document.getElementById("img").value="";
    document.getElementById("hang").value="";
    document.getElementById("ma").value="";
    document.getElementById("ten").value="";
    document.getElementById("gia").value="";
    document.getElementById("ram").value="";
    document.getElementById("dungluong").value="";
    document.getElementById("hdh").value="";
}
//Delete Product
function deleteItem(x){
    for(i=0;i<productarray.length;i++){
        if(productarray[i].productId==x){
            if(confirm("ban co muon xoa san pham nay?")){
                productarray.splice(i,1);
            }
            localStorage.setItem('productarray', JSON.stringify(productarray));
            capnhatproduct();
            break;
        }
    }
}
//Edit Product
function editItem(x){
    for(i=0;i<productarray.length;i++){
        if(productarray[i].productId==x){
            document.getElementById("img").value=productarray[i].img;
            document.getElementById("hang").value=productarray[i].brandid;
            document.getElementById("ma").value=productarray[i].productId;
            document.getElementById("ten").value=productarray[i].name;
            document.getElementById("gia").value=productarray[i].price;
            document.getElementById("ram").value=productarray[i].ram;
            document.getElementById("dungluong").value=productarray[i].dungluong;
            document.getElementById("hdh").value=productarray[i].hdh;
        }
    }
}

//qli hang
if (localStorage.getItem('hharray')) {
    var hharray = JSON.parse(localStorage.getItem('hharray'));
} else {
    var hharray = [
        {hhId: 1, khId: "kh001", totalPrice: 100000, date: "12/1/2004"}
    ];
    // Lưu vào localStorage nếu không có dữ liệu
    localStorage.setItem('hharray', JSON.stringify(hharray));
}
//console.log(hharray); // Kiểm tra dữ liệu trong console

function qlihd(){
    document.querySelector("#nguoidung").style.display = "none";
    document.querySelector("#product").style.display = "none";
    document.querySelector("#hanghoa").style.display="block";
    capnhathh();
}
if (localStorage.getItem('hh')) {
    var hh = JSON.parse(localStorage.getItem('hh'));
} else {
    var hh=[];
    // Lưu vào localStorage nếu không có dữ liệu
    localStorage.setItem('hh', JSON.stringify(hh));
}
const tablecthh=document.querySelector("#tablecthh");
function capnhathh() {
    var render = document.getElementById("tablehh");
    var table = `<tr>
                                        <th>Ma HD</th>
                                        <th>Ma KH</th>
                                        <th>Tong Tien</th>
                                        <th>Tinh Trang</th>
                                        <th>Ngay tao</th>
                                        <th>Danh sach sản phẩm</th>
                                        <th>action</th>
                                    </tr>`;

    for (var i = 0; i < hharray.length; i++) {
        table += `<tr>
                    <td>${hharray[i].hhId}</td>
                    <td>${hharray[i].khId}</td>
                    <td>${hharray[i].totalPrice}</td>
                    <td>
                                            <select name="" id="">
                                                <option value="">Chua xu ly</option>
                                                <option value="">Da xac nhan</option>
                                                <option value="">Da giao thanh cong</option>
                                                <option value="">Da huy</option>
                                            </select>
                                    </td>
                    <td>${hharray[i].date}</td>
                    <td><button onclick="dscacsanpham(${hharray[i].hhId})">Danh sach</button></td>
                    <th>
                    <button onclick="deletehh(`+hharray[i].hhId+`)">Delete</button>
                    </th>
                  </tr>`;
                  
    }
    render.innerHTML = table; // Cập nhật bảng HTML
    
}

//Hien sp phan trang
let soluongsp1trang=6;
function sotrang(){
    var perpage=Math.ceil(productarray.length/soluongsp1trang);
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
   for(i=start;i<productarray.length;i++){
        s=s+`<div class="item">
            <img id="myimg" src="${productarray[i].img}">
             <div class="masp">Mã SP: <label>${productarray[i].productId}</lable></div>
             <div class="tensp">Tên SP:<label>${productarray[i].name}</label></div>
             <div class="giasp">Giá SP:<label>${productarray[i].price}</lable></div>
            <button class="btn">Thêm vào giỏ hàng</button>
            <button class="ctsp" onclick="buttonchitiet();">Chi tiết</button>
            </div>`
        
        if(dem==soluongsp1trang){
            break;
        }else{
            dem++;
        }
   }
   document.getElementsByClassName("container")[0].innerHTML=s;
   chitietsp();
   buttoncart();
   
}
function taocenter(){
     var s="";
     var dem=1
     for(i=0;i<productarray.length;i++){
         s=s+`<div class="item">
             <img id="myimg" src="${productarray[i].img}">
             <div class="masp">Ma SP:<label>${productarray[i].productId}</lable></div>
             <div class="tensp">Tên SP:<label>${productarray[i].name}</label></div>
             <div class="giasp">Giá SP:<label>${productarray[i].price}</lable></div>
             <button class="btn" >Thêm vào giỏ hàng</button>
             <button class="ctsp" onclick="buttonchitiet();">Chi tiết</button>
             </div>`
        if(dem==soluongsp1trang){
            sotrang();
            document.getElementsByClassName("container")[0].innerHTML=s;
            chitietsp();
            buttoncart();
            break;
        }else{
            dem++;
        }
     }
}
window.onload=function(e){
    taocenter();
}
//chi tiet sp
function buttonchitiet(){
    var chitiet=document.querySelector("#chitietsp");
    chitiet.style.display="block";
}
function chitietsp(){
    var ctsp=document.querySelectorAll(".ctsp");
    
    ctsp.forEach(function(button){
        button.addEventListener("click",function(event){
            var btnI=event.target;
            var btnItem=btnI.parentElement;
            var img=btnItem.querySelector("img").src;
            var ma=btnItem.querySelector(".masp label").innerHTML;
            var ten=btnItem.querySelector(".tensp label").innerText;
            var price=btnItem.querySelector(".giasp label").innerText;
         //console.log(ma,ten,price)
            addctsp(ma,img,ten,price);
        })
    }) 
    
}

function addctsp(ma,img,ten,price){
    var hang,ram,dungluong,hdh;
    for(i=0;i<productarray.length;i++){
        if(productarray[i].productId==ma){
            hang=productarray[i].brandid;
            ram=productarray[i].ram;
            dungluong=productarray[i].dungluong;
            hdh=productarray[i].hdh;
            //console.log(ram)
        }
    }
    var content=`<div class="item-ctsp">
                    <i  class="fas fa-times"></i>
                    <img id="myimg" src=`+img+`>
                    <div class="masp">Mã SP: <label>`+ma+`</lable></div>
                    <div class="hangsp">Hang SP: <label>`+hang+`</lable></div>
                    <div class="tensp">Tên SP:<label>`+ten+`</label></div>
                    <div class="ramsp">Ram SP:<label>`+ram+`GB</label></div>
                    <div class="dlsp">Dung Luong SP:<label>`+dungluong+`GB</label></div>
                    <div class="hdhsp">He Dieu Hanh SP:<label>`+hdh+`</label></div>
                    <div class="giasp">Giá SP:<label>`+price+`</lable></div>
                    <div class="ctbuttontsp"><button class="btn" onclick="ctspbutton()" >Thêm vào giỏ hàng</button></div>
                </div>`
    
    document.querySelector("#chitietsp").innerHTML=content;
    var iconctsp=document.querySelector(".item-ctsp i")
    iconctsp.addEventListener("click",function(){
    document.querySelector("#chitietsp").style.display="none";
    
})
}
function ctspbutton(){
    var btnI=document.querySelector(".ctbuttontsp .btn").parentElement;
    var btnpr=btnI.parentElement
    var img=btnpr.querySelector("img").src;
    var ma=btnpr.querySelector(".masp label").innerHTML;
    var ten=btnpr.querySelector(".tensp label").innerText;
    var price=btnpr.querySelector(".giasp label").innerText;
    addcart(ma,img,ten,price);
    //console.log(ma,ten,price)
}
//Cart
const icon=document.querySelector("#head button");
const iconx=document.querySelector(".cart i");
icon.addEventListener("click",function(){
    document.querySelector(".cart").style.right="0";
})
iconx.addEventListener("click",function(){
    document.querySelector(".cart").style.right="-100%";
})
function buttoncart(){
    var btn=document.querySelectorAll(".btn");
    btn.forEach(function(button){
        button.addEventListener("click",function(event){
            var btnI=event.target;
            var btnItem=btnI.parentElement;
            var img=btnItem.querySelector("img").src;
            var ma=btnItem.querySelector(".masp label").innerHTML;
            var ten=btnItem.querySelector(".tensp label").innerText;
            var price=btnItem.querySelector(".giasp label").innerText;
         //console.log(ma,ten,price)
            addcart(ma,img,ten,price);
        })
    }) 
    pttt()
    dctt()
    //chotdon();
}
function addcart(ma,img,ten,price){
     if(document.getElementById("login").style.display=="block"){
         alert("Ban phai có tài khoản mới mua được");
         return
     }
    var addtr=document.createElement("tr");
     var totalItem=document.querySelectorAll(".cart tbody tr")
       for(var i=0;i<totalItem.length;i++){
           var productT=document.querySelectorAll(".title")
           //console.log(productT)
           if(productT[i].innerHTML==ten){
               alert("Sản phẩm của bạn đã có trong giỏ hàng")
               return
           }
       }
    var trcontent=`<tr>
                                <td class="mahh">`+ma+`</td>
                                <td style="display: flex;align-items: center;"><img style="width: 70px;" src="`+img+`" alt=""><span class="title">`+ten+`</span></td>
                                <td><div><span class="price">`+price+`</span><sup>d</sup></div></td>
                                <td class="slhh"><input style=" width: 30px;outline: none;" type="number" value="1" min="1"></td>
                                <td class="xoa" style="cursor: pointer;">Xoa</td>
                            </tr>`
    addtr.innerHTML=trcontent;
    var table=document.querySelector(".cart tbody");
    table.append(addtr)
    deletecart()
    total()
}
//Total price
function total(){
    var totalItem=document.querySelectorAll(".cart tbody tr")
    var tong=0
    //console.log(totalItem.length)
    for(var i=0;i<totalItem.length;i++){
        var inputValue=totalItem[i].querySelector("input").value;
        var priceValue=totalItem[i].querySelector(".price").innerHTML;
        var totalA=inputValue*priceValue
        tong=tong+totalA
    }
    document.querySelector(".price-total span").innerHTML=tong.toLocaleString(`de-DE`)
    inputchange()
}
//Xoa ra khoi cart
function deletecart(){
    var totalItem=document.querySelectorAll(".cart tbody tr")
    for(var i=0;i<totalItem.length;i++){
        var productx=document.querySelectorAll(".xoa")
        productx[i].addEventListener("click",function(event){
            var cartDelete=event.target
            var cartItem=cartDelete.parentElement
            cartItem.remove()
            total()
            //console.log(cartItem)
        })

    }
}
function inputchange(){
    var totalItem=document.querySelectorAll(".cart tbody tr")
    for(var i=0;i<totalItem.length;i++){
        var inputValue=totalItem[i].querySelector("input")
        inputValue.addEventListener("change",function(){
            total()
        })
    }
}
//Phuong thuc thanh toan
function pttt(){
var paymentMethods=document.querySelectorAll(".cart .methods input");
var bankDetails=document.getElementById("bankDetails");
paymentMethods.forEach(method =>{
    method.addEventListener('change',function(){
        if(this.value=='bankTransfer'){
            bankDetails.style.display="block";
        }else{
            bankDetails.style.display="none";
        }
    })
})
}
//Chon dia chi
function dctt(){
var dcMethods=document.querySelectorAll(".cart .methoddc input")
var dcDetails=document.getElementById("diachiDetails");
    dcMethods.forEach(method =>{
    method.addEventListener('change',function(){
        if(this.value=='newaddress'){
            dcDetails.style.display="block";
        }else{
            dcDetails.style.display="none";
        }
    })
})
}
//Lich su mua hang

function lichsu(){
    document.querySelector(".lich-su-form").style.display="block"
    capnhatlsdh();
}
function icon_lichsu(){
    document.querySelector(".lich-su-form").style.display="none"
}


 function capnhatlsdh(){
     var render = document.getElementById("table-lsdh");
     var table = `<tr>
                                     <th>Stt</th>
                                     <th>Tong Tien</th>
                                     <th>Ngay Mua</th>
                                     <th>Danh sach san pham</th>
                                 </tr>`;
     for (var i = 0; i < hharray.length; i++) {
         if(hharray[i].khId==tmpuser[0].userId){
             table += `<tr>
                     <td>${i+1}</td>
                     <td>${hharray[i].totalPrice}</td>
                     <td>${hharray[i].date}</td>
                     <td><button type="button" onclick="buttonlsmh(${hharray[i].hhId})">Danh sach</button></td>
                   </tr>`;

         }   
     }
     render.innerHTML = table; 
}
var formlsdh
function buttonlsmh(hhId){
    var render=document.getElementById("danhsachsplsmh-form")
    render.style.display="block"
    var tablesplsmh=document.getElementById("tablesplsmh")
    var selectedInvoice = hharray.find(invoice => invoice.hhId === hhId);

    // Nếu tìm thấy hóa đơn
    if (selectedInvoice) {
        var tableContent = `<tr>
                                <th>STT</th>
                                <th>Ma SP</th>
                                <th>Ten SP</th>
                                <th>Gia</th>
                                <th>So luong</th>
                            </tr>`;

        // Duyệt qua sản phẩm của hóa đơn đó
        for (var i = 0; i < selectedInvoice.products.length; i++) {
            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${selectedInvoice.products[i].ma}</td>
                                <td>${selectedInvoice.products[i].ten}</td>
                                <td>${selectedInvoice.products[i].price}</td>
                                <td>${selectedInvoice.products[i].soluong}</td>
                            </tr>`;
        }

        // Cập nhật phần tử render với nội dung bảng
        tablesplsmh.innerHTML = tableContent;
    }
}
function buttonxlsmh(){
    document.getElementById("danhsachsplsmh-form").style.display="none"
}
//admin qli hang hoa

var itemhh;
var formhh;
function chotdon() {
    // Kiểm tra giỏ hàng có rỗng không bằng cách đếm số dòng trong tbody
    var tableBody = document.querySelector(".cart tbody");
    if (tableBody.children.length === 0) {  // Kiểm tra nếu không có dòng nào trong tbody
        alert("Giỏ hàng rỗng");
        return false;
    } else {
        alert("Ban da chot don thanh cong");
        var tongtien = document.querySelector(".cart .price-total span").innerHTML;
        const tg = new Date();
        var year = tg.getFullYear();
        var month = tg.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1
        var day = tg.getDate();
        var hhid = hharray.length + 1; // ID hóa đơn mới
        var time = `${day}/${month}/${year}`;

        // Tạo đối tượng hóa đơn mới với danh sách sản phẩm là mảng rỗng ban đầu
        var formhh = {
            hhId: hhid,
            khId: tmpuser[0].userId, // Lấy ID khách hàng từ tmpuser
            totalPrice: tongtien,
            date: time,
            products: []  // Mảng sản phẩm của hóa đơn mới
        };

        // Lấy danh sách sản phẩm từ giỏ hàng và thêm vào đối tượng hóa đơn
        var formtable = document.querySelectorAll(".cart tbody tr");
        for (i = 0; i < formtable.length; i++) {
            var tensp = formtable[i].querySelector(".title").innerText;
            var mahh = formtable[i].querySelector(".mahh").innerText;
            var gia = formtable[i].querySelector(".price").innerText; // Sử dụng innerText thay vì innerHTML để lấy giá trị
            var sl = formtable[i].querySelector(".slhh input").value;
            console.log(tensp);
            // Tạo đối tượng sản phẩm
            var itemhh = {
                ma: mahh,
                ten: tensp,
                price: gia,
                soluong: sl
            };

            // Thêm sản phẩm vào mảng products của hóa đơn
            formhh.products.push(itemhh);
        }

        // Thêm hóa đơn vào mảng hharray
        hharray.push(formhh);
        localStorage.setItem('hharray', JSON.stringify(hharray)); // Lưu vào localStorage

        // Xóa giỏ hàng (trong bảng)
        tableBody.innerHTML = ""; // Xóa tất cả các hàng trong giỏ hàng

        // Cập nhật lại tổng giá trị giỏ hàng nếu có
        document.querySelector(".cart .price-total span").innerHTML = "0"; // Đặt lại tổng giá về 0
        capnhathh(); // Cập nhật danh sách hóa đơn
    }
}



function dscacsanpham(hhId) {
    // Tìm hóa đơn theo ID
    var render = document.getElementById("danhsachhh-form");
    render.style.display = "block"; // Hiển thị phần danh sách sản phẩm
    var selectedInvoice = hharray.find(invoice => invoice.hhId === hhId);

    // Nếu tìm thấy hóa đơn
    if (selectedInvoice) {
        var tableContent = `<tr>
                                <th>STT</th>
                                <th>Ma SP</th>
                                <th>Ten SP</th>
                                <th>Gia</th>
                                <th>So luong</th>
                            </tr>`;

        // Duyệt qua sản phẩm của hóa đơn đó
        for (var i = 0; i < selectedInvoice.products.length; i++) {
            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${selectedInvoice.products[i].ma}</td>
                                <td>${selectedInvoice.products[i].ten}</td>
                                <td>${selectedInvoice.products[i].price}</td>
                                <td>${selectedInvoice.products[i].soluong}</td>
                            </tr>`;
        }

        // Cập nhật phần tử render với nội dung bảng
        tablecthh.innerHTML = tableContent;
    }
}

//Delete hh
function deletehh(x){
    for(i=0;i<hharray.length;i++){
        if(hharray[i].hhId==x){
            if(confirm("ban co muon xoa hang hoa nay?")){
                hharray.splice(i,1);
            }
            localStorage.setItem('hharray', JSON.stringify(hharray));
            capnhathh();
            break;
        }
    }
}
function button_dshh(){
    // Lấy phần tử để hiển thị danh sách sản phẩm
    var render = document.getElementById("danhsachhh-form");
    render.style.display = "block"; // Hiển thị phần danh sách sản phẩm
    
}

function buttonx_dshh(){
    document.getElementById("danhsachhh-form").style.display="none";
}_
//loc hoa don
function lochd(){
    var ngaybatdau=document.getElementById("ngaybd").value
    var ngaykt=document.getElementById("ngaykt").value
    if(ngaybatdau>ngaykt){
        alert("Ngay bat dau phai nho hon ngay ket thuc")
        return
    }
    var render = document.getElementById("tablehh");
    var table = `<tr>
                                        <th>Ma HD</th>
                                        <th>Ma KH</th>
                                        <th>Tong Tien</th>
                                        <th>Tinh Trang</th>
                                        <th>Ngay tao</th>
                                        <th>Danh sach sản phẩm</th>
                                        <th>action</th>
                                    </tr>`;

    let date1=new Date(ngaybatdau)
    let date2=new Date(ngaykt)
    var time1=`${date1.getDate()}/${date1.getMonth()+1}/${date1.getFullYear()}`
    var time2=`${date2.getDate()}/${date2.getMonth()+1}/${date2.getFullYear()}`
    for(i=0;i<hharray.length;i++){
        if(hharray[i].date>=time1 && hharray[i].date<=time2){
        table += `<tr>
                    <td>${hharray[i].hhId}</td>
                    <td>${hharray[i].khId}</td>
                    <td>${hharray[i].totalPrice}</td>
                    <td>
                                            <select name="" id="">
                                                <option value="">Chua xu ly</option>
                                                <option value="">Da xac nhan</option>
                                                <option value="">Da giao thanh cong</option>
                                                <option value="">Da huy</option>
                                            </select>
                                    </td>
                    <td>${hharray[i].date}</td>
                    <td><button onclick="dscacsanpham(${hharray[i].hhId})">Danh sach</button></td>
                    <th>
                    <button onclick="deletehh(`+hharray[i].hhId+`)">Delete</button>
                    </th>
                  </tr>`;
                  
    }
     // Cập nhật bảng HTML
    }
    render.innerHTML = table;

    // In ra các hóa đơn lọc được

}
///console.log(ls)
//Chi tiet product

//Login Register
 function clicklogin(){
     document.getElementById("pageLogin").style.display="block";
 }
 function clickdk(){
     document.getElementById("pageDk").style.display="block";
 }
// var dem=0
//  if (localStorage.getItem('userArray')) {
//       var userArray = JSON.parse(localStorage.getItem('userArray'));
//   } else {
//      var userArray=[
//          {userId:dem, username:"kh001", pass:"kh001", fullname:"Nguyen Van A", diachi:"quan 5"},
//   ]
//   }

 var user;
 function register(){
     var usern=document.querySelector("#Dangky #username").value;
     var passw=document.querySelector("#Dangky #password").value;
     var dc=document.querySelector("#Dangky #address").value;
     var name=document.querySelector("#Dangky #fullname").value;
     var sdtu=document.querySelector("#Dangky #sdt").value;
     if(usern==""){
         alert("User Name không được để trống");
         usern.focus();
         return false;
     }
     if(passw==""){
         alert("Password không được để trống");
         passw.focus();
         return false;
     }
     if(name==""){
         alert("Name không được để trống");
         name.focus();
         return false;
     }
     if(dc==""){
         alert("Address không được để trống");
         dc.focus();
         return false;
     }
     if(sdtu==""){
        alert("Số điện thoại không được để trống");
        dc.focus();
        return false;
    }
    for(i=0;i<Userarray.length;i++){
        if(sdtu==Userarray[i].sdt){
            alert("Số điện thoại đã tồn tại")
            return false
        }
        if(usern==Userarray[i].username){
            alert("Tên user đã tồn tại")
            return false
        }
    }
     user={
        userId:Userarray.length+1,
         username:usern,
         pass:passw,
         fullname:name,
         diachi:dc,
         sdt:sdtu,
         enable:1
     }
     Userarray.push(user)
     localStorage.setItem('Userarray',JSON.stringify(Userarray));
     alert("Dang ki thanh cong")
     
 }
 function iconxlogin(){
    document.getElementById("pageLogin").style.display="none";
 }
 function iconxregister(){
    document.getElementById("pageDk").style.display="none";
 }
 //console.log(userArray)
function iconuser(){
    document.getElementById("icon-user").style.display="block";
    document.getElementById("icon-user").innerHTML=`<div class="thongtin-user">
                    <i class="fas fa-times" onclick="iconx1()"></i>
                    <h2>Thong tin ca nhan</h2>
                    <p>Ho va ten:`+tmpuser[0].fullname+`</p>
                    <p>Dia chi:`+tmpuser[0].diachi+`</p>
                    <p>Số điện thoại:`+tmpuser[0].sdt+`</p>
                    <button onclick="dxiconuser()">Dang xuat</button>
                </div>`
}
function dxiconuser(){
    document.getElementById("icon-user").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("register").style.display="block";
    document.getElementById("user").style.display="none";
    document.getElementsByClassName("ls")[0].style.display="none";
}
function iconx1(){
    document.getElementById("icon-user").style.display="none";
}

function payment(){
    document.getElementById("payment").style.display="block"
}
function xpayment(){
    document.getElementById("payment").style.display="none"
}

function kiemtraUSER() {
    var regex = /^[a-z0-9_-]{3,16}$/;
    var chuoiKT = document.getElementById("txtChuoi").value;
    let kq = regex.test(chuoiKT);
    if (kq==true) {
        alert("Nhập đúng mẫu");        
    } else {
         alert("Nhập sai mẫu");   
    }

}
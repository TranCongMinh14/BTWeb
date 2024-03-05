function kiemtraUSER() {
    var regex = /^[a-z0-9_-]{3,16}$/;
    var chuoiKT = document.getElementById("txtChuoi").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraPASSWORD() {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var chuoiKT = document.getElementById("txtPass").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraEmail() {
    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var chuoiKT = document.getElementById("txtEmail").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraIPv4() {
    var regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var chuoiKT = document.getElementById("txtIPv4").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraHexValue() {
    var regex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;
    var chuoiKT = document.getElementById("txtHexValue").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraSlug() {
    var regex =/^[a-z0-9-]+$/;
    var chuoiKT = document.getElementById("txtSlug").value;
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}

function kiemtraURL() {
    var regex = /^((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,6})([/\w\-]*)*)?(\/?)$/;

    var chuoiKT = document.getElementById("txtURL").value;
    if (!chuoiKT) {
        return;
    }
    let kq = regex.test(chuoiKT);
    if (kq == true) {
        alert("Nhập đúng mẫu");
    } else {
        alert("Nhập sai mẫu");
    }
}
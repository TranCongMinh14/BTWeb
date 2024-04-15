// Đổi tên button
doiTenbtn();
document.getElementById("btnXemThem").addEventListener("click", doiTenbtn);
function doiTenbtn() {
  var btn = document.getElementById("btnXemThem");
  if (btn.innerHTML == "Xem thêm") {
    btn.innerHTML = "Thu gọn";
  } else {
    btn.innerHTML = "Xem thêm";
  }
}

// Chuyển đổi tiền tệ
function formatToVND(num) {
  let fmt = num.toLocaleString("vi-VN");
  fmt += "đ";
  return fmt;
}

// Tìm kiếm
document.getElementById("btnSearchBar").addEventListener("click", Search);
function Search() {
  console.log("click");

  let value = document.getElementById("searchBar").value.toLowerCase();
  let htmls = listProduct.filter((item) => {
    return (
      item.name.toLowerCase().includes(value) ||
      item.thuongHieu.toLocaleLowerCase().includes(value)
    );
  });
  const x = htmls.map((item) => {
    return `
      <div class="col-md-3 d-flex flex-wrap">
        <div class="card mb-3 flex-fill">
            <img src="${item.img}"
            class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
            <a class="card-title" href="#" ><h5>${item.name}</h5></a>
            <span style="color: red;">${formatToVND(item.giaKhuyenMai)}</span>
            <span><sup><del>${formatToVND(
      item.giaBan
    )}</del> </sup></span> <br>
            </div>
            <div class="card-footer">
            <button
                  class="btn btn-outline-success mr-3 btnThemGioHang"
                  type="button"
                  id="btnThemGioHang"
                >
                <i class="fa-solid fa-cart-shopping" style="color: #003d23;"></i>
                </button>
            <button class="btn btn-outline-danger" type="button" id="btnMuaNgay" >Mua ngay</button>
            </div>
        </div>
    </div>
      `;
  });
  if (htmls.length === 0) {
    document.getElementById("JsListProduct").innerHTML = "<div class='container'><div class='row'><div class ='col-md-12'><h1 class='text-center '>Không tìm thấy sản phẩm!</h1></div></div></div>";
  } else {
    document.getElementById("JsListProduct").innerHTML = x.join("\n");
    show_detailProduct();
  }
}

// TÌm theo logo thương hiệu
searchLogo();
function searchLogo() {
  const x = document.getElementsByClassName("logo_thuonghieu");
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener("click", (e) => {
      let value = e.target.alt.toLowerCase();
      let htmls = listProduct.filter((item) => {
        return item.thuongHieu.toLocaleLowerCase().includes(value);
      });
      const x = htmls.map((item) => {
        return `
      <div class="col-md-3 d-flex flex-wrap">
        <div class="card mb-3 flex-fill">
            <img src="${item.img}"
            class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
            <a class="card-title" href="#" ><h5>${item.name}</h5></a>
            <span style="color: red;"><del>${formatToVND(item.giaBan)}</del></span> </br>
            <span>${formatToVND(item.giaKhuyenMai)} </span> <br>
            </div>
            <div class="card-footer">
            <button class="btn btn-outline-success mr-3 btnThemGioHang " type="button" >
            <i class="fa-solid fa-cart-shopping" style="color: #003d23;"></i>
            </button>
            <button class="btn btn-outline-danger" type="button" id="btnMuaNgay">Mua ngay</button>
            </div>
        </div>
    </div>
      `;
      });
      document.getElementById("JsListProduct").innerHTML = x.join("\n");
      show_detailProduct();
    });
  }
}

// Hiện danh sách sản phẩm
function showProduct() {
  const html = listProduct.map((item) => {
    return `
    <div class="col-md-3 d-flex flex-wrap">
        <div class="card mb-3 flex-fill">
            <img src="${item.img}"
            class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
            <a class="card-title" href="#" ><h5>${item.name}</h5></a>
            <span style="color: red;"><del>${formatToVND(item.giaBan)}</del></span>
            <span>${formatToVND(item.giaKhuyenMai)}</span> <br>
            </div>
            <div class="card-footer">
            <button class="btn btn-outline-danger mr-3 btnThemGioHang " type="button" >
            <i class="fa-solid fa-cart-shopping" style="color: #003d23;"></i>
            </button>
            <button class="btn btn-outline-primary" type="button" id="btnMuaNgay">Mua Ngay</button>
            </div>
        </div>
    </div>
        `;
  });

  document.getElementById("JsListProduct").innerHTML = html.join("\n");
  show_detailProduct();
}


//Hiển thị giỏ hàng
const cart = [];
let sttGH = 1;
// Cập nhật bộ chọn để phù hợp với lớp nút mới
const buttons = document.querySelectorAll('.btnThemGioHang');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    alert('Đã thêm vào giỏ hàng!');
    const product = e.target.parentElement.parentElement;
    const productInfo = {
      index: sttGH++,
      img: product.querySelector('.card-img-top').src, // Cập nhật bộ chọn hình ảnh
      name: product.querySelector('.card-title').textContent, // Cập nhật bộ chọn tiêu đề
      quantity: 1, // Cập nhật bộ chọn số lượng
      price: product.querySelector('span').textContent,
    };
    cart.push(productInfo);
    localStorage.setItem('carts', JSON.stringify(cart));
    localStorage.setItem('sttGH', sttGH);
    showCart();
  });
});

//Xử lí btnMuaNgay
const bttMuaNgay = document.querySelectorAll('#btnMuaNgay');
bttMuaNgay.forEach((button) => {
  button.addEventListener('click', (e) => {
    window.location.href = "../html/gioHang.html"; // Chuyển hướng đến trang giỏ hàng
    const product = e.target.parentElement.parentElement;
    const productInfo = {
      index: sttGH++,
      img: product.querySelector('.card-img-top').src, // Cập nhật bộ chọn hình ảnh
      name: product.querySelector('.card-title').textContent, // Cập nhật bộ chọn tiêu đề
      quantity: 1, // Cập nhật bộ chọn số lượng
      price: product.querySelector('span').textContent,
    };
    cart.push(productInfo);
    localStorage.setItem('carts', JSON.stringify(cart));
    localStorage.setItem('sttGH', sttGH);
    showCart();
  });
});

//Thông đã gửi
$("#btnGui").click(function (e) {
  alert("Đã gửi thông tin!");
});

function show_detailProduct() {
  for (let i = 0; i < listProduct.length; i++) {
    document
      .getElementsByClassName("card-title")
    [i].addEventListener("click", (e) => {
      const x = listProduct.find((item) => {
        return item.name === e.target.innerHTML.trim();
      });

      console.log(x.maSP);

      localStorage.setItem("name", x.name);
      localStorage.setItem("img", x.img);
      localStorage.setItem("masp", x.maSP);
      localStorage.setItem("giaBan", formatToVND(x.giaBan));
      localStorage.setItem("giakhuyenmai", formatToVND(x.giaKhuyenMai));
      localStorage.setItem("thuonghieu", x.thuongHieu);
      localStorage.setItem("loaisp", x.loaiSP);
      localStorage.setItem("barcode", x.barCode);
      localStorage.setItem("nhanhieu", x.nhanHieu);
      localStorage.setItem("xuatxu", x.xuatXu);
      localStorage.setItem("noisx", x.noiSX);
      localStorage.setItem("dungtich", x.dungTich);
      localStorage.setItem("hsd", x.hsd);
      localStorage.setItem("note", x.note);
      window.open("../html/chitietsanpham.html", "_self");
    });
  }
}

const isLoggedIn = localStorage.getItem('isLoggedIn')
// Xử lý sự kiện trước khi đóng trang
window.addEventListener('beforeunload', function (event) {
  // Lưu thông tin giỏ hàng vào localStorage
  if (isLoggedIn !== undefined && isLoggedIn === true) {
    localStorage.setItem('carts', JSON.stringify(cart));
  }
});

// Hàm để load giỏ hàng từ localStorage khi trang được tải lại
function loadCartFromLocalStorage() {
  const savedCart = JSON.parse(localStorage.getItem('carts'));
  if (savedCart) {
    cart.push(...savedCart);
  }
}
// Gọi hàm để load giỏ hàng từ localStorage khi trang được tải lại
loadCartFromLocalStorage();

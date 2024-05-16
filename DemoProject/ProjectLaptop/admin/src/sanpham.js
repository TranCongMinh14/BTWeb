"use strict"
let gSanPhamId = 0
let SanPham = {
  newSanPham: {
    id: 0,
    model: "",
    cpu: "",
    vga: "",
    ram: "",
    oCung: "",
    manHinh: "",
    ketNoi: "",
    congGiaoTiep: "",
    webcam: "",
    heDieuHanh: "",
    pin: "",
    kichThuoc: "",
    trongLuong: "",
    mauSac: "",
    gia: "",
    hangSanXuat: "",
    hinhAnh: "",
    khuyenMai: "",
    loaiSanPham: "",
  },
  displayModalCreateSanPham() {
    $("#modal-create-SanPham").modal("show")
  },
  onCreateNewSanPhamClick() {
    this.newSanPham = {
      id: 0,
      model: $("#inp-create-model").val().trim(),
      cpu: $("#inp-create-cpu").val().trim(),
      vga: $("#inp-create-vga").val().trim(),
      ram: $("#inp-create-ram").val().trim(),
      oCung: $("#inp-create-ocung").val().trim(),
      manHinh: $("#inp-create-manhinh").val().trim(),
      ketNoi: $("#inp-create-ketnoi").val().trim(),
      congGiaoTiep: $("#inp-create-conggt").val().trim(),
      webcam: $("#inp-create-webcam").val().trim(),
      heDieuHanh: $("#inp-create-hdh").val().trim(),
      pin: $("#inp-create-pin").val().trim(),
      kichThuoc: $("#inp-create-kichthuoc").val().trim(),
      trongLuong: $("#inp-create-trongluong").val().trim(),
      mauSac: $("#inp-create-color").val().trim(),
      gia: $("#inp-create-price").val().trim(),
      hangSanXuat: $("#select-hangsx").val(),
      hinhAnh: $("#inp-create-hinhanh").val(),
      khuyenMai: $("#inp-create-km").val().trim(),
      loaiSanPham: $("#select-loaisp").val().trim(),
    }
    if (validateSanPham(this.newSanPham)) {
      $.ajax({
        url: "http://localhost:8080/sanpham",
        method: "POST",
        data: JSON.stringify(this.newSanPham),
        contentType: "application/json",
        success: (data) => {
          alert("Sản Phẩm created successfully")
         window.location.href = "http://127.0.0.1:5500/admin/sanpham.html"
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateSanPhamClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = SanPhamTable.row(vSelectedRow).data()
    gSanPhamId = vSelectedData.id
    window.location.href = `http://127.0.0.1:5500/admin/suasanpham.html?id=${gSanPhamId}`
  },
  onDeleteSanPhamByIdClick() {
    $("#modal-delete-sanpham").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = SanPhamTable.row(vSelectedRow).data()
    gSanPhamId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gSanPhamId == 0) {
      $.ajax({
        url: "http://localhost:8080/sanpham",
        method: "DELETE",
        success: () => {
          alert("All SanPham were successfully deleted")
          getSanPhamFromDb()
          $("#modal-delete-sanpham").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/sanpham/${gSanPhamId}`,
        method: "DELETE",
        success: () => {
          alert(
            `SanPham with id: ${gSanPhamId} was successfully deleted`
          )
          getSanPhamFromDb()
          $("#modal-delete-sanpham").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let SanPhamTable = $("#sanpham-table").DataTable({
  columns: [
    { data: "id" },
    { data: "action" },
    { data: "model" },
    { data: "cpu" },
    { data: "vga" },
    { data: "ram" },
    { data: "oCung" },
    { data: "manHinh" },
    { data: "ketNoi" },
    { data: "congGiaoTiep" },
    { data: "webcam" },
    { data: "heDieuHanh" },
    { data: "pin" },
    { data: "kichThuoc" },
    { data: "trongLuong" },
    { data: "mauSac" },
    { data: "gia" },
    { data: "hangSanXuat" },
    { data: "hinhAnh" },
    { data: "khuyenMai" },
    { data: "loaiSanPham" },
  ],
  columnDefs: [
    {
      targets: 1,
      defaultContent: `<i class="fas fa-edit text-primary"></i>  ||  <i class="fa fa-trash text-primary""></i>`,
    },
    {
      targets: 18,
      render: function(url, type, full){
        var string = url;
        var chuoi = string.slice(12, string.length);
        return `<img src="../../image/${chuoi}" width=20% alt="">`
      }
    }
  ],
  responsive: true,
  lengthChange: false,
  autoWidth: false,
  buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
})
SanPhamTable.buttons()
  .container()
  .appendTo("#SanPham-table_wrapper .col-md-6:eq(0)")

function loadSanPhamOnTable(paramSanPham) {
  "use strict"
  SanPhamTable.clear()
  SanPhamTable.rows.add(paramSanPham)
  SanPhamTable.draw()
}

function getSanPhamFromDb() {
  "use strict"
  $.get("http://localhost:8080/sanpham", (sanPham) =>
    loadSanPhamOnTable(sanPham)
  )
}
getSanPhamFromDb()

$(".btn-sanpham").click(function(){
  window.location.href = "http://127.0.0.1:5500/admin/themsanpham.html";
})
$(".btn-create-sanpham").click(
  SanPham.onCreateNewSanPhamClick
)
$("#sanpham-table").on(
  "click",
  ".fa-edit",
  SanPham.onUpdateSanPhamClick
)
$("#delete-sanpham").click(SanPham.onDeleteConfirmClick)
$("#sanpham-table").on(
  "click",
  ".fa-trash",
  SanPham.onDeleteSanPhamByIdClick
)

function validateSanPham(paramCC) {
  "use strict"
  let vResult = true
  if(paramCC.tenSanPham==""){
    alert("Vui lòng nhập tên danh mục")
    return false;
  }
  return vResult
}


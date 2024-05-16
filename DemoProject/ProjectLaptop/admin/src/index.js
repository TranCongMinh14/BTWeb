"use strict"
let gDonHangId = 0
let DonHang = {
  newDonHang: {
    id: 0,
    maDonHang: "",
    hoTen: "",
    diaChiGiao: "",
    sdtGiao: "",
    ghiChu: "",
    ngayTao: "",
    trangthai: 0,
  },
  displayModalCreateDonHang() {
    $("#modal-create-donhang").modal("show")
  },
  onCreateNewDonHangClick() {
    this.newDonHang = {
        id: 0,
        maDonHang: "",
        tenDonHang: $("#inp-create-tenDonHang").val().trim(),
    }
    if (validateDonHang(this.newDonHang)) {
      $.ajax({
        url: "http://localhost:8080/donhang",
        method: "POST",
        data: JSON.stringify(this.newDonHang),
        contentType: "application/json",
        success: (data) => {
          $("#modal-create-donhang").modal("hide")
          alert("Danh Mục created successfully")
          getDonHangFromDb()
          resetCreateCCInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateDonHangClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = DonHangTable.row(vSelectedRow).data()
    gDonHangId = vSelectedData.id
    console.log(gDonHangId)
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/donhang/${gDonHangId}`,
      async: false,
      dataType: "json",
      success: function (response) {
        $("#modal-update-donhang").modal("show")
        $("#inp-update-ordercode").val(response.maDonHang)
        $("#inp-update-fullname").val(response.hoTen)
        $("#inp-update-address").val(response.diaChiGiao)
        $("#inp-update-numphone").val(response.sdtGiao)
        $("#inp-update-ghichu").val(response.ghiChu)
        $("#select-trangthai").val(response.trangthai)
      },
    })
  },
  onSaveDonHangClick() {
    this.newDonHang = {
      id: 0,
      maDonHang: $("#inp-update-ordercode").val().trim(),
      hoTen: $("#inp-update-fullname").val().trim(),
      diaChiGiao: $("#inp-update-address").val().trim(),
      sdtGiao: $("#inp-update-numphone").val().trim(),
      ghiChu: $("#inp-update-ghichu").val().trim(),
      ngayTao: "",
      trangthai: $("#select-trangthai").val(),
    }
    if (validateDonHang(this.newDonHang)) {
      $.ajax({
        url: `http://localhost:8080/donhang/${gDonHangId}`,
        method: "PUT",
        data: JSON.stringify(this.newDonHang),
        contentType: "application/json",
        success: (data) => {
          $("#modal-update-donhang").modal("hide")
          alert("Danh Mục updated successfully")
          getDonHangFromDb()
          gDonHangId = 0
          resetDonHangInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onDeleteDonHangByIdClick() {
    $("#modal-delete-donhang").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = DonHangTable.row(vSelectedRow).data()
    gDonHangId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gDonHangId == 0) {
      $.ajax({
        url: "http://localhost:8080/donhang",
        method: "DELETE",
        success: () => {
          alert("All DonHang were successfully deleted")
          getDonHangFromDb()
          $("#modal-delete-donhang").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/donhang/${gDonHangId}`,
        method: "DELETE",
        success: () => {
          alert(
            `DonHang with id: ${gDonHangId} was successfully deleted`
          )
          getDonHangFromDb()
          $("#modal-delete-donhang").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let DonHangTable = $("#donhang-table").DataTable({
  columns: [
    { data: "id" },
    { data: "maDonHang" },
    { data: "hoTen" },
    { data: "diaChiGiao" },
    { data: "sdtGiao" },
    { data: "ghiChu" },
    { data: "ngayTao" },
    { data: "trangthai" },
    { data: "action" },
  ],
  columnDefs: [
    {
      targets: -1,
      defaultContent: `<i class="fas fa-edit text-primary"></i>  ||  <i class="fa fa-trash text-primary""></i>`,
    },
  ],
  responsive: true,
  lengthChange: false,
  autoWidth: false,
  buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
})
DonHangTable.buttons()
  .container()
  .appendTo("#donhang-table_wrapper .col-md-6:eq(0)")

function loadDonHangOnTable(paramDonHang) {
  "use strict"
  DonHangTable.clear()
  DonHangTable.rows.add(paramDonHang)
  DonHangTable.draw()
}

function getDonHangFromDb() {
  "use strict"
  $.get("http://localhost:8080/donhang", (DonHang) =>
    loadDonHangOnTable(DonHang)
  )
}
getDonHangFromDb()

$(".btn-create-donhang").click(DonHang.displayModalCreateDonHang)
$("#create-donhang").click(
  DonHang.onCreateNewDonHangClick
)
$("#donhang-table").on(
  "click",
  ".fa-edit",
  DonHang.onUpdateDonHangClick
)
$("#update-donhang").click(DonHang.onSaveDonHangClick)
$("#delete-donhang").click(DonHang.onDeleteConfirmClick)
$("#donhang-table").on(
  "click",
  ".fa-trash",
  DonHang.onDeleteDonHangByIdClick
)

function resetDonHangInput() {
  $("#inp-update-maDonHang").val("")
  $("#inp-update-tenDonHang").val("")
}
function resetCreateCCInput() {
  $("#inp-update-maDonHang").val("")
  $("#inp-update-tenDonHang").val("")
}

function validateDonHang(paramCC) {
  "use strict"
  let vResult = true
  if(paramCC.tenDonHang==""){
    alert("Vui lòng nhập tên danh mục")
    return false;
  }
  return vResult
}


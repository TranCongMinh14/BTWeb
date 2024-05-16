"use strict"
let gDanhMucId = 0
let DanhMuc = {
  newDanhMuc: {
    id: 0,
    maDanhMuc: "",
    tenDanhMuc: "",
  },
  displayModalCreateDanhMuc() {
    $("#modal-create-danhmuc").modal("show")
  },
  onCreateNewDanhMucClick() {
    this.newDanhMuc = {
        id: 0,
        maDanhMuc: "",
        tenDanhMuc: $("#inp-create-tendanhmuc").val().trim(),
    }
    if (validateDanhMuc(this.newDanhMuc)) {
      $.ajax({
        url: "http://localhost:8080/loaisanpham",
        method: "POST",
        data: JSON.stringify(this.newDanhMuc),
        contentType: "application/json",
        success: (data) => {
          $("#modal-create-danhmuc").modal("hide")
          alert("Danh Mục created successfully")
          getDanhMucFromDb()
          resetCreateCCInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateDanhMucClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = DanhMucTable.row(vSelectedRow).data()
    gDanhMucId = vSelectedData.id
    console.log(gDanhMucId)
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/loaisanpham/${gDanhMucId}`,
      async: false,
      dataType: "json",
      success: function (response) {
        $("#modal-update-danhmuc").modal("show")
        $("#inp-update-madanhmuc").val(response.maDanhMuc)
        $("#inp-update-tendanhmuc").val(response.tenDanhMuc)
      },
    })
  },
  onSaveDanhMucClick() {
    this.newDanhMuc = {
        id: 0,
        maDanhMuc: $("#inp-update-madanhmuc").val().trim(),
        tenDanhMuc: $("#inp-update-tendanhmuc").val().trim(),
    }
    if (validateDanhMuc(this.newDanhMuc)) {
      $.ajax({
        url: `http://localhost:8080/loaisanpham/${gDanhMucId}`,
        method: "PUT",
        data: JSON.stringify(this.newDanhMuc),
        contentType: "application/json",
        success: (data) => {
          $("#modal-update-danhmuc").modal("hide")
          alert("Danh Mục updated successfully")
          getDanhMucFromDb()
          gDanhMucId = 0
          resetDanhMucInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onDeleteDanhMucByIdClick() {
    $("#modal-delete-danhmuc").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = DanhMucTable.row(vSelectedRow).data()
    gDanhMucId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gDanhMucId == 0) {
      $.ajax({
        url: "http://localhost:8080/loaisanpham",
        method: "DELETE",
        success: () => {
          alert("All DanhMuc were successfully deleted")
          getDanhMucFromDb()
          $("#modal-delete-danhmuc").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/loaisanpham/${gDanhMucId}`,
        method: "DELETE",
        success: () => {
          alert(
            `DanhMuc with id: ${gDanhMucId} was successfully deleted`
          )
          getDanhMucFromDb()
          $("#modal-delete-danhmuc").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let DanhMucTable = $("#danhmuc-table").DataTable({
  columns: [
    { data: "id" },
    { data: "maDanhMuc" },
    { data: "tenDanhMuc" },
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
DanhMucTable.buttons()
  .container()
  .appendTo("#danhmuc-table_wrapper .col-md-6:eq(0)")

function loadDanhMucOnTable(paramDanhMuc) {
  "use strict"
  DanhMucTable.clear()
  DanhMucTable.rows.add(paramDanhMuc)
  DanhMucTable.draw()
}

function getDanhMucFromDb() {
  "use strict"
  $.get("http://localhost:8080/loaisanpham", (DanhMuc) =>
    loadDanhMucOnTable(DanhMuc)
  )
}
getDanhMucFromDb()

$(".btn-create-danhmuc").click(DanhMuc.displayModalCreateDanhMuc)
$("#create-danhmuc").click(
  DanhMuc.onCreateNewDanhMucClick
)
$("#danhmuc-table").on(
  "click",
  ".fa-edit",
  DanhMuc.onUpdateDanhMucClick
)
$("#update-danhmuc").click(DanhMuc.onSaveDanhMucClick)
$("#delete-danhmuc").click(DanhMuc.onDeleteConfirmClick)
$("#danhmuc-table").on(
  "click",
  ".fa-trash",
  DanhMuc.onDeleteDanhMucByIdClick
)

function resetDanhMucInput() {
  $("#inp-update-madanhmuc").val("")
  $("#inp-update-tendanhmuc").val("")
}
function resetCreateCCInput() {
  $("#inp-update-madanhmuc").val("")
  $("#inp-update-tendanhmuc").val("")
}

function validateDanhMuc(paramCC) {
  "use strict"
  let vResult = true
  if(paramCC.tenDanhMuc==""){
    alert("Vui lòng nhập tên danh mục")
    return false;
  }
  return vResult
}


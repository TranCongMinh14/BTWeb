"use strict"
let gHangSanXuatId = 0
let HangSanXuat = {
  newHangSanXuat: {
    id: 0,
    maHangSanXuat: "",
    tenHangSanXuat: "",
  },
  displayModalCreateHangSanXuat() {
    $("#modal-create-hangsx").modal("show")
  },
  onCreateNewHangSanXuatClick() {
    this.newHangSanXuat = {
        id: 0,
        maHangSX: "",
        tenHangSX: $("#inp-create-tenhangsx").val().trim(),
    }
    if (validateHangSanXuat(this.newHangSanXuat)) {
      $.ajax({
        url: "http://localhost:8080/hangsanxuat",
        method: "POST",
        data: JSON.stringify(this.newHangSanXuat),
        contentType: "application/json",
        success: (data) => {
          $("#modal-create-hangsx").modal("hide")
          alert("Hãng Sản Xuất created successfully")
          getHangSanXuatFromDb()
          resetCreateCCInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateHangSanXuatClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = HangSanXuatTable.row(vSelectedRow).data()
    gHangSanXuatId = vSelectedData.id
    console.log(gHangSanXuatId)
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/hangsanxuat/${gHangSanXuatId}`,
      async: false,
      dataType: "json",
      success: function (response) {
        $("#modal-update-hangsx").modal("show")
        $("#inp-update-maHangSanXuat").val(response.maHangSanXuat)
        $("#inp-update-tenHangSanXuat").val(response.tenHangSanXuat)
      },
    })
  },
  onSaveHangSanXuatClick() {
    this.newHangSanXuat = {
        id: 0,
        maHangSanXuat: $("#inp-update-maHangSanXuat").val().trim(),
        tenHangSanXuat: $("#inp-update-tenHangSanXuat").val().trim(),
    }
    if (validateHangSanXuat(this.newHangSanXuat)) {
      $.ajax({
        url: `http://localhost:8080/hangsanxuat/${gHangSanXuatId}`,
        method: "PUT",
        data: JSON.stringify(this.newHangSanXuat),
        contentType: "application/json",
        success: (data) => {
          $("#modal-update-hangsx").modal("hide")
          alert("Danh Mục updated successfully")
          getHangSanXuatFromDb()
          gHangSanXuatId = 0
          resetHangSanXuatInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onDeleteHangSanXuatByIdClick() {
    $("#modal-delete-hangsx").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = HangSanXuatTable.row(vSelectedRow).data()
    gHangSanXuatId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gHangSanXuatId == 0) {
      $.ajax({
        url: "http://localhost:8080/hangsanxuat",
        method: "DELETE",
        success: () => {
          alert("All HangSanXuat were successfully deleted")
          getHangSanXuatFromDb()
          $("#modal-delete-hangsx").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/hangsanxuat/${gHangSanXuatId}`,
        method: "DELETE",
        success: () => {
          alert(
            `HangSanXuat with id: ${gHangSanXuatId} was successfully deleted`
          )
          getHangSanXuatFromDb()
          $("#modal-delete-hangsx").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let HangSanXuatTable = $("#hangsx-table").DataTable({
  columns: [
    { data: "id" },
    { data: "maHangSX" },
    { data: "tenHangSX" },
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
HangSanXuatTable.buttons()
  .container()
  .appendTo("#hangsx-table_wrapper .col-md-6:eq(0)")

function loadHangSanXuatOnTable(paramHangSanXuat) {
  "use strict"
  HangSanXuatTable.clear()
  HangSanXuatTable.rows.add(paramHangSanXuat)
  HangSanXuatTable.draw()
}

function getHangSanXuatFromDb() {
  "use strict"
  $.get("http://localhost:8080/hangsanxuat", (HangSanXuat) =>
    loadHangSanXuatOnTable(HangSanXuat)
  )
}
getHangSanXuatFromDb()

$(".btn-create-hangsx").click(HangSanXuat.displayModalCreateHangSanXuat)
$("#create-hangsx").click(
  HangSanXuat.onCreateNewHangSanXuatClick
)
$("#hangsx-table").on(
  "click",
  ".fa-edit",
  HangSanXuat.onUpdateHangSanXuatClick
)
$("#update-hangsx").click(HangSanXuat.onSaveHangSanXuatClick)
$("#delete-hangsx").click(HangSanXuat.onDeleteConfirmClick)
$("#hangsx-table").on(
  "click",
  ".fa-trash",
  HangSanXuat.onDeleteHangSanXuatByIdClick
)

function resetHangSanXuatInput() {
  $("#inp-update-hangsx").val("")
  $("#inp-update-hangsx").val("")
}
function resetCreateCCInput() {
  $("#inp-create-tenhangsx").val("")
}

function validateHangSanXuat(paramCC) {
  "use strict"
  let vResult = true
  if(paramCC.tenHangSanXuat==""){
    alert("Vui lòng nhập tên danh mục")
    return false;
  }
  return vResult
}


"use strict"
let gLienHeId = 0
let LienHe = {
  newLienHe: {
    id: 0,
    hoTen: "",
    email: "",
    dienThoai: "",
    noiDung: "",
    ngayTao: "",
  },
  displayModalCreateAddress() {
    $("#modal-create-lienhe").modal("show")
  },
  onCreateNewLienHeClick() {
    this.newLienHe = {
        id: 0,
        hoTen: $("#inp-create-fullname").val().trim(),
        email: $("#inp-create-email").val().trim(),
        dienThoai: $("#inp-create-numphone").val().trim(),
        noiDung: $("#inp-create-noidung").val().trim(),
        ngayTao: "",
    }
    if (validateLienHe(this.newLienHe)) {
      $.ajax({
        url: "http://localhost:8080/lienhe",
        method: "POST",
        data: JSON.stringify(this.newLienHe),
        contentType: "application/json",
        success: (data) => {
          $("#modal-create-lienhe").modal("hide")
          alert("LienHe created successfully")
          getLienHeFromDb()
          resetCreateCCInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateLienHeClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = LienHeTable.row(vSelectedRow).data()
    gLienHeId = vSelectedData.id
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/lienhe/${gLienHeId}`,
      async: false,
      dataType: "json",
      success: function (response) {
        $("#modal-update-lienhe").modal("show")
        $("#inp-update-fullname").val(response.hoTen)
        $("#inp-update-email").val(response.email)
        $("#inp-update-numphone").val(response.dienThoai)
        $("#inp-update-noidung").val(response.noiDung)
      },
    })
  },
  onSaveLienHeClick() {
    this.newLienHe = {
        id: 0,
        hoTen: $("#inp-update-fullname").val().trim(),
        email: $("#inp-update-email").val().trim(),
        dienThoai: $("#inp-update-numphone").val().trim(),
        noiDung: $("#inp-update-noidung").val().trim(),
    }
    if (validateLienHe(this.newLienHe)) {
      $.ajax({
        url: `http://localhost:8080/lienhe/${gLienHeId}`,
        method: "PUT",
        data: JSON.stringify(this.newLienHe),
        contentType: "application/json",
        success: (data) => {
          $("#modal-update-lienhe").modal("hide")
          alert("LienHe updated successfully")
          getLienHeFromDb()
          gLienHeId = 0
          resetLienHeInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onDeleteLienHeByIdClick() {
    $("#modal-delete-lienhe").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = LienHeTable.row(vSelectedRow).data()
    gLienHeId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gLienHeId == 0) {
      $.ajax({
        url: "http://localhost:8080/lienhe",
        method: "DELETE",
        success: () => {
          alert("All LienHe were successfully deleted")
          getLienHeFromDb()
          $("#modal-delete-lienhe").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/lienhe/${gLienHeId}`,
        method: "DELETE",
        success: () => {
          alert(
            `LienHe with id: ${gLienHeId} was successfully deleted`
          )
          getLienHeFromDb()
          $("#modal-delete-lienhe").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let LienHeTable = $("#lienhe-table").DataTable({
  columns: [
    { data: "id" },
    { data: "hoTen" },
    { data: "email" },
    { data: "dienThoai" },
    { data: "noiDung" },
    { data: "ngayTao" },
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
LienHeTable.buttons()
  .container()
  .appendTo("#lienhe-table_wrapper .col-md-6:eq(0)")

function loadLienHeOnTable(paramLienHes) {
  "use strict"
  LienHeTable.clear()
  LienHeTable.rows.add(paramLienHes)
  LienHeTable.draw()
}

function getLienHeFromDb() {
  "use strict"
  $.get("http://localhost:8080/lienhe", (LienHe) =>
    loadLienHeOnTable(LienHe)
  )
}
getLienHeFromDb()

$(".btn-create-lienhe").click(LienHe.displayModalCreateAddress)
$("#create-lienhe").click(
  LienHe.onCreateNewLienHeClick
)
$("#lienhe-table").on(
  "click",
  ".fa-edit",
  LienHe.onUpdateLienHeClick
)
$("#update-lienhe").click(LienHe.onSaveLienHeClick)
$("#delete-all-lienhe").click(
  LienHe.onDeleteAllLienHeClick
)
$("#delete-lienhe").click(LienHe.onDeleteConfirmClick)
$("#lienhe-table").on(
  "click",
  ".fa-trash",
  LienHe.onDeleteLienHeByIdClick
)
function loadLienHeToInput(paramLienHes) {
  $("#modal-update-lienhe #input-address").val(
    paramLienHes.address
  )
  $("#modal-update-lienhe #input-lat").val(
    paramLienHes.lat
  )
  $("#modal-update-lienhe #input-lng").val(
    paramLienHes.lng
  )
}

function resetLienHeInput() {
  $("#inp-update-address").val("")
  $("#inp-update-lat").val("")
  $("#inp-update-lng").val("")
}
function resetCreateCCInput() {
  $("#inp-update-fullname").val("")
  $("#inp-update-birthday").val("")
  $("#inp-update-numphone").val("")
  $("#inp-update-address").val("")
  $("#inp-update-email").val("")
  $("#inp-update-username").val("")
  $("#inp-update-password").val("")
  $("#select-update-role").val("")
}

function validateLienHe(paramCC) {
  "use strict"
  let vResult = true
  try {
    
  } catch (e) {
    alert(e)
  }
  return vResult
}


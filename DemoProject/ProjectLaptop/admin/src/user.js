"use strict"
let gCustomerId = 0
let Customer = {
  newCustomer: {
    id: 0,
    hoTen: "",
    ngaySinh: "",
    soDienThoai: "",
    diaChi: "",
    email: "",
    username: "",
    password: "",
    role: "",
  },
  displayModalCreateAddress() {
    $("#modal-create-customer").modal("show")
  },
  onCreateNewCustomerClick() {
    this.newCustomer = {
        id: 0,
        hoTen: $("#inp-create-fullname").val().trim(),
        ngaySinh: $("#inp-create-birthday").val().trim(),
        soDienThoai: $("#inp-create-numphone").val().trim(),
        diaChi: $("#inp-create-address").val().trim(),
        email: $("#inp-create-email").val().trim(),
        username: $("#inp-create-username").val().trim(),
        password: $("#inp-create-password").val().trim(),
        role: $("#select-create-role").val(),
    }
    if (validateCustomer(this.newCustomer)) {
      $.ajax({
        url: "http://localhost:8080/register",
        method: "POST",
        data: JSON.stringify(this.newCustomer),
        contentType: "application/json",
        success: (data) => {
          $("#modal-create-customer").modal("hide")
          alert("Customer created successfully")
          getCustomerFromDb()
          resetCreateCCInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onUpdateCustomerClick() {
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = CustomerTable.row(vSelectedRow).data()
    gCustomerId = vSelectedData.id
    console.log(gCustomerId)
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/username/${gCustomerId}`,
      async: false,
      dataType: "json",
      success: function (response) {
        $("#modal-update-customer").modal("show")
        $("#inp-update-fullname").val(response.hoTen)
        $("#inp-update-birthday").val(response.ngaySinh)
        $("#inp-update-numphone").val(response.soDienThoai)
        $("#inp-update-address").val(response.diaChi)
        $("#inp-update-email").val(response.email)
        $("#inp-update-username").val(response.username)
        $("#inp-update-password").val(response.password)
        $("#select-update-role").val(response.role)
      },
    })
  },
  onSaveCustomerClick() {
    this.newCustomer = {
        id: 0,
        hoTen: $("#inp-update-fullname").val().trim(),
        ngaySinh: $("#inp-update-birthday").val().trim(),
        soDienThoai: $("#inp-update-numphone").val().trim(),
        diaChi: $("#inp-update-address").val().trim(),
        email: $("#inp-update-email").val().trim(),
        username: $("#inp-update-username").val().trim(),
        password: $("#inp-update-password").val().trim(),
        role: $("#select-update-role").val(),
    }
    if (validateCustomer(this.newCustomer)) {
      $.ajax({
        url: `http://localhost:8080/update/user/${gCustomerId}`,
        method: "PUT",
        data: JSON.stringify(this.newCustomer),
        contentType: "application/json",
        success: (data) => {
          $("#modal-update-customer").modal("hide")
          alert("Customer updated successfully")
          getCustomerFromDb()
          gCustomerId = 0
          resetCustomerInput()
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
  onDeleteCustomerByIdClick() {
    $("#modal-delete-customer").modal("show")
    let vSelectedRow = $(this).parents("tr")
    let vSelectedData = CustomerTable.row(vSelectedRow).data()
    gCustomerId = vSelectedData.id
  },
  onDeleteConfirmClick() {
    if (gCustomerId == 0) {
      $.ajax({
        url: "http://localhost:8080/customers",
        method: "DELETE",
        success: () => {
          alert("All Customer were successfully deleted")
          getCustomerFromDb()
          $("#modal-delete-danhmuc").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    } else {
      $.ajax({
        url: `http://localhost:8080/customers/${gCustomerId}`,
        method: "DELETE",
        success: () => {
          alert(
            `Customer with id: ${gCustomerId} was successfully deleted`
          )
          getCustomerFromDb()
          $("#modal-delete-customer").modal("hide")
        },
        error: (err) => alert(err.responseText),
      })
    }
  },
}

let CustomerTable = $("#customer-table").DataTable({
  columns: [
    { data: "id" },
    { data: "hoTen" },
    { data: "ngaySinh" },
    { data: "soDienThoai" },
    { data: "diaChi" },
    { data: "email" },
    { data: "username" },
    { data: "password" },
    { data: "role" },
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
CustomerTable.buttons()
  .container()
  .appendTo("#customer-table_wrapper .col-md-6:eq(0)")

function loadCustomerOnTable(paramCustomers) {
  "use strict"
  CustomerTable.clear()
  CustomerTable.rows.add(paramCustomers)
  CustomerTable.draw()
}

function getCustomerFromDb() {
  "use strict"
  $.get("http://localhost:8080/user", (Customer) =>
    loadCustomerOnTable(Customer)
  )
}
getCustomerFromDb()

$(".btn-create-customer").click(Customer.displayModalCreateAddress)
$("#create-customer").click(
  Customer.onCreateNewCustomerClick
)
$("#customer-table").on(
  "click",
  ".fa-edit",
  Customer.onUpdateCustomerClick
)
$("#update-customer").click(Customer.onSaveCustomerClick)
$("#delete-all-customer").click(
  Customer.onDeleteAllCustomerClick
)
$("#delete-customer").click(Customer.onDeleteConfirmClick)
$("#customer-table").on(
  "click",
  ".fa-trash",
  Customer.onDeleteCustomerByIdClick
)
function loadCustomerToInput(paramCustomers) {
  $("#modal-update-Customer #input-address").val(
    paramCustomers.address
  )
  $("#modal-update-Customer #input-lat").val(
    paramCustomers.lat
  )
  $("#modal-update-Customer #input-lng").val(
    paramCustomers.lng
  )
}

function resetCustomerInput() {
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

function validateCustomer(paramCC) {
  "use strict"
  let vResult = true
  try {
    
  } catch (e) {
    alert(e)
  }
  return vResult
}


const dsnv = new DSNV();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

//lấy thống tin nhân viên
function layThongTinNhanVien() {
  const _tknv = getEle("tknv").value;
  const _name = getEle("name").value;
  const _email = getEle("email").value;
  const _password = getEle("password").value;
  const _datepicker = getEle("datepicker").value;
  const _luongCB = getEle("luongCB").value;
  const _chucvu = getEle("chucvu").value;
  const _gioLam = getEle("gioLam").value;

  const nv = new NhanVien(
    _tknv,
    _name,
    _email,
    _password,
    _datepicker,
    _luongCB,
    _chucvu,
    _gioLam
  );
  nv.tinhTongLuong();
  nv.xepLoaiNhanVien();
  return nv;
}

//render UI

function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const nv = data[i];

    content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.name}</td>
            <td>${nv.email}</td>
            <td>${nv.datepicker}</td>
            <td>${nv.chucvu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
              <button class="btn btn-success" onclick = "handleDelete('${nv.tknv}')">Delete</button>
              <button class="btn btn-danger" onclick = "handleEdit('${nv.tknv}')">Edit</button>
            </td>
        </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

//button thêm nhân viên
getEle("btnThemNV").onclick = function handleThemNV() {
  const nv = layThongTinNhanVien();

  dsnv.themNV(nv);

  renderUI(dsnv.arr);

  setLocalStorage();
};
// xóa nhân viên
function handleDelete(id) {
  dsnv.xoaNV(id);
  console.log(dsnv.arr);

  renderUI(dsnv.arr);

  setLocalStorage();
}
//xuất thông tin nhân viên lên lại UI
function handleEdit(id) {
  //ấn nút edit auto mở cửa sổ
  var autoClick = getEle("btnThem");
  autoClick.click();
  const nv = dsnv.layThongTinTuEdit(id);

  if (nv !== null) {
    getEle("tknv").value = nv.tknv;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.name;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.datepicker;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucvu;
    getEle("gioLam").value = nv.gioLam;
  }

  getEle("btnThemNV").style.display = "none";
}

//Cập nhật thông tin chỉnh nhân viên
function handleCapNhatNV() {
  const nv = layThongTinNhanVien();

  dsnv.editNV(nv);

  renderUI(dsnv.arr);

  setLocalStorage();
}

//lưu dữ liệu thêm nhân viên xuống localStorage của brower
function setLocalStorage() {
  //chuyển dataJson sang string
  const dataString = JSON.stringify(dsnv.arr);
  //lưu xuống localStorage
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  const dataString = localStorage.getItem("DSNV");
  //chuyển string sang json
  if (dataString) {
    const dataJson = JSON.parse(dataString);
    //phục hồi data cho dsnv.arr
    dsnv.arr = dataJson;
    //render UI
    renderUI(dsnv.arr);
  }
}

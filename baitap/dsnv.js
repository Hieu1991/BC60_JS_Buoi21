function DSNV() {
  this.arr = [];

  //thêm NV
  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  //tìm ví trí
  this.timViTri = function (id) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      const nv = this.arr[i];
      if (nv.tknv === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  //xóa nhân viên
  this.xoaNV = function (id) {
    const index = this.timViTri(id);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
}

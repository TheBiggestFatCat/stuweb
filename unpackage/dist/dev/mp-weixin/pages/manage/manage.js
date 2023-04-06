"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      users: [
        {
          username: ""
        }
      ],
      username: "",
      print: false,
      students: [],
      items: [],
      filterData: [],
      filterText: "",
      grade: [],
      stuId: 0,
      showPicture: [],
      bigpic: "",
      page: "teacher",
      alteringInfo: {}
    };
  },
  methods: {
    getData() {
      const that = this;
      that.username = getApp().globalData.username;
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/selectAllUser",
        success(res) {
          that.users = res.data;
        }
      });
    },
    getData2() {
      const that = this;
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/Students/selectAllStudents",
        success(res) {
          for (let i of res.data) {
            if (i.photo == null) {
              i.photo = "";
            }
          }
          that.$data.items = res.data;
        }
      });
    },
    openTeacher(username) {
      const that = this;
      this.$refs.teacheralter.open();
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/selectUserByName/" + username,
        success(res) {
          that.alteringInfo = res.data;
        }
      });
    },
    alterTeacher() {
      const that = this;
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/alterUser/",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: that.alteringInfo.userId,
          password: that.alteringInfo.password,
          picture: that.alteringInfo.picture
        },
        success(res) {
          common_vendor.index.showToast({
            title: "修改成功"
          });
        }
      });
    },
    delUser(userId) {
      const that = this;
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/deleteUser/" + userId,
        success(res) {
          if (res.data == 1) {
            common_vendor.index.showToast({
              title: "删除成功"
            });
            that.getData();
          } else {
            common_vendor.index.showToast({
              title: "删除失败",
              icon: "error"
            });
          }
        }
      });
    }
  },
  computed: {
    // 筛选身份为教师的用户
    filteredUsers() {
      let filterData = [];
      for (let i of this.users) {
        if (i.role == 2) {
          filterData.push(i);
        }
      }
      return filterData;
    },
    filteredItems() {
      let filterData = [];
      for (let i of this.items) {
        let arr = Object.values(i);
        for (let j in arr) {
          if (filterData[filterData.length - 1] == i) {
            break;
          }
          if (j != 0) {
            if (arr[j] == null) {
              arr[j] = "";
            }
            if (arr[j].toString().indexOf(this.filterText) !== -1) {
              filterData.push(i);
            }
          }
        }
      }
      return filterData;
    }
  },
  onShow() {
    this.getData();
    this.getData2();
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_easyinput2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_easyinput + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.username),
    b: common_vendor.o(($event) => $data.page = "teacher"),
    c: common_vendor.o(($event) => $data.page = "student"),
    d: common_vendor.o(($event) => $data.print = true),
    e: !$data.print,
    f: common_vendor.p({
      type: "right",
      size: "24"
    }),
    g: $data.print,
    h: common_vendor.o(($event) => $data.print = false),
    i: common_vendor.p({
      align: "center"
    }),
    j: common_vendor.p({
      align: "center"
    }),
    k: common_vendor.p({
      align: "center"
    }),
    l: common_vendor.p({
      align: "center"
    }),
    m: common_vendor.f($options.filteredUsers, (item, index, i0) => {
      return {
        a: common_vendor.t(item.userId),
        b: "7518f7d1-8-" + i0 + "," + ("7518f7d1-7-" + i0),
        c: common_vendor.t(item.userName),
        d: "7518f7d1-9-" + i0 + "," + ("7518f7d1-7-" + i0),
        e: common_vendor.t(item.picture),
        f: "7518f7d1-10-" + i0 + "," + ("7518f7d1-7-" + i0),
        g: common_vendor.o(($event) => $options.openTeacher(item.userName), index),
        h: common_vendor.o(($event) => $options.delUser(item.userId), index),
        i: "7518f7d1-11-" + i0 + "," + ("7518f7d1-7-" + i0),
        j: index,
        k: "7518f7d1-7-" + i0 + ",7518f7d1-1"
      };
    }),
    n: common_vendor.p({
      align: "center"
    }),
    o: common_vendor.p({
      align: "center"
    }),
    p: common_vendor.p({
      align: "center"
    }),
    q: common_vendor.p({
      align: "center"
    }),
    r: common_vendor.p({
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    }),
    s: $data.page == "teacher",
    t: common_vendor.p({
      align: "center"
    }),
    v: common_vendor.p({
      align: "center"
    }),
    w: common_vendor.p({
      align: "center"
    }),
    x: common_vendor.p({
      align: "center"
    }),
    y: common_vendor.p({
      align: "center"
    }),
    z: common_vendor.p({
      align: "center"
    }),
    A: common_vendor.p({
      align: "center"
    }),
    B: common_vendor.p({
      align: "center"
    }),
    C: common_vendor.p({
      align: "center"
    }),
    D: !$data.print,
    E: common_vendor.p({
      align: "center"
    }),
    F: common_vendor.f($options.filteredItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.studentId),
        b: "7518f7d1-25-" + i0 + "," + ("7518f7d1-24-" + i0),
        c: common_vendor.t(item.stuName),
        d: "7518f7d1-26-" + i0 + "," + ("7518f7d1-24-" + i0),
        e: common_vendor.t(item.school),
        f: "7518f7d1-27-" + i0 + "," + ("7518f7d1-24-" + i0),
        g: common_vendor.t(item.college),
        h: "7518f7d1-28-" + i0 + "," + ("7518f7d1-24-" + i0),
        i: common_vendor.t(item.className),
        j: "7518f7d1-29-" + i0 + "," + ("7518f7d1-24-" + i0),
        k: common_vendor.t(item.assistant),
        l: "7518f7d1-30-" + i0 + "," + ("7518f7d1-24-" + i0),
        m: common_vendor.t(item.award),
        n: "7518f7d1-31-" + i0 + "," + ("7518f7d1-24-" + i0),
        o: common_vendor.t(item.scholarship),
        p: "7518f7d1-32-" + i0 + "," + ("7518f7d1-24-" + i0),
        q: common_vendor.t(item.poor == 1 ? "是" : "否"),
        r: "7518f7d1-33-" + i0 + "," + ("7518f7d1-24-" + i0),
        s: common_vendor.o(($event) => _ctx.open(item.stuId), index),
        t: common_vendor.o(($event) => _ctx.open(item.stuId), index),
        v: common_vendor.o(($event) => _ctx.open(item.stuId), index),
        w: "7518f7d1-34-" + i0 + "," + ("7518f7d1-24-" + i0),
        x: index,
        y: "7518f7d1-24-" + i0 + ",7518f7d1-12"
      };
    }),
    G: common_vendor.p({
      align: "center"
    }),
    H: common_vendor.p({
      align: "center"
    }),
    I: common_vendor.p({
      align: "center"
    }),
    J: common_vendor.p({
      align: "center"
    }),
    K: common_vendor.p({
      align: "center"
    }),
    L: common_vendor.p({
      align: "center"
    }),
    M: common_vendor.p({
      align: "center"
    }),
    N: common_vendor.p({
      align: "center"
    }),
    O: common_vendor.p({
      align: "center"
    }),
    P: !$data.print,
    Q: common_vendor.p({
      align: "center"
    }),
    R: common_vendor.p({
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    }),
    S: $data.page == "student",
    T: common_vendor.t($data.alteringInfo.userName),
    U: common_vendor.o(($event) => $data.alteringInfo.password = $event),
    V: common_vendor.p({
      placeholder: "",
      modelValue: $data.alteringInfo.password
    }),
    W: common_vendor.o(($event) => $data.alteringInfo.picture = $event),
    X: common_vendor.p({
      placeholder: "",
      modelValue: $data.alteringInfo.picture
    }),
    Y: common_vendor.o((...args) => $options.alterTeacher && $options.alterTeacher(...args)),
    Z: common_vendor.sr("teacheralter", "7518f7d1-35"),
    aa: common_vendor.p({
      type: "center"
    }),
    ab: common_vendor.sr("stuPicture", "7518f7d1-38"),
    ac: common_vendor.p({
      type: "center"
    }),
    ad: $data.bigpic,
    ae: common_vendor.sr("popup3", "7518f7d1-39"),
    af: common_vendor.p({
      type: "center"
    }),
    ag: common_vendor.n($data.print ? "page-print" : "page")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stuweb/pages/manage/manage.vue"]]);
wx.createPage(MiniProgramPage);

import myaxios from "./myaxios";

export default {
  getAllDiskStatus() {
    return myaxios({
      method: 'get',
      url: 'disk/alldiskstatus'
    });
  }
}
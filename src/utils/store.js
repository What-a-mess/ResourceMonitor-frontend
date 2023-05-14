import { reactive } from "vue";
import CPUApi from "@/api/cpuapi";
import DiskApi from "@/api/diskapi"
import IFApi from "@/api/ifapi";

export const store = reactive({
  LEN: 60,
  cpuUsage: [],
  coreUsage: [],
  cpuInfo: {
    name: "temp",
    baseFreq: 0,
    logicalProcessorsCnt: 0,
    physicalProcessorsCnt: 0
  },
  diskInfo: [],
  diskInfoMap: new Map(),
  ifInfo:[],
  ifInfoMap: new Map(),
  init() {
    console.log(this);
    CPUApi.getCPUInfo().then(resp => {  
      this.cpuInfo = resp.data;
      this.cpuUsage = new Array(this.LEN).fill({ name: 0, value: 0 });
      for (let i = 0; i < this.cpuInfo.logicalProcessorsCnt; i++) {
        this.coreUsage.push(new Array(this.LEN).fill(0));
      }
    });

    this.fetchData();
  },
  fetchCpuData() {
    // console.log(this);
    CPUApi.getCPUUsage().then(resp => {
      this.cpuUsage.shift();
      this.cpuUsage.push({ name: new Date().getTime(), value: resp.data });
    }).catch(err => {
      this.cpuUsage.shift();
      this.cpuUsage.push(0);
    });
    CPUApi.getCoreUsage().then(resp => {
      let tempCoreUsage = resp.data;
      for (let [i, usage] of tempCoreUsage) {
        this.coreUsage[i].shift(1);
        this.coreUsage[i].push(usage);
      }
    }).catch(err => {
      for (let i = 0; i < this.coreUsage.length; i++) {
        this.coreUsage[i].shift(1);
        this.coreUsage[i].push(0);
      }
    });
  },
  fetchDiskData() {
    DiskApi.getAllDiskStatus().then(resp => {
      this.diskInfo = resp.data;
    });
    for (let info of this.diskInfo) {
      if (!this.diskInfoMap.has(info.hashcode)) {
        this.diskInfoMap.set(info.hashcode, new Map());
        this.diskInfoMap.get(info.hashcode)
          .set('name', info.name);
        this.diskInfoMap.get(info.hashcode)
          .set('usage', new Array(this.LEN).fill({ name: 0, value: 0 }));
        this.diskInfoMap.get(info.hashcode)
          .set('ioread', new Array(this.LEN).fill({ name: 0, value: 0 }));
        this.diskInfoMap.get(info.hashcode)
          .set('iowrite', new Array(this.LEN).fill({ name: 0, value: 0 }));
      }

      this.diskInfoMap.get(info.hashcode).get('usage').shift();
      this.diskInfoMap.get(info.hashcode).get('usage').push({ name: info.timestamp, value: info.diskBusyRate });
      this.diskInfoMap.get(info.hashcode).get('ioread').shift();
      this.diskInfoMap.get(info.hashcode).get('ioread').push({ name: info.timestamp, value: info.readSpeed });
      this.diskInfoMap.get(info.hashcode).get('iowrite').shift();
      this.diskInfoMap.get(info.hashcode).get('iowrite').push({ name: info.timestamp, value: info.writeSpeed });
    }
  },
  fetchIFData() {
    IFApi.getAllIFStatus().then(resp => {
      this.ifInfo = resp.data;
    });

    for (let info of this.ifInfo) {
      if (!this.ifInfoMap.has(info.hashcode)) {
        this.ifInfoMap.set(info.hashcode, new Map());
        this.ifInfoMap.get(info.hashcode)
          .set('name', info.name);
        this.ifInfoMap.get(info.hashcode)
          .set('displayName', info.displayName);
        this.ifInfoMap.get(info.hashcode)
          .set('sendSpeed', new Array(this.LEN).fill({ name: 0, value: 0 }));
        this.ifInfoMap.get(info.hashcode)
          .set('recvSpeed', new Array(this.LEN).fill({ name: 0, value: 0 }));
        this.ifInfoMap.get(info.hashcode)
          .set('sendPktSpeed', new Array(this.LEN).fill({ name: 0, value: 0 }));
        this.ifInfoMap.get(info.hashcode)
          .set('recvPktSpeed', new Array(this.LEN).fill({ name: 0, value: 0 }));
      }
      this.ifInfoMap.get(info.hashcode).get('sendSpeed').shift();
      this.ifInfoMap.get(info.hashcode).get('sendSpeed').push({ name: info.timestamp, value: info.sendSpeed });
      this.ifInfoMap.get(info.hashcode).get('recvSpeed').shift();
      this.ifInfoMap.get(info.hashcode).get('recvSpeed').push({ name: info.timestamp, value: info.recvSpeed });
      this.ifInfoMap.get(info.hashcode).get('sendPktSpeed').shift();
      this.ifInfoMap.get(info.hashcode).get('sendPktSpeed').push({ name: info.timestamp, value: info.sendPktSpeed });
      this.ifInfoMap.get(info.hashcode).get('recvPktSpeed').shift();
      this.ifInfoMap.get(info.hashcode).get('recvPktSpeed').push({ name: info.timestamp, value: info.recvPktSpeed });
    }
  },
  fetchData() {
    this.fetchCpuData();
    this.fetchDiskData();
    this.fetchIFData();
  }
});
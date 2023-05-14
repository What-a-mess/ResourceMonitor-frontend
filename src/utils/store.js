import { reactive } from "vue";
import CPUApi from "@/api/cpuapi";
import DiskApi from "@/api/diskapi"

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
  fetchData() {
    this.fetchCpuData();
    this.fetchDiskData();
  }
});
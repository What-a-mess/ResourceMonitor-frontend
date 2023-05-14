import myaxios from "./myaxios";

export default {
    getCPUUsage() {
        return myaxios({
            method: 'get',
            url: 'cpu/totalusage'
        })
    },
    getCoreUsage() {
        return myaxios({
            method: 'get',
            url: 'cpu/coreusage'
        })
    },
    getCPUInfo() {
        return myaxios({
            method: 'get',
            url: 'cpu/cpuinfo'
        })
    }
}
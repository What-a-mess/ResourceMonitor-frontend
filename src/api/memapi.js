import myaxios from "./myaxios";

export default {
    getMemInfo() {
        return myaxios({
            method: 'get',
            url: 'memory/status'
        })
    },
    getConsumed() {
        return myaxios({
            method: 'get',
            url: 'memory/consumed'
        })
    },
    getTotal() {
        return myaxios({
            method: 'get',
            url: 'memory/total'
        })
    }
}
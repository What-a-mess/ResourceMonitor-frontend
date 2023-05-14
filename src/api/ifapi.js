import myaxios from '@/api/myaxios'

export default {
    getAllIFStatus() {
        return myaxios({
            method: 'get',
            url: 'if/allifstatus'
        });
    }
}
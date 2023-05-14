import myaxios from "./myaxios";

export default {
    getAllFSInfo() {
        return myaxios({
            method: 'get',
            url: 'filesystem/allfilesystemstatus'
        });
    }
}
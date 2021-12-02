"use strict";

exports.connectandSubscribeWebsocket = async (topic,url) => {
    try {

        await addUrlTOCache(topic,url);
        return {
            data:{
                url,
                topic
            }
        };


    } catch (e) {
        console.log("error Websocket Request",e);
        return {
            error: (e?.response?.data?.error) ||(e?.response?.data?.message) || e.message
        }
    }


};


exports.connectandPublishWebsocket = async (topic,message) => {
    try {

        let data =  getCache(topic);
        return {
            data:{
                data
            }
        };


    } catch (e) {
        console.log("error Websocket Request",e);
        return {
            error: (e?.response?.data?.error) ||(e?.response?.data?.message) || e.message
        }
    }


};
async function  addUrlTOCache(key,value){
    let list = [];
    let val= getCache(key);
    if(!val) {
        list.push(value);
        setCache(key, list);
    }else{
        val.push(value);
        setCache(key, val);
    }
}


async function  getUrlFromCache(key){
    return getCache(key);

}
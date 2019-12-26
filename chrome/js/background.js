
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(changeInfo.status=="complete"){
        //check id in memory and update count.
        let url=new URL(tab.url)
        let searchparams=url.searchParams;
        let video_id=searchparams.get('v');
        let store=null
        try{
            store = await getMap();
        }catch(err){
           createMapandStore();
           store=await getMap();
        }
       console.log("video:", video_id);
       console.log("store", store)
       //remove first item (which is non frequently viewed)
       if(store.length>100){
           store.shift()
       }
       map=new Map(store);

       if(map.has(video_id)){
           let _count=map.get(video_id);
           map.delete(video_id);
           map.set(video_id,_count+1)
       }else{
           map.set(video_id,1)
       }
       console.log("map",map.entries())
       let serialized_Values=[...map.entries()]
       await chrome.storage.local.set({map:serialized_Values})        
    }
})
function getMap(){
    return new Promise((resolve,reject)=>{
        chrome.storage.local.get(['map'],(data)=>{
            if(!data.map) reject("no data");
            resolve(data.map)
        })
    })
}
async function createMapandStore(){
   await chrome.storage.local.set({map:[]})
}



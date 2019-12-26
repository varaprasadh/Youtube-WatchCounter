
window.onload=async ()=>{
    let video_container = document.querySelector('.html5-video-container')
    let controls = document.querySelector('.ytp-chrome-controls')
    let video_id=new URL(location.href).searchParams.get('v');

    let count=await getCount(video_id)
    let fab= `<div class="youtube_pip_container">
               <div class="youtube-pip-info">
                <img class="_glass_img" src=${chrome.runtime.getURL("../images/eye.png")}></img>
                <div class="_count">${count}</div>
               </div>
              </div>`
    let fab_element = new DOMParser().parseFromString(fab, "text/html").body.firstChild;
    console.log(fab_element);
    // document.body.appendChild(fab_element)
    controls.appendChild(fab_element)
}
async function getCount(id){
    return new Promise((resolve,reject)=>{
        chrome.storage.local.get(['map'], data => {
            if (!data.map) {
              resolve(1);
            }
            let map = new Map(data.map);
            resolve(map.get(id) || 1);
        });
    })
}
const joinBtn = document.getElementById("join-btn");

joinBtn.addEventListener("click" , async  (ev)=>{
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
})
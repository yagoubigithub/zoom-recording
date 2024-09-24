window.onload = () => 
{
    const webcam = document.getElementById("webcam")


    const peer = new Peer(
        {
            host : "",
            
        }
    );


    // navigator.getUserMedia({
    //     audio : true,
    //     video : true
    // } , (stream) => {
    //     webcam.srcObject = stream;
    //     webcam.play()

    // } , (error=>{

    // })) 
}
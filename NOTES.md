every video implementation out there is all using ffmpeg, most used basically.


since whatever you give on server be it html, image,videos is downloaded for showing to client

but we need to process and convert(like 240p,360p) the video before sending it to client, so we use ffmpeg to process and convert the video .

For example - You're watching a video in 480p but you decided to watch it in 720p, now we would need to again  download the video in 720p, that's a problem. Again if user clicks 1080p and then 720p then both gets downloaded, another problem. 

So, to resolve this concept of Adaptive Streaming was introduced. In this, we divide the video into small chunks as videos are nothing but frames, so we divide the video into frames or chunks for each quality(720,480,etc) and many more other processings depending on requirements.


The expert in this field is ffmpeg, it can do anything with video, it can convert, process, etc.
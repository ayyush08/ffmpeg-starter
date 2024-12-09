# HLS - HTTP Live Streaming

HTTP live streaming (HLS) is one of the most widely used video streaming protocols. Although it is called HTTP "live" streaming, it is used for both on-demand streaming and live streaming. HLS breaks down video files into smaller downloadable HTTP files and delivers them using the HTTP protocol. Client devices load these HTTP files and then play them back as video.

One advantage of HLS is that all Internet-connected devices support HTTP, making it simpler to implement than streaming protocols that require the use of specialized servers. Another advantage is that an HLS stream can increase or decrease video quality depending on network conditions without interrupting playback. This is why video quality may get better or worse in the middle of a video as a user is watching it. This feature is known as "adaptive bitrate video delivery" or "adaptive bitrate streaming," and without it, slow network conditions can stop a video from playing altogether.

## How does HLS work?
### Server:
- An HLS stream originates from a server where (in on-demand streaming) the media file is stored, or where (in live streaming) the stream is created. Because HLS is based on HTTP, any ordinary web server can originate the stream.

Two main processes take place on the server:

1. Encoding: The video data is reformatted so that any device can recognize and interpret the data. HLS must use H.264 or H.265 encoding.
2. Segmenting: The video is divided up into segments a few seconds in length. The length of the segments can vary, although the default length is 6 seconds (until 2016 it was 10 seconds).
In addition to dividing the video into segments, HLS creates an index file of the video segments to record the order they belong in.
HLS will also create several duplicate sets of segments at different quality levels: 480p, 720p, 1080p, and so on.

### What is adaptive bitrate streaming in HLS?
One of the advantages HLS has over some other streaming protocols is adaptive bitrate streaming. This refers to the ability to adjust video quality in the middle of a stream as network conditions change. This ability allows videos to keep playing even if network conditions get worse; conversely, it also maximizes video quality to be as high as the network can support.

If the network slows down, the user's video player detects this, and adaptive bitrate streaming lowers the quality of the stream so that the video does not stop playing. If more network bandwidth becomes available, adaptive bitrate streaming improves the quality of the stream.

Adaptive bitrate streaming is possible because HLS creates several duplicate segmented streams at different quality levels during the segmentation process. The user's video player can switch from one of those streams to another one during video playback.

### Does HLS use TCP or UDP as its transport protocol?
TCP and UDP are transport protocols, meaning they are responsible for delivering content over the Internet. TCP tends to deliver data more reliably than UDP, but the latter is much faster, even though some data may be lost in transit.

Because UDP is faster, some streaming protocols use UDP instead of TCP. HLS, however, uses TCP. This is for several reasons:

HLS is over HTTP, and the HTTP protocol is built for use with TCP (with some exceptions).
The modern Internet is more reliable and more efficient than it was when streaming was first developed. In many parts of the world today, user connectivity has vastly improved, especially for mobile connections. As a result, users have enough bandwidth to support the delivery of every video frame.
Adaptive bitrate streaming helps compensate for the potentially slower data delivery of TCP.
HLS streaming does not need to be "real time," as is the case with videoconferencing connections. A few extra seconds of lag does not impact the user experience as much as missing video frames would.
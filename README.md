# videojs-preview-thumbnails
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is plugin for video.js 7.0 version. The plugin can show preview thumbnails above control progress-bar. very simple for setup , you can open example folder and read index.html file to understand why I said very simple. 

![image](https://raw.githubusercontent.com/erickuo13/videojs-preview-thumbnails/master/readme.png)

### Installation

```sh
$ npm install videojs-preview-thumbnails --save
```

### How to use

Browser only for now :

First Step: Include Jquery and video.js 7+ :
```sh
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="//vjs.zencdn.net/7.3.0/video.min.js"></script>
// VideoJS CSS
<link href="//vjs.zencdn.net/7.3.0/video-js.min.css" rel="stylesheet">
```

Second Step: Include videojs-preview-thumbnails plugin : 
```sh
<script src="<node_module_path>/dist/videojs-preview-thumbnails.js"></script>
```

Third Step: Setup plugin in player ready function : 
```sh
videojs( 'my-player',{
 		
 		~ omit videojs setup-data ~
 		
 	},function () {
 		
    	this.initialPreviewThumbnail({
        	sprite_url:'./output-180x120-thumb.jpg',
            second:6,
            sprite_x_count:15,
            thumbnail_width:180,
            thumbnail_height:120,
            preview_window_border_size:2,
            preview_window_border_color:'green'
    });
    
});

```

Below is preview thumbnails setup property information:
```sh
	Initial Preview Thumbnail
     * [require] sprite_url : sprite url
     * [require] sprite_x_count : sprite's interval.
     * [require] thumbnail_width : thumbnail's width in sprite.
     * [require] thumbnail_height : thumbnail's height in sprite.
     * second : how many seconds of one thumbnail take in sprite.
     * preview_window_left_offset : window left offset.
     * preview_window_width : window width.
     * preview_window_height : window height.
     * preview_window_top : window top position.
     * preview_window_border_size : window's border size.
     * preview_window_border_color : window's border color.
     * hook_out : mouse-out hook function.
     * hook_move : mouse-move hook function.
```

When you incloud this library , you can also use hotkeys plugins , ( specially you can use this to get current player component in keyup and keydown function )

```sh
videojs( 'my-player',{
 		
 		~ omit videojs setup-data ~
 		
 	},function () {
 		
 	this.hotkeys({
         	keyup : function(event){
            	if( event.code=="Space" ) {
                	if( this.paused() ) this.play();
                	else this.pause();
                }
            },
            keydown : function (event) {
            	if( event.code=="ArrowRight" )this.currentTime(Math.floor(this.currentTime())+10);
                if( event.code=="ArrowLeft" )this.currentTime(Math.floor(this.currentTime())-10);
                if( event.code=="ArrowUp" )this.volume(this.volume()+0.1);
                if( event.code=="ArrowDown" )this.volume(this.volume()-0.1);
            }
         });
 		
    });
    
});

```

Below is hotkeys setup property information:
```sh
	Initial Preview Thumbnail
     * keyup : key-up function
     * keydown : key-down function
```

### Todos

 - Script for automatically build sprite.
 
##################################################

Finally enjoy it. 

EricKuo from Chiayi of Taiwan.

License
----
MIT

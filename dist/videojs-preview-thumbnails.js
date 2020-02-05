(function () {

    try{
        var player = videojs;
    }catch(error){
        return console.warn( 'Uncaught VideoJSError: please inject video.js(7.0+) library before.\r\n If you wanna to know video.js you can research by below link: https://videojs.com/' )
    }

    try{
	var isJqueryExist = $('#videojs-preview-thumbnails-check').length;
    }catch(error){
	return console.warn( 'Uncaught JqueryError: please inject Jquery library before.\r\n If you wanna to know jquery you can research by below link: https://jquery.com/' )
    }

    videojs.registerPlugin('initialPreviewThumbnail',initialPreviewThumbnail);
    videojs.registerPlugin('hotkeys',hotkeys);

    /**
     * Initial Preview Thumbnail
     * @param options
     *    [require] options.sprite_url : sprite url
     * 	  [require] options.sprite_x_count : sprite's interval.
     * 	  [require] options.thumbnail_width : thumbnail's width in sprite.
     * 	  [require] options.thumbnail_height : thumbnail's height in sprite.
     * 	  options.second : how many seconds of one thumbnail take in sprite.
     * 	  options.preview_window_left_offset : window left offset.
     * 	  options.preview_window_width : window width.
     * 	  options.preview_window_height : window height.
     * 	  options.preview_window_top : window top position.
     * 	  options.preview_window_border_size : window's border size.
     * 	  options.preview_window_border_color : window's border color.
     */
    function initialPreviewThumbnail( options ) {

	if( !options.hasOwnProperty('second') || isNaN(Number(options.second)) ) options.second = 60;
	if( !options.hasOwnProperty('preview_window_left_offset') ) options.preview_window_left_offset = 0;
	if( !options.hasOwnProperty('sprite_url') ) return console.log( 'sprite_url property is must parameter in initial options' );
	if( !options.hasOwnProperty('sprite_x_count') || isNaN(Number(options.sprite_x_count)) ) return console.log( 'sprite_x_count property is must parameter in initial options' );
	if( !options.hasOwnProperty('thumbnail_width') || isNaN(Number(options.thumbnail_width)) ) return console.log( 'thumbnail_width property is must parameter in initial options' );
	if( !options.hasOwnProperty('thumbnail_height') || isNaN(Number(options.thumbnail_height)) ) return console.log( 'thumbnail_height property is must parameter in initial options' );
	if( !options.hasOwnProperty('preview_window_width') || isNaN(Number(options.preview_window_width)) ) options.preview_window_width=options.thumbnail_width;
	if( !options.hasOwnProperty('preview_window_height') || isNaN(Number(options.preview_window_height)) ) options.preview_window_height=options.thumbnail_height;
	if( !options.hasOwnProperty('preview_window_top') || isNaN(Number(options.preview_window_top)) ) options.preview_window_top=-120;
	if( !options.hasOwnProperty('preview_window_border_size') || isNaN(Number(options.preview_window_border_size)) ) options.preview_window_border_size=1;
	if( !options.hasOwnProperty('preview_window_border_color') ) options.preview_window_border_color='white';
	else options.preview_window_border_size=1;

        if( $('.vjs-control-bar').length == 0 ) return console.warn('Uncaught ControlBar Element: initial failed');
	// 隱藏 vjs-time-tooltip ( hide tooltip component )
	$('.vjs-mouse-display').find('.vjs-time-tooltip').css({'display':'none'});
	// 控制組件 ( control-bar component )
	var controlBar = $('.vjs-control-bar');
	// 加入預覽組件 ( append preview window component )
	controlBar.append('<div class="vjs-preview-thumbnail"></div>');
	controlBar.find('.vjs-preview-thumbnail').css({
	    'position':'absolute',
	    'width':options.preview_window_width,
	    'height':options.preview_window_height,
	    'top':options.preview_window_top+'px',
	    'background-color':'black',
	    'border':'solid '+options.preview_window_border_size+'px '+options.preview_window_border_color,
	    'border-radius':'5px',
	    'display':'none'
	});
	// 偵聽移動事件並更新預覽圖片 ( listen on progress control mouse-move event )
	controlBar.on('mousemove', '.vjs-progress-control', function() {
	    // 從VideoJS自身 mouse-display 元件上取得時間。 ( get current time on video.js's tooltip component )
	    var time = $(this).find('.vjs-mouse-display .vjs-time-tooltip').text();
	    if (/^\d+$/.test(time)) time = '0:0:' + time;
	    else if (/^\d+:\d+$/.test(time)) time = '0:' + time;
	    var temp = time.split(':');
	    // 轉換成秒數 ( change to second )
	    time = (+temp[0]) * 60 * 60 + (+temp[1]) * 60 + (+temp[2]);
	    // 片段的ID ( calculate thumbnail ID )
	    var thumb_number = Math.floor(time/options.second);
	    var thumbInfo = {
		position_x : (thumb_number%options.sprite_x_count)*options.thumbnail_width*-1,
		position_y : Math.floor(thumb_number/options.sprite_x_count)*options.thumbnail_height*-1,
		left : $('.vjs-mouse-display').position().left + ( options.preview_window_left_offset )
	    };
	    // 更新組件 CSS ( update preview window's css )
	    controlBar.find('.vjs-preview-thumbnail').css({
		'background-image':'url('+ options.sprite_url +')',
		'background-position-x': thumbInfo.position_x,
		'background-position-y': thumbInfo.position_y,
		'left': thumbInfo.left,
		'display': 'block'
	    });

	    if( options.hasOwnProperty('hook_move') && typeof options.hook_move == 'function' ) options.hook_move();
	});
	// 偵聽移出控制組件的事件 ( listen on progress control mouse-out event )
	controlBar.on('mouseout', '.vjs-progress-control', function() {
	    controlBar.find('.vjs-preview-thumbnail').css({'display':'none'});
	    if( options.hasOwnProperty('hook_out') && typeof options.hook_out == 'function' ) options.hook_out();
	});
    }

    /**
     * HotKey plugins
     * @param options
     * 	keyup : keyup function
     * 	keydown : keydown function
     */
    function hotkeys( options ) {
        if( $('.vjs-tech').length == 0 ) return console.warn('Uncaught Player Element: initial failed');
	if( typeof options.keyup=='function' && options.keyup ) {
	    $('.vjs-tech').on('keyup',options.keyup.bind(this) );
	}
	if( typeof options.keyup=='function' && options.keydown ) {
	    $('.vjs-tech').on('keydown',options.keydown.bind(this) );
	}
    }

})();
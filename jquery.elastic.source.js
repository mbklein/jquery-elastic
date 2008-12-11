(function($){ 
     $.fn.extend({  
         elastic: function() { 
			var mimics = new Array('paddingTop','paddingRight','paddingBottom','paddingLeft','fontSize','lineHeight','fontFamily','width');	
			return this.each(function() { 
         			
				if(this.type == 'textarea') {
					
					var textarea = $(this);
					var marginbottom = parseInt(textarea.css('lineHeight'))*2 || parseInt(textarea.css('fontSize'))*2;
					var minheight = parseInt(textarea.css('height')) || marginbottom;
					var goalheight = 0;
					var twin = null;
					
					function update() {
						if (!twin)
						{
							twin = $('<div />').css({'visibility': 'hidden','position': 'absolute','overflow-x': 'hidden'}).appendTo('body');
							$.each(mimics, function(){
								twin.css(this,textarea.css(this));
							});
						}
						
						var content = textarea.val().replace(/<|>/g, ' ').replace(/\n/g, '<br />');
						if (twin.text() != content)
						{			
							twin.html(content);
							goalheight = (twin.height()+marginbottom > minheight)?twin.height()+marginbottom:minheight;
							if(goalheight != textarea.height())
								textarea.animate({'height': goalheight},500);		
						}
					}
					textarea.css({overflow: 'hidden',display: 'block'}).bind('focus',function() { self.periodicalUpdater = window.setInterval(function() {update();}, 400); }).bind('blur', function() { clearInterval(self.periodicalUpdater); });
					update();
					
				}
            }); 
        } 
    }); 
})(jQuery);
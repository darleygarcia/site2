// okay so I'm goning to credit where I got this code, cause it it's mine
//credit : https://codepen.io/nis130/pen/jONMqja
jQuery(document).ready(function() 
{
  jQuery('.skillbar').each(function() 
  {
      jQuery(this).find('.skillbar-bar').animate
      (
        { width: jQuery(this).attr('data-percent') 
      }, 2000);
  });

});


/*SKills bars*/
(function() {
	
	var SkillsBar = function( bars ) {
		this.bars = document.querySelectorAll( bars );
		if( this.bars.length > 0 ) {
			this.init();
		}	
	};
	
	SkillsBar.prototype = {
		init: function() {
			var self = this;
			self.index = -1;
			self.timer = setTimeout(function() {
				self.action();
			}, 500);
			
			
		},
		select: function( n ) {
			var self = this,
				bar = self.bars[n];
				
				if( bar ) {
					var width = bar.parentNode.dataset.percent;
				
					bar.style.width = width;
					bar.parentNode.classList.add( "complete" );	
				}
		},
		action: function() {
			var self = this;
			self.index++;
			if( self.index == self.bars.length ) {
				clearTimeout( self.timer );
			} else {
				self.select( self.index );	
			}
			
			setTimeout(function() {
				self.action();
			},600);
		}
	};
	
	window.SkillsBar = SkillsBar;
	
})();

(function() {
	document.addEventListener( "DOMContentLoaded", function() {
		var skills = new SkillsBar( ".skillbar-bar" );
	});
})();





//Changing text// ES6 Class
class TypeWriter {
	constructor(txtElement, words, wait = 3000) 
	{
	  this.txtElement = txtElement;
	  this.words = words;
	  this.txt = '';
	  this.wordIndex = 0;
	  this.wait = parseInt(wait, 15);
	  this.type();
	  this.isDeleting = false;
	}
  
	type() {
	  // Current index of word
	  const current = this.wordIndex % this.words.length;
	  // Get full text of current word
	  const fullTxt = this.words[current];
  
	  // Check if deleting
	  if(this.isDeleting) {
		// Remove char
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	  } else {
		// Add char
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	  }
  
	  // Insert txt into element
	  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
	  // Initial Type Speed
	  let typeSpeed = 300;
  
	  if(this.isDeleting) {
		typeSpeed /= 2;
	  }
  
	  // If word is complete
	  if(!this.isDeleting && this.txt === fullTxt) {
		// Make pause at end
		typeSpeed = this.wait;
	
		// Set delete to true
		this.isDeleting = true;
	  } else if(this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		// Move to next word
		this.wordIndex++;
		// Pause before start typing
		typeSpeed = 300;
	  }
  
	  setTimeout(() => this.type(), typeSpeed);
	}
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
  }
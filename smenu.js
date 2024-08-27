[[iframe]]
[[script  src="https://code.jquery.com/jquery-1.12.4.min.js" /]]
[[script  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"/]]
[[style href="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" /]]	
[[script  src="https://unpkg.com/mathlive/dist/mathlive.min.js" /]]	
 
[[style]]
    .formula {
      text-align: left;
      padding: 5px;
      cursor: pointer;
      width: 100%;
      box-sizing: border-box;
    }
    .formula:hover {
      background-color: #f0f0f0;
    }
    ul {
      padding: 0;
      margin: 0;
      width: 100%;
      max-height: 200px; /* Set a maximum height for the dropdown */
      overflow-y: auto; /* Enable vertical scrolling if content exceeds max height */
    }
    li {
      list-style: none;
      margin-bottom: 5px;
      width: 100%;
    }
    .dropdown-container {
      position: relative;
      width: 120px;
    }
    .dropdown-header {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;

    }
    .flex-container {
      display: flex;
      align-items: bottom;
			font-size:20px;
			
    }
    .plus-sign {
    	  position: center;
      font-size: 2em;
      margin-left:40px; /* Add some space around the + sign */
			margin-right:25px;
    }
[[/style]					 

 <div class="flex-container">
    <div id="dropdown1" class="dropdown-container">
      <h2 id="header1" class="dropdown-header"></h2>
      <ul id="list1"></ul>
    </div>
    <div class="plus-sign">+</div>
    <div id="dropdown2" class="dropdown-container">
      <h2 id="header2" class="dropdown-header"></h2>
      <ul id="list2"></ul>
    </div>
  </div>				   
 [[script type="module"]]
					 
// Function to add a new item
function addItem(elementId, formula, index) {
    var newItem = jQuery('<li>').addClass('formula').html('\\[' + formula + '\\]').attr('data-index', index);
    jQuery('#' + elementId + ' ul').append(newItem);
    newItem.click(function() {
        jQuery('#' + elementId + ' h2').html(jQuery(this).html());
        MathJax.typeset();
        jQuery("#" + elementId).accordion("option", "active", false); // This line closes the accordion
				// Trigger an event
        jQuery(document).trigger('formulaSelected', [elementId, index]);
    });
    MathJax.typeset();
		
}

// Function to create the dropdown menu
function createDropdownMenu(elementId, items) {
    jQuery( function() {
        jQuery( "#" + elementId ).accordion({
            collapsible: true,
            active: false,
						animate: 250
        });
    });

    // Add items
    items.forEach(function(item, index) {
        addItem(elementId, item, index);
    });
}
const items=['H_2O_{(g)}','CO_{2(g)}','Ca^{2+}_{(aq)}'];
jQuery(document).ready(function() {
    createDropdownMenu('dropdown1',items );
		createDropdownMenu('dropdown2', items);
		// Listen for the 'formulaSelected' event
    jQuery(document).on('formulaSelected', function(event, elementId, index) {
        console.log('Formula selected from ' + elementId + ': ' + index);
    });
});
[[script]]
[[/iframe]]
  

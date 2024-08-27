[[iframe]]
[[script  src="https://code.jquery.com/jquery-1.12.4.min.js" /]]
[[script  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"/]]
[[style href="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" /]]	
[[script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" /]]
[[style]]  .formula {text-align: left;}[[/style]

<div id="dropdown1" style="width: 100px; height:100px">
    <h2 style="height: 40px;" id="header1"></h2>
    <ul id="list1" style="list-style: none; padding: 0;">
        <!-- Items will be added here -->
    </ul>
</div>

<p style="font-size: 2em">+</p>
<div id="dropdown2" style="width: 100px;height:100px">
    <h2 style="height: 40px;" id="header2"></h2>
    <ul id="list2" style="list-style: none; padding: 0;">
        <!-- Items will be added here -->
    </ul>
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
  

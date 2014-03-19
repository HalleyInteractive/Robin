/* globals document, io, $ */

$(document).ready(function()
{
	$('.plugin-info').popover();
	$('.plugin .active-switch input').change(function(e)
	{
		var plugin_name = $(this).attr('plugin-name');
		var value = $("input[name='"+plugin_name+"_switch']:checked").val();
		socket.emit("toggle_plugin", plugin_name, value);
	});
});

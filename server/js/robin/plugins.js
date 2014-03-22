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

	$('.settings-btn').click(function()
	{
		var pluginname = $(this).attr("settings-key");
		$("#settings-modal .modal-title").text("Settings for " + pluginname + " plugin");
		$("#settings-modal").modal();
		$("#settings-modal .modal-body").html("");
		$("#settings-modal .modal-body").append("<div id='settings-form' plugin-id='" + pluginname + "'></div>");
		for(var prop in plugins[pluginname].settings)
		{
			$("#settings-modal .modal-body #settings-form").append(getFormElement(prop, plugins[pluginname].settings[prop]));
		}

	});

	$("#settings-modal #save").click(function()
	{
		var newSettings = getFormObject($("#settings-form").children());
		socket.emit('update_plugin_settings', $("#settings-form").attr('plugin-id'), JSON.stringify(newSettings));
		plugins[$("#settings-form").attr('plugin-id')].settings = newSettings;
	});
});

function getFormObject(children)
{
	var returnObj = {};
	children.each(function(key, val)
	{
		if($(val).hasClass('form-group'))
		{
			returnObj[$(val).find("input").attr('id')] = $(val).find("input").val();
		} else if($(val).hasClass('subform'))
		{
			returnObj[$(val).attr('id')] = getFormObject($(val).children());
		}
	});
	return returnObj;
}

function getFormElement(key, val)
{
	var frm = "";
	if(val instanceof Object)
	{
		frm += "<h2>" + key + "</h2>";
		frm += "<hr>";
		frm += "<div id='"+key+"' class='subform'>";
		for(var prop in val)
		{
			frm += getFormElement(prop, val[prop])
		}
		frm += "</div>";
	} else
	{
		frm += "<div class='form-group'>";
			frm += "<label for='"+key+"'>"+key+"</label>";
			frm += "<input type='text' class='form-control' id='"+key+"' placeholder='"+key+"' value='"+val+"'>";
		frm += "</div>";
	}
	return frm;
}

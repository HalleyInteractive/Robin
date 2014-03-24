/* globals document, io, $ */

var reloadplugins = false;

$(document).ready(function()
{
	var editableSettings =
	{
		url: 'http://' + window.location.hostname + ':8529/_db/Robin/_api/document/' + defaultSettings._id,
		pk: defaultSettings._key,
		ajaxOptions: { type: 'put', dataType: 'json' },
		params: getSettings,
		success: function()
		{
			socket.emit('reload_settings', reloadPlugins ? "true" : "false");
			reloadPlugins = false;
		}
	}
	$('#name').editable(editableSettings);
	$('#audiodevice').editable(editableSettings);

	editableSettings.source = languages.split(",");
	$('#language').editable(editableSettings);
});

function getSettings(changedparam)
{
	var settings = defaultSettings;
	settings[changedparam.name] = changedparam.value;
	reloadPlugins = changedparam.name === 'name';
	return JSON.stringify(settings);
}

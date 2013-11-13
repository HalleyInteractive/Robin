function runExtendedCommand(cmd)
{
	exports.ears.stt_basic_stop();
	exports.ears.stt_extended_start();
}

exports.basicCommands =
[
	{command:"ROBIN", callback:runExtendedCommand} // Add name of the robot later
];

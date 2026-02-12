Set WshShell = CreateObject("WScript.Shell")
WshShell.Run Chr(34) & "stop_system.bat" & Chr(34), 0
Set WshShell = Nothing

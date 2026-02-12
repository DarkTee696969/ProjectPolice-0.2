Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c node C:\xampp\htdocs\ProjectPolice\backend\src\server.js", 0
Set WshShell = Nothing

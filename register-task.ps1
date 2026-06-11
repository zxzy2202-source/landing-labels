$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c D:\不干胶落地页\start-dev.bat"
$trigger = New-ScheduledTaskTrigger -AtLogon
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -MultipleInstances IgnoreNew

Register-ScheduledTask -TaskName "ZhixinNextDev" -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force
Write-Host "Task registered successfully"

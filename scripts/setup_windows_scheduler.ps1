# FIGURAS POLITICAS - AGENDADOR DE POSTAGENS AUTOMATICAS NO WINDOWS
# Registra 3 tarefas no Agendador do Windows (09:00, 13:00 e 20:00)
# para publicar automaticamente no X com IP residencial sem custo de API.

$TaskNamePrefix = "FigurasPoliticas_Post_"
$ProjectDir = "C:\Users\victo\OneDrive\Documents\Politico"
$NodeExe = (Get-Command node).Source
$ScriptPath = Join-Path $ProjectDir "scripts\post_local_x.js"

$Times = @("09:00", "13:00", "20:00")

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "CONFIGURANDO AGENDADOR DE TAREFAS DO WINDOWS" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

if ($env:X_AUTH_TOKEN) {
    [Environment]::SetEnvironmentVariable("X_AUTH_TOKEN", $env:X_AUTH_TOKEN, "User")
    Write-Host "[OK] X_AUTH_TOKEN gravado permanentemente no perfil do usuario do Windows." -ForegroundColor Green
}

foreach ($Time in $Times) {
    $TaskName = "${TaskNamePrefix}${Time}".Replace(":", "")
    $Trigger = New-ScheduledTaskTrigger -Daily -At $Time
    $Action = New-ScheduledTaskAction -Execute $NodeExe -Argument "`"$ScriptPath`"" -WorkingDirectory $ProjectDir
    $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Publicacao automatica diaria do Figuras Politicas no X as $Time" | Out-Null
    Write-Host "[OK] Tarefa agendada com sucesso para as $Time (Nome: $TaskName)" -ForegroundColor Green
}

Write-Host "`nPronto! O seu computador agora publicara 3x ao dia (09h, 13h e 20h) de forma 100% automatica." -ForegroundColor Yellow

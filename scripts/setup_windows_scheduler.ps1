# FIGURAS POLÍTICAS - AGENDADOR DE POSTAGENS AUTOMÁTICAS NO WINDOWS
# Registra 3 tarefas no Agendador do Windows (09:00, 13:00 e 20:00)
# para publicar automaticamente no X com IP residencial sem custo de API.

$TaskNamePrefix = "FigurasPoliticas_Post_"
$ProjectDir = "C:\Users\victo\OneDrive\Documents\Politico"
$NodeExe = (Get-Command node).Source
$ScriptPath = Join-Path $ProjectDir "scripts\post_local_x.js"

$Times = @("09:00", "13:00", "20:00")

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "🇧🇷 CONFIGURANDO AGENDADOR DE TAREFAS DO WINDOWS" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Se X_AUTH_TOKEN estiver presente na sessão atual, persiste no perfil do usuário
if ($env:X_AUTH_TOKEN) {
    [Environment]::SetEnvironmentVariable("X_AUTH_TOKEN", $env:X_AUTH_TOKEN, "User")
    Write-Host "🔑 X_AUTH_TOKEN gravado permanentemente no perfil do usuário do Windows." -ForegroundColor Green
}

foreach ($Time in $Times) {
    $TaskName = "${TaskNamePrefix}${Time}".Replace(":", "")
    $Trigger = New-ScheduledTaskTrigger -Daily -At $Time
    $Action = New-ScheduledTaskAction -Execute $NodeExe -Argument "`"$ScriptPath`"" -WorkingDirectory $ProjectDir
    $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    # Remove tarefa antiga se existir
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    
    # Registra nova tarefa
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Publicação automática diária do Figuras Políticas no X às $Time" | Out-Null
    Write-Host "✅ Tarefa agendada com sucesso para as $Time (Nome: $TaskName)" -ForegroundColor Green
}

Write-Host "`n🎉 Pronto! O seu computador agora publicará 3x ao dia (09h, 13h e 20h) de forma 100% automática." -ForegroundColor Yellow

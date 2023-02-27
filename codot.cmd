@echo off

ECHO Run start COD(O.T) Admin!

setlocal
:PROMPT
SET /P AREYOUSURE=Are you sure (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

REM This will execute programs
REM the following command "C:\Program Files (x86)\Microsoft VS Code/Code.exe" below runs the app on the cmd.exe but stops the next command when used in batch; so the above syntax is prefered to avoid this in batch


REM COD(O.T) Will Be Run !

SET WAIT_TIME=2
start /d "C:\Program Files (x86)\Microsoft\Edge\Application" msedge.exe http://localhost:3000

yarn dev


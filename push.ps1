$Git = "C:\Program Files\Git\cmd\git.exe"
& $Git config --global user.name "mohamedakil029-byte"
& $Git config --global user.email "mohamedakil029-byte@users.noreply.github.com"
& $Git init
& $Git add .
& $Git commit -m "Initial commit of portfolio"
& $Git branch -M main
& $Git remote add origin https://github.com/mohamedakil029-byte/portfolio-official.git
& $Git push -u origin main

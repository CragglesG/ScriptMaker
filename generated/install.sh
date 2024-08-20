mkdir ~/.webscript
cp -r ./* ~/.webscript
chmod +x ~/.webscript/generated/webscript
echo '
 PATH=$PATH:$HOME/.webscript/generated' >>~/.bashrc 

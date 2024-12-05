import os
import shutil

service_dict = {
    "INFO_SCREEN_CURRENT_DIRECTORY": os.getcwd(),
    "INFO_SCREEN_CURRENT_USER": os.getlogin(),
    "INFO_SCREEN_START_SCRIPT": os.path.join(os.getcwd(), "start.sh")
}

browser_autostart = """if [[ -f INFO_SCREEN_RUNNING_FILE ]]; then
    chromium-browser --start-maximized --start-fullscreen http://localhost:4173 2>&1 &
else
    sleep 1
fi""".replace("INFO_SCREEN_RUNNING_FILE", os.path.join(os.getcwd(), "RUNNING"))

print("install.py - install info-screen-v2")

proceed = ""
while proceed.lower() not in ["y", "n"]:
    proceed = input("Make sure the labwc window manager is being used as the default one. You can use raspi-config to set it as the default environment. Proceed (Y/N)?")

if not shutil.which("node") or not shutil.which("npm"):
    install_dependencies = ""
    while install_dependencies.lower() not in ["y", "n"]:
        install_dependencies = input("Need dependencies node and npm. Install them now (Y/N)?")
    if install_dependencies.lower() == "y":
        os.system("sudo apt install -y nodejs npm")

with open("info-screen-v2.service", "r") as f:
    lines = f.read()

for (replace_string, replace_with) in service_dict.items():
    lines = lines.replace(replace_string, replace_with)

with open("info-screen-v2.service.new", "w") as f:
    f.write(lines)

print("Creating and enabling systemd service")
os.system("sudo mv info-screen.service.new /etc/systemd/system/info-screen.service")
os.system("sudo systemctl enable info-screen.service")

print("Creating autostart entry for browser")
autostart_file = os.path.join(os.path.expanduser("~"), ".config", "labwc")
mode = "a+" if os.path.exists(autostart_file) else "w"
with open(autostart_file, mode) as f:
    if mode == "a+":
        if f.read()[-1:] != "\n":
            f.write("\n")
    f.write(browser_autostart)

print("Install complete. Reboot to start info-screen!")
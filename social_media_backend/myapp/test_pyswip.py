import subprocess
import os

# Prepare the environment for subprocess.
my_env = os.environ.copy()
my_env["SWI_HOME_DIR"] = "/Applications/SWI-Prolog.app/Contents/swipl"

# Prepare the Prolog command.
command = [
    "/Applications/SWI-Prolog.app/Contents/MacOS/swipl",
    "-q",
    "-t",
    "assertz(parent(john, doe)), parent(john, X), writeln(X), halt."
]

# Run the command.
process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, env=my_env)

# Check for errors.
if process.stderr:
    print("Error:", process.stderr)

# Print the output from Prolog.
print(process.stdout)

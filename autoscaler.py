import subprocess
import time
from datetime import datetime

# Autoscaler script to monitor CPU and Memory usage of a Docker service and scale it up if thresholds are breached.
# Configurations
SERVICE_NAME = "scale_test_backend"
CPU_THRESHOLD = 60.0  # % of the limit
CPU_THRESHOLD_UP = 70.0
CPU_THRESHOLD_DOWN = 30.0
MEM_THRESHOLD = 60.0  # % of the limit
MAX_REPLICAS = 7
MIN_REPLICAS = 1

def get_current_replicas():
    cmd = f"docker service ls --filter name={SERVICE_NAME} --format '{{{{.Replicas}}}}'"
    try:
        output = subprocess.check_output(cmd, shell=True).decode("utf-8").strip()
        print(f"Current Replicas: {output}")
        # Returns something like "2/3", so we split and take the first part
        if '/' in output:
            return int(output.split('/')[0])  # Get the current number of replicas
        return MIN_REPLICAS
    except Exception as e:
        print(f"Error getting replicas: {e}")
        return MIN_REPLICAS

def get_stats():
    # Gets stats for the service containers
    cmd = "docker stats --format '{{.CPUPerc}}|{{.MemPerc}}' --no-stream"
    try:
        output = subprocess.check_output(cmd, shell=True).decode("utf-8")
        lines = [line.split('|') for line in output.splitlines() if line]
        
        # Convert to floats, stripping the '%' sign
        cpus = [float(l[0].replace('%', '')) for l in lines]
        mems = [float(l[1].replace('%', '')) for l in lines]
        
        return (sum(cpus)/len(cpus) if cpus else 0, 
                sum(mems)/len(mems) if mems else 0)
    except:
        return 0, 0

print(f"Starting autoscaler for service '{SERVICE_NAME}' with CPU threshold {CPU_THRESHOLD}% and Memory threshold {MEM_THRESHOLD}%")

while True:
    avg_cpu, avg_mem = get_stats()
    current_replicas = get_current_replicas()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"{timestamp} | CPU: {avg_cpu}% | MEM: {avg_mem}% | Replicas: {current_replicas}")
    
    if (avg_cpu > CPU_THRESHOLD or avg_mem > MEM_THRESHOLD) and current_replicas < MAX_REPLICAS:
        new_replicas = current_replicas + 1
        print("⚠️ Threshold breached! Scaling up...")
        subprocess.run(f"docker service scale {SERVICE_NAME}={new_replicas}", shell=True)
        #break # Exit script after scaling for this test
    
    elif (avg_cpu < CPU_THRESHOLD_DOWN and avg_mem < MEM_THRESHOLD) and current_replicas > MIN_REPLICAS:
        new_replicas = current_replicas - 1
        print("✅ Load reduced! Scaling down...")
        subprocess.run(f"docker service scale {SERVICE_NAME}={new_replicas}", shell=True)
        #break # Exit script after scaling for this test

    else:
        print("No scaling action needed")
        
    time.sleep(3)
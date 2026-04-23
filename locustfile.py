from locust import HttpUser, task, between

class SchoolApiUser(HttpUser):
    # Wait between 0.1 and 0.5 seconds between requests to create high load
    wait_time = between(0.1, 0.5)

    @task
    def test_root(self):
        self.client.get("/")
package ca.gc.ised.ndts.poc.backend.api;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import ca.gc.ised.ndts.poc.backend.api.model.Health;
import ca.gc.ised.ndts.poc.backend.api.service.HealthApiDelegateService;

@SpringBootTest
public class HealthApiTests {

	@Test
	void contextLoads() {
		
	}
	
	
	@Test
	void testDelegates() {
		HealthApiDelegate service = new HealthApiDelegateService();
		HealthApiDelegateService iservice = new HealthApiDelegateService();
		service.getRequest();
		ResponseEntity<Health> health = service.health();
		assertNotNull(health);
		ResponseEntity<Health> ihealth = iservice.healthDefault();
		assertNotNull(ihealth);
	}
}

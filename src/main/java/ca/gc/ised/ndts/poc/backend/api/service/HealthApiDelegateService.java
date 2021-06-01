package ca.gc.ised.ndts.poc.backend.api.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ca.gc.ised.ndts.poc.backend.api.HealthApiDelegate;
import ca.gc.ised.ndts.poc.backend.api.model.Health;

@Service
public class HealthApiDelegateService implements HealthApiDelegate {

	@Override
	public ResponseEntity<Health> health() {
		Health health = new Health();
		health.setKey("state");
		health.setValue("ok");
		return ResponseEntity.ok(health);
	}
}

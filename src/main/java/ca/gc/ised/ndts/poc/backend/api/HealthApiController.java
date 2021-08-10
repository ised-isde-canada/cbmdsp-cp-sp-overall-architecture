package ca.gc.ised.ndts.poc.backend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Optional;

@Controller
@RequestMapping("${openapi.backendATBStub.base-path:/v1}")
public class HealthApiController implements HealthApi {

    private final HealthApiDelegate delegate;

    public HealthApiController(@Autowired(required = false) HealthApiDelegate delegate) {
        this.delegate = Optional.ofNullable(delegate).orElse(new HealthApiDelegate() {});
    }

    @Override
    public HealthApiDelegate getDelegate() {
        return delegate;
    }

}

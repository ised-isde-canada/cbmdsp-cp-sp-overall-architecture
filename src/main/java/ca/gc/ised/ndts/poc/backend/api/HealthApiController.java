package ca.gc.ised.ndts.poc.backend.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Optional;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2021-02-03T11:23:46.546156-05:00[America/Toronto]")

@Controller
@RequestMapping("${openapi.backendATBStub.base-path:/v1}")
public class HealthApiController implements HealthApi {

    private final HealthApiDelegate delegate;

    public HealthApiController(@org.springframework.beans.factory.annotation.Autowired(required = false) HealthApiDelegate delegate) {
        this.delegate = Optional.ofNullable(delegate).orElse(new HealthApiDelegate() {});
    }

    @Override
    public HealthApiDelegate getDelegate() {
        return delegate;
    }

}

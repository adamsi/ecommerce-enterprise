package adam.dev.ecom_enterprise.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.Arrays;

@AllArgsConstructor
@Getter
public enum PermittedMatcher {

    AUTH("/auth/**"),

    OATH2("/oauth2/authorization/**"),

    CRONJOB("/cronjob/**"),

    GQL("/graphql"),

    GQL_PLAYGROUND("/graphiql");

    private final String pattern;

    public static RequestMatcher get() {
        return new OrRequestMatcher(Arrays.stream(PermittedMatcher.values())
                .map(m -> new AntPathRequestMatcher(m.getPattern()))
                .toArray(RequestMatcher[]::new));
    }

}

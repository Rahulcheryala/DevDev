import org.apache.camel.builder.RouteBuilder;

public class MyRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        from("timer://foo?period=1000")
          .setBody().constant("Hello from Apache Camel!")
          .to("log:out");
    }
}
from("jetty:http://0.0.0.0:8080/hello")
    .setBody().constant("Hello from Apache Camel via HTTP!");

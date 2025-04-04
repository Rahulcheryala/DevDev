package com.example;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;

public class MainApp {
    public static void main(String[] args) throws Exception {
        CamelContext camelContext = new DefaultCamelContext();

        // Add routes
        camelContext.addRoutes(new RouteBuilder() {
            @Override
            public void configure() {
                // Define the route
                from("jetty:http://0.0.0.0:8080/api/camel")
                    .setBody().constant("Hello from Apache Camel!")
                    .to("log:out");
            }
        });

        // Start Camel context
        camelContext.start();
        System.out.println("Camel server is running. Access it at http://localhost:8080/api/camel");
        Thread.sleep(20 * 60 * 1000);
        camelContext.stop();
    }
}

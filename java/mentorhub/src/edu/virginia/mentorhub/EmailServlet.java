package edu.virginia.mentorhub;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.text.SimpleDateFormat;
import java.util.TimeZone;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.Properties;
import java.io.FileNotFoundException;

public class EmailServlet extends HttpServlet{

    String url;
    String auth_code;

    public void getProperties() {
      // Define classes path from application.properties :
      String environment;
      InputStream inputStream;
      try {
        // Class path is found under WEB-INF/classes
        Properties prop = new Properties();
        String propFileName = "application.properties";

        inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
        // read the file
        if (inputStream != null) {
          prop.load(inputStream);
        } else {
          throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
        }

        // get the property value and print it out
        this.url = prop.getProperty("url");
        this.auth_code = prop.getProperty("auth_code");

      } catch (Exception e) {
        System.out.println("Exception: " + e);
      }
    }


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
	throws IOException {

      System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");  // trying to fix error on ws02.


      getProperties(); // Assure we can load settings from a properties file.

      String success = "false";
      String result   = "";
      String email = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
      System.out.println("I was called with: " + email);

      Date date = new Date(System.currentTimeMillis());

      // Conversion
      SimpleDateFormat sdf;
      sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
      sdf.setTimeZone(TimeZone.getTimeZone("EST"));
      String date_string = sdf.format(date);

      String jsonInputString = "{\"id\": \"" + email + "\", \"dateTime\": \"" + date_string + "\", \"event\": \"login\", \"eventData\": {}}";


      // Send data
      try {
        URL url = new URL(this.url);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(1000 * 5); //wait 5 seconds the most
        conn.setReadTimeout(1000 * 5);

        conn.setRequestProperty("mh-auth", this.auth_code);
        conn.setRequestProperty("Content-type", "application/json");
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
          byte[] input = jsonInputString.getBytes("utf-8");
          os.write(input, 0, input.length);
          os.close();
        }
        int responseCode = conn.getResponseCode();

        // Get the response
        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = rd.readLine()) != null) {
          result = result + "\n" + line;
          System.out.println(line);
        }
        rd.close();
        conn.disconnect();
        success = "true";
      } catch (IOException ex) {
        System.out.println("Exception:" + ex.toString());
        success = "false";
        result = ex.toString();
      }

      PrintWriter out = response.getWriter();
      out.println("{\"success\": " + success + ", \"response\": " + result + "}");
    }
}

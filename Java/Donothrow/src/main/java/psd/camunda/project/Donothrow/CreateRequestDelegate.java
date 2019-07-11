package psd.camunda.project.Donothrow;

import java.net.HttpURLConnection;
import java.net.URL;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class CreateRequestDelegate implements JavaDelegate {

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		String userName = (String) execution.getVariable("userName");
		String userEmail = (String) execution.getVariable("userEmail");

	    final String POST_PARAMS = "{\n\r" + "\"name\": \""+userName+"\",\r\n" +
	            "    \"email\": \""+userEmail+"\",\r\n" +
	            "    \"category\": \"ind\",\r\n}";
        String url = "https://fierce-earth-64250.herokuapp.com/request";
        URL obj = new URL(url);
        HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
        postConnection.setRequestMethod("POST");
        postConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        postConnection.setDoOutput(true);
        java.io.OutputStream os = postConnection.getOutputStream();
        os.write(POST_PARAMS.getBytes());
        os.flush();
        os.close();
        int responseCode = postConnection.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Payload: \n" + POST_PARAMS);
        System.out.println("POST Response Code :  " + responseCode);
        System.out.println("POST Response Message : " + postConnection.getResponseMessage());
	}

}

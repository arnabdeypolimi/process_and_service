package psd.camunda.project.Donothrow;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class DeleteFoodDelegate implements JavaDelegate {

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		String chosenFood = (String) execution.getVariable("chosenFood");
		
		String str = "https://fierce-earth-64250.herokuapp.com/food/";
		str = str.concat(chosenFood);
		
		URL url = null;
		try {
		    url = new URL(str);
		} catch (MalformedURLException exception) {
		    exception.printStackTrace();
		}
		HttpURLConnection httpURLConnection = null;
		try {
		    httpURLConnection = (HttpURLConnection) url.openConnection();
		    httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		    httpURLConnection.setRequestMethod("DELETE");
	        int responseCode = httpURLConnection.getResponseCode();
	        System.out.println("\nSending 'DELETE' request to URL : " + str);
	        System.out.println("DELETE Response Code :  " + responseCode);
	        System.out.println("DELETE Response Message : " + httpURLConnection.getResponseMessage());
		} catch (IOException exception) {
		    exception.printStackTrace();
		} finally {         
		    if (httpURLConnection != null) {
		        httpURLConnection.disconnect();
		    }
		}
	}

}

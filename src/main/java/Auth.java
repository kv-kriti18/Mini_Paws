import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.io.BufferedReader;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Auth")
public class Auth extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Auth() {
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    // Read the request body
	    BufferedReader reader = request.getReader();
	    StringBuilder requestBody = new StringBuilder();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        requestBody.append(line);
	    }
	    reader.close();
	    
	    // Create Gson instance
        Gson gson = new Gson();

        // Define the type of the target data structure
        Type type = new TypeToken<Map<String, String>>() {}.getType();

        // Convert JSON string to Map
        Map<String, String> data = gson.fromJson(requestBody.toString(), type);

	    // Get the email and password from the JSON data
	    String email = data.get("email");
	    String password = data.get("password");

	    // Set the response content type to application/json
	    response.setContentType("application/json");

	    // Create the JSON response string
	    JsonObject jsonResponse = new JsonObject();
	    if (isValidCredentials(email, password)) {
	        jsonResponse.addProperty("success", true);
	    } else {
	        jsonResponse.addProperty("success", false);
	    }

	    // Send the JSON response
	    PrintWriter out = response.getWriter();
	    out.print(jsonResponse.toString());
	    out.flush();
	}
	
	private boolean isValidCredentials(String email, String password) {
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		
		try {
		      Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
		    e.printStackTrace();
	    }
		
		try {
			// Establish a connection to the database
			connection = DriverManager.getConnection("jdbc:mysql:///MiniPawsDatabase", "root", "Tejas@123");

			// Prepare the SQL statement to check if the email and password exist in the
			// database
			String query = "SELECT * FROM user WHERE email = ? AND password = ?";
			statement = connection.prepareStatement(query);
			statement.setString(1, email);
			statement.setString(2, password);

			// Execute the query
			resultSet = statement.executeQuery();

			// Check if the result set has any rows
			if (resultSet.next()) {
				// Email and password exist in the database
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// Close the database resources
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (statement != null) {
					statement.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return false;
	}
}

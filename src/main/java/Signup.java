import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Map;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class Signup
 */
@WebServlet("/Signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Signup() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
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
	    if (insertUser(email, password)) {
	        jsonResponse.addProperty("success", true);
	    } else {
	        jsonResponse.addProperty("success", false);
	    }

	    // Send the JSON response
	    PrintWriter out = response.getWriter();
	    out.print(jsonResponse.toString());
	    out.flush();
	}
    
    private boolean insertUser(String email, String password) {
		PreparedStatement statement = null;
		
		try {
		      Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
		    e.printStackTrace();
	    }
		
        try {
            // Establish database connection
            Connection conn = DriverManager.getConnection("jdbc:mysql:///MiniPawsDatabase", "root", "Tejas@123");

            // Prepare the SQL statement
            String sql = "INSERT INTO user (email, password) VALUES (?, ?)";
            statement = conn.prepareStatement(sql);
            statement.setString(1, email);
            statement.setString(2, password);

            // Execute the statement
            int rowsAffected = statement.executeUpdate();

            // Close resources
            statement.close();
            conn.close();

            // Check if insertion was successful
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}

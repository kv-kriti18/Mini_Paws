import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.util.Map;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class CreatePet
 */
@WebServlet("/Pet")
public class Pet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Pet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set the response content type to application/json
        response.setContentType("application/json");

        // Create the JSON response array
        JsonArray jsonPetArray = new JsonArray();
        
        try {
		    Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
		    e.printStackTrace();
	    }

        try {
            // Establish database connection
            Connection conn = DriverManager.getConnection("jdbc:mysql:///MiniPawsDatabase", "root", "Tejas@123");

            // Prepare the SQL statement
            String sql = "SELECT * FROM pet";
            PreparedStatement statement = conn.prepareStatement(sql);

            // Execute the statement
            ResultSet resultSet = statement.executeQuery();

            // Process the result set
            while (resultSet.next()) {
                JsonObject jsonPet = new JsonObject();
                jsonPet.addProperty("id", resultSet.getInt("id"));
                jsonPet.addProperty("name", resultSet.getString("name"));
                jsonPet.addProperty("breed", resultSet.getString("breed"));
                jsonPet.addProperty("gender", resultSet.getString("gender"));
                jsonPet.addProperty("animal_type", resultSet.getString("animal_type"));

                jsonPetArray.add(jsonPet);
            }

            // Close resources
            resultSet.close();
            statement.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Send the JSON response
        PrintWriter out = response.getWriter();
        out.print(jsonPetArray.toString());
        out.flush();
    }


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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

        // Get the pet details from the JSON data
        String name = data.get("name");
        String breed = data.get("breed");
        String gender = data.get("gender");
        String animal_type = data.get("animal_type");

        // Set the response content type to application/json
        response.setContentType("application/json");

        // Create the JSON response object
        JsonObject jsonResponse = new JsonObject();
        int petId = insertPet(name, breed, gender, animal_type);
        if (petId > 0) {
            jsonResponse.addProperty("success", true);
            jsonResponse.addProperty("id", petId);
        } else {
            jsonResponse.addProperty("success", false);
        }

        // Send the JSON response
        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toString());
        out.flush();
    }

    private int insertPet(String name, String breed, String gender, String animal_type) {
        PreparedStatement statement = null;
        int generatedId = -1;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            // Establish database connection
            Connection conn = DriverManager.getConnection("jdbc:mysql:///MiniPawsDatabase", "root", "Tejas@123");

            // Prepare the SQL statement with RETURN_GENERATED_KEYS option
            String sql = "INSERT INTO pet (name, breed, gender, animal_type) VALUES (?, ?, ?, ?)";
            statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, name);
            statement.setString(2, breed);
            statement.setString(3, gender);
            statement.setString(4, animal_type);

            // Execute the statement
            int rowsAffected = statement.executeUpdate();

            // Get the generated ID
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                generatedId = generatedKeys.getInt(1);
            }

            // Close resources
            statement.close();
            conn.close();

            // Check if insertion was successful
            return (rowsAffected > 0) ? generatedId : -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }


}

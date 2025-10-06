1.	Objective 
The objective of this experiment is to develop a Student Registration Website that allows users to register student information, store it securely in a database using JDBC, and display registered student details dynamically. 
This project aims to demonstrate frontend-backend integration using modern JavaScript (React) for the user interface and Java + JDBC + MySQL for backend data management. 
It also familiarizes students with building interactive, database-connected web applications that ensure efficiency, security, and scalability. 

2.	Problem Statement / Task Description 
To create a Student Registration Portal that provides: 
1.	A user-friendly interface for registering new students. 
2.	Integration with a JDBC database to store and retrieve student information. 
3.	A “View Students” section to display all registered entries from the database. 
4.	Responsive and visually appealing UI using modern CSS frameworks and component libraries. 
The main task is to enable seamless data flow between the frontend (React) and the backend (Java with JDBC) for reliable record management. 
  
3.	Technology Used 
Category 	Technologies 
Frontend 	HTML5, CSS3, JavaScript (ES6), React.js, Tailwind CSS 
Backend 	Java, JDBC (Java Database Connectivity), Servlet API 
Database 	MySQL 
Tools / 
Libraries 	Lucide-react icons, Custom UI components (Shadcn UI), Node.js, npm 
Editor 	Visual Studio Code, IntelliJ IDEA / Eclipse 
Server 	Apache Tomcat 
Version Control 	Git & GitHub 
  
 
 
4.	Program / Code Snippets 
  RegistrationForm.js 
import { useState } from "react"; 
 
export function RegistrationForm() {   const [formData, setFormData] = useState({ name: "", email: "", course: "" }); 
 
  const handleSubmit = async (e) => { 
    e.preventDefault();     await fetch("/register", {       method: "POST",       headers: { "Content-Type": "application/json" },       body: JSON.stringify(formData), 
    }); 
    alert("Student Registered Successfully!"); 
  }; 
 
  return ( 
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto"> 
      <input type="text" placeholder="Name" required onChange={(e) => setFormData({ 
...formData, name: e.target.value })} /> 
      <input type="email" placeholder="Email" required onChange={(e) => setFormData({ 
...formData, email: e.target.value })} /> 
      <input type="text" placeholder="Course" required onChange={(e) => setFormData({ 
...formData, course: e.target.value })} /> 
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button> 
    </form> 
  ); 
} 
  RegisterServlet.java (Backend Integration) 
@WebServlet("/register") public class RegisterServlet extends HttpServlet {   protected void doPost(HttpServletRequest request, HttpServletResponse response)       throws ServletException, IOException { 
    String name = request.getParameter("name"); 
    String email = request.getParameter("email"); 
    String course = request.getParameter("course"); 
     try { 
      Connection con = DBConnection.getConnection(); 
      PreparedStatement ps = con.prepareStatement("INSERT INTO students (name, email, course) VALUES (?, ?, ?)");       ps.setString(1, name);       ps.setString(2, email);       ps.setString(3, course);       ps.executeUpdate();       response.getWriter().write("Student Registered Successfully!");     } catch (Exception e) { 
      e.printStackTrace();       response.getWriter().write("Error during registration!"); 
    } 
  } 
} 
Output:
<img width="940" height="1345" alt="image" src="https://github.com/user-attachments/assets/940760b7-d3de-41cb-9104-a848a24fa521" />

 
Conclusion 
From this experiment, I learned: 
•	How to connect a React frontend with a Java backend using JDBC. 
•	How to design a responsive, interactive student registration interface. 
•	How to implement database connectivity and perform CRUD operations in a web app. 
•	How to integrate frontend frameworks and backend logic for a full-stack solution. 
•	The importance of clean UI/UX design in improving user experience. 
  
5.	References 
1.	React Official Documentation 
2.	JDBC API Documentation – Oracle 
3.	MySQL Official Documentation 
4.	Tailwind CSS Documentation 

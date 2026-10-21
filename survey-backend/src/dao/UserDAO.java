package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.User;
import util.DBConnection;

public class UserDAO {
    public int create(User user) {
        int row = 0;
        try {
            Connection con = DBConnection.getConnection();
            String sql = "INSERT INTO users(firstName,lastName,email,phoneNo,password) VALUES(?,?,?,?,?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getPhoneNo());
            ps.setString(5, user.getPassword());
            row = ps.executeUpdate();
            System.out.println("Rows inserted: " + row);
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return row;
    }

    public User getLoginUser(String email, String password) {
        try {
            Connection con = DBConnection.getConnection();
            User user = null;
            String sql = "SELECT * from users WHERE email=? AND password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                user = new User();
                user.setId(rs.getInt("id"));
                user.setFirstName(rs.getString("firstName"));
                user.setLastName(rs.getString("LastName"));
                user.setEmail(rs.getString("email"));
                user.setPhoneNo(rs.getString("phoneNo"));
            }
            rs.close();
            ps.close();
            con.close();
            return user;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}

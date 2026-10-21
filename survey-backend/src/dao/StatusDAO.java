package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import util.DBConnection;

public class StatusDAO {
    public int getStatusId(String status) throws Exception {
        Connection con = DBConnection.getConnection();
        String sql = "SELECT id from status where name = ?";
        System.out.println(sql);
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setString(1, status);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            int statusId;
            statusId = rs.getInt("id");
            return statusId;
        }
        return 0;
    }
}

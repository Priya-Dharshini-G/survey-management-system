package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.Map;

import model.GroupSetting;
import model.GroupUsers;
import model.OptionSetting;
import model.ResponseOptions;
import requestmodel.IdReq;
import requestmodel.UpdateGroupReq;
import requestmodel.UpdateOptionSettingReq;
import requestmodel.UserIdReq;
import responsemodel.GetGroupSettingRes;
import responsemodel.GetOptionSettingRes;
import responsemodel.GroupUsersRes;
import responsemodel.ResOptions;
import util.DBConnection;

public class SettingDAO {

    public Map<Integer, GetOptionSettingRes> getAllOptions(UserIdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        String sql = "SELECT o.id, o.name, r.id, r.name from optionsetting as o left join responseoptions as r on o.id=r.optionsettingId where o.userId = ?;";
        System.out.println(sql);
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, reqData.getUserId());
        ResultSet rs = ps.executeQuery();
        Map<Integer, GetOptionSettingRes> optionMap = new LinkedHashMap<>();
        while (rs.next()) {
            int optionId = rs.getInt("o.id");
            GetOptionSettingRes option = optionMap.get(optionId);
            if (option == null) {
                option = new GetOptionSettingRes();
                option.setId(optionId);
                option.setName(rs.getString("o.name"));
                optionMap.put(optionId, option);
            }
            int responseId = rs.getInt("r.id");
            if (responseId != 0) {
                ResOptions resop = new ResOptions();
                resop.setId(responseId);
                resop.setName(rs.getString("r.name"));
                option.getOptions().add(resop);
            }
        }
        return optionMap;
    }

    public void createOption(OptionSetting payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            int row = 0;
            String sql = "INSERT INTO optionsetting(name,userId) values(?,?)";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, payload.getName());
            ps.setInt(2, payload.getUserId());
            row = ps.executeUpdate();
            if (row >= 1) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    int optionId = rs.getInt(1);
                    System.out.println("Inserted ID: " + optionId);
                    String optionSql = "INSERT INTO responseoptions(optionsettingId, name) VALUES (?, ?)";
                    PreparedStatement optionPs = con.prepareStatement(optionSql);
                    for (ResponseOptions op : payload.getOptions()) {
                        optionPs.setInt(1, optionId);
                        optionPs.setString(2, op.getName());
                        optionPs.addBatch();
                    }
                    optionPs.executeBatch();
                    con.commit();
                }
                rs.close();
                ps.close();
            }
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void updateOption(UpdateOptionSettingReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            String sql = "UPDATE optionsetting set name=? where id=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, reqData.getName());
            ps.setInt(2, reqData.getId());
            ps.executeUpdate();
            for (ResponseOptions op : reqData.getOptions()) {
                if (op.getId() == 0) {
                    System.out.println(op.getName());
                    String optionSql = "INSERT INTO responseoptions(optionsettingId, name) VALUES (?, ?)";
                    System.out.println(optionSql);
                    PreparedStatement optionPs = con.prepareStatement(optionSql);
                    optionPs.setInt(1, reqData.getId());
                    optionPs.setString(2, op.getName());
                    optionPs.executeUpdate();
                    optionPs.close();
                }
                if (op.getId() != 0) {
                    System.out.println(op.getName());
                    String optionSql = "UPDATE responseoptions SET name=? WHERE id=?";
                    System.out.println(optionSql);
                    PreparedStatement optionPs = con.prepareStatement(optionSql);
                    optionPs.setString(1, op.getName());
                    optionPs.setInt(2, op.getId());
                    optionPs.executeUpdate();
                    optionPs.close();
                }
            }
            if (reqData.getDeletedOptions().size() != 0) {
                String delSql = "DELETE from responseoptions where id=?";
                System.out.println(delSql);
                PreparedStatement deletePs = con.prepareStatement(delSql);
                for (ResponseOptions op : reqData.getDeletedOptions()) {
                    deletePs.setInt(1, op.getId());
                    deletePs.addBatch();
                }
                deletePs.executeBatch();
                deletePs.close();
            }
            ps.close();
        } catch (Exception e) {
            throw e;
        }
    }

    public void deleteOption(IdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {

            String optionSql = "DELETE from responseoptions where optionsettingId=?";
            System.out.println(optionSql);
            PreparedStatement Optionps = con.prepareStatement(optionSql);
            Optionps.setInt(1, reqData.getId());
            Optionps.executeUpdate();

            String sql = "DELETE from optionsetting where id=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, reqData.getId());
            ps.executeUpdate();

            con.commit();
            Optionps.close();
            ps.close();
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public Map<Integer, GetGroupSettingRes> getAllGroups(UserIdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        String sql = "SELECT g.id, g.name, g.created_at, u.id, u.email from groupsetting as g left join groupusers as u on g.id=u.groupsettingId where g.userId = ?;";
        System.out.println(sql);
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, reqData.getUserId());
        ResultSet rs = ps.executeQuery();
        Map<Integer, GetGroupSettingRes> groupMap = new LinkedHashMap<>();
        while (rs.next()) {
            int groupId = rs.getInt("g.id");
            GetGroupSettingRes group = groupMap.get(groupId);
            if (group == null) {
                group = new GetGroupSettingRes();
                group.setId(groupId);
                group.setName(rs.getString("g.name"));
                group.setCreated(rs.getString("g.created_at"));
                groupMap.put(groupId, group);
            }
            int usersId = rs.getInt("u.id");
            if (usersId != 0) {
                GroupUsersRes users = new GroupUsersRes();
                users.setId(usersId);
                users.setEmail(rs.getString("u.email"));
                group.getMembers().add(users);
            }
        }
        return groupMap;
    }

    public void createGroup(GroupSetting payload) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {
            int row = 0;
            String sql = "INSERT INTO groupsetting(name,userId) values(?,?)";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, payload.getName());
            ps.setInt(2, payload.getUserId());
            row = ps.executeUpdate();
            if (row >= 1) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    int groupId = rs.getInt(1);
                    System.out.println("Inserted ID: " + groupId);
                    String groupSql = "INSERT INTO groupusers(groupsettingId, email) VALUES (?, ?)";
                    PreparedStatement groupPs = con.prepareStatement(groupSql);
                    for (GroupUsers group : payload.getMembers()) {
                        groupPs.setInt(1, groupId);
                        groupPs.setString(2, group.getEmail());
                        groupPs.addBatch();
                    }
                    groupPs.executeBatch();
                    con.commit();
                }
                rs.close();
                ps.close();
            }
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    public void updateGroup(UpdateGroupReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        try {
            String sql = "UPDATE groupsetting set name=? where id=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, reqData.getName());
            ps.setInt(2, reqData.getId());
            ps.executeUpdate();
            for (GroupUsers group : reqData.getMembers()) {
                if (group.getId() == 0) {
                    String groupSql = "INSERT INTO groupusers(groupsettingId, email) VALUES (?, ?)";
                    System.out.println(groupSql);
                    PreparedStatement groupPs = con.prepareStatement(groupSql);
                    groupPs.setInt(1, reqData.getId());
                    groupPs.setString(2, group.getEmail());
                    groupPs.executeUpdate();
                    groupPs.close();
                }
                if (group.getId() != 0) {
                    String groupSql = "UPDATE groupusers SET email=? WHERE id=?";
                    System.out.println(groupSql);
                    PreparedStatement groupPs = con.prepareStatement(groupSql);
                    groupPs.setString(1, group.getEmail());
                    groupPs.setInt(2, group.getId());
                    groupPs.executeUpdate();
                    groupPs.close();
                }
            }
            if (reqData.getDeletedMembers().size() != 0) {
                String delSql = "DELETE from groupusers where id=?";
                System.out.println(delSql);
                PreparedStatement deletePs = con.prepareStatement(delSql);
                for (GroupUsers grp : reqData.getDeletedMembers()) {
                    deletePs.setInt(1, grp.getId());
                    deletePs.addBatch();
                }
                deletePs.executeBatch();
                deletePs.close();
            }
            ps.close();
        } catch (Exception e) {
            throw e;
        }
    }

    public void deleteGroup(IdReq reqData) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);
        try {

            String groupSql = "DELETE from groupusers where groupsettingId=?";
            System.out.println(groupSql);
            PreparedStatement groupPs = con.prepareStatement(groupSql);
            groupPs.setInt(1, reqData.getId());
            groupPs.executeUpdate();

            String sql = "DELETE from groupsetting where id=?";
            System.out.println(sql);
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, reqData.getId());
            ps.executeUpdate();

            con.commit();
            groupPs.close();
            ps.close();
        } catch (Exception e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }
}

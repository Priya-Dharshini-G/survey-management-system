package model;

import java.util.ArrayList;
import java.util.List;

public class GroupSetting {
    private int id;
    private String name;
    private int userId;
    private List<GroupUsers> members = new ArrayList<GroupUsers>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<GroupUsers> getMembers() {
        return members;
    }

    public void setMembers(List<GroupUsers> members) {
        this.members = members;
    }
}

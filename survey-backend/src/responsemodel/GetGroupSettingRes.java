package responsemodel;

import java.util.ArrayList;
import java.util.List;

public class GetGroupSettingRes {
    private int id;
    private String name;
    private List<GroupUsersRes> members = new ArrayList<GroupUsersRes>();
    private String created;

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

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

    public List<GroupUsersRes> getMembers() {
        return members;
    }

    public void setMembers(List<GroupUsersRes> members) {
        this.members = members;
    }
}

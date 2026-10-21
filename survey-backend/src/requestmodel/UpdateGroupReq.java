package requestmodel;

import java.util.List;

import model.GroupUsers;

public class UpdateGroupReq {
    private int id;
    private String name;
    private List<GroupUsers> members;
    private List<GroupUsers> deletedMembers;

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

    public List<GroupUsers> getMembers() {
        return members;
    }

    public void setMembers(List<GroupUsers> members) {
        this.members = members;
    }

    public List<GroupUsers> getDeletedMembers() {
        return deletedMembers;
    }

    public void setDeletedMembers(List<GroupUsers> deletedMembers) {
        this.deletedMembers = deletedMembers;
    }
}

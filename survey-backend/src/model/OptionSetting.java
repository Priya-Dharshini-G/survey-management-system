package model;

import java.util.List;

public class OptionSetting {
    private int id;
    private String name;
    private int userId;
    private List<ResponseOptions> options;

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

    public List<ResponseOptions> getOptions() {
        return options;
    }

    public void setOptions(List<ResponseOptions> options) {
        this.options = options;
    }
}

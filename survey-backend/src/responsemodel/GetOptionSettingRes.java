package responsemodel;

import java.util.ArrayList;
import java.util.List;

public class GetOptionSettingRes {
    private int id;
    private String name;
    private List<ResOptions> options = new ArrayList<ResOptions>();

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

    public List<ResOptions> getOptions() {
        return options;
    }

    public void setOptions(List<ResOptions> options) {
        this.options = options;
    }
}

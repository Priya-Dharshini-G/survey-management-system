package requestmodel;

import java.util.List;

import model.ResponseOptions;

public class UpdateOptionSettingReq {
    private int id;
    private String name;
    private List<ResponseOptions> options;
    private List<ResponseOptions> deletedOptions;

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

    public List<ResponseOptions> getOptions() {
        return options;
    }

    public void setOptions(List<ResponseOptions> options) {
        this.options = options;
    }

    public List<ResponseOptions> getDeletedOptions() {
        return deletedOptions;
    }

    public void setDeletedOptions(List<ResponseOptions> deletedOptions) {
        this.deletedOptions = deletedOptions;
    }
}

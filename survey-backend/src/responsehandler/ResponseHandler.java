package responsehandler;

import javax.servlet.http.HttpServletResponse;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class ResponseHandler {

    public String SuccessRes(HttpServletResponse res, String message) {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        JsonObject json = new JsonObject();
        json.addProperty("success", true);
        json.addProperty("message", message);
        return json.toString();
    }

    public String SuccessRes(HttpServletResponse res, String message, JsonElement data) {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        JsonObject json = new JsonObject();
        json.addProperty("success", true);
        json.addProperty("message", message);
        json.add("data", data);
        return json.toString();
    }

    public String ErrRes(HttpServletResponse res, String message) {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        JsonObject json = new JsonObject();
        json.addProperty("success", false);
        json.addProperty("message", message);
        return json.toString();
    }
}

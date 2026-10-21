package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SettingDAO;
import requestmodel.UserIdReq;
import responsehandler.ResponseHandler;
import responsemodel.GetGroupSettingRes;

public class GetAllGroupServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost GetAllGroupServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            UserIdReq payload = gson.fromJson(reader, UserIdReq.class);
            SettingDAO setting = new SettingDAO();
            Map<Integer, GetGroupSettingRes> groups = setting.getAllGroups(payload);
            System.out.println(groups.values());
            JsonElement data = gson.toJsonTree(groups.values());
            String retRes = resHandler.SuccessRes(res, "Groups retrieved successfully", data);
            res.setStatus(HttpServletResponse.SC_OK);
            res.getWriter().print(retRes);
        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.getWriter().print(retRes);
        }
    }
}

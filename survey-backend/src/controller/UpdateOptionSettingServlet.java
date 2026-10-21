package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SettingDAO;
import requestmodel.UpdateOptionSettingReq;
import responsehandler.ResponseHandler;

public class UpdateOptionSettingServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost UpdateOptionSettingServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            UpdateOptionSettingReq payload = gson.fromJson(reader, UpdateOptionSettingReq.class);
            SettingDAO setting = new SettingDAO();
            setting.updateOption(payload);
            String retRes = resHandler.SuccessRes(res, "Response options updated successfully");
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

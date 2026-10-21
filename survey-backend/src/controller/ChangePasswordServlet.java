package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SurveyCategoryDAO;
import requestmodel.ChangePasswordReq;
import responsehandler.ResponseHandler;

public class ChangePasswordServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost ChangeStatusServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            ChangePasswordReq payload = gson.fromJson(reader, ChangePasswordReq.class);
            SurveyCategoryDAO surveyDAO = new SurveyCategoryDAO();
            surveyDAO.changePassword(payload);
            String retRes = resHandler.SuccessRes(res, "Password updated successfully");
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

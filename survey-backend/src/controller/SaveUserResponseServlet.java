package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SurveyCategoryDAO;
import requestmodel.SaveUserResponseReq;
import responsehandler.ResponseHandler;

public class SaveUserResponseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost SaveUserResponseServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            SaveUserResponseReq payload = gson.fromJson(reader, SaveUserResponseReq.class);
            SurveyCategoryDAO surveyDAO = new SurveyCategoryDAO();
            surveyDAO.saveUserResponses(payload);
            String retRes = resHandler.SuccessRes(res, "Response Saved Successfully");
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

package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.SurveyCategoryDAO;
import requestmodel.UpdateSurveyCategoryReq;
import responsehandler.ResponseHandler;

public class UpdateCategoryServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost UpdateSurveyCategory");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            UpdateSurveyCategoryReq reqData = gson.fromJson(reader, UpdateSurveyCategoryReq.class);
            SurveyCategoryDAO categoryDAO = new SurveyCategoryDAO();
            categoryDAO.updateCategory(reqData);
            String retRes = resHandler.SuccessRes(res, "Updated successfully");
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

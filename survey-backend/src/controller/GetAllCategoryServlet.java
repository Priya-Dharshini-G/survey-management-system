package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import responsehandler.ResponseHandler;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SurveyCategoryDAO;
import model.SurveyCategory;
import requestmodel.SurveyCategoryRequest;

public class GetAllCategoryServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost GetSurveyCategoryServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            SurveyCategoryRequest reqData = gson.fromJson(reader, SurveyCategoryRequest.class);
            SurveyCategoryDAO category = new SurveyCategoryDAO();
            List<SurveyCategory> categoryList = category.getAllCategory(reqData);
            System.out.println(categoryList);
            JsonElement data = gson.toJsonTree(categoryList);
            if (categoryList.size() != 0) {
                String retRes = resHandler.SuccessRes(res, "User Created Successfully", data);
                res.setStatus(HttpServletResponse.SC_OK);
                res.getWriter().print(retRes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.getWriter().print(retRes);
        }
    }
}

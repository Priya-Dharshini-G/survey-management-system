package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import dao.SurveyCategoryDAO;
import requestmodel.IdReq;
import responsehandler.ResponseHandler;
import responsemodel.GetCategoryRes;

public class GetOneCategoryServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("inside doPost GetOneCategoryServlet");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            IdReq reqData = gson.fromJson(reader, IdReq.class);
            SurveyCategoryDAO categoryDAO = new SurveyCategoryDAO();
            GetCategoryRes category = categoryDAO.getOneCategory(reqData);
            JsonElement data = gson.toJsonTree(category);
            if (category != null) {
                String retRes = resHandler.SuccessRes(res, "Retrieved successfully", data);
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

package controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import jakarta.mail.MessagingException;
import requestmodel.ForgotPasswordReq;
import responsehandler.ResponseHandler;
import util.EmailTemplates;
import util.EmailUtil;

public class ForgotEmailServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req,
            HttpServletResponse res)
            throws ServletException, IOException {
        ResponseHandler resHandler = new ResponseHandler();
        try {
            System.out.println("Inside ForgotEmailServlet doPost()");
            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            ForgotPasswordReq payload = gson.fromJson(reader, ForgotPasswordReq.class);
            String body = EmailTemplates.FORGOT_EMAIL;
            body = body.replace("{{emailId}}", payload.getLink());
            EmailUtil.sendMail(payload.getEmail(), "Survey Application - Forgot Password", body);
            String retRes = resHandler.SuccessRes(res, "Email was sent Successfully");
            res.setStatus(HttpServletResponse.SC_OK);
            res.getWriter().print(retRes);
        } catch (MessagingException e) {
            e.printStackTrace();
            String retRes = resHandler.ErrRes(res, e.getMessage());
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.getWriter().print(retRes);
        }
    }
}

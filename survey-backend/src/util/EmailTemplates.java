package util;

public class EmailTemplates {
    public static final String FORGOT_EMAIL = """
            <html>
            <body>
                <h5>Reset Password Mail</h5>
                <p>Click the link below to reset your password.</p>
                <button style="border:none">
                <a href="http://localhost:4200/change-password/{{emailId}}">
                Reset Password</a>
                </button>
            </body>
            </html>
            """;
}

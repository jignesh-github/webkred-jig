using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Net.Mail;

namespace WebKred
{
    public partial class ForgotPassword : System.Web.UI.Page
    {
        UserBAL usersBAL = new UserBAL();
        DataTable dataTable = new DataTable();
        CommonClassDAL commonClassDAL = new CommonClassDAL();

        protected void Page_Load(object sender, EventArgs e)
        {
            lblErrorMsg.Text = "";
        }
        protected void btnSend_Click(object sender, EventArgs e)
        {
            usersBAL.UserName = txtForgotUserName.Text;
            usersBAL.UserPassword = "";

            try
            {
                dataTable = usersBAL.UserSelect();
            }
            catch (Exception ex)
            {
                lblErrorMsg.Text = "Some Problem With Forgot Password !" + ex.Message;
            }

            if (dataTable.Rows.Count > 0)
            {
                commonClassDAL.sendEmail(dataTable.Rows[0]["UserPassword"].ToString(), "", "WebKred <br/><br/> Your User Name is : " + txtForgotUserName.Text + "<br/>Your Password is: " + dataTable.Rows[0]["UserPassword"].ToString(), "Your Forgotten Password from WebKred");
                lblErrorMsg.Text = "Your Password Has Been Sent To Your Email ID !";
            }
            else
            {
                lblErrorMsg.Text = "User Does Not Exist Please Try Again !";
            }
        }
    }
}